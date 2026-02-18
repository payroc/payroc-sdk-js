// Test file to verify all README examples compile correctly
import { PayrocClient, Payroc, PayrocEnvironment, PayrocEnvironmentUrls, PayrocError, logging } from "../src";

describe("README Examples Compilation", () => {
    const apiKey = "test-api-key";

    test("Basic client instantiation", () => {
        const client = new PayrocClient({ apiKey });
        expect(client).toBeDefined();
    });

    test("Create payment example compiles", async () => {
        const client = new PayrocClient({ apiKey });
        
        // This should compile without errors
        const paymentRequest: Payroc.cardPayments.PaymentRequest = {
            "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
            channel: "web",
            processingTerminalId: "1234001",
            operator: "Jane",
            order: {
                orderId: "OrderRef6543",
                description: "Large Pepperoni Pizza",
                amount: 4999,
                currency: "USD"
            },
            customer: {
                firstName: "Sarah",
                lastName: "Hopper",
                billingAddress: {
                    address1: "1 Example Ave.",
                    address2: "Example Address Line 2",
                    address3: "Example Address Line 3",
                    city: "Chicago",
                    state: "Illinois",
                    country: "US",
                    postalCode: "60056"
                },
                shippingAddress: {
                    recipientName: "Sarah Hopper",
                    address: {
                        address1: "1 Example Ave.",
                        address2: "Example Address Line 2",
                        address3: "Example Address Line 3",
                        city: "Chicago",
                        state: "Illinois",
                        country: "US",
                        postalCode: "60056"
                    }
                }
            },
            paymentMethod: {
                type: "card",
                cardDetails: {
                    entryMethod: "raw",
                    device: {
                        model: "bbposChp",
                        serialNumber: "1850010868"
                    },
                    rawData: "A1B2C3D4E5F67890ABCD1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF"
                }
            },
            customFields: [{
                name: "yourCustomField",
                value: "abc123"
            }]
        };

        // Verify the method exists and has correct signature
        expect(typeof client.cardPayments.payments.create).toBe("function");
    });

    test("Custom environment example compiles", () => {
        const mockEnvironment: PayrocEnvironmentUrls = {
            api: "http://localhost:3000",
            identity: "http://localhost:3001"
        };

        const client = new PayrocClient({
            apiKey,
            environment: mockEnvironment
        });

        expect(client).toBeDefined();
    });

    test("Exception handling example compiles", async () => {
        const client = new PayrocClient({ apiKey });

        try {
            // This is just checking compilation, not execution
            const response = await client.cardPayments.payments.create({
                "Idempotency-Key": "test",
                channel: "web",
                processingTerminalId: "1234001",
                order: {
                    orderId: "test",
                    amount: 100,
                    currency: "USD"
                },
                paymentMethod: {
                    type: "card",
                    cardDetails: {
                        entryMethod: "keyed",
                        keyedData: {
                            dataFormat: "plainText",
                            cardNumber: "4111111111111111",
                            expiryDate: "1230",
                            cvv: "123"
                        }
                    }
                }
            });
        } catch (err) {
            if (err instanceof PayrocError) {
                // These properties should exist
                const statusCode = err.statusCode;
                const message = err.message;
                const body = err.body;
                const rawResponse = err.rawResponse;
            }
        }
    });

    test("Pagination example compiles", async () => {
        const client = new PayrocClient({ apiKey });

        // Verify list method exists and returns correct type
        expect(typeof client.cardPayments.payments.list).toBe("function");
    });

    test("Request parameters example compiles", async () => {
        const client = new PayrocClient({ apiKey });

        // These should all compile
        const request1: Payroc.cardPayments.ListPaymentsRequest = {
            processingTerminalId: "1234001",
            dateFrom: "2024-07-01T15:30:00Z"
        };

        const request2: Payroc.cardPayments.ListPaymentsRequest = {
            processingTerminalId: "1234001",
            dateTo: "2024-07-03T15:30:00Z"
        };

        const request3: Payroc.cardPayments.ListPaymentsRequest = {
            processingTerminalId: "1234001",
            after: "8516"
        };

        const request4: Payroc.cardPayments.ListPaymentsRequest = {
            processingTerminalId: "1234001",
            before: "2571"
        };

        expect(request1).toBeDefined();
        expect(request2).toBeDefined();
        expect(request3).toBeDefined();
        expect(request4).toBeDefined();
    });

    test("Polymorphic types - creating payment methods", () => {
        // Card payment method
        const cardPayment: Payroc.cardPayments.PaymentRequestPaymentMethod = {
            type: "card",
            cardDetails: {
                entryMethod: "raw",
                device: {
                    model: "bbposChp",
                    serialNumber: "1850010868"
                },
                rawData: "A1B2C3D4E5F67890ABCD1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF"
            }
        };

        // Secure token payment method
        const secureTokenPayment: Payroc.cardPayments.PaymentRequestPaymentMethod = {
            type: "secureToken",
            token: "abc123xyz789"
        };

        // Digital wallet payment method
        const digitalWalletPayment: Payroc.cardPayments.PaymentRequestPaymentMethod = {
            type: "digitalWallet",
            serviceProvider: "apple",
            encryptedData: "..."
        };

        expect(cardPayment.type).toBe("card");
        expect(secureTokenPayment.type).toBe("secureToken");
        expect(digitalWalletPayment.type).toBe("digitalWallet");
    });

    test("Type guard example compiles", () => {
        function isCardPayment(
            paymentMethod: Payroc.cardPayments.PaymentRequestPaymentMethod
        ): paymentMethod is Payroc.cardPayments.PaymentRequestPaymentMethod.Card {
            return paymentMethod.type === "card";
        }

        const payment: Payroc.cardPayments.PaymentRequestPaymentMethod = {
            type: "card",
            cardDetails: {
                entryMethod: "keyed",
                keyedData: {
                    dataFormat: "plainText",
                    cardNumber: "4111111111111111",
                    expiryDate: "1230",
                    cvv: "123"
                }
            }
        };

        if (isCardPayment(payment)) {
            // TypeScript knows this is definitely a card payment
            expect(payment.cardDetails).toBeDefined();
        }
    });

    test("Request options examples compile", async () => {
        const client = new PayrocClient({ apiKey });

        // Additional headers
        const headersExample = {
            headers: {
                'X-Custom-Header': 'custom value'
            }
        };

        // Additional query params
        const queryParamsExample = {
            queryParams: {
                'customQueryParamKey': 'custom query param value'
            }
        };

        // Max retries
        const retriesExample = {
            maxRetries: 0
        };

        // Timeout
        const timeoutExample = {
            timeoutInSeconds: 30
        };

        // Abort signal
        const controller = new AbortController();
        const abortExample = {
            abortSignal: controller.signal
        };

        expect(headersExample).toBeDefined();
        expect(queryParamsExample).toBeDefined();
        expect(retriesExample).toBeDefined();
        expect(timeoutExample).toBeDefined();
        expect(abortExample).toBeDefined();
    });

    test("Logging configuration compiles", () => {
        const client = new PayrocClient({
            apiKey,
            logging: {
                level: logging.LogLevel.Debug,
                logger: new logging.ConsoleLogger(),
                silent: false,
            }
        });

        expect(client).toBeDefined();
    });

    test("Custom logger interface compiles", () => {
        const customLogger: logging.ILogger = {
            debug: (msg, ...args) => console.debug(msg, ...args),
            info: (msg, ...args) => console.info(msg, ...args),
            warn: (msg, ...args) => console.warn(msg, ...args),
            error: (msg, ...args) => console.error(msg, ...args),
        };

        const client = new PayrocClient({
            apiKey,
            logging: {
                logger: customLogger
            }
        });

        expect(client).toBeDefined();
    });
});
