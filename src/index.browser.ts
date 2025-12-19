import { BrowserClient, defaultStackParser, getDefaultIntegrations, makeFetchTransport, Scope } from "@sentry/browser";
import { PayrocClient as OriginalPayrocClient } from "./Client.js";
import { createRuntimeBinding, filterGlobalBrowserIntegrations, instrumentClient } from "./telemetry.js";

createRuntimeBinding({
    ClientClass: BrowserClient,
    makeTransport: makeFetchTransport,
    stackParser: defaultStackParser,
    Scope,
    getIntegrations: () => filterGlobalBrowserIntegrations(getDefaultIntegrations({})),
});

export const PayrocClient: typeof OriginalPayrocClient = instrumentClient(OriginalPayrocClient, "PayrocClient");
export * from "./index.js";

export { createIsolatedBrowserClient, type IsolatedSentryScope } from "./telemetry.js";
