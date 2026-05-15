import { PayrocClient, PayrocEnvironmentUrls } from "../../src/index.js";

function getEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable '${name}' is not set.`);
    }
    return value;
}

function getEnvWithFallback(primary: string, fallback: string): string {
    const primaryValue = process.env[primary];
    if (primaryValue) {
        return primaryValue;
    }
    return getEnv(fallback);
}

function getCustomEnvironment(): PayrocEnvironmentUrls {
    const apiBaseUrl = process.env.PAYROC_API_BASE_URL;
    const identityBaseUrl = process.env.PAYROC_IDENTITY_BASE_URL;

    // If custom URLs are provided, use them
    if (apiBaseUrl && identityBaseUrl) {
        return {
            api: apiBaseUrl,
            identity: identityBaseUrl
        };
    }

    // Otherwise, fall back to UAT
    return {
        api: "https://api.uat.payroc.com/v1",
        identity: "https://identity.uat.payroc.com"
    };
}

const environment = getCustomEnvironment();

export const GlobalFixture: {
    Payments: PayrocClient;
    Generic: PayrocClient;
    TerminalIdAvs: string;
    TerminalIdNoAvs: string;
} = {
    Payments: new PayrocClient({
        apiKey: getEnvWithFallback("PAYROC_API_KEY_PAYMENTS", "PAYROC_API_KEY"),
        environment: environment
    }),
    Generic: new PayrocClient({
        apiKey: getEnvWithFallback("PAYROC_API_KEY_GENERIC", "PAYROC_API_KEY"),
        environment: environment
    }),
    TerminalIdAvs: getEnv("TERMINAL_ID_AVS"),
    TerminalIdNoAvs: getEnv("TERMINAL_ID_NO_AVS")
};
