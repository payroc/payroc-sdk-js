import { PayrocClient, PayrocEnvironmentUrls } from "../../src/index.js";

function getEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable '${name}' is not set.`);
    }
    return value;
}

const uatEnvironment: PayrocEnvironmentUrls = {
    api: "https://api.uat.payroc.com/v1",
    identity: "https://identity.uat.payroc.com"
};

export const GlobalFixture: {
    Payments: PayrocClient;
    Generic: PayrocClient;
    TerminalIdAvs: string;
    TerminalIdNoAvs: string;
} = {
    Payments: new PayrocClient({
        apiKey: getEnv("PAYROC_API_KEY_PAYMENTS"),
        environment: uatEnvironment
    }),
    Generic: new PayrocClient({
        apiKey: getEnv("PAYROC_API_KEY_GENERIC"),
        environment: uatEnvironment
    }),
    TerminalIdAvs: getEnv("TERMINAL_ID_AVS"),
    TerminalIdNoAvs: getEnv("TERMINAL_ID_NO_AVS")
};
