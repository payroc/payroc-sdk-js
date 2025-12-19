import { defaultStackParser, getDefaultIntegrations, makeNodeTransport, NodeClient, Scope } from "@sentry/node";
import { PayrocClient as OriginalPayrocClient } from "./Client.js";
import { createRuntimeBinding, instrumentClient } from "./telemetry.js";

createRuntimeBinding({
    ClientClass: NodeClient,
    makeTransport: makeNodeTransport,
    stackParser: defaultStackParser,
    Scope,
    getIntegrations: () => getDefaultIntegrations({}),
});

export const PayrocClient: typeof OriginalPayrocClient = instrumentClient(OriginalPayrocClient, "PayrocClient");
export * from "./index.js";
