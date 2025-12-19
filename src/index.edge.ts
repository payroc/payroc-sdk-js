import { getDefaultIntegrations, Scope, VercelEdgeClient } from "@sentry/vercel-edge";
import { PayrocClient as OriginalPayrocClient } from "./Client.js";
import { createRuntimeBinding, instrumentClient } from "./telemetry.js";

// Vercel Edge Runtime - Telemetry enabled by default (opt-out) without global pollution
// Uses isolated Sentry client that doesn't call Sentry.init()

// Automatically bind isolated client factory (NO SIDE EFFECTS - only creates client on first error)
// Note: Vercel Edge doesn't export makeTransport/stackParser - client handles these internally
createRuntimeBinding({
    ClientClass: VercelEdgeClient,
    Scope,
    getIntegrations: () => getDefaultIntegrations({}),
});

export const PayrocClient: typeof OriginalPayrocClient = instrumentClient(OriginalPayrocClient, "PayrocClient");
export * from "./index.js";
