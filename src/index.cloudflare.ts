import { PayrocClient as OriginalPayrocClient } from "./Client.js";
import { instrumentClient } from "./telemetry.js";

export const PayrocClient: typeof OriginalPayrocClient = instrumentClient(OriginalPayrocClient, "PayrocClient");

export type { CloudflareOptions as CloudflareSentryOptions } from "@sentry/cloudflare";
export {
    sentryPagesPlugin as createSentryPagesMiddleware,
    withSentry as createSentryWorkerWrapper,
} from "@sentry/cloudflare";
export * from "./index.js";
