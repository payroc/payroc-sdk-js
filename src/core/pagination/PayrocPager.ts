import type { HttpResponsePromise, RawResponse, WithRawResponse } from "../fetcher/index.js";

/**
 * Parser function type for custom pagination.
 * SDK authors implement this to define how to extract items and determine pagination state.
 *
 * @template TItem The type of items in the paginated response.
 * @template TRequest The type of the request object.
 * @template TResponse The type of the API response.
 */
type PayrocPagerParser<TItem, TRequest, TResponse> = (
    request: TRequest,
    response: WithRawResponse<TResponse>,
) => Promise<{
    /** The request to use for fetching the next page, if any */
    nextRequest?: TRequest;
    /** Whether there is a next page available */
    hasNextPage: boolean;
    /** The request to use for fetching the previous page, if any */
    previousRequest?: TRequest;
    /** Whether there is a previous page available */
    hasPreviousPage: boolean;
    /** The items extracted from the current response */
    items?: TItem[];
}>;

/**
 * Context object for custom pagination, providing the ability to send requests.
 *
 * @template TRequest The type of the request object.
 * @template TResponse The type of the API response.
 */
interface PayrocPagerContext<TRequest, TResponse> {
    /** Function to send a request and get a response */
    sendRequest: (request: TRequest) => HttpResponsePromise<TResponse>;
    /** The initial request that started the pagination */
    initialRequest: TRequest;
}

/**
 * Link relation type from API response
 */
interface LinkRelation {
    rel: string;
    href: string;
}

/**
 * Paginated response structure from Payroc API
 */
interface PayrocPaginatedResponse<TItem> {
    data?: TItem[];
    links?: LinkRelation[];
}

/**
 * A custom pager for paginated API responses that implements Payroc's pagination pattern.
 *
 * This implementation parses link relations from the API response to navigate between pages.
 *
 * @template TItem The type of the items in the page.
 * @template TRequest The type of the request object.
 * @template TResponse The type of the API response.
 */
export class PayrocPager<TItem, TRequest, TResponse> implements AsyncIterable<TItem> {
    private static readonly NEXT_REL = "next";
    private static readonly PREVIOUS_REL = "previous";

    /** The items from the current page */
    public data: TItem[];
    /** The raw HTTP response */
    public rawResponse: RawResponse;
    /** The parsed response object */
    public response: TResponse;

    private context: PayrocPagerContext<TRequest, TResponse>;
    private parser: PayrocPagerParser<TItem, TRequest, TResponse>;
    private nextRequest?: TRequest;
    private previousRequest?: TRequest;
    private _hasNextPage: boolean;
    private _hasPreviousPage: boolean;

    private constructor(args: {
        response: TResponse;
        rawResponse: RawResponse;
        items?: TItem[];
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        nextRequest?: TRequest;
        previousRequest?: TRequest;
        context: PayrocPagerContext<TRequest, TResponse>;
        parser: PayrocPagerParser<TItem, TRequest, TResponse>;
    }) {
        this.response = args.response;
        this.rawResponse = args.rawResponse;
        this.data = args.items ?? [];
        this._hasNextPage = args.hasNextPage;
        this._hasPreviousPage = args.hasPreviousPage;
        this.nextRequest = args.nextRequest;
        this.previousRequest = args.previousRequest;
        this.context = args.context;
        this.parser = args.parser;
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

    /**
     * Sends a request and updates the pager state with the response.
     */
    private async sendRequestAndHandleResponse(request: TRequest): Promise<void> {
        const { data, rawResponse } = await this.context.sendRequest(request).withRawResponse();
        const parsed = await this.parser(request, { data, rawResponse });

        this.response = data;
        this.rawResponse = rawResponse;
        this.data = parsed.items ?? [];
        this._hasNextPage = parsed.hasNextPage;
        this._hasPreviousPage = parsed.hasPreviousPage;
        this.nextRequest = parsed.nextRequest;
        this.previousRequest = parsed.previousRequest;
    }

    private async *iterMessages(): AsyncGenerator<TItem, void> {
        for (const item of this.data) {
            yield item;
        }

        while (this.hasNextPage()) {
            await this.getNextPage();
            for (const item of this.data) {
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
     * Async generator that yields subsequent pages by repeatedly calling getNextPage.
     *
     * @example
     * ```typescript
     * for await (const page of pager.getNextPages()) {
     *   console.log('Page items:', page);
     * }
     * ```
     */
    public async *getNextPages(): AsyncGenerator<TItem[], void, unknown> {
        while (this.hasNextPage()) {
            await this.getNextPage();
            yield this.data;
        }
    }

    /**
     * Async generator that yields previous pages by repeatedly calling getPreviousPage.
     *
     * @example
     * ```typescript
     * for await (const page of pager.getPreviousPages()) {
     *   console.log('Page items:', page);
     * }
     * ```
     */
    public async *getPreviousPages(): AsyncGenerator<TItem[], void, unknown> {
        while (this.hasPreviousPage()) {
            await this.getPreviousPage();
            yield this.data;
        }
    }

    /**
     * Creates a PayrocPager by making the initial request and parsing the response.
     *
     * @param args.sendRequest Function to send a request and get a response
     * @param args.initialRequest The initial request to start pagination
     * @param args.parse The parser function to extract items and pagination state.
     *                   If omitted, uses the default Payroc pagination format parser.
     * @returns A new PayrocPager instance
     */
    public static async create<TItem, TRequest, TResponse>(args: {
        sendRequest: (request: TRequest) => HttpResponsePromise<TResponse>;
        initialRequest: TRequest;
        parse?: PayrocPagerParser<TItem, TRequest, TResponse>;
    }): Promise<PayrocPager<TItem, TRequest, TResponse>> {
        const { data, rawResponse } = await args.sendRequest(args.initialRequest).withRawResponse();

        // Use provided parser or fall back to default Payroc format parser
        const parser = args.parse ?? PayrocPager.createDefaultParser<TItem, TRequest, TResponse>();

        const parsed = await parser(args.initialRequest, { data, rawResponse });

        // Build context from the provided arguments
        const context: PayrocPagerContext<TRequest, TResponse> = {
            sendRequest: args.sendRequest,
            initialRequest: args.initialRequest,
        };

        return new PayrocPager({
            response: data,
            rawResponse,
            items: parsed.items,
            hasNextPage: parsed.hasNextPage,
            hasPreviousPage: parsed.hasPreviousPage,
            nextRequest: parsed.nextRequest,
            previousRequest: parsed.previousRequest,
            context,
            parser,
        });
    }

    /**
     * Creates a default parser for standard Payroc pagination format.
     * Assumes the response has `data` array and `links` array with rel/href objects.
     *
     * @returns A parser function for standard Payroc responses
     */
    private static createDefaultParser<TItem, TRequest, TResponse>(): PayrocPagerParser<TItem, TRequest, TResponse> {
        return async (request: TRequest, response: WithRawResponse<TResponse>) => {
            const payrocResponse = response.data as unknown as PayrocPaginatedResponse<TItem>;
            return await PayrocPager.parsePayrocResponse(request, payrocResponse);
        };
    }

    /**
     * Helper method to extract a URI from link relations in the response.
     * Searches for a link with the specified rel value and returns its href.
     *
     * @param response The paginated response containing links
     * @param rel The link relation to search for (e.g., "next" or "previous")
     * @returns The URI string if found, undefined otherwise
     */
    protected static getLinkUri(response: PayrocPaginatedResponse<unknown>, rel: string): string | undefined {
        if (!response.links || !Array.isArray(response.links)) {
            return undefined;
        }
        for (const link of response.links) {
            if (link.rel === rel) {
                return link.href;
            }
        }
        return undefined;
    }

    /**
     * Helper method to clone a request with a new URI.
     * This is useful for creating requests for next/previous pages.
     *
     * @param request The original request to clone
     * @param newUri The new URI to use in the cloned request
     * @returns A new request object with the updated URI
     */
    protected static cloneRequestWithNewUri<TRequest>(request: TRequest, newUri: string): TRequest {
        if (typeof request === "object" && request !== null) {
            return {
                ...request,
                url: newUri,
            } as TRequest;
        }
        return request;
    }

    /**
     * Parses an HTTP response according to Payroc's pagination format.
     * Extracts link relations for next/previous pages and the data items.
     *
     * @param request The request that was sent
     * @param response The response received
     * @returns Pagination state and items
     */
    public static async parsePayrocResponse<TItem, TRequest>(
        request: TRequest,
        response: PayrocPaginatedResponse<TItem>,
    ): Promise<{
        nextRequest?: TRequest;
        hasNextPage: boolean;
        previousRequest?: TRequest;
        hasPreviousPage: boolean;
        items?: TItem[];
    }> {
        const prevUri = PayrocPager.getLinkUri(response, PayrocPager.PREVIOUS_REL);
        const hasPreviousPage = prevUri != null && prevUri !== "";
        const previousRequest = hasPreviousPage ? PayrocPager.cloneRequestWithNewUri(request, prevUri) : undefined;

        const nextUri = PayrocPager.getLinkUri(response, PayrocPager.NEXT_REL);
        const hasNextPage = nextUri != null && nextUri !== "";
        const nextRequest = hasNextPage ? PayrocPager.cloneRequestWithNewUri(request, nextUri) : undefined;

        const items = response.data ?? [];

        return {
            nextRequest,
            hasNextPage,
            previousRequest,
            hasPreviousPage,
            items,
        };
    }
}
