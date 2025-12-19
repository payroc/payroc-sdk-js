import type { BaseTransportOptions, Transport, TransportMakeRequestResponse, TransportRequest } from "@sentry/core";
import { createStackParser, createTransport, nodeStackLineParser, suppressTracing } from "@sentry/core";
import { DenoClient, getDefaultIntegrations, Scope } from "@sentry/deno";
import { PayrocClient as OriginalPayrocClient } from "./Client.js";
import { createRuntimeBinding, instrumentClient } from "./telemetry.js";

const defaultStackParser = createStackParser(nodeStackLineParser());

function makeDenoFetchTransport(options: BaseTransportOptions): Transport {
    function makeRequest(request: TransportRequest): PromiseLike<TransportMakeRequestResponse> {
        const requestOptions: RequestInit = {
            body: request.body as BodyInit,
            method: "POST",
            referrerPolicy: "strict-origin",
            headers: options.headers,
        };

        try {
            return suppressTracing(() => {
                return fetch(options.url, requestOptions).then((response): TransportMakeRequestResponse => {
                    return {
                        statusCode: response.status,
                        headers: {
                            "x-sentry-rate-limits": response.headers.get("X-Sentry-Rate-Limits"),
                            "retry-after": response.headers.get("Retry-After"),
                        },
                    };
                });
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }

    return createTransport(options, makeRequest);
}

createRuntimeBinding({
    ClientClass: DenoClient,
    makeTransport: makeDenoFetchTransport,
    stackParser: defaultStackParser,
    Scope,
    getIntegrations: () => getDefaultIntegrations({}),
});

export const PayrocClient: typeof OriginalPayrocClient = instrumentClient(OriginalPayrocClient, "PayrocClient");
export * from "./index.js";
