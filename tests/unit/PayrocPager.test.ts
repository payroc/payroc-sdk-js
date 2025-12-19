import { describe, expect, it, vi } from "vitest";
import { createPayrocPager } from "../../src/core/pagination/PayrocPager";
import type { Fetcher } from "../../src/core/fetcher/Fetcher";
import type { APIResponse } from "../../src/core/fetcher/APIResponse";
import type { RawResponse } from "../../src/core/fetcher/RawResponse";
import { createLogger } from "../../src/core/logging";
import type { AuthProvider } from "../../src/core/auth/AuthProvider";
import type { AuthRequest } from "../../src/core/auth/AuthRequest";

interface TestItem {
    id: string;
    name: string;
}

interface TestResponse {
    data?: TestItem[];
    links?: Array<{ rel: string; href: string }>;
    count?: number;
}

function createMockRawResponse(status: number = 200): RawResponse {
    return {
        headers: new Headers(),
        redirected: false,
        status,
        statusText: status === 200 ? "OK" : "Error",
        type: "basic",
        url: "https://api.example.com/items",
    };
}
const clientAndRequestOptions = {
    clientOptions: {
        apiKey: "test-api-key",
        logging: createLogger(),
    },
    requestOptions: {},
} as const;

describe("PayrocPager", () => {
    describe("createPayrocPager", () => {
        it("should create a pager with data from response", async () => {
            const mockItems: TestItem[] = [
                { id: "1", name: "Item 1" },
                { id: "2", name: "Item 2" },
            ];

            const mockResponse: TestResponse = {
                data: mockItems,
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: mockResponse,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
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

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: mockResponse,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            expect(pager.data).toEqual([]);
            expect(pager.hasNextPage()).toBe(false);
            expect(pager.hasPreviousPage()).toBe(false);
        });

        it("should throw error when initial request fails", async () => {
            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: false,
                    error: {
                        reason: "status-code",
                        statusCode: 404,
                        body: {},
                    },
                    rawResponse: createMockRawResponse(404),
                });

            await expect(
                createPayrocPager<TestItem, TestResponse>({
                    sendRequest,
                    initialHttpRequest: {
                        url: "https://api.example.com/items",
                        method: "GET",
                    },
                    ...clientAndRequestOptions,
                }),
            ).rejects.toThrow("Failed to fetch initial page");
        });
    });

    describe("hasNextPage / hasPreviousPage", () => {
        it("should correctly identify next page availability", async () => {
            const mockResponse: TestResponse = {
                data: [{ id: "1", name: "Item 1" }],
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: mockResponse,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            expect(pager.hasNextPage()).toBe(true);
        });

        it("should correctly identify previous page availability", async () => {
            const mockResponse: TestResponse = {
                data: [{ id: "1", name: "Item 1" }],
                links: [{ rel: "previous", href: "https://api.example.com/items?page=1" }],
            };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: mockResponse,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items?page=2",
                    method: "GET",
                },
                ...clientAndRequestOptions,
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
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValueOnce({
                    ok: true,
                    body: page1Response,
                    rawResponse: createMockRawResponse(),
                })
                .mockResolvedValueOnce({
                    ok: true,
                    body: page2Response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
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

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: mockResponse,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            await expect(pager.getNextPage()).rejects.toThrow("No next page available");
        });

        it("should throw error when next page request fails", async () => {
            const page1Response: TestResponse = {
                data: [{ id: "1", name: "Item 1" }],
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValueOnce({
                    ok: true,
                    body: page1Response,
                    rawResponse: createMockRawResponse(),
                })
                .mockResolvedValueOnce({
                    ok: false,
                    error: {
                        reason: "status-code",
                        statusCode: 500,
                        body: {},
                    },
                    rawResponse: createMockRawResponse(500),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            await expect(pager.getNextPage()).rejects.toThrow("Failed to fetch page");
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
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValueOnce({
                    ok: true,
                    body: page2Response,
                    rawResponse: createMockRawResponse(),
                })
                .mockResolvedValueOnce({
                    ok: true,
                    body: page1Response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items?page=2",
                    method: "GET",
                },
                ...clientAndRequestOptions,
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

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: mockResponse,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
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
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValueOnce({
                    ok: true,
                    body: {
                        data: page1Items,
                        links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
                    },
                    rawResponse: createMockRawResponse(),
                })
                .mockResolvedValueOnce({
                    ok: true,
                    body: {
                        data: page2Items,
                        links: [{ rel: "next", href: "https://api.example.com/items?page=3" }],
                    },
                    rawResponse: createMockRawResponse(),
                })
                .mockResolvedValueOnce({
                    ok: true,
                    body: { data: page3Items, links: [] },
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
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
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValueOnce({
                    ok: true,
                    body: {
                        data: page1Items,
                        links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
                    },
                    rawResponse: createMockRawResponse(),
                })
                .mockResolvedValueOnce({
                    ok: true,
                    body: { data: page2Items, links: [] },
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
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
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValueOnce({
                    ok: true,
                    body: {
                        data: page2Items,
                        links: [{ rel: "previous", href: "https://api.example.com/items?page=1" }],
                    },
                    rawResponse: createMockRawResponse(),
                })
                .mockResolvedValueOnce({
                    ok: true,
                    body: { data: page1Items, links: [] },
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items?page=2",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            const pages: TestItem[][] = [];
            for await (const page of pager.getPreviousPages()) {
                pages.push(page);
            }

            expect(pages).toEqual([page1Items]);
        });
    });

    describe("link parsing", () => {
        it("should parse response with next and previous links", async () => {
            const items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const response = {
                data: items,
                links: [
                    { rel: "next", href: "https://api.example.com/items?page=3" },
                    { rel: "previous", href: "https://api.example.com/items?page=1" },
                ],
            };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items?page=2",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            expect(pager.data).toEqual(items);
            expect(pager.hasNextPage()).toBe(true);
            expect(pager.hasPreviousPage()).toBe(true);
        });

        it("should handle response with no links", async () => {
            const items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const response = { data: items, links: [] };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            expect(pager.data).toEqual(items);
            expect(pager.hasNextPage()).toBe(false);
            expect(pager.hasPreviousPage()).toBe(false);
        });

        it("should handle response with no data field", async () => {
            const response = { links: [] };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            expect(pager.data).toEqual([]);
            expect(pager.hasNextPage()).toBe(false);
            expect(pager.hasPreviousPage()).toBe(false);
        });

        it("should handle response with undefined links field", async () => {
            const items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const response = { data: items };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            expect(pager.data).toEqual(items);
            expect(pager.hasNextPage()).toBe(false);
            expect(pager.hasPreviousPage()).toBe(false);
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

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            expect(pager.data).toEqual(items);
            expect(pager.hasNextPage()).toBe(false);
            expect(pager.hasPreviousPage()).toBe(false);
        });

        it("should handle links with only next rel", async () => {
            const items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const response = {
                data: items,
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items?page=1",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            expect(pager.data).toEqual(items);
            expect(pager.hasNextPage()).toBe(true);
            expect(pager.hasPreviousPage()).toBe(false);
        });

        it("should handle links with only previous rel", async () => {
            const items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const response = {
                data: items,
                links: [{ rel: "previous", href: "https://api.example.com/items?page=1" }],
            };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items?page=2",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            expect(pager.data).toEqual(items);
            expect(pager.hasNextPage()).toBe(false);
            expect(pager.hasPreviousPage()).toBe(true);
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

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items?page=2",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            expect(pager.data).toEqual(items);
            expect(pager.hasNextPage()).toBe(false);
            expect(pager.hasPreviousPage()).toBe(false);
        });
    });

    describe("getCurrentPage", () => {
        it("should return current page data", async () => {
            const items: TestItem[] = [
                { id: "1", name: "Item 1" },
                { id: "2", name: "Item 2" },
            ];
            const response = { data: items, links: [] };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValue({
                    ok: true,
                    body: response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                ...clientAndRequestOptions,
            });

            expect(pager.getCurrentPage()).toEqual(items);
            expect(pager.getCurrentPage()).toBe(pager.data);
        });
    });

    describe("authorization header refresh", () => {
        it("should refresh authorization header on pagination requests", async () => {
            const page1Items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const page2Items: TestItem[] = [{ id: "2", name: "Item 2" }];

            const page1Response: TestResponse = {
                data: page1Items,
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const page2Response: TestResponse = {
                data: page2Items,
                links: [],
            };

            let callCount = 0;
            const mockAuthProvider: AuthProvider = {
                getAuthRequest: vi.fn(async (): Promise<AuthRequest> => {
                    callCount++;
                    return {
                        headers: {
                            Authorization: `Bearer token-${callCount}`,
                        },
                    };
                }),
            };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValueOnce({
                    ok: true,
                    body: page1Response,
                    rawResponse: createMockRawResponse(),
                })
                .mockResolvedValueOnce({
                    ok: true,
                    body: page2Response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                },
                clientOptions: {
                    ...clientAndRequestOptions.clientOptions,
                    authProvider: mockAuthProvider,
                },
                requestOptions: clientAndRequestOptions.requestOptions,
            });

            expect(pager.data).toEqual(page1Items);

            await pager.getNextPage();

            expect(sendRequest).toHaveBeenCalledTimes(2);
            expect(mockAuthProvider.getAuthRequest).toHaveBeenCalledTimes(1);

            const secondCallArgs = sendRequest.mock.calls[1][0];
            // Note: mergeHeaders normalizes keys to lowercase
            expect(secondCallArgs.headers?.authorization).toBe("Bearer token-1");
        });

        it("should preserve static headers when no auth provider is configured", async () => {
            const page1Items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const page2Items: TestItem[] = [{ id: "2", name: "Item 2" }];

            const page1Response: TestResponse = {
                data: page1Items,
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const page2Response: TestResponse = {
                data: page2Items,
                links: [],
            };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValueOnce({
                    ok: true,
                    body: page1Response,
                    rawResponse: createMockRawResponse(),
                })
                .mockResolvedValueOnce({
                    ok: true,
                    body: page2Response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                    headers: {
                        Authorization: "Bearer static-token",
                    },
                },
                ...clientAndRequestOptions,
            });

            await pager.getNextPage();

            const secondCallArgs = sendRequest.mock.calls[1][0];
            expect(secondCallArgs.headers?.Authorization).toBe("Bearer static-token");
        });
    });

    describe("query parameter handling", () => {
        it("should clear query parameters when following pagination links", async () => {
            const page1Items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const page2Items: TestItem[] = [{ id: "2", name: "Item 2" }];

            const page1Response: TestResponse = {
                data: page1Items,
                links: [{ rel: "next", href: "https://api.example.com/items?page=2&limit=10" }],
            };

            const page2Response: TestResponse = {
                data: page2Items,
                links: [],
            };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValueOnce({
                    ok: true,
                    body: page1Response,
                    rawResponse: createMockRawResponse(),
                })
                .mockResolvedValueOnce({
                    ok: true,
                    body: page2Response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "GET",
                    queryParameters: { filter: "active", sort: "name" },
                },
                ...clientAndRequestOptions,
            });

            expect(pager.data).toEqual(page1Items);

            await pager.getNextPage();

            const secondCallArgs = sendRequest.mock.calls[1][0];
            expect(secondCallArgs.url).toBe("https://api.example.com/items?page=2&limit=10");
            expect(secondCallArgs.queryParameters).toBeUndefined();
        });

        it("should preserve other request properties when following links", async () => {
            const page1Items: TestItem[] = [{ id: "1", name: "Item 1" }];
            const page2Items: TestItem[] = [{ id: "2", name: "Item 2" }];

            const page1Response: TestResponse = {
                data: page1Items,
                links: [{ rel: "next", href: "https://api.example.com/items?page=2" }],
            };

            const page2Response: TestResponse = {
                data: page2Items,
                links: [],
            };

            const sendRequest = vi
                .fn<(request: Fetcher.Args) => Promise<APIResponse<TestResponse, Fetcher.Error>>>()
                .mockResolvedValueOnce({
                    ok: true,
                    body: page1Response,
                    rawResponse: createMockRawResponse(),
                })
                .mockResolvedValueOnce({
                    ok: true,
                    body: page2Response,
                    rawResponse: createMockRawResponse(),
                });

            const pager = await createPayrocPager<TestItem, TestResponse>({
                sendRequest,
                initialHttpRequest: {
                    url: "https://api.example.com/items",
                    method: "POST",
                    headers: { "X-Custom-Header": "value" },
                    timeoutMs: 5000,
                },
                ...clientAndRequestOptions,
            });

            await pager.getNextPage();

            const secondCallArgs = sendRequest.mock.calls[1][0];
            expect(secondCallArgs.method).toBe("POST");
            expect(secondCallArgs.headers?.["X-Custom-Header"]).toBe("value");
            expect(secondCallArgs.timeoutMs).toBe(5000);
        });
    });
});
