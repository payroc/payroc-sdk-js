import { ReactNativeClient, Scope } from "@sentry/react-native";
import { PayrocClient as OriginalPayrocClient } from "./Client.js";
import { createRuntimeBinding, instrumentClient } from "./telemetry.js";

createRuntimeBinding({
    ClientClass: ReactNativeClient,
    Scope,
    getIntegrations: () => [],
});

export const PayrocClient: typeof OriginalPayrocClient = instrumentClient(OriginalPayrocClient, "PayrocClient");
export * from "./index.js";
