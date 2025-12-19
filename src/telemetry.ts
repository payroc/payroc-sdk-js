import { RUNTIME } from "./core/runtime/runtime.js";

const SDK_VERSION = "1.0.0";
const SDK_NAME = "payroc-js";

const COMMON_TAGS = {
    sdk: SDK_NAME,
    sdk_version: SDK_VERSION,
    runtime_type: RUNTIME.type,
    ...(RUNTIME.version && { runtime_version: RUNTIME.version }),
} as const;

const COMMON_CONTEXTS = {
    sdk_info: {
        name: SDK_NAME,
        version: SDK_VERSION,
        runtime_type: RUNTIME.type,
        runtime_version: RUNTIME.version,
    },
    runtime: {
        type: RUNTIME.type,
        version: RUNTIME.version,
        parsed_version: RUNTIME.parsedVersion,
    },
} as const;

type IsolatedSentryClient = {
    captureException: (error: Error, context?: any) => any;
    captureMessage?: (message: string, context?: any) => any;
    addBreadcrumb?: (breadcrumb: {
        category?: string;
        message?: string;
        level?: "fatal" | "error" | "warning" | "info" | "debug";
        data?: Record<string, any>;
        timestamp?: number;
    }) => void;
    flush?: (timeout?: number) => Promise<boolean>;
};

type SentryClientFactory = () => IsolatedSentryClient | null;

let sentryClientFactory: SentryClientFactory | null = null;
let isolatedClient: IsolatedSentryClient | null = null;

/**
 * Binds a factory function that creates an isolated Sentry client.
 * The factory should return an isolated client that captures errors without calling Sentry.init() globally.
 */
export function bindSentryClientFactory(factory: SentryClientFactory): void {
    sentryClientFactory = factory;
    isolatedClient = null;
}

function getIsolatedClient(): IsolatedSentryClient | null {
    if (!sentryClientFactory) {
        return null;
    }
    if (!isolatedClient) {
        isolatedClient = sentryClientFactory();
    }
    return isolatedClient;
}

const SENSITIVE_PATTERNS = [
    "bearer ",
    "authorization:",
    "api_key=",
    "api-key=",
    "apikey=",
    "api_key:",
    "api-key:",
    "apikey:",
    "password=",
    "password:",
    "token=",
    "token:",
] as const;

/**
 * Scrubs sensitive data from strings (API keys, tokens, passwords, etc.)
 */
function scrubSensitiveData(str: string): string {
    if (!str) return str;

    let result = str;

    for (const pattern of SENSITIVE_PATTERNS) {
        let searchStart = 0;

        while (true) {
            const lowerResult = result.toLowerCase();
            const index = lowerResult.indexOf(pattern, searchStart);
            if (index === -1) break;

            const patternLen = pattern.length;
            let valueStart = index + patternLen;

            while (valueStart < result.length && result[valueStart] === " ") {
                valueStart++;
            }

            let valueEnd = valueStart;
            while (valueEnd < result.length) {
                const char = result[valueEnd];
                if (char === " " || char === "," || char === "&" || char === "\n" || char === "\r" || char === "\t") {
                    break;
                }
                valueEnd++;
            }

            result = `${result.substring(0, valueStart)}[REDACTED]${result.substring(valueEnd)}`;

            searchStart = valueStart + 10;
        }
    }

    return result;
}

/**
 * Creates an isolated Sentry client for any runtime.
 */
export function createIsolatedSentryClient<T>(params: {
    ClientClass: new (options: any) => T;
    makeTransport?: any;
    stackParser?: any;
    getIntegrations: () => any[];
    Scope: new () => any;
}): IsolatedSentryClient | null {
    try {
        const config = getSentryConfig();
        const { ClientClass, makeTransport, stackParser, getIntegrations, Scope } = params;

        const clientOptions: any = {
            ...config,
            integrations: getIntegrations(),
        };

        if (makeTransport) {
            clientOptions.transport = makeTransport;
        }

        if (stackParser) {
            clientOptions.stackParser = stackParser;
        }

        const client = new ClientClass(clientOptions) as any;

        const scope = new Scope();
        scope.setClient(client);
        client.init();

        return {
            captureException: (error: Error, context?: any) => scope.captureException(error, context),
            captureMessage: (message: string, context?: any) => scope.captureMessage(message, context),
            addBreadcrumb: (breadcrumb: any) => scope.addBreadcrumb(breadcrumb),
            flush: async (timeout?: number) => {
                if (client.flush) {
                    return await client.flush(timeout || 2000);
                }
                return true;
            },
        };
    } catch (_e) {
        return null;
    }
}

/**
 * Creates a standard runtime-specific Sentry client binding.
 */
export function createRuntimeBinding<T>(config: {
    ClientClass: new (options: any) => T;
    makeTransport?: any;
    stackParser?: any;
    getIntegrations: () => any[];
    Scope: new () => any;
}): void {
    bindSentryClientFactory(() => createIsolatedSentryClient(config));
}

/**
 * Filters out global browser integrations that would pollute the global scope.
 */
export function filterGlobalBrowserIntegrations(integrations: any[]): any[] {
    const globalIntegrationNames = ["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"];
    return integrations.filter((integration) => {
        return !globalIntegrationNames.includes(integration.name);
    });
}

/**
 * Creates an isolated Sentry client for shared browser environments.
 * Use this when your SDK runs as a library where calling Sentry.init() would pollute global state.
 */
export function createIsolatedBrowserClient(options: {
    dsn: string;
    environment?: string;
    release?: string;
    sendDefaultPii?: boolean;
    tracesSampleRate?: number;
}): any {
    try {
        // Dynamically import to avoid bundling Sentry in non-browser builds
        const {
            BrowserClient,
            defaultStackParser,
            getDefaultIntegrations,
            makeFetchTransport,
            Scope,
        } = require("@sentry/browser");

        const integrations = getDefaultIntegrations({}).filter((defaultIntegration: any) => {
            return !["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"].includes(defaultIntegration.name);
        });

        const clientOptions = {
            dsn: options.dsn,
            environment: options.environment,
            release: options.release,
            sendDefaultPii: options.sendDefaultPii ?? false,
            tracesSampleRate: options.tracesSampleRate ?? 1.0,
            transport: makeFetchTransport,
            stackParser: defaultStackParser,
            integrations,
        };

        const client = new BrowserClient(clientOptions);
        const scope = new Scope();
        scope.setClient(client);

        client.init();

        return scope;
    } catch (_e) {
        return null;
    }
}

export type IsolatedSentryScope = any;

export function getSentryConfig(): {
    dsn: string;
    integrations: any[];
    attachStacktrace: boolean;
    beforeSend: (event: any) => any;
} {
    return {
        dsn: "https://8ac65194857b96ef72a0d82aec11e9d1@o4505201678483456.ingest.us.sentry.io/4510516965081088",
        integrations: [],
        attachStacktrace: true,
        beforeSend(event: any) {
            if (event.user) {
                delete event.user.email;
                delete event.user.ip_address;
            }

            if (event.exception?.values) {
                for (const exception of event.exception.values) {
                    if (exception.value) {
                        exception.value = scrubSensitiveData(exception.value);
                    }
                }
            }

            if (event.breadcrumbs) {
                for (const breadcrumb of event.breadcrumbs) {
                    if (breadcrumb.message) {
                        breadcrumb.message = scrubSensitiveData(breadcrumb.message);
                    }
                    if (breadcrumb.data) {
                        breadcrumb.data = {
                            args: breadcrumb.data.args,
                        };
                    }
                }
            }

            if (event.request) {
                if (event.request.headers) {
                    delete event.request.headers.Authorization;
                    delete event.request.headers.authorization;
                    delete event.request.headers["X-API-Key"];
                    delete event.request.headers["x-api-key"];
                }
                if (event.request.cookies) {
                    event.request.cookies = {};
                }
            }

            if (event.exception?.values?.[0]) {
                const httpStatus = event.tags?.http_status || event.contexts?.payroc_error?.http_status_code;
                const client = event.tags?.client;
                const method = event.tags?.method;

                if (httpStatus || (client && method)) {
                    const parts = [];
                    if (httpStatus) {
                        parts.push(`[${httpStatus}]`);
                    }
                    if (client && method) {
                        parts.push(`${client}.${method}`);
                    }

                    const originalValue = event.exception.values[0].value || "";
                    if (parts.length > 0 && !originalValue.startsWith("[")) {
                        event.exception.values[0].value = `${parts.join(" ")} ${originalValue}`;
                    }
                }
            }

            if (event.tags?.client && event.tags?.method) {
                event.transaction = `${event.tags.client}.${event.tags.method}`;
            }

            if (!event.contexts) {
                event.contexts = {};
            }
            event.contexts = {
                ...event.contexts,
                ...COMMON_CONTEXTS,
            };

            if (!event.tags) {
                event.tags = {};
            }
            event.tags = {
                ...event.tags,
                ...COMMON_TAGS,
            };

            if (!event.release) {
                event.release = `${SDK_NAME}@${SDK_VERSION}`;
            }

            return event;
        },
    };
}

export function addBreadcrumb(message: string, data?: Record<string, any>, telemetryEnabled = true): void {
    if (!telemetryEnabled) {
        return;
    }

    const client = getIsolatedClient();
    if (!client || !client.addBreadcrumb) {
        return;
    }

    try {
        client.addBreadcrumb({
            category: "sdk.operation",
            message,
            level: "info",
            data,
            timestamp: Date.now() / 1000,
        });
    } catch (_e) {
        // Silent fail
    }
}

export async function flushTelemetry(timeout = 2000): Promise<boolean> {
    const client = getIsolatedClient();
    if (!client || !client.flush) {
        return true;
    }

    try {
        return await client.flush(timeout);
    } catch (_e) {
        return false;
    }
}

export function captureError(error: Error, context?: Record<string, string>, telemetryEnabled = true): void {
    if (!telemetryEnabled) {
        return;
    }

    const client = getIsolatedClient();
    if (!client) {
        return;
    }

    try {
        const errorContext: any = {
            error_type: error.name,
            error_message: error.message,
        };

        if ("statusCode" in error) {
            errorContext.http_status_code = (error as any).statusCode;
        }
        if ("body" in error) {
            errorContext.response_body = (error as any).body;
        }
        if ("rawResponse" in error) {
            const rawResponse = (error as any).rawResponse;
            if (rawResponse) {
                errorContext.response_url = rawResponse.url;
                errorContext.response_status = rawResponse.status;
                errorContext.response_status_text = rawResponse.statusText;
            }
        }

        client.captureException(error, {
            tags: {
                ...COMMON_TAGS,
                ...context,
                ...(errorContext.http_status_code && {
                    http_status: errorContext.http_status_code,
                }),
            },
            contexts: {
                ...COMMON_CONTEXTS,
                payroc_error: errorContext,
            },
            fingerprint: [
                "{{ default }}",
                context?.method || "unknown",
                errorContext.http_status_code?.toString() || "no-status",
            ],
        });
    } catch (_e) {
        // Silent fail
    }
}

export function instrumentClient<T extends new (...args: any[]) => any>(ClientClass: T, clientName: string): T {
    return new Proxy(ClientClass, {
        construct(target, args) {
            const options = args[0] || {};
            const telemetryEnabled = options.telemetry !== false;

            let instance: any;
            try {
                instance = new target(...args);
            } catch (error) {
                captureError(
                    error as Error,
                    {
                        client: clientName,
                        phase: "constructor",
                    },
                    telemetryEnabled,
                );
                throw error;
            }

            return instrumentInstance(instance, clientName, telemetryEnabled);
        },
    }) as T;
}

function instrumentInstance(instance: any, clientPath: string, telemetryEnabled: boolean): any {
    return new Proxy(instance, {
        get(target, prop, receiver) {
            if (typeof prop === "string" && prop.startsWith("_")) {
                return Reflect.get(target, prop, receiver);
            }

            let value: any;
            try {
                value = Reflect.get(target, prop, receiver);
            } catch (error) {
                captureError(
                    error as Error,
                    {
                        client: clientPath,
                        property: String(prop),
                    },
                    telemetryEnabled,
                );
                throw error;
            }

            if (typeof value === "function") {
                return new Proxy(value, {
                    apply(fnTarget, thisArg, argumentsList) {
                        const methodPath = `${clientPath}.${String(prop)}`;

                        addBreadcrumb(methodPath, { args: argumentsList.length }, telemetryEnabled);

                        try {
                            const result = Reflect.apply(fnTarget, thisArg, argumentsList);

                            if (result instanceof Promise) {
                                return result.catch((error: Error) => {
                                    captureError(
                                        error,
                                        {
                                            client: clientPath,
                                            method: String(prop),
                                        },
                                        telemetryEnabled,
                                    );
                                    throw error;
                                });
                            }

                            return result;
                        } catch (error) {
                            captureError(
                                error as Error,
                                {
                                    client: clientPath,
                                    method: String(prop),
                                },
                                telemetryEnabled,
                            );
                            throw error;
                        }
                    },
                });
            }

            if (value && typeof value === "object" && value.constructor?.name?.endsWith("Client")) {
                return instrumentInstance(value, `${clientPath}.${String(prop)}`, telemetryEnabled);
            }

            return value;
        },
    });
}
