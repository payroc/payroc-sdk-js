# Payroc API TypeScript SDK

The Payroc API TypeScript SDK provides convenient access to the Payroc API from TypeScript and JavaScript.

## Contents

- [Payroc API TypeScript SDK](#payroc-api-typescript-sdk)
  - [Installation](#installation)
  - [Usage](#usage)
    - [API Key](#api-key)
    - [PayrocClient](#payrocclient)
      - [Advanced Usage with Custom Environment](#advanced-usage-with-custom-environment)
  - [Exception Handling](#exception-handling)
  - [Logging](#logging)
  - [Pagination](#pagination)
    - [Pagination Gotcha](#pagination-gotcha)
  - [Request Parameters](#request-parameters)
  - [Request and Response Types](#request-and-response-types)
  - [Polymorphic Types](#polymorphic-types)
    - [Creating Polymorphic Data](#creating-polymorphic-data)
    - [Handling Polymorphic Data](#handling-polymorphic-data)
  - [Advanced](#advanced)
    - [Additional Headers](#additional-headers)
    - [Additional Query String Parameters](#additional-query-string-parameters)
    - [Retries](#retries)
    - [Timeouts](#timeouts)
    - [Aborting Requests](#aborting-requests)
    - [Access Raw Response Data](#access-raw-response-data)
    - [Runtime Compatibility](#runtime-compatibility)
    - [Customizing Fetch Client](#customizing-fetch-client)
  - [Contributing](#contributing)
  - [References](#references)

## Installation

```sh
npm i -s payroc
```

## Usage

### API Key

You need to provide your API Key to the `PayrocClient` constructor. In this example we read it from an environment variable named `PAYROC_API_KEY`. In your own code you should consider security and compliance best practices, likely retrieving this value from a secure vault on demand.

### PayrocClient

Instantiate and use the client with the following:

```typescript
import { PayrocClient } from "payroc";

const apiKey = process.env.PAYROC_API_KEY;
if (!apiKey) {
    throw new Error("Payroc API Key not found");
}

const client = new PayrocClient({ apiKey });
```

Then you can access the various API endpoints through the `client` object. For example, to create a payment:

```typescript
await client.payments.create({
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
});

### Advanced Usage with Custom Environment

If you wish to use the SDK against a custom URL, such as a mock API server, you can provide a custom `PayrocEnvironment` to the `PayrocClient` constructor:

```typescript
import { PayrocClient, PayrocEnvironment } from "payroc";

const mockEnvironment: PayrocEnvironment = {
    api: "http://localhost:3000",
    identity: "http://localhost:3001"
};

const client = new PayrocClient({
    apiKey,
    environment: mockEnvironment
});
```

## Exception Handling

When the API returns a non-success status code (4xx or 5xx response), a subclass of the following error will be thrown.

```typescript
import { PayrocError } from "payroc";

try {
    const response = await client.payments.create(...);
} catch (err) {
    if (err instanceof PayrocError) {
        console.log(err.statusCode);
        console.log(err.message);
        console.log(err.body);
        console.log(err.rawResponse);
    }
}
```

## Logging

> [!WARNING]  
> Be careful when configuring your logging not to log the headers of outbound HTTP requests, lest you leak an API key or access token.

## Pagination

List endpoints are paginated. The SDK provides an async iterator so that you can simply loop over the items. Note the `await` before the `for`:

```typescript
import { PayrocClient } from "payroc";

const apiKey = process.env.PAYROC_API_KEY;
if (!apiKey) {
    throw new Error("Payroc API Key not found");
}

const client = new PayrocClient({ apiKey });

const pager = await client.payments.list({ processingTerminalId: "1234001" });

for await (const item of pager) {
    // do something with item
}
```

### Pagination Gotcha

Beware of iterating the items on a single page and thinking that they are all there are. In the following example, there are only 10 items of the available 100, because this is iterating the items on a single page:

```typescript
const pager = await client.payments.list({});

const ids: number[] = [];

for (const payment of pager.currentPage.items) {
    const id = payment.paymentId;
    ids.push(parseInt(id.slice(-2)));
}
```

This might be helpful when you only want to process the first few results, but to iterate all items, the `for await` approach is recommended.

You can also manually iterate page-by-page:

```typescript
let page = await client.payments.list({
    processingTerminalId: "1234001",
    limit: 10
});

while (page.hasNextPage()) {
    page = await page.getNextPage();
    // process page.items
}

// You can also access the underlying response
const response = page.response;
```

## Request Parameters

Sometimes you need to filter results, for example, retrieving results from a given date. Raw API calls might use query parameters. The SDK equivalent pattern is setting the values in the request object itself.

Examples of setting different query parameters via the request object:

```typescript
await client.payments.list({
    processingTerminalId: "1234001",
    dateFrom: "2024-07-01T15:30:00Z"
});
```

```typescript
await client.payments.list({
    processingTerminalId: "1234001",
    dateTo: "2024-07-03T15:30:00Z"
});
```

```typescript
await client.payments.list({
    processingTerminalId: "1234001",
    after: "8516"
});
```

```typescript
await client.payments.list({
    processingTerminalId: "1234001",
    before: "2571"
});
```

Inspect the type definition of your particular request object in your IDE to see what properties can be used for filtering.

## Request and Response Types

The SDK exports all request and response types as TypeScript interfaces. Simply import them with the following namespace:

```typescript
import { Payroc } from "payroc";

const request: Payroc.ListPaymentsRequest = {
    processingTerminalId: "1234001"
};
```

## Polymorphic Types

Our API makes frequent use of polymorphic data structures. This is when a value might be one of multiple types, and the type is determined at runtime. For example, a payment method can be one of several methods, such as `card`, `secureToken`, `digitalWallet`, or `singleUseToken`. The SDK uses TypeScript's discriminated unions (also known as tagged unions) to handle this.

### Creating Polymorphic Data

When creating polymorphic objects, you need to specify the `type` field as the discriminator. TypeScript will then enforce that you provide the correct properties for that type.

For example, creating different payment methods:

```typescript
import { Payroc } from "payroc";

// Card payment method
const cardPayment: Payroc.PaymentRequestPaymentMethod = {
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
const secureTokenPayment: Payroc.PaymentRequestPaymentMethod = {
    type: "secureToken",
    secureTokenId: "abc123xyz789"
};

// Digital wallet payment method
const digitalWalletPayment: Payroc.PaymentRequestPaymentMethod = {
    type: "digitalWallet",
    walletType: "applePay",
    encryptedPaymentData: "..."
};
```

TypeScript will provide autocomplete and type checking based on the `type` field you specify.

### Handling Polymorphic Data

When working with polymorphic data from API responses, you can use TypeScript's type narrowing to safely access type-specific properties. The `type` field acts as a discriminator that TypeScript uses to narrow the type.

#### Using if Statements

```typescript
const payment = await client.payments.retrieve("12345");

if (payment.paymentMethod.type === "card") {
    // TypeScript knows this is a card payment method
    console.log(`Card last 4: ${payment.paymentMethod.cardDetails?.last4}`);
    console.log(`Card brand: ${payment.paymentMethod.cardDetails?.brand}`);
} else if (payment.paymentMethod.type === "secureToken") {
    // TypeScript knows this is a secure token payment method
    console.log(`Token ID: ${payment.paymentMethod.secureTokenId}`);
} else if (payment.paymentMethod.type === "digitalWallet") {
    // TypeScript knows this is a digital wallet payment method
    console.log(`Wallet type: ${payment.paymentMethod.walletType}`);
}
```

#### Using Switch Statements

For more complex scenarios, a switch statement provides exhaustive type checking:

```typescript
const payment = await client.payments.retrieve("12345");

switch (payment.paymentMethod.type) {
    case "card":
        console.log(`Card payment: ${payment.paymentMethod.cardDetails?.last4}`);
        break;
    case "secureToken":
        console.log(`Token payment: ${payment.paymentMethod.secureTokenId}`);
        break;
    case "digitalWallet":
        console.log(`Wallet payment: ${payment.paymentMethod.walletType}`);
        break;
    case "singleUseToken":
        console.log(`Single-use token: ${payment.paymentMethod.token}`);
        break;
    default:
        // TypeScript will error here if you haven't handled all cases
        const _exhaustive: never = payment.paymentMethod;
        throw new Error(`Unhandled payment method type`);
}
```

#### Type Guards

You can also create reusable type guard functions:

```typescript
function isCardPayment(
    paymentMethod: Payroc.PaymentRequestPaymentMethod
): paymentMethod is Payroc.PaymentRequestPaymentMethod.Card {
    return paymentMethod.type === "card";
}

const payment = await client.payments.retrieve("12345");

if (isCardPayment(payment.paymentMethod)) {
    // TypeScript knows this is definitely a card payment
    console.log(payment.paymentMethod.cardDetails?.last4);
}
```

## Advanced

### Additional Headers

If you would like to send additional headers as part of the request, use the `headers` request option.

```typescript
const response = await client.payments.create(..., {
    headers: {
        'X-Custom-Header': 'custom value'
    }
});
```

### Additional Query String Parameters

If you would like to send additional query string parameters as part of the request, use the `queryParams` request option.

```typescript
const response = await client.payments.create(..., {
    queryParams: {
        'customQueryParamKey': 'custom query param value'
    }
});
```

### Retries

The SDK is instrumented with automatic retries with exponential backoff. A request will be retried as long as the request is deemed retryable and the number of retry attempts has not grown larger than the configured retry limit (default: 2).

A request is deemed retryable when any of the following HTTP status codes is returned:

- [408](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408) (Timeout)
- [429](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) (Too Many Requests)
- [5XX](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500) (Internal Server Errors)

Use the `maxRetries` request option to configure this behavior.

```typescript
const response = await client.payments.create(..., {
    maxRetries: 0 // override maxRetries at the request level
});
```

### Timeouts

The SDK defaults to a 60 second timeout. Use the `timeoutInSeconds` option to configure this behavior.

```typescript
const response = await client.payments.create(..., {
    timeoutInSeconds: 30 // override timeout to 30s
});
```

### Aborting Requests

The SDK allows users to abort requests at any point by passing in an abort signal.

```typescript
const controller = new AbortController();
const response = await client.payments.create(..., {
    abortSignal: controller.signal
});
controller.abort(); // aborts the request
```

### Access Raw Response Data

The SDK provides access to raw response data, including headers, through the `.withRawResponse()` method. The `.withRawResponse()` method returns a promise that results to an object with a `data` and a `rawResponse` property.

```typescript
const { data, rawResponse } = await client.payments.create(...).withRawResponse();

console.log(data);
console.log(rawResponse.headers['X-My-Header']);
```

### Logging

The SDK supports logging. You can configure the logger by passing in a `logging` object to the client options.

```typescript
import { PayrocClient, logging } from "payroc";

const apiKey = process.env.PAYROC_API_KEY;
if (!apiKey) {
    throw new Error("Payroc API Key not found");
}

const client = new PayrocClient({
    apiKey,
    logging: {
        level: logging.LogLevel.Debug, // defaults to logging.LogLevel.Info
        logger: new logging.ConsoleLogger(), // defaults to ConsoleLogger
        silent: false, // defaults to true, set to false to enable logging
    }
});
```

The `logging` object can have the following properties:
- `level`: The log level to use. Defaults to `logging.LogLevel.Info`.
- `logger`: The logger to use. Defaults to a `logging.ConsoleLogger`.
- `silent`: Whether to silence the logger. Defaults to `true`.

The `level` property can be one of the following values:
- `logging.LogLevel.Debug`
- `logging.LogLevel.Info`
- `logging.LogLevel.Warn`
- `logging.LogLevel.Error`

To provide a custom logger, you can pass in an object that implements the `logging.ILogger` interface.

<details>
<summary>Custom logger examples</summary>

Here's an example using the popular `winston` logging library.
```ts
import winston from 'winston';

const winstonLogger = winston.createLogger({...});

const logger: logging.ILogger = {
    debug: (msg, ...args) => winstonLogger.debug(msg, ...args),
    info: (msg, ...args) => winstonLogger.info(msg, ...args),
    warn: (msg, ...args) => winstonLogger.warn(msg, ...args),
    error: (msg, ...args) => winstonLogger.error(msg, ...args),
};
```

Here's an example using the popular `pino` logging library.

```ts
import pino from 'pino';

const pinoLogger = pino({...});

const logger: logging.ILogger = {
  debug: (msg, ...args) => pinoLogger.debug(args, msg),
  info: (msg, ...args) => pinoLogger.info(args, msg),
  warn: (msg, ...args) => pinoLogger.warn(args, msg),
  error: (msg, ...args) => pinoLogger.error(args, msg),
};
```
</details>

### Runtime Compatibility

The SDK works in the following runtimes:

- Node.js 18+
- Vercel
- Cloudflare Workers
- Deno v1.25+
- Bun 1.0+
- React Native

### Customizing Fetch Client

The SDK provides a way for you to customize the underlying HTTP client / Fetch function. If you're running in an unsupported environment, this provides a way for you to break glass and ensure the SDK works.

```typescript
import { PayrocClient } from "payroc";

const apiKey = process.env.PAYROC_API_KEY;
if (!apiKey) {
    throw new Error("Payroc API Key not found");
}

const client = new PayrocClient({
    apiKey,
    fetcher: // provide your implementation here
});
```

## Contributing

While we value open-source contributions to this SDK, this library is generated programmatically. Additions made directly to this library would have to be moved over to our generation code, otherwise they would be overwritten upon the next generated release. Feel free to open a PR as a proof of concept, but know that we will not be able to merge it as-is. We suggest opening an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!

For details on setting up your development environment, running tests, and code quality standards, please see [CONTRIBUTING.md](./CONTRIBUTING.md).

## References

The Payroc API SDK is generated via [Fern](https://www.buildwithfern.com/).

[![fern shield](https://img.shields.io/badge/%F0%9F%8C%BF-Built%20with%20Fern-brightgreen)](https://buildwithfern.com?utm_source=github&utm_medium=github&utm_campaign=readme&utm_source=https%3A%2F%2Fgithub.com%2Fpayroc%2Fpapi-sdk-js)
