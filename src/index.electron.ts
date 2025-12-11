import { PayrocClient as OriginalPayrocClient } from "./Client.js";
import { instrumentClient } from "./telemetry.js";

export const PayrocClient: typeof OriginalPayrocClient = instrumentClient(OriginalPayrocClient, "PayrocClient");
export * from "./index.js";
