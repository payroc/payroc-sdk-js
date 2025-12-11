import { describe, expect, it, vi } from "vitest";
import { PayrocPager } from "../../src/core/pagination/PayrocPager";

interface TestItem {
    id: string;
    name: string;
}

interface TestRequest {
    url: string;
    limit?: number;
}

interface TestResponse {
    data?: TestItem[];
    links?: Array<{ rel: string; href: string }>;
    count?: number;
}

describe("PayrocPager", () => {
    describe("create", () => {
        it("should create a pager with data from response", async () => {
            const mockItems: TestItem[] = [
                { id: "1", name: "Item 1" },
                { id: "2", name: "Item 2" },
            ];

            const mockResponse: TestResponse = {
                data: mockItems,
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const sendRequest = vi.fn().mockReturnValue({
                withRawResponse: () =>
                    Promise.resolve({
                        data: mockResponse,
                        rawResponse: { headers: new Headers(), status: 200 },
                    }),
            });

            const pager = await PayrocPager.create<TestItem, TestRequest, TestResponse>({
                sendRequest,
                initialRequest: { url: "https://api.example.com/items" },
            });

            expect(pager.data).toEqual(mockItems);
            expect(pager.hasNextPage()).toBe(true);
            expect(pager.hasPreviousPage()).toBe(false);
            expect(pager.response).toEqual(mockResponse);
        });

        it("should create a pager with empty data when response has no data field", async () => {
            const mockResponse: TestResponse = {
                links: [],
                count: 0,
            };

            const sendRequest = vi.fn().mockReturnValue({
                withRawResponse: () =>
                    Promise.resolve({
                        data: mockResponse,
                        rawResponse: { headers: new Headers(), status: 200 },
                    }),
            });

            const pager = await PayrocPager.create<TestItem, TestRequest, TestResponse>({
                sendRequest,
                initialRequest: { url: "https://api.example.com/items" },
            });

            expect(pager.data).toEqual([]);
            expect(pager.hasNextPage()).toBe(false);
            expect(pager.hasPreviousPage()).toBe(false);
        });

        it("should use custom parser when provided", async () => {
            const mockItems: TestItem[] = [{ id: "1", name: "Item 1" }];
            const mockResponse: TestResponse = { data: mockItems };

            const sendRequest = vi.fn().mockReturnValue({
                withRawResponse: () =>
                    Promise.resolve({
                        data: mockResponse,
                        rawResponse: { headers: new Headers(), status: 200 },
                    }),
            });

            const customParser = vi.fn().mockResolvedValue({
                items: mockItems,
                hasNextPage: true,
                hasPreviousPage: false,
                nextRequest: { url: "https://api.example.com/items?page=2" },
            });

            const pager = await PayrocPager.create<TestItem, TestRequest, TestResponse>({
                sendRequest,
                initialRequest: { url: "https://api.example.com/items" },
                parse: customParser,
            });

            expect(customParser).toHaveBeenCalledOnce();
            expect(pager.hasNextPage()).toBe(true);
        });
    });

    describe("hasNextPage / hasPreviousPage", () => {
        it("should correctly identify next page availability", async () => {
            const mockResponse: TestResponse = {
                data: [{ id: "1", name: "Item 1" }],
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const sendRequest = vi.fn().mockReturnValue({
                withRawResponse: () =>
                    Promise.resolve({
                        data: mockResponse,
                        rawResponse: { headers: new Headers(), status: 200 },
                    }),
            });

            const pager = await PayrocPager.create<TestItem, TestRequest, TestResponse>({
                sendRequest,
                initialRequest: { url: "https://api.example.com/items" },
            });

            expect(pager.hasNextPage()).toBe(true);
        });

        it("should correctly identify previous page availability", async () => {
            const mockResponse: TestResponse = {
                data: [{ id: "1", name: "Item 1" }],
                links: [{ rel: "previous", href: "https://api.example.com/items?page=1" }],
            };

            const sendRequest = vi.fn().mockReturnValue({
                withRawResponse: () =>
                    Promise.resolve({
                        data: mockResponse,
                        rawResponse: { headers: new Headers(), status: 200 },
                    }),
            });

            const pager = await PayrocPager.create<TestItem, TestRequest, TestResponse>({
                sendRequest,
                initialRequest: { url: "https://api.example.com/items" },
            });

            expect(pager.hasPreviousPage()).toBe(true);
        });
    });

    describe("getNextPage", () => {
        it("should fetch and return next page", async () => {
            const page1Items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const page2Items: TestItem[] = [{ id: "2", name: "Item 2" }];

            const page1Response: TestResponse = {
                data: page1Items,
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const page2Response: TestResponse = {
                data: page2Items,
                links: [{ rel: "previous", href: "https://api.example.com/items?page=1" }],
            };

            const sendRequest = vi
                .fn()
                .mockReturnValueOnce({
                    withRawResponse: () =>
                        Promise.resolve({
                            data: page1Response,
                            rawResponse: { headers: new Headers(), status: 200 },
                        }),
                })
                .mockReturnValueOnce({
                    withRawResponse: () =>
                        Promise.resolve({
                            data: page2Response,
                            rawResponse: { headers: new Headers(), status: 200 },
                        }),
                });

            const pager = await PayrocPager.create<TestItem, TestRequest, TestResponse>({
                sendRequest,
                initialRequest: { url: "https://api.example.com/items" },
            });

            expect(pager.data).toEqual(page1Items);
            expect(pager.hasNextPage()).toBe(true);

            await pager.getNextPage();

            expect(pager.data).toEqual(page2Items);
            expect(pager.hasNextPage()).toBe(false);
            expect(pager.hasPreviousPage()).toBe(true);
        });

        it("should throw error when no next page available", async () => {
            const mockResponse: TestResponse = {
                data: [{ id: "1", name: "Item 1" }],
                links: [],
            };

            const sendRequest = vi.fn().mockReturnValue({
                withRawResponse: () =>
                    Promise.resolve({
                        data: mockResponse,
                        rawResponse: { headers: new Headers(), status: 200 },
                    }),
            });

            const pager = await PayrocPager.create<TestItem, TestRequest, TestResponse>({
                sendRequest,
                initialRequest: { url: "https://api.example.com/items" },
            });

            await expect(pager.getNextPage()).rejects.toThrow("No next page available");
        });
    });

    describe("getPreviousPage", () => {
        it("should fetch and return previous page", async () => {
            const page2Items: TestItem[] = [{ id: "2", name: "Item 2" }];
            const page1Items: TestItem[] = [{ id: "1", name: "Item 1" }];

            const page2Response: TestResponse = {
                data: page2Items,
                links: [{ rel: "previous", href: "https://api.example.com/items?page=1" }],
            };

            const page1Response: TestResponse = {
                data: page1Items,
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const sendRequest = vi
                .fn()
                .mockReturnValueOnce({
                    withRawResponse: () =>
                        Promise.resolve({
                            data: page2Response,
                            rawResponse: { headers: new Headers(), status: 200 },
                        }),
                })
                .mockReturnValueOnce({
                    withRawResponse: () =>
                        Promise.resolve({
                            data: page1Response,
                            rawResponse: { headers: new Headers(), status: 200 },
                        }),
                });

            const pager = await PayrocPager.create<TestItem, TestRequest, TestResponse>({
                sendRequest,
                initialRequest: { url: "https://api.example.com/items?page=2" },
            });

            expect(pager.data).toEqual(page2Items);
            expect(pager.hasPreviousPage()).toBe(true);

            await pager.getPreviousPage();

            expect(pager.data).toEqual(page1Items);
            expect(pager.hasNextPage()).toBe(true);
            expect(pager.hasPreviousPage()).toBe(false);
        });

        it("should throw error when no previous page available", async () => {
            const mockResponse: TestResponse = {
                data: [{ id: "1", name: "Item 1" }],
                links: [],
            };

            const sendRequest = vi.fn().mockReturnValue({
                withRawResponse: () =>
                    Promise.resolve({
                        data: mockResponse,
                        rawResponse: { headers: new Headers(), status: 200 },
                    }),
            });

            const pager = await PayrocPager.create<TestItem, TestRequest, TestResponse>({
                sendRequest,
                initialRequest: { url: "https://api.example.com/items" },
            });

            await expect(pager.getPreviousPage()).rejects.toThrow("No previous page available");
        });
    });

    describe("async iteration", () => {
        it("should iterate through all pages automatically", async () => {
            const page1Items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const page2Items: TestItem[] = [{ id: "2", name: "Item 2" }];
            const page3Items: TestItem[] = [{ id: "3", name: "Item 3" }];

            const sendRequest = vi
                .fn()
                .mockReturnValueOnce({
                    withRawResponse: () =>
                        Promise.resolve({
                            data: {
                                data: page1Items,
                                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
                            },
                            rawResponse: { headers: new Headers(), status: 200 },
                        }),
                })
                .mockReturnValueOnce({
                    withRawResponse: () =>
                        Promise.resolve({
                            data: {
                                data: page2Items,
                                links: [{ rel: "next", href: "https://api.example.com/items?page=3" }],
                            },
                            rawResponse: { headers: new Headers(), status: 200 },
                        }),
                })
                .mockReturnValueOnce({
                    withRawResponse: () =>
                        Promise.resolve({
                            data: { data: page3Items, links: [] },
                            rawResponse: { headers: new Headers(), status: 200 },
                        }),
                });

            const pager = await PayrocPager.create<TestItem, TestRequest, TestResponse>({
                sendRequest,
                initialRequest: { url: "https://api.example.com/items" },
            });

            const allItems: TestItem[] = [];
            for await (const item of pager) {
                allItems.push(item);
            }

            expect(allItems).toEqual([...page1Items, ...page2Items, ...page3Items]);
            expect(sendRequest).toHaveBeenCalledTimes(3);
        });
    });

    describe("getNextPages", () => {
        it("should yield all next pages", async () => {
            const page1Items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const page2Items: TestItem[] = [{ id: "2", name: "Item 2" }];

            const sendRequest = vi
                .fn()
                .mockReturnValueOnce({
                    withRawResponse: () =>
                        Promise.resolve({
                            data: {
                                data: page1Items,
                                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
                            },
                            rawResponse: { headers: new Headers(), status: 200 },
                        }),
                })
                .mockReturnValueOnce({
                    withRawResponse: () =>
                        Promise.resolve({
                            data: { data: page2Items, links: [] },
                            rawResponse: { headers: new Headers(), status: 200 },
                        }),
                });

            const pager = await PayrocPager.create<TestItem, TestRequest, TestResponse>({
                sendRequest,
                initialRequest: { url: "https://api.example.com/items" },
            });

            const pages: TestItem[][] = [];
            for await (const page of pager.getNextPages()) {
                pages.push(page);
            }

            expect(pages).toEqual([page2Items]);
        });
    });

    describe("getPreviousPages", () => {
        it("should yield all previous pages", async () => {
            const page2Items: TestItem[] = [{ id: "2", name: "Item 2" }];
            const page1Items: TestItem[] = [{ id: "1", name: "Item 1" }];

            const sendRequest = vi
                .fn()
                .mockReturnValueOnce({
                    withRawResponse: () =>
                        Promise.resolve({
                            data: {
                                data: page2Items,
                                links: [{ rel: "previous", href: "https://api.example.com/items?page=1" }],
                            },
                            rawResponse: { headers: new Headers(), status: 200 },
                        }),
                })
                .mockReturnValueOnce({
                    withRawResponse: () =>
                        Promise.resolve({
                            data: { data: page1Items, links: [] },
                            rawResponse: { headers: new Headers(), status: 200 },
                        }),
                });

            const pager = await PayrocPager.create<TestItem, TestRequest, TestResponse>({
                sendRequest,
                initialRequest: { url: "https://api.example.com/items?page=2" },
            });

            const pages: TestItem[][] = [];
            for await (const page of pager.getPreviousPages()) {
                pages.push(page);
            }

            expect(pages).toEqual([page1Items]);
        });
    });

    describe("parsePayrocResponse", () => {
        it("should parse response with next and previous links", async () => {
            const items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const response = {
                data: items,
                links: [
                    { rel: "next", href: "https://api.example.com/items?page=3" },
                    { rel: "previous", href: "https://api.example.com/items?page=1" },
                ],
            };

            const result = await PayrocPager.parsePayrocResponse<TestItem, TestRequest>(
                { url: "https://api.example.com/items?page=2" },
                response,
            );

            expect(result.items).toEqual(items);
            expect(result.hasNextPage).toBe(true);
            expect(result.hasPreviousPage).toBe(true);
            expect(result.nextRequest).toEqual({ url: "https://api.example.com/items?page=3" });
            expect(result.previousRequest).toEqual({ url: "https://api.example.com/items?page=1" });
        });

        it("should handle response with no links", async () => {
            const items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const response = { data: items, links: [] };

            const result = await PayrocPager.parsePayrocResponse<TestItem, TestRequest>(
                { url: "https://api.example.com/items" },
                response,
            );

            expect(result.items).toEqual(items);
            expect(result.hasNextPage).toBe(false);
            expect(result.hasPreviousPage).toBe(false);
            expect(result.nextRequest).toBeUndefined();
            expect(result.previousRequest).toBeUndefined();
        });

        it("should handle response with no data field", async () => {
            const response = { links: [] };

            const result = await PayrocPager.parsePayrocResponse<TestItem, TestRequest>(
                { url: "https://api.example.com/items" },
                response,
            );

            expect(result.items).toEqual([]);
            expect(result.hasNextPage).toBe(false);
            expect(result.hasPreviousPage).toBe(false);
        });

        it("should handle response with undefined links field", async () => {
            const items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const response = { data: items };

            const result = await PayrocPager.parsePayrocResponse<TestItem, TestRequest>(
                { url: "https://api.example.com/items" },
                response,
            );

            expect(result.items).toEqual(items);
            expect(result.hasNextPage).toBe(false);
            expect(result.hasPreviousPage).toBe(false);
            expect(result.nextRequest).toBeUndefined();
            expect(result.previousRequest).toBeUndefined();
        });

        it("should treat empty string hrefs as invalid", async () => {
            const items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const response = {
                data: items,
                links: [
                    { rel: "next", href: "" },
                    { rel: "previous", href: "" },
                ],
            };

            const result = await PayrocPager.parsePayrocResponse<TestItem, TestRequest>(
                { url: "https://api.example.com/items" },
                response,
            );

            expect(result.items).toEqual(items);
            expect(result.hasNextPage).toBe(false);
            expect(result.hasPreviousPage).toBe(false);
            expect(result.nextRequest).toBeUndefined();
            expect(result.previousRequest).toBeUndefined();
        });

        it("should handle links with only next rel", async () => {
            const items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const response = {
                data: items,
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const result = await PayrocPager.parsePayrocResponse<TestItem, TestRequest>(
                { url: "https://api.example.com/items?page=1" },
                response,
            );

            expect(result.items).toEqual(items);
            expect(result.hasNextPage).toBe(true);
            expect(result.hasPreviousPage).toBe(false);
            expect(result.nextRequest).toEqual({ url: "https://api.example.com/items?page=2" });
            expect(result.previousRequest).toBeUndefined();
        });

        it("should handle links with only previous rel", async () => {
            const items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const response = {
                data: items,
                links: [{ rel: "previous", href: "https://api.example.com/items?page=1" }],
            };

            const result = await PayrocPager.parsePayrocResponse<TestItem, TestRequest>(
                { url: "https://api.example.com/items?page=2" },
                response,
            );

            expect(result.items).toEqual(items);
            expect(result.hasNextPage).toBe(false);
            expect(result.hasPreviousPage).toBe(true);
            expect(result.nextRequest).toBeUndefined();
            expect(result.previousRequest).toEqual({ url: "https://api.example.com/items?page=1" });
        });

        it("should ignore unknown link relations", async () => {
            const items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const response = {
                data: items,
                links: [
                    { rel: "self", href: "https://api.example.com/items?page=2" },
                    { rel: "first", href: "https://api.example.com/items?page=1" },
                    { rel: "last", href: "https://api.example.com/items?page=10" },
                ],
            };

            const result = await PayrocPager.parsePayrocResponse<TestItem, TestRequest>(
                { url: "https://api.example.com/items?page=2" },
                response,
            );

            expect(result.items).toEqual(items);
            expect(result.hasNextPage).toBe(false);
            expect(result.hasPreviousPage).toBe(false);
            expect(result.nextRequest).toBeUndefined();
            expect(result.previousRequest).toBeUndefined();
        });

        it("should preserve other request properties when cloning", async () => {
            interface ExtendedRequest extends TestRequest {
                headers?: Record<string, string>;
                limit?: number;
            }

            const response = {
                data: [{ id: "1", name: "Item 1" }],
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const result = await PayrocPager.parsePayrocResponse<TestItem, ExtendedRequest>(
                {
                    url: "https://api.example.com/items?page=1",
                    headers: { Authorization: "Bearer token" },
                    limit: 10,
                },
                response,
            );

            expect(result.nextRequest).toEqual({
                url: "https://api.example.com/items?page=2",
                headers: { Authorization: "Bearer token" },
                limit: 10,
            });
        });
    });
});
