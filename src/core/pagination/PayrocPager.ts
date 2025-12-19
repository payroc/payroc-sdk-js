import type { AuthProvider } from "../auth/AuthProvider.js";
import type { BaseRequestOptions, NormalizedClientOptions } from "../../BaseClient.js";
import { PayrocEnvironment } from "../../environments.js";
import type { APIResponse } from "../fetcher/APIResponse.js";
import type { Fetcher } from "../fetcher/Fetcher.js";
import type { RawResponse } from "../fetcher/index.js";
import { mergeHeaders, mergeOnlyDefinedHeaders } from "../headers.js";

const NEXT_REL = "next";
const PREVIOUS_REL = "previous";

/**
 *
 * @template TItem The type of the items in the page.
 * @template TResponse The type of the API response.
 */
export class PayrocPager<TItem, TResponse> implements AsyncIterable<TItem> {
    /** The items from the current page */
    public data: TItem[];
    /** The raw HTTP response */
    public rawResponse: RawResponse;
    /** The parsed response object */
    public response: TResponse;

    private readonly authProvider: AuthProvider | undefined;
    private readonly sendRequest: (request: Fetcher.Args) => Promise<APIResponse<TResponse, Fetcher.Error>>;
    private nextRequest?: Fetcher.Args;
    private previousRequest?: Fetcher.Args;
    private _hasNextPage: boolean;
    private _hasPreviousPage: boolean;

    constructor(args: {
        response: TResponse;
        rawResponse: RawResponse;
        items: TItem[];
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        nextRequest?: Fetcher.Args;
        previousRequest?: Fetcher.Args;
        sendRequest: (request: Fetcher.Args) => Promise<APIResponse<TResponse, Fetcher.Error>>;
        authProvider: AuthProvider | undefined;
    }) {
        this.response = args.response;
        this.rawResponse = args.rawResponse;
        this.data = args.items;
        this._hasNextPage = args.hasNextPage;
        this._hasPreviousPage = args.hasPreviousPage;
        this.nextRequest = args.nextRequest;
        this.previousRequest = args.previousRequest;
        this.sendRequest = args.sendRequest;
        this.authProvider = args.authProvider;
    }

    /**
     * @returns whether there is a next page to load
     */
    public hasNextPage(): boolean {
        return this._hasNextPage;
    }

    /**
     * @returns whether there is a previous page to load
     */
    public hasPreviousPage(): boolean {
        return this._hasPreviousPage;
    }

    /**
     * Returns the current page data.
     * This is an alias for the `data` property for consistency with other pagination APIs.
     *
     * @returns the items from the current page
     */
    public getCurrentPage(): TItem[] {
        return this.data;
    }

    /**
     * Retrieves the next page of results.
     * @returns this pager with updated data
     * @throws Error if there is no next page
     */
    public async getNextPage(): Promise<this> {
        if (!this._hasNextPage || !this.nextRequest) {
            throw new Error("No next page available");
        }
        await this.sendRequestAndHandleResponse(this.nextRequest);
        return this;
    }

    /**
     * Retrieves the previous page of results.
     * @returns this pager with updated data
     * @throws Error if there is no previous page
     */
    public async getPreviousPage(): Promise<this> {
        if (!this._hasPreviousPage || !this.previousRequest) {
            throw new Error("No previous page available");
        }
        await this.sendRequestAndHandleResponse(this.previousRequest);
        return this;
    }

    private async sendRequestAndHandleResponse(request: Fetcher.Args): Promise<void> {
        // Refresh authorization header if it's a function
        if (this.authProvider) {
            const authRequest = await this.authProvider.getAuthRequest();
            const updatedHeaders = mergeHeaders(request.headers, mergeOnlyDefinedHeaders(authRequest.headers));
            request = { ...request, headers: updatedHeaders };
        }

        const response = await this.sendRequest(request);
        if (!response.ok) {
            const reason =
                response.error.reason === "status-code" ? `HTTP ${response.error.statusCode}` : response.error.reason;
            throw new Error(`Failed to fetch page: ${reason}`);
        }
        const data = response.body;
        const rawResponse = response.rawResponse;
        const parsed = await parseHttpResponse<TItem, TResponse>({ request, data, rawResponse });
        this.response = data;
        this.rawResponse = rawResponse;
        this.data = parsed.items;
        this._hasNextPage = parsed.hasNextPage;
        this._hasPreviousPage = parsed.hasPreviousPage;
        this.nextRequest = parsed.nextRequest;
        this.previousRequest = parsed.previousRequest;
    }

    private async *iterMessages(): AsyncGenerator<TItem, void> {
        for (const item of this.data) {
            yield item;
        }

        for await (const page of this.getNextPages()) {
            for (const item of page) {
                yield item;
            }
        }
    }

    async *[Symbol.asyncIterator](): AsyncIterator<TItem, void, unknown> {
        for await (const message of this.iterMessages()) {
            yield message;
        }
    }

    /**
     * Returns an async iterator over all next pages
     */
    public async *getNextPages(): AsyncGenerator<TItem[], void> {
        while (this.hasNextPage()) {
            await this.getNextPage();
            yield this.data;
        }
    }

    /**
     * Returns an async iterator over all previous pages
     */
    public async *getPreviousPages(): AsyncGenerator<TItem[], void> {
        while (this.hasPreviousPage()) {
            await this.getPreviousPage();
            yield this.data;
        }
    }
}

export async function createPayrocPager<TItem, TResponse>({
    sendRequest,
    initialHttpRequest,
    clientOptions,
}: {
    sendRequest: (request: Fetcher.Args) => Promise<APIResponse<TResponse, Fetcher.Error>>;
    initialHttpRequest: Fetcher.Args;
    clientOptions: NormalizedClientOptions;
    requestOptions?: BaseRequestOptions;
}): Promise<PayrocPager<TItem, TResponse>> {
    const response = await sendRequest(initialHttpRequest);
    if (!response.ok) {
        const reason =
            response.error.reason === "status-code" ? `HTTP ${response.error.statusCode}` : response.error.reason;
        throw new Error(`Failed to fetch initial page: ${reason}`);
    }
    const data = response.body;
    const rawResponse = response.rawResponse;
    const parsed = await parseHttpResponse<TItem, TResponse>({ request: initialHttpRequest, data, rawResponse });

    return new PayrocPager({
        response: data,
        rawResponse,
        items: parsed.items,
        hasNextPage: parsed.hasNextPage,
        hasPreviousPage: parsed.hasPreviousPage,
        nextRequest: parsed.nextRequest,
        previousRequest: parsed.previousRequest,
        sendRequest: sendRequest,
        authProvider: clientOptions.authProvider,
    });
}

async function parseHttpResponse<TItem, TResponse>(args: {
    request: Fetcher.Args;
    data: TResponse;
    rawResponse: RawResponse;
}): Promise<{
    nextRequest?: Fetcher.Args;
    hasNextPage: boolean;
    previousRequest?: Fetcher.Args;
    hasPreviousPage: boolean;
    items: TItem[];
}> {
    const json = args.data as any;

    // Parse previous link
    const prevUri = getLinkUri(json, PREVIOUS_REL);
    const hasPreviousPage = prevUri != null;
    const previousRequest = prevUri ? cloneRequestWithNewUri(args.request, prevUri) : undefined;

    // Parse next link
    const nextUri = getLinkUri(json, NEXT_REL);
    const hasNextPage = nextUri != null;
    const nextRequest = nextUri ? cloneRequestWithNewUri(args.request, nextUri) : undefined;

    // Extract items from data property
    const items: TItem[] = json.data ?? [];

    return {
        nextRequest,
        hasNextPage,
        previousRequest,
        hasPreviousPage,
        items,
    };
}

function getLinkUri(json: any, rel: string): string | null {
    if (!json.links || !Array.isArray(json.links)) {
        return null;
    }

    for (const link of json.links) {
        if (link.rel === rel && typeof link.href === "string" && link.href.length > 0) {
            return link.href;
        }
    }

    return null;
}

function cloneRequestWithNewUri(request: Fetcher.Args, newUri: string): Fetcher.Args {
    return {
        ...request,
        url: newUri,
        //url: normalizeUrl(newUri),
        // Clear query parameters since the new URL already includes them
        queryParameters: undefined,
    };
}
const UAT_BASE_URL = PayrocEnvironment.Uat.api; // https://api.uat.payroc.com/v1

/**
 * Utility to normalize pagination URLs if they have internal hostnames.
 * This is a workaround for a known API issue in UAT where internal service
 * names like "events" are returned instead of fully qualified URLs.
 */
// function normalizeUrl(url: string): string {
//     try {
//         const parsedUrl = new URL(url);
//         const hostname = parsedUrl.hostname;

//         // Check if hostname is internal (no dots = internal service name)
//         if (!hostname.includes(".")) {
//             // Reconstruct URL with UAT base
//             const uatBase = new URL(UAT_BASE_URL);
//             parsedUrl.protocol = "https:";
//             parsedUrl.hostname = uatBase.hostname;
//             parsedUrl.port = "";
//             return parsedUrl.toString();
//         }
//         return url;
//     } catch {
//         return url;
//     }
// }
