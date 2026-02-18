import { describe, test, expect } from "vitest";
import { Payroc } from "../../../../src/index.js";
import { GlobalFixture } from "../../setup.js";
import { randomUUID } from "crypto";

describe("CardPayments.Refunds.Create", () => {
    test("SmokeTest", { timeout: 30000 }, async () => {
        const client = GlobalFixture.Payments;
        
        const createRefundRequest: Payroc.cardPayments.UnreferencedRefund = {
            "Idempotency-Key": randomUUID(),
            channel: "pos",
            processingTerminalId: GlobalFixture.TerminalIdAvs,
            order: {
                amount: 4999,
                currency: "USD",
                orderId: "OrderRef6543",
                description: "Large Pepperoni Pizza"
            },
            refundMethod: {
                type: "card",
                cardDetails: {
                    entryMethod: "keyed",
                    keyedData: {
                        dataFormat: "plainText",
                        device: {
                            model: "paxA920",
                            serialNumber: "1850010868"
                        },
                        cardNumber: "4539858876047062",
                        expiryDate: "1230"
                    }
                }
            }
        };

        const createdRefundResponse = await client.cardPayments.refunds.createUnreferencedRefund(
            createRefundRequest
        );

        expect(createdRefundResponse.transactionResult.status).toBe("ready");
    });
});
