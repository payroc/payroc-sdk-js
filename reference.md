# Reference
## Payment links
<details><summary><code>client.paymentLinks.<a href="/src/api/resources/paymentLinks/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.PaymentLinkPaginatedListDataItem, Payroc.PaymentLinkPaginatedList></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of payment links linked to a processing terminal.  

**Note:** If you want to view the details of a specific payment link and you have its paymentLinkId, use our [Retrieve Payment Link](https://docs.payroc.com/api/schema/payment-links/retrieve) method.  

Use query parameters to filter the list of results that we return, for example, to search for only active links or multi-use links.  

Our gateway returns the following information about each payment link in the list:  
- **type** - Indicates whether the link can be used only once or if it can be used multiple times.  
- **authType** - Indicates whether the transaction is a sale or a pre-authorization.  
- **paymentMethods** - Indicates the payment method that the merchant accepts.  
- **charge** - Indicates whether the merchant or the customer enters the amount for the transaction.  
- **status** - Indicates if the payment link is active.  

For each payment link, we also return a paymentLinkId, which you can use for follow-on actions. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.paymentLinks.list({
    processingTerminalId: "1234001",
    merchantReference: "LinkRef6543",
    linkType: "multiUse",
    chargeType: "preset",
    status: "active",
    recipientName: "Sarah Hazel Hopper",
    recipientEmail: "sarah.hopper@example.com",
    createdOn: "2024-07-02",
    expiresOn: "2024-08-02",
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.paymentLinks.list({
    processingTerminalId: "1234001",
    merchantReference: "LinkRef6543",
    linkType: "multiUse",
    chargeType: "preset",
    status: "active",
    recipientName: "Sarah Hazel Hopper",
    recipientEmail: "sarah.hopper@example.com",
    createdOn: "2024-07-02",
    expiresOn: "2024-08-02",
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.ListPaymentLinksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentLinksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.paymentLinks.<a href="/src/api/resources/paymentLinks/client/Client.ts">create</a>({ ...params }) -> Payroc.CreatePaymentLinksResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to create a payment link that a customer can use to make a payment for goods or services.  

The request includes the following settings:
- **type** - Indicates whether the link can be used only once or if it can be used multiple times.
- **authType** - Indicates whether the transaction is a sale or a pre-authorization.
- **paymentMethod** - Indicates the payment methods that the merchant accepts.
- **charge** - Indicates whether the merchant or the customer enters the amount for the transaction.  

If your request is successful, our gateway returns a paymentLinkId, which you can use to perform follow-on actions.  

**Note:** To share the payment link with a customer, use our [Share Payment Link](https://docs.payroc.com/api/schema/payment-links/sharing-events/share) method.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.paymentLinks.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    body: {
        type: "multiUse",
        merchantReference: "LinkRef6543",
        order: {
            charge: {
                type: "prompt",
                currency: "AED"
            }
        },
        authType: "sale",
        paymentMethods: ["card"]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.CreatePaymentLinksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentLinksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.paymentLinks.<a href="/src/api/resources/paymentLinks/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.RetrievePaymentLinksResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a payment link.  

To retrieve a payment link, you need its paymentLinkId. Our gateway returned the paymentLinkId in the response of the [Create Payment Link](https://docs.payroc.com/api/schema/payment-links/create) method.  

**Note:** If you don't have the paymentLinkId, use our [List Payment Links](https://docs.payroc.com/api/schema/payment-links/list) method to search for the payment link.  

Our gateway returns the following information about the payment link:  
- **type** - Indicates whether the link can be used only once or if it can be used multiple times.  
- **authType** - Indicates whether the transaction is a sale or a pre-authorization.  
- **paymentMethods** - Indicates the payment method that the merchant accepts.  
- **charge** - Indicates whether the merchant or the customer enters the amount for the transaction.
- **status** - Indicates if the payment link is active.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.paymentLinks.retrieve({
    paymentLinkId: "JZURRJBUPS"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.RetrievePaymentLinksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentLinksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.paymentLinks.<a href="/src/api/resources/paymentLinks/client/Client.ts">partiallyUpdate</a>({ ...params }) -> Payroc.PartiallyUpdatePaymentLinksResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to partially update a payment link. Structure your request to follow the [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902) standard.

To update a payment link, you need its paymentLinkId, which we sent you in the response of the [Create Payment Link](https://docs.payroc.com/api/schema/payment-links/create) method.  

**Note:** If you don't have the paymentLinkId, use our [List Payment Links](https://docs.payroc.com/api/schema/payment-links/list) method to search for the payment link.  

You can update the following properties of a multi-use link:
- **expiresOn parameter** - Expiration date of the link.
- **customLabels object** - Label for the payment button.
- **credentialOnFile object** - Settings for saving the customer's payment details.

You can update the following properties of a single-use link:
- **expiresOn parameter** - Expiration date of the link.
- **authType parameter** - Transaction type of the payment link.
- **amount parameter** - Total amount of the transaction.
- **currency parameter** - Currency of the transaction.
- **description parameter** - Brief description of the transaction.
- **customLabels object** - Label for the payment button.
- **credentialOnFile object** - Settings for saving the customer's payment details.

**Note:** When a merchant updates a single-use link, we update the payment URL and HTML code in the assets object. The customer can't use the original link to make a payment.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.paymentLinks.partiallyUpdate({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    paymentLinkId: "JZURRJBUPS",
    body: [{
            op: "remove",
            path: "path"
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.PartiallyUpdatePaymentLinksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentLinksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.paymentLinks.<a href="/src/api/resources/paymentLinks/client/Client.ts">deactivate</a>({ ...params }) -> Payroc.DeactivatePaymentLinksResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to deactivate a payment link.  

To deactivate a payment link, you need its paymentLinkId. Our gateway returned the paymentLinkId in the response of the [Create Payment Link](https://docs.payroc.com/api/schema/payment-links/create) method.  

**Note:** If you don't have the paymentLinkId, use our [List Payment Links](https://docs.payroc.com/api/schema/payment-links/list) method to search for the payment link.  

If your request is successful, our gateway deactivates the payment link. The customer can't use the link to make a payment, and you can't reactivate the payment link.    
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.paymentLinks.deactivate({
    paymentLinkId: "JZURRJBUPS"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.DeactivatePaymentLinksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentLinksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Hosted Fields
<details><summary><code>client.hostedFields.<a href="/src/api/resources/hostedFields/client/Client.ts">create</a>({ ...params }) -> Payroc.HostedFieldsCreateSessionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to create a Hosted Fields session token. You need to generate a new session token each time you load Hosted Fields on a webpage.  

In your request, you need to indicate whether the merchant is using Hosted Fields to run a sale, save payment details, or update saved payment details.  

In the response, our gateway returns the session token and the time that it expires. You need the session token when you configure the JavaScript for Hosted Fields.  

For more information about adding Hosted Fields to a webpage, go to [Hosted Fields](https://docs.payroc.com/guides/integrate/hosted-fields). 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.hostedFields.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    libVersion: "1.1.0.123456",
    scenario: "payment"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.HostedFieldsCreateSessionRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `HostedFieldsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## ApplePaySessions
<details><summary><code>client.applePaySessions.<a href="/src/api/resources/applePaySessions/client/Client.ts">create</a>({ ...params }) -> Payroc.ApplePayResponseSession</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to start an Apple Pay session for your merchant.  

In the response, we return the startSessionObject that you send to Apple when you retrieve the cardholder's encrypted payment details.  

**Note:** For more information about how to integrate with Apple Pay, go to [Apple Pay](https://docs.payroc.com/guides/integrate/apple-pay).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.applePaySessions.create({
    processingTerminalId: "1234001",
    appleDomainId: "DUHDZJHGYY",
    appleValidationUrl: "https://apple-pay-gateway.apple.com/paymentservices/startSession"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.ApplePaySessions` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ApplePaySessionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Auth
<details><summary><code>client.auth.<a href="/src/api/resources/auth/client/Client.ts">retrieveToken</a>({ ...params }) -> Payroc.GetTokenResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Obtain an access token using client credentials
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.auth.retrieveToken({
    "x-api-key": "x-api-key"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.RetrieveTokenAuthRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AuthClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## BankTransferPayments Payments
<details><summary><code>client.bankTransferPayments.payments.<a href="/src/api/resources/bankTransferPayments/resources/payments/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.BankTransferPayment, Payroc.BankTransferPaymentPaginatedList></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of payments.  

**Note:** If you want to view the details of a specific payment and you have its paymentId, use our [Retrieve Payment](https://docs.payroc.com/api/schema/bank-transfer-payments/payments/retrieve) method.  

Use query parameters to filter the list of results that we return, for example, to search for payments for a customer, a date range, or a settlement state.  

Our gateway returns the following information about each payment in the list:  

- Order details, including the transaction amount and when it was processed.  
- Bank account details, including the customer’s name and account number.  
- Customer's details, including the customer’s phone number.  
- Transaction details, including any refunds or re-presentments.  

For each transaction, we also return the paymentId and an optional secureTokenId, which you can use to perform follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.bankTransferPayments.payments.list({
    processingTerminalId: "1234001",
    orderId: "OrderRef6543",
    nameOnAccount: "Sarah%20Hazel%20Hopper",
    last4: "7890",
    dateFrom: "2024-07-01T00:00:00Z",
    dateTo: "2024-07-31T23:59:59Z",
    settlementState: "settled",
    settlementDate: "2024-07-15",
    paymentLinkId: "JZURRJBUPS",
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.bankTransferPayments.payments.list({
    processingTerminalId: "1234001",
    orderId: "OrderRef6543",
    nameOnAccount: "Sarah%20Hazel%20Hopper",
    last4: "7890",
    dateFrom: "2024-07-01T00:00:00Z",
    dateTo: "2024-07-31T23:59:59Z",
    settlementState: "settled",
    settlementDate: "2024-07-15",
    paymentLinkId: "JZURRJBUPS",
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.bankTransferPayments.ListPaymentsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.bankTransferPayments.payments.<a href="/src/api/resources/bankTransferPayments/resources/payments/client/Client.ts">create</a>({ ...params }) -> Payroc.BankTransferPayment</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to run a sale with a customer's bank account details.  

In the response, our gateway returns information about the bank transfer payment and a paymentId, which you need for the following methods:  
-	[Retrieve payment](https://docs.payroc.com/api/schema/bank-transfer-payments/payments/retrieve) - View the details of the bank transfer payment.
-	[Reverse payment](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/reverse-payment) - Cancel the bank transfer payment if it's an open batch.
-	[Refund payment](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/refund) - Run a referenced refund to return funds to the customer's bank account.

**Payment methods**  

Our gateway accepts the following payment methods:  
-	Automated clearing house (ACH) details
-	Pre-authorized debit (PAD) details  

You can also use [secure tokens](https://docs.payroc.com/api/schema/payments/secure-tokens/overview) and [single-use tokens](https://docs.payroc.com/api/schema/tokenization/single-use-tokens/create) that you created from ACH details or PAD details. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.bankTransferPayments.payments.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    order: {
        orderId: "OrderRef6543",
        description: "Large Pepperoni Pizza",
        amount: 4999,
        currency: "USD",
        breakdown: {
            subtotal: 4347,
            tip: {
                type: "percentage",
                percentage: 10
            },
            taxes: [{
                    type: "rate",
                    rate: 5,
                    name: "Sales Tax"
                }]
        }
    },
    customer: {
        notificationLanguage: "en",
        contactMethods: [{
                type: "email",
                value: "jane.doe@example.com"
            }]
    },
    credentialOnFile: {
        tokenize: true
    },
    paymentMethod: {
        type: "ach",
        nameOnAccount: "Shara Hazel Hopper",
        accountNumber: "1234567890",
        routingNumber: "123456789"
    },
    customFields: [{
            name: "yourCustomField",
            value: "abc123"
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.bankTransferPayments.BankTransferPaymentRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.bankTransferPayments.payments.<a href="/src/api/resources/bankTransferPayments/resources/payments/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.BankTransferPayment</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a bank transfer payment.  

To retrieve a payment, you need its paymentId. Our gateway returned the paymentId in the response of the [Create Payment](https://docs.payroc.com/api/schema/bank-transfer-payments/payments/create) method.  

Note: If you don’t have the paymentId, use our [List Payments](https://docs.payroc.com/api/schema/bank-transfer-payments/payments/list) method to search for the payment.  

Our gateway returns the following information about the payment:  

-	Order details, including the transaction amount and when it was processed.  
-	Bank account details, including the customer’s name and account number.  
-	Customer’s details, including the customer’s phone number.  
-	Transaction details, including any refunds or re-presentments.  

If the merchant saved the customer’s bank account details, our gateway returns a secureTokenID, which you can use to perform follow-on actions.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.bankTransferPayments.payments.retrieve({
    paymentId: "M2MJOG6O2Y"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.bankTransferPayments.RetrievePaymentsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.bankTransferPayments.payments.<a href="/src/api/resources/bankTransferPayments/resources/payments/client/Client.ts">represent</a>({ ...params }) -> Payroc.BankTransferPayment</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to re-present an ACH payment.  

To re-present a payment, you need the paymentId of the return. To get the paymentId of the return, complete the following steps:  

1.	Use our [Retrieve Payment](https://docs.payroc.com/api/schema/bank-transfer-payments/payments/retrieve) method  to view the details of the original payment.  
2.	From the [returns object](https://docs.payroc.com/api/schema/bank-transfer-payments/payments/retrieve#response.body.returns) in the response, get the paymentId of the return.  

Our gateway uses the bank account details from the original payment. If you want to update the customer's bank account details, send the new bank account details in the request.  

If your request is successful, our gateway re-presents the payment.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.bankTransferPayments.payments.represent({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    paymentId: "M2MJOG6O2Y",
    paymentMethod: {
        type: "ach",
        nameOnAccount: "Shara Hazel Hopper",
        accountNumber: "1234567890",
        routingNumber: "123456789"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.bankTransferPayments.Representment` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## BankTransferPayments Refunds
<details><summary><code>client.bankTransferPayments.refunds.<a href="/src/api/resources/bankTransferPayments/resources/refunds/client/Client.ts">reversePayment</a>({ ...params }) -> Payroc.BankTransferPayment</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to cancel a bank transfer payment in an open batch. This is also known as voiding a payment.  

To cancel a bank transfer payment, you need its paymentId. Our gateway returned the paymentId in the response of the [Create Payment](https://docs.payroc.com/api/schema/bank-transfer-payments/payments/create) method.  

**Note:** If you don't have the paymentId, use our [List Payments](https://docs.payroc.com/api/schema/bank-transfer-payments/payments/list) method to search for the bank transfer payment.  

If your request is successful, our gateway removes the bank transfer payment from the merchant’s open batch and no funds are taken from the customer's bank account.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.bankTransferPayments.refunds.reversePayment({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    paymentId: "M2MJOG6O2Y"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.bankTransferPayments.ReversePaymentRefundsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.bankTransferPayments.refunds.<a href="/src/api/resources/bankTransferPayments/resources/refunds/client/Client.ts">refund</a>({ ...params }) -> Payroc.BankTransferPayment</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to refund a bank transfer payment that is in a closed batch.  

To refund a bank transfer payment, you need its paymentId. Our gateway returned the paymentId in the response of the [Create Payment](https://docs.payroc.com/api/schema/bank-transfer-payments/payments/create) method.  

**Note:** If you don’t have the paymentId, use our [List Payments](https://docs.payroc.com/api/schema/bank-transfer-payments/payments/list) method to search for the bank transfer payment.  

If your refund is successful, our gateway returns the payment amount to the customer's account.  

**Things to consider**  
- If the merchant refunds a bank transfer payment that is in an open batch, our gateway reverses the bank transfer payment.  
- Some merchants can run unreferenced refunds, which means that they don’t need a paymentId to return an amount to a customer. For more information about how to run an unreferenced refund, go to [Create Refund](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/create).  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.bankTransferPayments.refunds.refund({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    paymentId: "M2MJOG6O2Y",
    amount: 4999,
    description: "amount to refund"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.bankTransferPayments.BankTransferReferencedRefund` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.bankTransferPayments.refunds.<a href="/src/api/resources/bankTransferPayments/resources/refunds/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.BankTransferRefund, Payroc.BankTransferRefundPaginatedList></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of bank transfer refunds.  

**Note:** If you want to view the details of a specific refund and you have its refundId, use our [Retrieve Refund](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/retrieve) method.  

Use query parameters to filter the list of results that we return, for example, to search for refunds for a customer, an orderId, or a date range.  

Our gateway returns the following information about each refund in the list:  

-	Order details, including the refund amount and when it was processed.  
-	Bank account details, including the customer’s name and account number.  

For referenced refunds, our gateway also returns details about the payment that the refund is linked to.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.bankTransferPayments.refunds.list({
    processingTerminalId: "1234001",
    orderId: "OrderRef6543",
    nameOnAccount: "Sarah%20Hazel%20Hopper",
    last4: "7062",
    dateFrom: "2024-07-01T00:00:00Z",
    dateTo: "2024-07-31T23:59:59Z",
    settlementState: "settled",
    settlementDate: "2024-07-15",
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.bankTransferPayments.refunds.list({
    processingTerminalId: "1234001",
    orderId: "OrderRef6543",
    nameOnAccount: "Sarah%20Hazel%20Hopper",
    last4: "7062",
    dateFrom: "2024-07-01T00:00:00Z",
    dateTo: "2024-07-31T23:59:59Z",
    settlementState: "settled",
    settlementDate: "2024-07-15",
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.bankTransferPayments.ListRefundsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.bankTransferPayments.refunds.<a href="/src/api/resources/bankTransferPayments/resources/refunds/client/Client.ts">create</a>({ ...params }) -> Payroc.BankTransferRefund</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to create an unreferenced refund. An unreferenced refund is a refund that isn’t linked to a bank transfer payment.  

**Note:** If you have the paymentId of the payment you want to refund, use our [Refund Payment](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/refund) method. If you use our Refund Payment method, our gateway sends the refund amount to the customer’s original payment method and links the refund to the payment.  

In the request, you must provide the customer’s payment method and information about the order including the refund amount.  

In the response, our gateway returns information about the refund and a refundId, which you need for the following methods:  

-	[Retrieve refund](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/retrieve) – View the details of the refund.  
-	[Reverse refund](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/reverse-refund) – Cancel the refund if it’s in an open batch.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.bankTransferPayments.refunds.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    order: {
        orderId: "OrderRef6543",
        description: "Refund for order OrderRef6543",
        amount: 4999,
        currency: "USD"
    },
    customer: {
        notificationLanguage: "en",
        contactMethods: [{
                type: "email",
                value: "jane.doe@example.com"
            }]
    },
    refundMethod: {
        type: "ach",
        nameOnAccount: "Shara Hazel Hopper",
        accountNumber: "1234567890",
        routingNumber: "123456789"
    },
    customFields: [{
            name: "yourCustomField",
            value: "abc123"
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.bankTransferPayments.BankTransferUnreferencedRefund` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.bankTransferPayments.refunds.<a href="/src/api/resources/bankTransferPayments/resources/refunds/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.BankTransferRefund</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a refund.  

To retrieve a refund, you need its refundId. Our gateway returned the refundId in the response of the [Refund Payment](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/refund) method or the [Create Refund](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/create) method.  

**Note:** If you don’t have the refundId, use our [List Refunds](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/list) method to search for the refund.  

Our gateway returns the following information about the refund:  

- Order details, including the refund amount and when it was processed.  
- Bank account details, including the customer’s name and account number.  

If the refund is a referenced refund, our gateway also returns details about the payment that the refund is linked to.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.bankTransferPayments.refunds.retrieve({
    refundId: "CD3HN88U9F"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.bankTransferPayments.RetrieveRefundsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.bankTransferPayments.refunds.<a href="/src/api/resources/bankTransferPayments/resources/refunds/client/Client.ts">reverseRefund</a>({ ...params }) -> Payroc.BankTransferRefund</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to cancel a bank transfer refund in an open batch.  

To cancel a refund, you need its refundId. Our gateway returned the refundId in the response of the [Refund Payment](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/refund) or [Create Refund](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/create) method.  

**Note:** If you don’t have the refundId, use our [List Refunds](https://docs.payroc.com/api/schema/bank-transfer-payments/refunds/list) method to search for the refund.  

If your request is successful, the gateway removes the refund from the merchant’s open batch, and no funds are returned to the cardholder’s account.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.bankTransferPayments.refunds.reverseRefund({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    refundId: "CD3HN88U9F"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.bankTransferPayments.ReverseRefundRefundsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Boarding Owners
<details><summary><code>client.boarding.owners.<a href="/src/api/resources/boarding/resources/owners/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.Owner</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve details about an owner of a processing account or an owner associated with a funding recipient.  

To retrieve an owner, you need their ownerId. Our gateway returned the ownerId in the response of the [Create Processing Account](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create-processing-account) method or the [Create Funding Recipient Owner](https://docs.payroc.com/api/schema/funding/funding-recipients/create-owner) method.  

**Note:** If you don't have the ownerId, use the [Retrieve Processing Account](https://docs.payroc.com/api/schema/boarding/processing-accounts/retrieve) method if you are searching for a processing account owner, or use the [List Funding Recipient Owners](https://docs.payroc.com/api/schema/funding/funding-recipients/list-owners) method if you are searching for a funding recipient owner.  

Our gateway returns the following information about an owner:  
- Name, date of birth, and address.  
- Contact details, including their email address.  
- Relationship to the business, including whether they are a control prong or authorized signatory, and their equity stake in the business. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.owners.retrieve({
    ownerId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.RetrieveOwnersRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `OwnersClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.owners.<a href="/src/api/resources/boarding/resources/owners/client/Client.ts">update</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

> **Important:** You can't update the details of an owner of a processing account.  

Use this method to update the details of an owner associated with a funding recipient.  

To update an owner, you need their ownerId. Our gateway returned the ownerId in the response of the [Create Funding Recipient](https://docs.payroc.com/api/schema/funding/funding-recipients/create) method and the [Create Funding Recipient Owner](https://docs.payroc.com/api/schema/funding/funding-recipients/create-owner) method.   

**Note:** If you don't have the ownerId, use the [List Funding Recipient Owners](https://docs.payroc.com/api/schema/funding/funding-recipients/list-owners) method, the [Retrieve Funding Recipient](https://docs.payroc.com/api/schema/funding/funding-recipients/retrieve) method, or the [List Funding Recipients](https://docs.payroc.com/api/schema/funding/funding-recipients/list) method to search for the funding recipient owner.  

You can update the following details about an owner:  

- Personal details, including their name, date of birth, and address.  
- Identification details, including their identification type and number.  
- Contact details, including their email address.  
- Relationship to the business, including whether they are a control prong.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.owners.update({
    ownerId: 1,
    body: {
        firstName: "Jane",
        middleName: "Helen",
        lastName: "Doe",
        dateOfBirth: "1964-03-22",
        address: {
            address1: "1 Example Ave.",
            address2: "Example Address Line 2",
            address3: "Example Address Line 3",
            city: "Chicago",
            state: "Illinois",
            country: "US",
            postalCode: "60056"
        },
        identifiers: [{
                type: "nationalId",
                value: "000-00-4320"
            }],
        contactMethods: [{
                type: "email",
                value: "jane.doe@example.com"
            }],
        relationship: {
            equityPercentage: 48.5,
            title: "CFO",
            isControlProng: true,
            isAuthorizedSignatory: false
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.UpdateOwnersRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `OwnersClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.owners.<a href="/src/api/resources/boarding/resources/owners/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

> **Important:** You can't delete an owner of a processing account. 

Use this method to delete an owner associated with a funding recipient. You can delete an owner only if the funding recipient has more than one owner.  

To delete an owner, you need their ownerId. Our gateway returned the ownerId in the response of the [Create Funding Recipient](https://docs.payroc.com/api/schema/funding/funding-recipients/create) method and the [Create Funding Recipient Owner](https://docs.payroc.com/api/schema/funding/funding-recipients/create-owner) method.  

**Note:** If you don't have the ownerId, use the [List Funding Recipient Owners](https://docs.payroc.com/api/schema/funding/funding-recipients/list-owners) method, the [Retrieve Funding Recipient](https://docs.payroc.com/api/schema/funding/funding-recipients/retrieve) method, or the [List Funding Recipients](https://docs.payroc.com/api/schema/funding/funding-recipients/list) method to search for the funding recipient owner.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.owners.delete({
    ownerId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.DeleteOwnersRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `OwnersClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Boarding PricingIntents
<details><summary><code>client.boarding.pricingIntents.<a href="/src/api/resources/boarding/resources/pricingIntents/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.PricingIntent, Payroc.PaginatedPricingIntent></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of pricing intents associated with the ISV.  

**Note:** If you want to view the details of a specific pricing intent and you have its pricingIntentId, use our [Retrieve Pricing Intent](https://docs.payroc.com/api/schema/boarding/pricing-intents/retrieve) method.  

Our gateway returns the following information about each pricing intent in the list:  

- Information about the fees, including the base fees, gateway fees, and processor fees.  
- Status of the pricing intent, including whether we approved the pricing intent.  

For each pricing intent, we also return its pricingIntentId which you can use to perform follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.boarding.pricingIntents.list({
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.boarding.pricingIntents.list({
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.ListPricingIntentsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PricingIntentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.pricingIntents.<a href="/src/api/resources/boarding/resources/pricingIntents/client/Client.ts">create</a>({ ...params }) -> Payroc.PricingIntent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to create a pricing intent that you can assign to a processing account.  

In the request, you must provide the following:
-	Processing fees, including the pricing program and the fee to process each transaction.
-	Gateway fees, including the fee for each transaction handled by our gateway.
-	Base fees, including maintenance and PCI fees.

In the response, our gateway returns information about the pricing intent and the pricingIntentId, which you need for the following methods:
-	[Create Merchant Platform](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create) - Assign the pricing intent to a processing account, when you create the merchant platform and its processing accounts.
-	[Create Processing Account](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create-processing-account) - Assign the pricing intent to a processing account.
-	[Retrieve Pricing Intent](https://docs.payroc.com/api/schema/boarding/pricing-intents/retrieve) - Retrieve information about a pricing intent.
-	[Update Pricing Intent](https://docs.payroc.com/api/schema/boarding/pricing-intents/update) - Update the details of a pricing intent. 
-	[Delete Pricing Intent](https://docs.payroc.com/api/schema/boarding/pricing-intents/delete) - Delete a pricing intent.
-	[Partially Update Pricing Intent](https://docs.payroc.com/api/schema/boarding/pricing-intents/partially-update) - Partially update the details of a pricing intent.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.pricingIntents.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    body: {
        country: "US",
        version: "5.0",
        base: {
            addressVerification: 5,
            annualFee: {
                billInMonth: "june",
                amount: 9900
            },
            regulatoryAssistanceProgram: 15,
            pciNonCompliance: 4995,
            merchantAdvantage: 10,
            platinumSecurity: {
                billingFrequency: "monthly"
            },
            maintenance: 500,
            minimum: 100,
            voiceAuthorization: 95,
            chargeback: 2500,
            retrieval: 1500,
            batch: 1500,
            earlyTermination: 57500
        },
        processor: {
            card: {
                planType: "interchangePlus",
                fees: {
                    mastercardVisaDiscover: {}
                }
            }
        },
        services: [{
                name: "hardwareAdvantagePlan",
                enabled: true
            }],
        key: "Your-Unique-Identifier",
        metadata: {
            "yourCustomField": "abc123"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.CreatePricingIntentsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PricingIntentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.pricingIntents.<a href="/src/api/resources/boarding/resources/pricingIntents/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.PricingIntent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a pricing intent.  

To retrieve a pricing intent, you need its pricingIntentId. Our gateway returned the pricingIntentId in the response of the [Create Pricing Intent](https://docs.payroc.com/api/schema/boarding/pricing-intents/create) method.  

**Note:** If you don't have the pricingIntentId, use our [List Pricing Intents](https://docs.payroc.com/api/schema/boarding/pricing-intents/list) method to search for the pricing intent.  

Our gateway returns the following information about the pricing intent:  

- Information about the fees, including the base fees, gateway fees, and processor fees.  
- Status of the pricing intent, including whether we approved the pricing intent.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.pricingIntents.retrieve({
    pricingIntentId: "5"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.RetrievePricingIntentsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PricingIntentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.pricingIntents.<a href="/src/api/resources/boarding/resources/pricingIntents/client/Client.ts">update</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to update the details of a pricing intent. If you update a pricing intent, it won't affect merchant that you've previously onboarded.  

To update a pricing intent, you need its pricingIntentId. Our gateway returned the pricingIntentId in the response of the [Create Pricing Intent](https://docs.payroc.com/api/schema/boarding/pricing-intents/create) method.  

**Note:** If you don't have the pricingIntentId, use our [List Pricing Intents](https://docs.payroc.com/api/schema/boarding/pricing-intents/list) method to search for the pricing intent.  

You can update the following details about a pricing intent:  

- Fees, including the base fees, processor fees, and gateway fees.  
- Custom name for the pricing intent.  
- Additional services that merchants can sign up for.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.pricingIntents.update({
    pricingIntentId: "5",
    body: {
        country: "US",
        version: "5.0",
        base: {
            addressVerification: 5,
            annualFee: {
                billInMonth: "june",
                amount: 9900
            },
            regulatoryAssistanceProgram: 15,
            pciNonCompliance: 4995,
            merchantAdvantage: 10,
            platinumSecurity: {
                billingFrequency: "monthly"
            },
            maintenance: 500,
            minimum: 100,
            voiceAuthorization: 95,
            chargeback: 2500,
            retrieval: 1500,
            batch: 1500,
            earlyTermination: 57500
        },
        processor: {
            card: {
                planType: "interchangePlus",
                fees: {
                    mastercardVisaDiscover: {}
                }
            },
            ach: {
                fees: {
                    transaction: 50,
                    batch: 5,
                    returns: 400,
                    unauthorizedReturn: 1999,
                    statement: 800,
                    monthlyMinimum: 20000,
                    accountVerification: 10,
                    discountRateUnder10000: 5.25,
                    discountRateAbove10000: 10
                }
            }
        },
        gateway: {
            fees: {
                monthly: 2000,
                setup: 5000,
                perTransaction: 2000,
                perDeviceMonthly: 10
            }
        },
        services: [{
                name: "hardwareAdvantagePlan",
                enabled: true
            }],
        key: "Your-Unique-Identifier",
        metadata: {
            "yourCustomField": "abc123"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.UpdatePricingIntentsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PricingIntentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.pricingIntents.<a href="/src/api/resources/boarding/resources/pricingIntents/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to delete a pricing intent.  

> **Important:** When you delete a pricing intent, you can't recover it. You also won't be able to assign the pricing intent to a merchant's boarding application.  

To delete a pricing intent, you need its pricingIntentId. Our gateway returned the pricingIntentId in the response of the [Create Pricing Intent](https://docs.payroc.com/api/schema/boarding/pricing-intents/create) method.  

**Note:** If you don't have the pricingIntentId, use our [List Pricing Intents](https://docs.payroc.com/api/schema/boarding/pricing-intents/list) method to search for the pricing intent.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.pricingIntents.delete({
    pricingIntentId: "5"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.DeletePricingIntentsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PricingIntentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.pricingIntents.<a href="/src/api/resources/boarding/resources/pricingIntents/client/Client.ts">partiallyUpdate</a>({ ...params }) -> Payroc.PricingIntent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to partially update a pricing intent. Structure your request to follow the [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902) standard.  

If you update a pricing intent, it won't affect merchants you've previously onboarded.  

To update a pricing intent, you need its pricingIntentId. Our gateway returned the pricingIntentId in the response of the [Create Pricing Intent](https://docs.payroc.com/api/schema/boarding/pricing-intents/create) method.  

**Note:** If you don't have the pricingIntentId, use our [List Pricing Intents](https://docs.payroc.com/api/schema/boarding/pricing-intents/list) method to search for the pricing intent.  

You can update the following details about a pricing intent:  

- Fees, including the base fees, processor fees, and gateway fees.  
- Custom name for the pricing intent.  
- Additional services that merchants can sign up for.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.pricingIntents.partiallyUpdate({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    pricingIntentId: "5",
    body: [{
            op: "remove",
            path: "path"
        }, {
            op: "remove",
            path: "path"
        }, {
            op: "remove",
            path: "path"
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.PartiallyUpdatePricingIntentsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PricingIntentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Boarding MerchantPlatforms
<details><summary><code>client.boarding.merchantPlatforms.<a href="/src/api/resources/boarding/resources/merchantPlatforms/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.MerchantPlatform, Payroc.PaginatedMerchants></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of merchant platforms that are linked to your ISV account.  

**Note**: If you want to view the details of a specific merchant platform and you have its merchantPlatformId, use our [Retrieve Merchant Platform](https://docs.payroc.com/api/schema/boarding/merchant-platforms/retrieve) method.  

Our gateway returns the following information about each merchant platform in the list:  
- Legal information, including its legal name and address.  
- Contact information, including the email address for the business.  
- Processing  account information, including the processingAccountId and status of each processing account that's linked to the merchant platform.  

For each merchant platform, we also return its merchantPlatformId and its linked processingAccountIds, which you can use to perform follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.boarding.merchantPlatforms.list({
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.boarding.merchantPlatforms.list({
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.ListMerchantPlatformsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `MerchantPlatformsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.merchantPlatforms.<a href="/src/api/resources/boarding/resources/merchantPlatforms/client/Client.ts">create</a>({ ...params }) -> Payroc.MerchantPlatform</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to board a merchant with Payroc.  

**Note**: This method is part of our Boarding solution. To help you understand how this method works with other Boarding methods, go to [Board a Merchant](https://docs.payroc.com/guides/integrate/boarding).  

In the request, include the following information:  
- Legal information, including its legal name and address.  
- Contact information, including the email address for the business.  
- Processing account information, including the pricing model, owners, and contacts for the processing account.  

When you send a successful request, we review the merchant's information. After we complete our review and approve the merchant, we assign:  
- **merchantPlatformId** - Unique identifier for the merchant platform.  
- **processingAccountId** - Unique identifier for each processing account linked to the merchant platform.  

You need to keep these to perform follow-on actions, for example, you need the processingAccountId to [order terminals](https://docs.payroc.com/api/schema/boarding/processing-accounts/create-terminal-order) for the processing account.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.merchantPlatforms.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    business: {
        name: "Example Corp",
        taxId: "12-3456789",
        organizationType: "privateCorporation",
        countryOfOperation: "US",
        addresses: [{
                address1: "1 Example Ave.",
                address2: "Example Address Line 2",
                address3: "Example Address Line 3",
                city: "Chicago",
                state: "Illinois",
                country: "US",
                postalCode: "60056",
                type: "legalAddress"
            }],
        contactMethods: [{
                type: "email",
                value: "jane.doe@example.com"
            }]
    },
    processingAccounts: [{
            doingBusinessAs: "Pizza Doe",
            owners: [{
                    firstName: "Jane",
                    middleName: "Helen",
                    lastName: "Doe",
                    dateOfBirth: "1964-03-22",
                    address: {
                        address1: "1 Example Ave.",
                        address2: "Example Address Line 2",
                        address3: "Example Address Line 3",
                        city: "Chicago",
                        state: "Illinois",
                        country: "US",
                        postalCode: "60056"
                    },
                    identifiers: [{
                            type: "nationalId",
                            value: "000-00-4320"
                        }],
                    contactMethods: [{
                            type: "email",
                            value: "jane.doe@example.com"
                        }],
                    relationship: {
                        equityPercentage: 48.5,
                        title: "CFO",
                        isControlProng: true,
                        isAuthorizedSignatory: false
                    }
                }],
            website: "www.example.com",
            businessType: "restaurant",
            categoryCode: 5999,
            merchandiseOrServiceSold: "Pizza",
            businessStartDate: "2020-01-01",
            timezone: "America/Chicago",
            address: {
                address1: "1 Example Ave.",
                address2: "Example Address Line 2",
                address3: "Example Address Line 3",
                city: "Chicago",
                state: "Illinois",
                country: "US",
                postalCode: "60056"
            },
            contactMethods: [{
                    type: "email",
                    value: "jane.doe@example.com"
                }],
            processing: {
                transactionAmounts: {
                    average: 5000,
                    highest: 10000
                },
                monthlyAmounts: {
                    average: 50000,
                    highest: 100000
                },
                volumeBreakdown: {
                    cardPresent: 77,
                    mailOrTelephone: 3,
                    ecommerce: 20
                },
                isSeasonal: true,
                monthsOfOperation: ["jan", "feb"],
                ach: {
                    naics: "5812",
                    previouslyTerminatedForAch: false,
                    refunds: {
                        writtenRefundPolicy: true,
                        refundPolicyUrl: "www.example.com/refund-poilcy-url"
                    },
                    estimatedMonthlyTransactions: 3000,
                    limits: {
                        singleTransaction: 10000,
                        dailyDeposit: 200000,
                        monthlyDeposit: 6000000
                    },
                    transactionTypes: ["prearrangedPayment", "other"],
                    transactionTypesOther: "anotherTransactionType"
                },
                cardAcceptance: {
                    debitOnly: false,
                    hsaFsa: false,
                    cardsAccepted: ["visa", "mastercard"],
                    specialityCards: {
                        americanExpressDirect: {
                            enabled: true,
                            merchantNumber: "abc1234567"
                        },
                        electronicBenefitsTransfer: {
                            enabled: true,
                            fnsNumber: "6789012"
                        },
                        other: {
                            wexMerchantNumber: "abc1234567",
                            voyagerMerchantId: "abc1234567",
                            fleetMerchantId: "abc1234567"
                        }
                    }
                }
            },
            funding: {
                fundingSchedule: "nextday",
                acceleratedFundingFee: 1999,
                dailyDiscount: false,
                fundingAccounts: [{
                        type: "checking",
                        use: "creditAndDebit",
                        nameOnAccount: "Jane Doe",
                        paymentMethods: [{
                                type: "ach"
                            }],
                        metadata: {
                            "yourCustomField": "abc123"
                        }
                    }]
            },
            pricing: {
                type: "intent",
                pricingIntentId: "6123"
            },
            signature: {
                type: "requestedViaDirectLink"
            },
            contacts: [{
                    type: "manager",
                    firstName: "Jane",
                    middleName: "Helen",
                    lastName: "Doe",
                    identifiers: [{
                            type: "nationalId",
                            value: "000-00-4320"
                        }],
                    contactMethods: [{
                            type: "email",
                            value: "jane.doe@example.com"
                        }]
                }],
            metadata: {
                "customerId": "2345"
            }
        }],
    metadata: {
        "customerId": "2345"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.CreateMerchantAccount` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `MerchantPlatformsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.merchantPlatforms.<a href="/src/api/resources/boarding/resources/merchantPlatforms/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.MerchantPlatform</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a merchant platform.  

To retrieve a merchant platform, you need its merchantPlatformId. Our gateway returned the merchantPlatformId in the response of the [Create Merchant Platform](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create) method.  

**Note:** If you don't have the merchantPlatformId, use our [List Merchant Platforms](https://docs.payroc.com/api/schema/boarding/merchant-platforms/list) method to search for the merchant platform.

Our gateway returns the following information about the merchant platform:
-	Legal information, including its legal name and address.
-	Contact information, including the email address for the business. 
-	Processing account information, including the processingAccountId and status of each processing account that's linked to the merchant platform.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.merchantPlatforms.retrieve({
    merchantPlatformId: "12345"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.RetrieveMerchantPlatformsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `MerchantPlatformsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.merchantPlatforms.<a href="/src/api/resources/boarding/resources/merchantPlatforms/client/Client.ts">listProcessingAccounts</a>({ ...params }) -> core.PayrocPager<Payroc.ProcessingAccount, Payroc.PaginatedProcessingAccounts></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of processing accounts linked to a merchant platform.  

**Note**: If you want to view the details of a specific processing account and you have its processingAccountId, use our [Retrieve Processing Account](https://docs.payroc.com/api/schema/boarding/processing-accounts/retrieve) method.  

Use the query parameters to filter the list of results that we return, for example, to search for only closed processing accounts.  

To list the processing accounts for a merchant platform, you need its merchantPlatformId. If you don't have the merchantPlatformId, use our [List Merchant Platforms](https://docs.payroc.com/api/schema/boarding/merchant-platforms/list) method to search for the merchant platform.

Our gateway returns the following information about eahc processing account in the list:  
- Business details, including its status, time zone, and address.  
- Owners' details, including their contact details.  
- Funding, pricing, and processing information, including its pricing model and funding accounts.  

For each processing account, we also return its processingAccountId, which you can use to perform follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.boarding.merchantPlatforms.listProcessingAccounts({
    merchantPlatformId: "12345",
    before: "2571",
    after: "8516",
    limit: 1,
    includeClosed: true
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.boarding.merchantPlatforms.listProcessingAccounts({
    merchantPlatformId: "12345",
    before: "2571",
    after: "8516",
    limit: 1,
    includeClosed: true
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.ListBoardingMerchantPlatformProcessingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `MerchantPlatformsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.merchantPlatforms.<a href="/src/api/resources/boarding/resources/merchantPlatforms/client/Client.ts">createProcessingAccount</a>({ ...params }) -> Payroc.ProcessingAccount</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to add an additional processing account to a merchant platform.  

To add a processing account to a merchant platform, you need the merchantPlatformId. Our gateway returned the merchantPlatformId in the response of the [Create Merchant Platform](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create) method.  

**Note**: If you don't have the merchantPlatformId, use our [List Merchant Platforms](https://docs.payroc.com/api/schema/boarding/merchant-platforms/list) method to search for the merchant platform.  

In the request, include the following information:  
- Business details, including its business type, time zone, and address.  
- Owners' details, including their contact details.  
- Funding, pricing, and processing information, including its pricing model and funding accounts.  

When you send a successful request, we review the information about the processing account. After we complete our review and approve the processing account, we assign a processingAccountId, which you need to perform follow-on actions.  

**Note**: You can subscribe to our processingAccount.status.changed event to get notifications when we update the status of a processing account. For more information about how to subscribe to events, go to [Events List](https://docs.payroc.com/knowledge/events/events-list).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.merchantPlatforms.createProcessingAccount({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    merchantPlatformId: "12345",
    body: {
        doingBusinessAs: "Pizza Doe",
        owners: [{
                firstName: "Jane",
                middleName: "Helen",
                lastName: "Doe",
                dateOfBirth: "1964-03-22",
                address: {
                    address1: "1 Example Ave.",
                    address2: "Example Address Line 2",
                    address3: "Example Address Line 3",
                    city: "Chicago",
                    state: "Illinois",
                    country: "US",
                    postalCode: "60056"
                },
                identifiers: [{
                        type: "nationalId",
                        value: "000-00-4320"
                    }],
                contactMethods: [{
                        type: "email",
                        value: "jane.doe@example.com"
                    }],
                relationship: {
                    equityPercentage: 51.5,
                    title: "CFO",
                    isControlProng: true,
                    isAuthorizedSignatory: false
                }
            }],
        website: "www.example.com",
        businessType: "restaurant",
        categoryCode: 5999,
        merchandiseOrServiceSold: "Pizza",
        businessStartDate: "2020-01-01",
        timezone: "America/Chicago",
        address: {
            address1: "1 Example Ave.",
            address2: "Example Address Line 2",
            address3: "Example Address Line 3",
            city: "Chicago",
            state: "Illinois",
            country: "US",
            postalCode: "60056"
        },
        contactMethods: [{
                type: "email",
                value: "jane.doe@example.com"
            }],
        processing: {
            transactionAmounts: {
                average: 5000,
                highest: 10000
            },
            monthlyAmounts: {
                average: 50000,
                highest: 100000
            },
            volumeBreakdown: {
                cardPresent: 77,
                mailOrTelephone: 3,
                ecommerce: 20
            },
            isSeasonal: true,
            monthsOfOperation: ["jan", "feb"],
            ach: {
                naics: "5812",
                previouslyTerminatedForAch: false,
                refunds: {
                    writtenRefundPolicy: true,
                    refundPolicyUrl: "www.example.com/refund-poilcy-url"
                },
                estimatedMonthlyTransactions: 3000,
                limits: {
                    singleTransaction: 10000,
                    dailyDeposit: 200000,
                    monthlyDeposit: 6000000
                },
                transactionTypes: ["prearrangedPayment", "other"],
                transactionTypesOther: "anotherTransactionType"
            },
            cardAcceptance: {
                debitOnly: false,
                hsaFsa: false,
                cardsAccepted: ["visa", "mastercard"],
                specialityCards: {
                    americanExpressDirect: {
                        enabled: true,
                        merchantNumber: "abc1234567"
                    },
                    electronicBenefitsTransfer: {
                        enabled: true,
                        fnsNumber: "6789012"
                    },
                    other: {
                        wexMerchantNumber: "abc1234567",
                        voyagerMerchantId: "abc1234567",
                        fleetMerchantId: "abc1234567"
                    }
                }
            }
        },
        funding: {
            fundingSchedule: "nextday",
            acceleratedFundingFee: 1999,
            dailyDiscount: false,
            fundingAccounts: [{
                    type: "checking",
                    use: "creditAndDebit",
                    nameOnAccount: "Jane Doe",
                    paymentMethods: [{
                            type: "ach"
                        }],
                    metadata: {
                        "yourCustomField": "abc123"
                    }
                }]
        },
        pricing: {
            type: "intent",
            pricingIntentId: "6123"
        },
        signature: {
            type: "requestedViaDirectLink"
        },
        contacts: [{
                type: "manager",
                firstName: "Jane",
                middleName: "Helen",
                lastName: "Doe",
                identifiers: [{
                        type: "nationalId",
                        value: "000-00-4320"
                    }],
                contactMethods: [{
                        type: "email",
                        value: "jane.doe@example.com"
                    }]
            }],
        metadata: {
            "customerId": "2345"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.CreateProcessingAccountMerchantPlatformsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `MerchantPlatformsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Boarding ProcessingAccounts
<details><summary><code>client.boarding.processingAccounts.<a href="/src/api/resources/boarding/resources/processingAccounts/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.ProcessingAccount</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a specific processing account.  

To retrieve a processing account, you need its processingAccountId. Our gateway returned the processingAccountId in the response of the [Create Merchant Platform](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create) method or the [Create Processing Account](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create-processing-account) method.  

**Note:** If you don't have the processingAccountId, use our [List Merchant Platform's Processing Accounts](https://docs.payroc.com/api/schema/boarding/merchant-platforms/list-processing-accounts) method to search for the processing account.  

Our gateway returns the following information about the processing account:  

-	Business information, including the Merchant Category Code (MCC), status of the processing account, and address of the business.  
-	Processing information, including the merchant’s refund policies and card types that the merchant accepts.  
-	Funding information, including funding schedules, funding fees, and details for the merchant’s funding accounts.  
-	Pricing information, including [HATEOAS](https://docs.payroc.com/knowledge/basic-concepts/hypermedia-as-the-engine-of-application-state-hateoas) links to retrieve the pricing program for the processing account.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.processingAccounts.retrieve({
    processingAccountId: "38765"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.RetrieveProcessingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProcessingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.processingAccounts.<a href="/src/api/resources/boarding/resources/processingAccounts/client/Client.ts">listProcessingAccountFundingAccounts</a>({ ...params }) -> Payroc.FundingAccount[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a list of funding accounts associated with a processing account.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.processingAccounts.listProcessingAccountFundingAccounts({
    processingAccountId: "38765"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.ListProcessingAccountFundingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProcessingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.processingAccounts.<a href="/src/api/resources/boarding/resources/processingAccounts/client/Client.ts">listContacts</a>({ ...params }) -> Payroc.PaginatedContacts</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a list of contacts for a processing account.    

**Note:** If you want to view the details of a specific contact and you have their contactId, use our [Retrieve Contact](https://docs.payroc.com/api/schema/boarding/contacts/retrieve) method.  

To list contacts for a processing account, you need the processingAccountId. Our gateway returned the processingAccountId in the response of the [Create Merchant Platform](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create) method or the [Create Processing Account](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create-processing-account) method.  

Our gateway returns the following information about each contact:  

- Name and contact method, including their phone number or mobile number.  
- Role within the business, for example, if they are a manager.  

For each contact, we also return a contactId, which you can use to perform follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.processingAccounts.listContacts({
    processingAccountId: "38765",
    before: "2571",
    after: "8516",
    limit: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.ListContactsProcessingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProcessingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.processingAccounts.<a href="/src/api/resources/boarding/resources/processingAccounts/client/Client.ts">getProcessingAccountPricingAgreement</a>({ ...params }) -> Payroc.GetProcessingAccountPricingAgreementProcessingAccountsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve the pricing agreement that we apply to a processing account.  

To retrieve the pricing agreement of a processing account, you need the processingAccountId. Our gateway returned the processingAccountId in the response to the [Create Merchant Platform](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create) method and [Create Processing Account](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create-processing-account) method.  

**Note:** If you don't have the processingAccountId, use our [List Merchant Platform’s Processing Accounts](https://docs.payroc.com/api/schema/boarding/merchant-platforms/list-processing-accounts) method to search for the processing account.  

Our gateway returns the following information about the pricing agreement that we apply to the processing account:  

- Base fees, including the annual fee and the fees for each chargeback and retrieval.  
- Processor fees, including the fees that we apply for processing card and ACH payments.  
- Gateway fees, including the setup fee and the fees for each transaction.  
- Service fees, including the fee that we apply if the merchant has signed up to a Hardware Advantage Plan.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.processingAccounts.getProcessingAccountPricingAgreement({
    processingAccountId: "38765"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.GetProcessingAccountPricingAgreementProcessingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProcessingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.processingAccounts.<a href="/src/api/resources/boarding/resources/processingAccounts/client/Client.ts">listOwners</a>({ ...params }) -> core.PayrocPager<Payroc.Owner, Payroc.PaginatedOwners></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a list of owners of a processing account.  

**Note:** If you want to view the details of a specific owner and you have the ownerId, go to our [Retrieve Owner](https://docs.payroc.com/api/schema/boarding/owners/retrieve) method.  

To list the owners of a processing account, you need its processingAccountId. If you don't have the processingAccountId, use our [List Merchant Platform's Processing Accounts](https://docs.payroc.com/api/schema/boarding/merchant-platforms/list-processing-accounts) method to search for the processing account.  

Our gateway returns the following information about each owner in the list: 

- Name, date of birth, and address.  
- Contact details, including their email address.  
- Relationship to the business, including whether they are a control prong or authorized signatory, and their equity stake in the business.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.boarding.processingAccounts.listOwners({
    processingAccountId: "38765",
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.boarding.processingAccounts.listOwners({
    processingAccountId: "38765",
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.ListProcessingAccountOwnersRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProcessingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.processingAccounts.<a href="/src/api/resources/boarding/resources/processingAccounts/client/Client.ts">createReminder</a>({ ...params }) -> Payroc.CreateReminderProcessingAccountsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to prompt a merchant to sign their pricing agreement.  

You can create a reminder only if you requested the merchant’s signature by email when you created the processing account for the merchant.  

To create a reminder, you need the processingAccountId. Our gateway returned the processingAccountId in the response of the [Create Merchant Platform](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create) method or [Create Processing Account](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create-processing-account) method. 

**Note:** If you don’t know the processingAccountId, use our [List Merchant Platform’s Processing Accounts](https://docs.payroc.com/api/schema/boarding/merchant-platforms/list-processing-accounts) method to search for the processing account.  

When you send a successful request, we send an email to the merchant that prompts them to sign their pricing agreement.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.processingAccounts.createReminder({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingAccountId: "38765",
    body: {
        type: "pricingAgreement"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.CreateReminderProcessingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProcessingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.processingAccounts.<a href="/src/api/resources/boarding/resources/processingAccounts/client/Client.ts">listTerminalOrders</a>({ ...params }) -> Payroc.TerminalOrder[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of terminal orders associated with a processing account.  

**Note:** If you want to view the details of a specific terminal order and you have its terminalOrderId, use our [Retrieve Terminal Order](https://docs.payroc.com/api/schema/boarding/terminal-orders/retrieve) method.  

Use the query parameters to filter the list of results that we return, for example, to search for terminal orders by their status.  

To list the terminal orders for a processing account, you need its processingAccountId. If you don't have the processingAccountId, use our [List Merchant Platforms](https://docs.payroc.com/api/schema/boarding/merchant-platforms/list) method to search for a merchant platform and its processing accounts.

Our gateway returns the following information for each terminal order in the list:  

- Status of the order  
- Items in the order  
- Training provider  
- Shipping information  

For each terminal order, we also return its terminalOrderId, which you can use to perform follow-on actions.   
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.processingAccounts.listTerminalOrders({
    processingAccountId: "38765",
    status: "open",
    fromDateTime: "2024-09-08T12:00:00Z",
    toDateTime: "2024-12-08T11:00:00Z"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.ListTerminalOrdersProcessingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProcessingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.processingAccounts.<a href="/src/api/resources/boarding/resources/processingAccounts/client/Client.ts">createTerminalOrder</a>({ ...params }) -> Payroc.TerminalOrder</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to order and configure terminals for a processing account.  

**Note**: You need the ID of the processing account before you can create an order. If you don't know the processingAccountId, go to the [Retrieve a Merchant Platform](https://docs.payroc.com/api/schema/boarding/merchant-platforms/retrieve) method.  

In the request, specify the gateway settings, device settings, and application settings for the terminal.  

In the response, our gateway returns information about the terminal order including its status and terminalOrderId that you can use to [retrieve the terminal order](https://docs.payroc.com/api/schema/boarding/terminal-orders/retrieve).  

**Note**: You can subscribe to the terminalOrder.status.changed event to get notifications when we update the status of a terminal order. For more information about how to subscribe to events, go to [Events Subscriptions](https://docs.payroc.com/guides/integrate/event-subscriptions).  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.processingAccounts.createTerminalOrder({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingAccountId: "38765",
    trainingProvider: "payroc",
    shipping: {
        preferences: {
            method: "nextDay",
            saturdayDelivery: true
        },
        address: {
            recipientName: "Recipient Name",
            businessName: "Company Ltd",
            addressLine1: "1 Example Ave.",
            addressLine2: "Example Address Line 2",
            city: "Chicago",
            state: "Illinois",
            postalCode: "60056",
            email: "example@mail.com",
            phone: "2025550164"
        }
    },
    orderItems: [{
            type: "solution",
            solutionTemplateId: "Roc Services_DX8000",
            solutionQuantity: 1,
            deviceCondition: "new",
            solutionSetup: {
                timezone: "America/Chicago",
                industryTemplateId: "Retail",
                gatewaySettings: {
                    merchantPortfolioId: "Company Ltd",
                    merchantTemplateId: "Company Ltd Merchant Template",
                    userTemplateId: "Company Ltd User Template",
                    terminalTemplateId: "Company Ltd Terminal Template"
                },
                applicationSettings: {
                    clerkPrompt: false,
                    security: {
                        refundPassword: true,
                        keyedSalePassword: false,
                        reversalPassword: true
                    }
                },
                deviceSettings: {
                    numberOfMobileUsers: 2,
                    communicationType: "wifi"
                },
                batchClosure: {
                    batchCloseType: "automatic"
                },
                receiptNotifications: {
                    emailReceipt: true,
                    smsReceipt: false
                },
                taxes: [{
                        taxRate: 6,
                        taxLabel: "Sales Tax"
                    }],
                tips: {
                    enabled: false
                },
                tokenization: true
            }
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.CreateTerminalOrder` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProcessingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.processingAccounts.<a href="/src/api/resources/boarding/resources/processingAccounts/client/Client.ts">listProcessingTerminals</a>({ ...params }) -> core.PayrocPager<Payroc.ProcessingTerminal, Payroc.PaginatedProcessingTerminals></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of processing terminals associated with a processing account.  

**Note:** If you want to view the details of a specific processing terminal and you have its processingTerminalId, use our [Retrieve Processing Terminal](https://docs.payroc.com/api/schema/boarding/processing-terminals/retrieve) method.  

To list the terminals for a processing account, you need its processingAccountId. If you don't have the processingAccountId, use our [List Merchant Platforms](https://docs.payroc.com/api/schema/boarding/merchant-platforms/list) method to search for a merchant platform and its processing accounts.   

Our gateway returns the following information for each processing terminal in the list:  

- Status indicating whether the terminal is active or inactive.  
- Configuration settings, including gateway settings and application settings.  
- Features, receipt settings, and security settings.  
- Devices that use the processing terminal's configuration.  

For each processing terminal, we also return its processingTerminalId, which you can use to perform follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.boarding.processingAccounts.listProcessingTerminals({
    processingAccountId: "38765",
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.boarding.processingAccounts.listProcessingTerminals({
    processingAccountId: "38765",
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.ListProcessingTerminalsProcessingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProcessingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Boarding ProcessingTerminals
<details><summary><code>client.boarding.processingTerminals.<a href="/src/api/resources/boarding/resources/processingTerminals/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.ProcessingTerminal</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

**Important:** You can retrieve a processing terminal only if the terminal order was created using the Payroc API.

Use this method to retrieve information about a processing terminal.  

To retrieve a processing terminal, you need its processingTerminalId. Our gateway returned the processingTerminalId in the response of the [Create Terminal Order](https://docs.payroc.com/api/schema/boarding/processing-accounts/create-terminal-order) method.  

**Note:** If you don't have the processingTerminalId, use our [Retrieve Terminal Order](https://docs.payroc.com/api/schema/boarding/terminal-orders/retrieve) method or our [List Processing Terminals](https://docs.payroc.com/api/schema/boarding/processing-accounts/list-processing-terminals) method to search for the processing terminal.  

Our gateway returns the following information about the processing terminal:  

- Status indicating whether the terminal is active or inactive.  
- Configuration settings, including gateway settings and application settings.  
- Features, receipt settings, and security settings.  
- Devices that use the processing terminal's configuration.  
  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.processingTerminals.retrieve({
    processingTerminalId: "1234001"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.RetrieveProcessingTerminalsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProcessingTerminalsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.processingTerminals.<a href="/src/api/resources/boarding/resources/processingTerminals/client/Client.ts">retrieveHostConfiguration</a>({ ...params }) -> Payroc.HostConfiguration</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve the host processor configuration of a processing terminal. Integrate with this method only if you use your own gateway and want to validate the processor configuration.  

Our gateway returns the configuration settings for the merchant and the payment terminal.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.processingTerminals.retrieveHostConfiguration({
    processingTerminalId: "1234001"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.RetrieveHostConfigurationProcessingTerminalsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProcessingTerminalsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Boarding Contacts
<details><summary><code>client.boarding.contacts.<a href="/src/api/resources/boarding/resources/contacts/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.Contact</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve details about a contact.  

To retrieve a contact, you need its contactId. Our gateway returned the contactId in the [Create Processing Account](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create-processing-account) method.  

**Note:** If you don't have the contactId, use the [List Contacts](https://docs.payroc.com/api/schema/boarding/processing-accounts/list-contacts) method to search for the contact.  

Our gateway returns the following information about a contact:  

-	Name and contact method, including their phone number or mobile number.  
-	Role within the business, for example, if they are a manager. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.contacts.retrieve({
    contactId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.RetrieveContactsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ContactsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.contacts.<a href="/src/api/resources/boarding/resources/contacts/client/Client.ts">update</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to update a contact of a processing account.  

To update a contact, you need its contactId. Our gateway returned the contactId in the response of the [Create Processing Account](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create-processing-account) method.  

**Note:** If you don't have the contactId, use our [List Contacts](https://docs.payroc.com/api/schema/boarding/processing-accounts/list-contacts) method to search for the contact.  

You can update the following details about a contact:  

-	First name and last name.  
-	Contact details, including their phone number or mobile number.  
-	Identification details, including their identification type and number.  
-	Role within the business, for example, if they are a manager.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.contacts.update({
    contactId: 1,
    body: {
        type: "manager",
        firstName: "Jane",
        middleName: "Helen",
        lastName: "Doe",
        identifiers: [{
                type: "nationalId",
                value: "000-00-4320"
            }],
        contactMethods: [{
                type: "email",
                value: "jane.doe@example.com"
            }]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.UpdateContactsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ContactsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.boarding.contacts.<a href="/src/api/resources/boarding/resources/contacts/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to delete a contact associated with a processing account.  

To delete a contact, you need their contactId. Our gateway returned the contactId in the response of the [Create Processing Account](https://docs.payroc.com/api/schema/boarding/merchant-platforms/create-processing-account) method.  

**Note:** If you don’t have the contactId, use our [Retrieve Processing Account](https://docs.payroc.com/api/schema/boarding/processing-accounts/retrieve) method or our [List Contacts](https://docs.payroc.com/api/schema/boarding/processing-accounts/list-contacts) method to search for the contact.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.contacts.delete({
    contactId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.DeleteContactsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ContactsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Boarding TerminalOrders
<details><summary><code>client.boarding.terminalOrders.<a href="/src/api/resources/boarding/resources/terminalOrders/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.TerminalOrder</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a terminal order.  

To retrieve a terminal order, you need it's terminalOrderId. Our gateway returned the terminalOrderId in the response of the [Create Terminal Order](https://docs.payroc.com/api/schema/boarding/processing-accounts/create-terminal-order) method.  

**Note**: If you don't have the terminalOrderId, use our [List Terminal Orders](https://docs.payroc.com/api/schema/boarding/processing-accounts/list-terminal-orders) method to search for the terminal order.  

Our gateway returns the following information about the terminal order:  
- Status of the order  
- Items in the order  
- Training provider  
- Shipping information  

**Note**: You can subscribe to our terminalOrder.status.changed event to get notifications when we update the status of a terminal order. For more information about how to subscribe to events, go to [Events Subscriptions](https://docs.payroc.com/guides/integrate/event-subscriptions).  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.boarding.terminalOrders.retrieve({
    terminalOrderId: "12345"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.boarding.RetrieveTerminalOrdersRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TerminalOrdersClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## CardPayments Payments
<details><summary><code>client.cardPayments.payments.<a href="/src/api/resources/cardPayments/resources/payments/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.RetrievedPayment, Payroc.PaymentPaginatedListForRead></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of payments. 

**Note:** If you want to view the details of a specific payment and you have its paymentId, use our [Retrieve Payment](https://docs.payroc.com/api/schema/card-payments/payments/retrieve) method.  

Use query parameters to filter the list of results that we return, for example, to search for payments for a customer, a tip mode, or a date range.  

Our gateway returns the following information about each payment in the list:  

- Order details, including the transaction amount and when it was processed.  
- Payment card details, including the masked card number, expiry date, and payment method. 
- Cardholder details, including their contact information and shipping address. 
- Payment details, including the payment type, status, and response. 
 
For each transaction, we also return the paymentId and an optional secureTokenId, which you can use to perform follow-on actions. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.cardPayments.payments.list({
    processingTerminalId: "1234001",
    orderId: "OrderRef6543",
    operator: "Jane",
    cardholderName: "Sarah%20Hazel%20Hopper",
    first6: "453985",
    last4: "7062",
    tender: "ebt",
    dateFrom: "2024-07-01T15:30:00Z",
    dateTo: "2024-07-03T15:30:00Z",
    settlementState: "settled",
    settlementDate: "2024-07-02",
    paymentLinkId: "JZURRJBUPS",
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.cardPayments.payments.list({
    processingTerminalId: "1234001",
    orderId: "OrderRef6543",
    operator: "Jane",
    cardholderName: "Sarah%20Hazel%20Hopper",
    first6: "453985",
    last4: "7062",
    tender: "ebt",
    dateFrom: "2024-07-01T15:30:00Z",
    dateTo: "2024-07-03T15:30:00Z",
    settlementState: "settled",
    settlementDate: "2024-07-02",
    paymentLinkId: "JZURRJBUPS",
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.cardPayments.ListPaymentsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.cardPayments.payments.<a href="/src/api/resources/cardPayments/resources/payments/client/Client.ts">create</a>({ ...params }) -> Payroc.Payment</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to run a sale or a pre-authorization with a customer's payment card. 

In the response, our gateway returns information about the card payment and a paymentId, which you need for the following methods:

-	[Retrieve payment](https://docs.payroc.com/api/schema/card-payments/payments/retrieve) - View the details of the card payment.
-	[Adjust payment](https://docs.payroc.com/api/schema/card-payments/payments/adjust) - Update the details of the card payment.
-	[Capture payment](https://docs.payroc.com/api/schema/card-payments/payments/capture)  - Capture the pre-authorization.
-	[Reverse payment](https://docs.payroc.com/api/schema/card-payments/refunds/reverse)  - Cancel the card payment if it's in an open batch.
-	[Refund payment](https://docs.payroc.com/api/schema/card-payments/refunds/create-referenced-refund)  - Run a referenced refund to return funds to the payment card.

**Payment methods** 

- **Cards** - Credit, debit, and EBT
- **Digital wallets** - [Apple Pay®](https://docs.payroc.com/guides/integrate/apple-pay) and [Google Pay®](https://docs.payroc.com/guides/integrate/google-pay) 
- **Tokens** - Secure tokens and single-use tokens

**Features** 

Our Create Payment method also supports the following features: 

- [Repeat payments](https://docs.payroc.com/guides/integrate/repeat-payments/use-your-own-software) - Run multiple payments as part of a payment schedule that you manage with your own software. 
- **Offline sales** - Run a sale or a pre-authorization if the terminal loses its connection to our gateway. 
- [Tokenization](https://docs.payroc.com/guides/integrate/save-payment-details) - Save card details to use in future transactions. 
- [3-D Secure](https://docs.payroc.com/guides/integrate/3-d-secure) - Verify the identity of the cardholder. 
- [Custom fields](https://docs.payroc.com/guides/integrate/add-custom-fields) - Add your own data to a payment. 
- **Tips** - Add tips to the card payment.  
- **Taxes** - Add local taxes to the card payment. 
- **Surcharging** - Add a surcharge to the card payment. 
- **Dual pricing** - Offer different prices based on payment method, for example, if you use our RewardPay Choice pricing program. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.cardPayments.payments.create({
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

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.cardPayments.PaymentRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.cardPayments.payments.<a href="/src/api/resources/cardPayments/resources/payments/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.RetrievedPayment</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a card payment.  

To retrieve a payment, you need its paymentId. Our gateway returned the paymentId in the response of the [Create Payment](https://docs.payroc.com/api/schema/card-payments/payments/create) method.  

**Note:** If you don't have the paymentId, use our [List Payments](https://docs.payroc.com/api/schema/card-payments/payments/list) method to search for the payment.  

Our gateway returns the following information about the payment:  

- Order details, including the transaction amount and when it was processed.  
- Payment card details, including the masked card number, expiry date, and payment method.  
- Cardholder details, including their contact information and shipping address.  
- Payment details, including the payment type, status, and response.  

If the merchant saved the customer's card details, our gateway returns a secureTokenID, which you can use to perform follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.cardPayments.payments.retrieve({
    paymentId: "M2MJOG6O2Y"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.cardPayments.RetrievePaymentsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.cardPayments.payments.<a href="/src/api/resources/cardPayments/resources/payments/client/Client.ts">adjust</a>({ ...params }) -> Payroc.Payment</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to adjust a payment in an open batch. 

To adjust a payment, you need its paymentId. Our gateway returned the paymentId in the response of the [Create Payment](https://docs.payroc.com/api/schema/card-payments/payments/create) method.

**Note:** If you don't have the paymentId, use our [List Payments](https://docs.payroc.com/api/schema/card-payments/payments/list) method to search for the payment. 

You can adjust the following details of the payment:
- Sale amount and tip amount
- Payment status
- Cardholder shipping address and contact information
- Cardholder signature data

Our gateway returns information about the adjusted payment, including information about the payment card and the cardholder.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.cardPayments.payments.adjust({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    paymentId: "M2MJOG6O2Y",
    adjustments: [{
            type: "customer"
        }, {
            type: "order",
            amount: 4999
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.cardPayments.PaymentAdjustment` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.cardPayments.payments.<a href="/src/api/resources/cardPayments/resources/payments/client/Client.ts">capture</a>({ ...params }) -> Payroc.Payment</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to capture a pre-authorization. 

To capture a pre-authorization, you need its paymentId. Our gateway returned the paymentId in the response of the [Create Payment](https://docs.payroc.com/api/schema/card-payments/payments/create) method.

**Note:** If you don't have the paymentId, use our [List Payments](https://docs.payroc.com/api/schema/card-payments/payments/list) method to search for the payment.

Depending on the amount you want to capture, complete the following:
-	**Capture the full amount of the pre-authorization** - Don't send a value for the amount parameter in your request.
-	**Capture less than the amount of the pre-authorization** - Send a value for the amount parameter in your request. 
-	**Capture more than the amount of the pre-authorization** - Adjust the pre-authorization before you capture it. For more information about adjusting a pre-authorization, go to [Adjust Payment](https://docs.payroc.com/api/schema/card-payments/payments/adjust).

If your request is successful, our gateway takes the amount from the payment card. 

**Note:** For more information about pre-authorizations and captures, go to [Run a pre-authorization](https://docs.payroc.com/guides/integrate/run-a-pre-authorization).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.cardPayments.payments.capture({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    paymentId: "M2MJOG6O2Y",
    processingTerminalId: "1234001",
    operator: "Jane",
    amount: 4999,
    breakdown: {
        subtotal: 4999,
        dutyAmount: 499,
        freightAmount: 500,
        items: [{
                unitPrice: 4000,
                quantity: 1
            }]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.cardPayments.PaymentCapture` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## CardPayments Refunds
<details><summary><code>client.cardPayments.refunds.<a href="/src/api/resources/cardPayments/resources/refunds/client/Client.ts">reverse</a>({ ...params }) -> Payroc.Payment</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to cancel or to partially cancel a payment in an open batch. This is also known as voiding a payment.  

To cancel a payment, you need its paymentId. Our gateway returned the paymentId in the response of the [Create Payment](https://docs.payroc.com/api/schema/card-payments/payments/create) method.  

**Note:** If you don't have the paymentId, use our [List Payments](https://docs.payroc.com/api/schema/card-payments/payments/list) method to search for the payment.  

If your request is successful, our gateway removes the payment from the merchant's open batch and no funds are taken from the cardholder's account. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.cardPayments.refunds.reverse({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    paymentId: "M2MJOG6O2Y",
    amount: 4999
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.cardPayments.PaymentReversal` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.cardPayments.refunds.<a href="/src/api/resources/cardPayments/resources/refunds/client/Client.ts">createReferencedRefund</a>({ ...params }) -> Payroc.Payment</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to refund a payment that is in a closed batch.  

To refund a payment, you need its paymentId. Our gateway returned the paymentId in the response of the [Create Payment](https://docs.payroc.com/api/schema/card-payments/payments/create) method.  

**Note:** If you don't have the paymentId, use our [List Payments](https://docs.payroc.com/api/schema/card-payments/payments/list) method to search for the payment.  

If your refund is successful, our gateway returns the payment amount to the cardholder's account.  

**Things to consider**  

- If the merchant refunds a payment that is in an open batch, our gateway reverses the payment.
- Some merchants can run unreferenced refunds, which means that they don't need a paymentId to return an amount to a customer. For more information about how to run an unreferenced refund, go to [Create Refund](https://docs.payroc.com/api/schema/card-payments/refunds/create-unreferenced-refund).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.cardPayments.refunds.createReferencedRefund({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    paymentId: "M2MJOG6O2Y",
    amount: 4999,
    description: "Refund for order OrderRef6543"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.cardPayments.ReferencedRefund` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.cardPayments.refunds.<a href="/src/api/resources/cardPayments/resources/refunds/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.RetrievedRefund, Payroc.RefundPaginatedList></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of refunds.  

**Note:** If you want to view the details of a specific refund and you have its refundId, use our [Retrieve Refund](https://docs.payroc.com/api/schema/card-payments/refunds/retrieve) method.  

Use query parameters to filter the list of results that we return, for example, to search for refunds for a customer, a tender type, or a date range.
Our gateway returns the following information about each refund in the list:  
- Order details, including the refund amount and when we processed the refund.
- Payment card details, including the masked card number, expiry date, and payment method.
- Cardholder details, including their contact information and shipping address.  

For referenced refunds, our gateway also returns details about the payment that the refund is linked to.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.cardPayments.refunds.list({
    processingTerminalId: "1234001",
    orderId: "OrderRef6543",
    operator: "Jane",
    cardholderName: "Sarah%20Hazel%20Hopper",
    first6: "453985",
    last4: "7062",
    tender: "ebt",
    dateFrom: "2024-07-01T15:30:00Z",
    dateTo: "2024-07-03T15:30:00Z",
    settlementState: "settled",
    settlementDate: "2024-07-02",
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.cardPayments.refunds.list({
    processingTerminalId: "1234001",
    orderId: "OrderRef6543",
    operator: "Jane",
    cardholderName: "Sarah%20Hazel%20Hopper",
    first6: "453985",
    last4: "7062",
    tender: "ebt",
    dateFrom: "2024-07-01T15:30:00Z",
    dateTo: "2024-07-03T15:30:00Z",
    settlementState: "settled",
    settlementDate: "2024-07-02",
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.cardPayments.ListRefundsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.cardPayments.refunds.<a href="/src/api/resources/cardPayments/resources/refunds/client/Client.ts">createUnreferencedRefund</a>({ ...params }) -> Payroc.RetrievedRefund</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to create an unreferenced refund. An unreferenced refund is a refund that isn't linked to a payment.  

**Note:** If you have the paymentId of the payment you want to refund, use our [Refund Payment](https://docs.payroc.com/api/schema/card-payments/refunds/create-referenced-refund) method. If you use our Refund Payment method, our gateway sends the refund amount to the customer's original payment method and links the refund to the payment.  

In the request, you must provide the customer's payment details and the refund amount.  

In the response, our gateway returns information about the refund and a refundId, which you need for the following methods:  

- [Retrieve refund](https://docs.payroc.com/api/schema/card-payments/refunds/retrieve) - View the details of the refund.  
- [Adjust refund](https://docs.payroc.com/api/schema/card-payments/refunds/adjust) - Update the details of the refund.  
- [Reverse refund](https://docs.payroc.com/api/schema/card-payments/refunds/reverse-refund) - Cancel the refund if it's in an open batch.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.cardPayments.refunds.createUnreferencedRefund({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    channel: "pos",
    processingTerminalId: "1234001",
    order: {
        orderId: "OrderRef6543",
        description: "Refund for order OrderRef6543",
        amount: 4999,
        currency: "USD"
    },
    refundMethod: {
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

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.cardPayments.UnreferencedRefund` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.cardPayments.refunds.<a href="/src/api/resources/cardPayments/resources/refunds/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.RetrievedRefund</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a refund.  

To retrieve a refund, you need its refundId. Our gateway returned the refundId in the response of the [Refund Payment](https://docs.payroc.com/api/schema/card-payments/refunds/create-referenced-refund) method or the [Create Refund](https://docs.payroc.com/api/schema/card-payments/refunds/create-unreferenced-refund) method.  

**Note:** If you don't have the refundId, use our [List Refunds](https://docs.payroc.com/api/schema/card-payments/refunds/list) method to search for the refund.  

Our gateway returns the following information about the refund:  
- Order details, including the refund amount and when we processed the refund.
- Payment card details, including the masked card number, expiry date, and payment method.
- Cardholder details, including their contact information and shipping address.  

If the refund is a referenced refund, our gateway also returns details about the payment that the refund is linked to.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.cardPayments.refunds.retrieve({
    refundId: "CD3HN88U9F"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.cardPayments.RetrieveRefundsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.cardPayments.refunds.<a href="/src/api/resources/cardPayments/resources/refunds/client/Client.ts">adjust</a>({ ...params }) -> Payroc.RetrievedRefund</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to adjust a refund in an open batch.  

To adjust a refund, you need its refundId. Our gateway returned the refundId in the response of the [Refund Payment](https://docs.payroc.com/api/schema/card-payments/refunds/create-referenced-refund) method or the [Create Refund](https://docs.payroc.com/api/schema/card-payments/refunds/create-unreferenced-refund) method.  

**Note:** If you don’t have the refundId, use our [List Refunds](https://docs.payroc.com/api/schema/card-payments/refunds/list) method to search for the refund.  

You can adjust the following details of the refund:
- Customer details, including shipping address and contact information.
- Status of the refund.  

Our gateway returns information about the adjusted refund, including:
- Order details, including the refund amount and when we processed the refund.
- Payment card details, including the masked card number, expiry date, and payment method.
- Cardholder details, including their contact information and shipping address.  

If the refund is a referenced refund, our gateway also returns details about the payment that the refund is linked to.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.cardPayments.refunds.adjust({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    refundId: "CD3HN88U9F",
    operator: "Jane",
    adjustments: [{
            type: "customer"
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.cardPayments.RefundAdjustment` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.cardPayments.refunds.<a href="/src/api/resources/cardPayments/resources/refunds/client/Client.ts">reverseRefund</a>({ ...params }) -> Payroc.RetrievedRefund</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to cancel a refund in an open batch.  

To cancel a refund, you need its refundId. Our gateway returned the refundId in the response of the [Refund Payment](https://docs.payroc.com/api/schema/card-payments/refunds/create-referenced-refund) or [Create Refund](https://docs.payroc.com/api/schema/card-payments/refunds/create-unreferenced-refund) method.  

**Note:** If you don’t have the refundId, use our [List Refunds](https://docs.payroc.com/api/schema/card-payments/refunds/list) method to search for the refund.  

If your request is successful, the gateway removes the refund from the merchant’s open batch and no funds are returned to the cardholder’s account.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.cardPayments.refunds.reverseRefund({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    refundId: "CD3HN88U9F"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.cardPayments.ReverseRefundRefundsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Funding FundingRecipients
<details><summary><code>client.funding.fundingRecipients.<a href="/src/api/resources/funding/resources/fundingRecipients/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.FundingRecipient, Payroc.PaginatedFundRecipients></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of funding recipients linked to your account.  

Note: If you want to view the details of a specific funding recipient and you have its recipientId, use our [Retrieve Funding Recipient](https://docs.payroc.com/api/schema/funding/funding-recipients/retrieve) method.  

Our gateway returns the following information about each funding recipient in the list:  
- Tax ID and Doing Business As (DBA) name.  
- Address and contact details.  
- Funding accounts linked to the funding recipient.  

For each funding recipient, we also return the recipientId, which you can use to perform follow-on actions.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.funding.fundingRecipients.list({
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.funding.fundingRecipients.list({
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.ListFundingRecipientsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingRecipientsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingRecipients.<a href="/src/api/resources/funding/resources/fundingRecipients/client/Client.ts">create</a>({ ...params }) -> Payroc.FundingRecipient</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to create a funding recipient. 

A funding recipient is a business or organization that can receive funds but can't run transactions, for example, a charity.  

In the request, include the following information:  
-	Legal information, including its tax ID, Doing Business As (DBA) name, and address.  
-	Contact information, including the email address.  
-	Owners' details, including their contact details. 
-	Funding account details.  

Our gateway returns the recipientId of the funding recipient, which you can use to run follow-on actions. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingRecipients.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    recipientType: "privateCorporation",
    taxId: "123456789",
    doingBusinessAs: "doingBusinessAs",
    address: {
        address1: "1 Example Ave.",
        city: "Chicago",
        state: "Illinois",
        country: "US",
        postalCode: "60056"
    },
    contactMethods: [{
            type: "email",
            value: "jane.doe@example.com"
        }],
    owners: [{
            firstName: "Jane",
            lastName: "Doe",
            dateOfBirth: "1964-03-22",
            address: {
                address1: "1 Example Ave.",
                city: "Chicago",
                state: "Illinois",
                country: "US",
                postalCode: "60056"
            },
            identifiers: [{
                    type: "nationalId",
                    value: "xxxxx4320"
                }],
            contactMethods: [{
                    type: "email",
                    value: "jane.doe@example.com"
                }],
            relationship: {
                isControlProng: true
            }
        }],
    fundingAccounts: [{
            type: "checking",
            use: "credit",
            nameOnAccount: "Jane Doe",
            paymentMethods: [{
                    type: "ach"
                }]
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.CreateFundingRecipient` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingRecipientsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingRecipients.<a href="/src/api/resources/funding/resources/fundingRecipients/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.FundingRecipient</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a funding recipient.  

To retrieve a funding recipient, you need its recipientId. Our gateway returned the recipientId in the response of the [Create Funding Recipient](https://docs.payroc.com/api/schema/funding/funding-recipients/create) method.  

**Note:** If you don't have the recipientId, use our [List Funding Recipients](https://docs.payroc.com/api/schema/funding/funding-recipients/list) method to search for the funding recipient.  

Our gateway returns the following information about the funding recipient:  

- Tax ID and Doing Business As (DBA) name.  
- Address and contact details.  
- Funding accounts linked to the funding recipient.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingRecipients.retrieve({
    recipientId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.RetrieveFundingRecipientsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingRecipientsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingRecipients.<a href="/src/api/resources/funding/resources/fundingRecipients/client/Client.ts">update</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to update the details of a funding recipient. If a request contains significant changes, we might need to re-approve the funding recipient.  

To update a funding recipient, you need it's recipientId. Our gateway returned the recipientId in the response of the [Create Funding Recipient](https://docs.payroc.com/api/schema/funding/funding-recipients/create) method.  

**Note**: If you don't have the recipientId, use our [List Funding Recipients](https://docs.payroc.com/api/schema/funding/funding-recipients/list) method to search for the funding recipient.  

You can update the following details of a funding recipient:  
- Doing Business As (DBA) name  
- Tax ID and charity ID  
- Address and contact methods  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingRecipients.update({
    recipientId: 1,
    body: {
        recipientType: "privateCorporation",
        taxId: "123456789",
        doingBusinessAs: "doingBusinessAs",
        address: {
            address1: "1 Example Ave.",
            city: "Chicago",
            state: "Illinois",
            country: "US",
            postalCode: "60056"
        },
        contactMethods: [{
                type: "email",
                value: "jane.doe@example.com"
            }]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.UpdateFundingRecipientsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingRecipientsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingRecipients.<a href="/src/api/resources/funding/resources/fundingRecipients/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to delete a funding recipient, including its funding accounts and owners.  

To delete a funding recipient, you need its recipientId. Our gateway returned the recipientId in the response of the [Create Funding Recipient](https://docs.payroc.com/api/schema/funding/funding-recipients/create) method.   

**Note**: If you don't have the recipientId, use our [List Funding Recipients](https://docs.payroc.com/api/schema/funding/funding-recipients/list) method to search for the funding recipient.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingRecipients.delete({
    recipientId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.DeleteFundingRecipientsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingRecipientsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingRecipients.<a href="/src/api/resources/funding/resources/fundingRecipients/client/Client.ts">listAccounts</a>({ ...params }) -> Payroc.FundingAccount[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use  this method to return a list of funding accounts associated with a funding recipient.  

**Note:** If you want to view the details of a specific funding account and you have its fundingAccountId, use our [Retrieve Funding Account](https://docs.payroc.com/api/schema/funding/funding-accounts/retrieve) method.  

To retrieve the funding accounts associated with a funding recipient, you need the recipientId. If you don't have the recipientId, use our [List Funding Recipients](https://docs.payroc.com/api/schema/funding/funding-recipients/list) method to search for the funding recipient.  
        
Our gateway returns the following information about each funding account:  
-	Name of the account holder.  
-	ACH details for the account.  
-	Status of the account.  

Our gateway also returns the fundingAccountId, which you can use to run follow-on actions.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingRecipients.listAccounts({
    recipientId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.ListFundingRecipientFundingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingRecipientsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingRecipients.<a href="/src/api/resources/funding/resources/fundingRecipients/client/Client.ts">createAccount</a>({ ...params }) -> Payroc.FundingAccount</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to create a funding account and add it to a funding recipient.  

To add a funding account to a funding recipient, you need the recipientId. Our gateway returned the recipientId in the response of the [Create Funding Recipient](https://docs.payroc.com/api/schema/funding/funding-recipients/create) method.  

**Note:** If you don't have the recipientId, use our [List Funding Recipients](https://docs.payroc.com/api/schema/funding/funding-recipients/list) method to search for the funding recipient.  

In the request, include the following information:  
-	Account type, for example, if the account is a checking or savings account.  
-	Account holder's name.  
-	ACH information, including the routing number and account number of the account.  

Our gateway returns the fundingAccountId, which you can use to run follow-on actions.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingRecipients.createAccount({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    recipientId: 1,
    body: {
        type: "checking",
        use: "credit",
        nameOnAccount: "Jane Doe",
        paymentMethods: [{
                type: "ach"
            }]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.CreateAccountFundingRecipientsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingRecipientsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingRecipients.<a href="/src/api/resources/funding/resources/fundingRecipients/client/Client.ts">listOwners</a>({ ...params }) -> Payroc.Owner[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a list of owners of a funding recipient.  

**Note:** If you want to view the details of a specific owner and you have their ownerId, use our [Retrieve Owner](https://docs.payroc.com/api/schema/boarding/owners/retrieve) method.  

To list the owners of a funding recipient, you need its recipientId. Our gateway returned the recipientId in the response of the [Create Funding Recipient](https://docs.payroc.com/api/schema/funding/funding-recipients/create) method. If you don't have the recipientId, use our [List Funding Recipients](https://docs.payroc.com/api/schema/funding/funding-recipients/list) method to search for the funding recipient.  

Our gateway returns the following information about each owner in the list:  
-	Name, date of birth, and address.  
-	Contact details, including their email address.  
-	Relationship to the funding recipient.  

Our gateway also returns the ownerId, which you can use to perform follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingRecipients.listOwners({
    recipientId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.ListFundingRecipientOwnersRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingRecipientsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingRecipients.<a href="/src/api/resources/funding/resources/fundingRecipients/client/Client.ts">createOwner</a>({ ...params }) -> Payroc.Owner</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to add an additional owner to a funding recipient.  

To add an owner to a funding recipient, you need the recipientId. Our gateway returned the recipientId in the response of the [Create Funding Recipient](https://docs.payroc.com/api/schema/funding/funding-recipients/create) method.  

**Note:** If you don't have the recipientId, use our [List Funding Recipients](https://docs.payroc.com/api/schema/funding/funding-recipients/list) method to search for the funding recipient.  

In the request, include the following information about the owner:  

- Name, date of birth, and address.  
- Contact details, including their email address.  
- Relationship to the funding recipient, including whether they are a control prong.  

In the response, our gateway returns the ownerId, which you can use to run follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingRecipients.createOwner({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    recipientId: 1,
    body: {
        firstName: "Jane",
        lastName: "Doe",
        dateOfBirth: "1964-03-22",
        address: {
            address1: "1 Example Ave.",
            city: "Chicago",
            state: "Illinois",
            country: "US",
            postalCode: "60056"
        },
        identifiers: [{
                type: "nationalId",
                value: "xxxxx4320"
            }],
        contactMethods: [{
                type: "email",
                value: "jane.doe@example.com"
            }],
        relationship: {
            isControlProng: true
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.CreateOwnerFundingRecipientsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingRecipientsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Funding FundingAccounts
<details><summary><code>client.funding.fundingAccounts.<a href="/src/api/resources/funding/resources/fundingAccounts/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.FundingAccount, Payroc.ListFundingAccounts></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of funding accounts associated with your account.  

**Note:** If you want to view the details of a specific funding account and you have its fundingAccountId, use our [Retrieve Funding Account](https://docs.payroc.com/api/schema/funding/funding-accounts/retrieve) method.  

Our gateway returns the following information about each funding account in the list:  
- Name of the account holder and ACH details for the account.  
- Status of the account.  
- Whether we send funds to the account, withdraw funds from the account, or both.  

For each funding account, we also return the fundingAccountId, which you can use to perform follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.funding.fundingAccounts.list({
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.funding.fundingAccounts.list({
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.ListFundingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingAccounts.<a href="/src/api/resources/funding/resources/fundingAccounts/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.FundingAccount</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a funding account.  

To retrieve a funding account, you need its fundingAccountId. Our gateway returned the fundingAccountId when you created the funding account.  

**Note:** If you don't have the fundingAccountId, use our [List Funding Accounts](https://docs.payroc.com/api/schema/funding/funding-accounts/list) method to search for the account.  

Our gateway returns the following information about the funding account:  
- Name of the account holder and ACH details for the account.  
- Status of the account.  
- Whether we send funds to the account, withdraw funds from the account, or both.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingAccounts.retrieve({
    fundingAccountId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.RetrieveFundingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingAccounts.<a href="/src/api/resources/funding/resources/fundingAccounts/client/Client.ts">update</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

> **Important:** You can't update the details of a funding account that is associated with a processing account.  

Use this method to update the details of a funding account that is associated with a funding recipient.  

To update a funding account, you need its fundingAccountId. Our gateway returned the fundingAccountId when you created the funding account.  

**Note:** If you don’t have the fundingAccountId, use our [List Funding Accounts](https://docs.payroc.com/api/schema/funding/funding-accounts/list) method to search for the funding account.  

You can update the following details about the funding account: 
-	Account type. 
-	Account holder's name. 
-	ACH information for the account. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingAccounts.update({
    fundingAccountId: 1,
    body: {
        type: "checking",
        use: "credit",
        nameOnAccount: "Jane Doe",
        paymentMethods: [{
                type: "ach"
            }]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.UpdateFundingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingAccounts.<a href="/src/api/resources/funding/resources/fundingAccounts/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

> **Important:** You can't delete a funding account that is associated with a processing account.  

Use this method to delete a funding account that is associated with a funding recipient.  

To delete a funding account, you need its fundingAccountId. Our gateway returned the fundingAccountId when you created the funding account.  

**Note:** If you don't have the fundingAccountId, use our [List Funding Accounts](https://docs.payroc.com/api/schema/funding/funding-accounts/list) method to search for the funding account.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingAccounts.delete({
    fundingAccountId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.DeleteFundingAccountsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingAccountsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Funding FundingInstructions
<details><summary><code>client.funding.fundingInstructions.<a href="/src/api/resources/funding/resources/fundingInstructions/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.ListFundingInstructionsResponse.Data.Item, Payroc.ListFundingInstructionsResponse></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

> Important: You can return a list of funding instructions from only the previous two years. If you want to view a funding instruction from more than two years ago and you have its instructionId, use our [Retrieve Funding Instruction](https://docs.payroc.com/api/schema/funding/funding-instructions/retrieve) method.  

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of funding instructions within a specific date range.  

**Note:** If you want to view the details of a specific funding instruction and you have its instructionId, use our [Retrieve Funding Instruction](https://docs.payroc.com/api/schema/funding/funding-instructions/retrieve) method.  

Our gateway returns the following information for each instruction in the list:  
-	Status of the funding instruction.  
-	Funding information, including which merchant's funding balance we distribute and the funding account that we send the balance to.  

For each funding instruction, we also return the instructionId, which you can use to perform follow-on actions. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.funding.fundingInstructions.list({
    before: "2571",
    after: "8516",
    limit: 1,
    dateFrom: "2024-07-01",
    dateTo: "2024-07-03"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.funding.fundingInstructions.list({
    before: "2571",
    after: "8516",
    limit: 1,
    dateFrom: "2024-07-01",
    dateTo: "2024-07-03"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.ListFundingInstructionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingInstructions.<a href="/src/api/resources/funding/resources/fundingInstructions/client/Client.ts">create</a>({ ...params }) -> Payroc.Instruction</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to create a funding instruction that tells us how to distribute the funds from your merchants' transactions.  

**Note:** Before you create a funding instruction, you can use our [List Funding Balances](https://docs.payroc.com/api/schema/funding/funding-activity/retrieve-balance) method to view the amount of available funds that a merchant has.  

In your request, include an array of merchantInstruction objects. Each merchantInstruction object contains the following:  
-	Merchant ID (MID) of the merchant whose funding balance you want to distribute.  
-	Funding account that you want to send funds to.  
-	Amount that you want to send to the funding account.  

Our gateway returns the instructionId, which you can use to run follow-on actions.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingInstructions.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    body: {}
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.CreateFundingInstructionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingInstructions.<a href="/src/api/resources/funding/resources/fundingInstructions/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.Instruction</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a funding instruction.  

To retrieve a funding instruction, you need its instructionId. Our gateway returned the instructionId in the response of the [Create Funding Instruction](https://docs.payroc.com/api/schema/funding/funding-instructions/create) method. 

**Note:** If you don't have the instructionId, use our [List Funding Instructions](https://docs.payroc.com/api/schema/funding/funding-instructions/list) method to search for the funding instruction.  

Our gateway returns the following information about the funding instruction:  
-	Status of the funding instruction.  
-	Funding information, including which merchant's funding balance we distribute and the funding account that we send the balance to.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingInstructions.retrieve({
    instructionId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.RetrieveFundingInstructionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingInstructions.<a href="/src/api/resources/funding/resources/fundingInstructions/client/Client.ts">update</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

> **Important:** You can update a funding instruction only if its status is `accepted`. To view the status of a funding instruction, use our [Retrieve Funding Instruction](https://docs.payroc.com/api/schema/funding/funding-instructions/retrieve) method. 

Use this method to update the details of a funding instruction.  

To update a funding instruction, you need its instructionId. Our gateway returned the instructionId in the response of the [Create Funding Instruction](https://docs.payroc.com/api/schema/funding/funding-instructions/create) method.  

**Note:** If you don't have the fundingInstructionId, use our [List Funding Instructions](https://docs.payroc.com/api/schema/funding/funding-instructions/list) method to search for the funding instruction.  

You can modify the following information for the funding instruction:  
-	Merchant ID (MID) of the merchant whose funding balance you want to distribute.  
-	Funding account that you want to send funds to.  
-	Amount that you want to send to the funding account.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingInstructions.update({
    instructionId: 1,
    body: {}
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.UpdateFundingInstructionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingInstructions.<a href="/src/api/resources/funding/resources/fundingInstructions/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

> **Important:** You can delete a funding instruction only if its status is `accepted`. To view the status of a funding instruction, use our [Retrieve Funding Instruction](https://docs.payroc.com/api/schema/funding/funding-instructions/retrieve) method.  

Use this method to delete a funding instruction.  

To delete a funding instruction, you need its instructionId. Our gateway returned the instructionId in the response of the [Create Funding Instruction](https://docs.payroc.com/api/schema/funding/funding-instructions/create) method.  

**Note:** If you don't have the instructionId, use our [List Funding Instructions](https://docs.payroc.com/api/schema/funding/funding-instructions/list) method to search for the funding instruction.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingInstructions.delete({
    instructionId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.DeleteFundingInstructionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Funding FundingActivity
<details><summary><code>client.funding.fundingActivity.<a href="/src/api/resources/funding/resources/fundingActivity/client/Client.ts">retrieveBalance</a>({ ...params }) -> Payroc.RetrieveBalanceFundingActivityResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of funding balances available for each merchant linked to your account.  

Use query parameters to filter the list of results we return, for example, to search for the funding balance for a specific merchant.  

Our gateway returns the following information about each merchant in the list:  
- Total funds for the merchant.  
- Available funds that you can use for funding instructions.  
- Pending funds that we have not yet sent to funding accounts.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.funding.fundingActivity.retrieveBalance({
    before: "2571",
    after: "8516",
    limit: 1,
    merchantId: "4525644354"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.RetrieveBalanceFundingActivityRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingActivityClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.funding.fundingActivity.<a href="/src/api/resources/funding/resources/fundingActivity/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.ActivityRecord, Payroc.ListFundingActivityResponse></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of activity associated with your merchants' funding balances within a specific date range.  

Use query parameters to filter the list of results we return, for example, to view the activity for a specific merchant's funding balance.  

Our gateway returns the following information about each activity in the list:
- Name of the merchant who owns the funding balance.
-	Amount of funds added or removed from the funding balance.
-	Funding account that received funds from the funding balance.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.funding.fundingActivity.list({
    before: "2571",
    after: "8516",
    limit: 1,
    dateFrom: "2024-07-02",
    dateTo: "2024-07-03",
    merchantId: "4525644354"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.funding.fundingActivity.list({
    before: "2571",
    after: "8516",
    limit: 1,
    dateFrom: "2024-07-02",
    dateTo: "2024-07-03",
    merchantId: "4525644354"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.funding.ListFundingActivityRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FundingActivityClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Notifications EventSubscriptions
<details><summary><code>client.notifications.eventSubscriptions.<a href="/src/api/resources/notifications/resources/eventSubscriptions/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.EventSubscription, Payroc.PaginatedEventSubscriptions></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of event subscriptions that are linked to your ISV account.  

**Note:** If you want to view the details of a specific event subscription and you have its id, use our [Retrieve Event Subscription](https://docs.payroc.com/api/schema/notifications/event-subscriptions/retrieve) method.  

Use query parameters to filter the list of results that we return, for example, to search for subscriptions with a specific status or an event type.  

Our gateway returns the following information about each subscription in the list:  
- Event types that you have subscribed to.  
- Whether you have enabled notifications for the subscription.  
- How we contact you when an event occurs, including the endpoint that send notifications to.  
- If there are any issues when we try to send you a notification, for example, if we can't contact your endpoint.  

For each event subscription, we also return its id, which you can use to perform follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.notifications.eventSubscriptions.list({
    status: "registered",
    event: "processingAccount.status.changed"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.notifications.eventSubscriptions.list({
    status: "registered",
    event: "processingAccount.status.changed"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.notifications.ListEventSubscriptionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EventSubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.notifications.eventSubscriptions.<a href="/src/api/resources/notifications/resources/eventSubscriptions/client/Client.ts">create</a>({ ...params }) -> Payroc.EventSubscription</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to create an event subscription that we use to notify you when an event occurs, for example, when we change the status of a processing account.  

In the request, include the events that you want to subscribe to and the public endpoint that we send event notifications to. For a complete list of events that you can subscribe to, go to [Events List](https://docs.payroc.com/knowledge/events/events-list).  

In the response, our gateway returns the id of the event subscription, which you can use to perform follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notifications.eventSubscriptions.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    body: {
        enabled: true,
        eventTypes: ["processingAccount.status.changed"],
        notifications: [{
                type: "webhook",
                uri: "https://my-server/notification/endpoint",
                secret: "aBcD1234eFgH5678iJkL9012mNoP3456",
                supportEmailAddress: "supportEmailAddress"
            }],
        metadata: {
            "yourCustomField": "abc123"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.notifications.CreateEventSubscriptionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EventSubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.notifications.eventSubscriptions.<a href="/src/api/resources/notifications/resources/eventSubscriptions/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.EventSubscription</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve the details of an event subscription.  

In your request, include the subscriptionId that we sent to you when we created the event subscription.  
  
**Note:** If you don't know the subscriptionId of the event subscription, go to [List event subscriptions](#listEventSubscriptions).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notifications.eventSubscriptions.retrieve({
    subscriptionId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.notifications.RetrieveEventSubscriptionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EventSubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.notifications.eventSubscriptions.<a href="/src/api/resources/notifications/resources/eventSubscriptions/client/Client.ts">update</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to update the details of an event subscription.  

To update an event subscription, you need its subscriptionId. Our gateway returned the subscriptionId in the response of the [Create Event Subscription](https://docs.payroc.com/api/schema/notifications/event-subscriptions/create) method.  

**Note:** If you don’t have the subscriptionId, use our [List Event Subscriptions](https://docs.payroc.com/api/schema/notifications/event-subscriptions/list) method to search for the event subscription.  

You can update the following details about an event subscription:  

- Status of the event subscription.  
- Events that you have subscribed to. For a list of events that you can subscribe to, go to [Events list](https://docs.payroc.com/knowledge/events/events-list).  
- Information about how we contact you when an event occurs.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notifications.eventSubscriptions.update({
    subscriptionId: 1,
    body: {
        enabled: true,
        eventTypes: ["processingAccount.status.changed"],
        notifications: [{
                type: "webhook",
                uri: "https://my-server/notification/endpoint",
                secret: "aBcD1234eFgH5678iJkL9012mNoP3456",
                supportEmailAddress: "supportEmailAddress"
            }],
        metadata: {
            "yourCustomField": "abc123"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.notifications.UpdateEventSubscriptionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EventSubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.notifications.eventSubscriptions.<a href="/src/api/resources/notifications/resources/eventSubscriptions/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to delete an event subscription.  

> **Important:** After you delete an event subscription, you can’t recover it. You won't receive event notifications from the event subscription.  

To delete an event subscription, you need its subscriptionId. Our gateway returned the subscriptionId in the response of the [Create Event Subscription](https://docs.payroc.com/api/schema/notifications/event-subscriptions/create) method.  

If you want to stop receiving event notifications but don't want to delete the event subscription, use our [Update Event Subscription](https://docs.payroc.com/api/schema/notifications/event-subscriptions/update) method to deactivate it.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notifications.eventSubscriptions.delete({
    subscriptionId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.notifications.DeleteEventSubscriptionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EventSubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.notifications.eventSubscriptions.<a href="/src/api/resources/notifications/resources/eventSubscriptions/client/Client.ts">partiallyUpdate</a>({ ...params }) -> Payroc.EventSubscription</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to partially update an event subscription. Structure your request to follow the [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902) standard.  

To update an event subscription, you need its subscriptionId. Our gateway returned the subscriptionId in the id field in the response of the [Create Event Subscription](https://docs.payroc.com/api/schema/notifications/event-subscriptions/create) method.  

**Note:** If you don't have the subscriptionId, use our [List Event Subscriptions](https://docs.payroc.com/api/schema/notifications/event-subscriptions/list) method to search for the subscription.  

You can update the following properties of an event subscription:  
- **eventTypes** - Subscribe to new events or remove events that you are subscribed to.  
- **notifications** - Information about your endpoint and who we email if we can't contact your endpoint.  
- **enabled** - Turn on or turn off notifications for the subscription.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.notifications.eventSubscriptions.partiallyUpdate({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    subscriptionId: 1,
    body: [{
            op: "remove",
            path: "path"
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.notifications.PartiallyUpdateEventSubscriptionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `EventSubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## PaymentFeatures Cards
<details><summary><code>client.paymentFeatures.cards.<a href="/src/api/resources/paymentFeatures/resources/cards/client/Client.ts">verifyCard</a>({ ...params }) -> Payroc.CardVerificationResult</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to verify a customer’s card details.  

In the request, send the customer’s card details.  

In the response, our gateway indicates if the card details are valid and if you should use them in follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.paymentFeatures.cards.verifyCard({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    operator: "Jane",
    card: {
        type: "card",
        cardDetails: {
            entryMethod: "raw",
            device: {
                model: "bbposChp",
                serialNumber: "1850010868"
            },
            rawData: "A1B2C3D4E5F67890ABCD1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.paymentFeatures.CardVerificationRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CardsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.paymentFeatures.cards.<a href="/src/api/resources/paymentFeatures/resources/cards/client/Client.ts">viewEbtBalance</a>({ ...params }) -> Payroc.Balance</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to view the balance of an Electronic Benefit Transfer (EBT) card.  

If the request is successful, our gateway returns the current balance of an EBT card. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.paymentFeatures.cards.viewEbtBalance({
    processingTerminalId: "1234001",
    operator: "Jane",
    currency: "USD",
    card: {
        type: "card",
        cardDetails: {
            entryMethod: "raw",
            device: {
                model: "bbposChp",
                serialNumber: "1850010868"
            },
            rawData: "A1B2C3D4E5F67890ABCD1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.paymentFeatures.BalanceInquiry` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CardsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.paymentFeatures.cards.<a href="/src/api/resources/paymentFeatures/resources/cards/client/Client.ts">lookupBin</a>({ ...params }) -> Payroc.CardInfo</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a debit card, a credit card, or an EBT card. If you apply surcharges to transactions, you can also check if the card supports surcharging.  

In the response, our gateway returns the following information about the card:  

- **Card details** - Information about the card, for example, the issuing bank and the masked card number.  

- **Surcharging information** - If you apply a surcharge to transactions, our gateway checks that the card supports surcharging and returns information about the surcharge. For more information about surcharging, go to [Credit card surcharging](https://docs.payroc.com/knowledge/card-payments/credit-card-surcharging). 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.paymentFeatures.cards.lookupBin({
    processingTerminalId: "1234001",
    card: {
        type: "card",
        cardDetails: {
            entryMethod: "raw",
            device: {
                model: "bbposChp",
                serialNumber: "1850010868"
            },
            rawData: "A1B2C3D4E5F67890ABCD1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.paymentFeatures.BinLookup` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CardsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.paymentFeatures.cards.<a href="/src/api/resources/paymentFeatures/resources/cards/client/Client.ts">retrieveFxRates</a>({ ...params }) -> Payroc.FxRate</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

> **Important:** There are restrictions on which merchants can use this method. For more information, go to [Dynamic Currency Conversion](https://docs.payroc.com/knowledge/card-payments/dynamic-currency-conversion).  

Use this method to check if a card is eligible for Dynamic Currency Conversion (DCC) and to retrieve the conversion rate for a transaction amount. DCC provides a customer with the option to use their card's currency instead of the merchant's currency, for example, in Ireland, an American customer can pay in US dollars instead of Euros.  

The request includes the following:  

- **Payment method** - Card information, a secure token, or digital wallet.  
- **Transaction information** - Amount and currency of the transaction in the merchant's currency.  

If the card is eligible for DCC, our gateway returns the transaction amount in the card's currency and a dccOffer object that contains information about the conversion rate. The dccOffer object contains the following fields that you need when you [run a sale](https://docs.payroc.com/api/schema/card-payments/payments/create) or [unreferenced refund](https://docs.payroc.com/api/schema/card-payments/refunds/create-unreferenced-refund) with DCC:  
- fxAmount  
- fxCurrency  
- fxRate  
- markup  
- accepted  
- offerReference  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.paymentFeatures.cards.retrieveFxRates({
    channel: "web",
    processingTerminalId: "1234001",
    operator: "Jane",
    baseAmount: 10000,
    baseCurrency: "USD",
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
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.paymentFeatures.FxRateInquiry` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CardsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## PaymentFeatures Bank
<details><summary><code>client.paymentFeatures.bank.<a href="/src/api/resources/paymentFeatures/resources/bank/client/Client.ts">verify</a>({ ...params }) -> Payroc.BankAccountVerificationResult</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to verify a customer's bank account details.  

In the request, send the customer's bank account details. Our gateway can verify the following types of bank details:  
- Automated Clearing House (ACH) details  
- Pre-Authorized Debit (PAD) details  

In the response, our gateway indicates if the account details are valid and if you should use them in follow-on actions.  
  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.paymentFeatures.bank.verify({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    bankAccount: {
        type: "pad",
        nameOnAccount: "Sarah Hazel Hopper",
        accountNumber: "1234567890",
        transitNumber: "76543",
        institutionNumber: "543"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.paymentFeatures.BankAccountVerificationRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `BankClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## PaymentLinks SharingEvents
<details><summary><code>client.paymentLinks.sharingEvents.<a href="/src/api/resources/paymentLinks/resources/sharingEvents/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.PaymentLinkEmailShareEvent, Payroc.SharingEventPaginatedList></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of sharing events for a payment link. A sharing event occurs when a merchant shares a payment link with a customer.  

To list the sharing events for a payment link, you need its paymentLinkId. Our gateway returned the paymentLinkId in the response of the [Create Payment Link](https://docs.payroc.com/api/schema/payment-links/create) method.  

**Note:** If you don't have the paymentLinkId, use our [List Payment Links](https://docs.payroc.com/api/schema/payment-links/list) method to search for the payment link.  

Use query parameters to filter the list of results that we return, for example, to search for links sent to a specific customer.  

Our gateway returns the following information for each sharing event in the list:  
- Customer that the merchant sent the link to.  
- Date that the merchant sent the link.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.paymentLinks.sharingEvents.list({
    paymentLinkId: "JZURRJBUPS",
    recipientName: "Sarah Hazel Hopper",
    recipientEmail: "sarah.hopper@example.com",
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.paymentLinks.sharingEvents.list({
    paymentLinkId: "JZURRJBUPS",
    recipientName: "Sarah Hazel Hopper",
    recipientEmail: "sarah.hopper@example.com",
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.paymentLinks.ListSharingEventsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SharingEventsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.paymentLinks.sharingEvents.<a href="/src/api/resources/paymentLinks/resources/sharingEvents/client/Client.ts">share</a>({ ...params }) -> Payroc.PaymentLinkEmailShareEvent</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to email a payment link to a customer.  

To email a payment link, you need its paymentLinkId. Our gateway returned the paymentLinkId in the response of the [Create Payment Link](https://docs.payroc.com/api/schema/payment-links/create) method.  

**Note:** If you don't have the paymentLinkId, use our [List Payment Links](https://docs.payroc.com/api/schema/payment-links/list) method to search for the payment link.  

In the request, you must provide the recipient's name and email address.  

In the response, our gateway returns a sharingEventId, which you can use to [List Payment Link Sharing Events](https://docs.payroc.com/api/schema/payment-links/sharing-events/list).  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.paymentLinks.sharingEvents.share({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    paymentLinkId: "JZURRJBUPS",
    body: {
        sharingMethod: "email",
        merchantCopy: true,
        message: "Dear Sarah,\n\nYour insurance is expiring this month.\nPlease, pay the renewal fee by the end of the month to renew it.\n",
        recipients: [{
                name: "Sarah Hazel Hopper",
                email: "sarah.hopper@example.com"
            }]
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.paymentLinks.ShareSharingEventsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SharingEventsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## PayrocCloud PaymentInstructions
<details><summary><code>client.payrocCloud.paymentInstructions.<a href="/src/api/resources/payrocCloud/resources/paymentInstructions/client/Client.ts">submit</a>({ ...params }) -> Payroc.PaymentInstruction</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to submit an instruction request to initiate a sale on a payment device.  

In the request, include the order amount and currency.  

When you send a successful request, our gateway returns information about the payment instruction and a paymentInstructionId, which you need for the following methods:
- [Retrieve payment instruction](https://docs.payroc.com/api/schema/payroc-cloud/payment-instructions/retrieve) - View the details of the payment instruction.
- [Cancel payment instruction](https://docs.payroc.com/api/schema/payroc-cloud/payment-instructions/delete) - Cancel the payment instruction.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.payrocCloud.paymentInstructions.submit({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    serialNumber: "1850010868",
    operator: "Jane",
    processingTerminalId: "1234001",
    order: {
        orderId: "OrderRef6543",
        amount: 4999,
        currency: "USD"
    },
    customizationOptions: {
        entryMethod: "deviceRead"
    },
    autoCapture: true
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.payrocCloud.PaymentInstructionRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.payrocCloud.paymentInstructions.<a href="/src/api/resources/payrocCloud/resources/paymentInstructions/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.PaymentInstruction</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a payment instruction.  

To retrieve a payment instruction, you need its paymentInstructionId. Our gateway returned the paymentInstructionId in the response of the [Submit Payment Instruction](https://docs.payroc.com/api/schema/payroc-cloud/payment-instructions/submit) method.  

Our gateway returns the status of the payment instruction. If the payment device completed the payment instruction, the response also includes a link to the payment.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.payrocCloud.paymentInstructions.retrieve({
    paymentInstructionId: "e743a9165d134678a9100ebba3b29597"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.payrocCloud.RetrievePaymentInstructionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.payrocCloud.paymentInstructions.<a href="/src/api/resources/payrocCloud/resources/paymentInstructions/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to cancel a payment instruction.  

You can cancel a payment instruction only if its status is `inProgress`. To retrieve the status of a payment instruction, use our [Retrieve Payment Instruction](https://docs.payroc.com/api/schema/payroc-cloud/payment-instructions/retrieve) method.  

To cancel a payment instruction, you need its paymentInstructionId. Our gateway returned the paymentInstructionId in the response of the [Submit Payment Instruction](https://docs.payroc.com/api/schema/payroc-cloud/payment-instructions/submit) method.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.payrocCloud.paymentInstructions.delete({
    paymentInstructionId: "e743a9165d134678a9100ebba3b29597"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.payrocCloud.DeletePaymentInstructionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## PayrocCloud RefundInstructions
<details><summary><code>client.payrocCloud.refundInstructions.<a href="/src/api/resources/payrocCloud/resources/refundInstructions/client/Client.ts">submit</a>({ ...params }) -> Payroc.RefundInstruction</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to submit an instruction request to initiate a refund on a payment device.  

In the request, include the refund amount and currency.  

If the request is successful, our gateway returns information about the refund instruction and a refundInstructionId, which you need for the following methods:
- [Retrieve refund instruction](https://docs.payroc.com/api/schema/payroc-cloud/refund-instructions/retrieve) - View the details of the refund instruction.
- [Cancel refund instruction](https://docs.payroc.com/api/schema/payroc-cloud/refund-instructions/delete) - Cancel the refund instruction.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.payrocCloud.refundInstructions.submit({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    serialNumber: "1850010868",
    operator: "Jane",
    processingTerminalId: "1234001",
    order: {
        orderId: "OrderRef6543",
        description: "Refund for order OrderRef6543",
        amount: 4999,
        currency: "USD"
    },
    customizationOptions: {
        entryMethod: "manualEntry"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.payrocCloud.RefundInstructionRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.payrocCloud.refundInstructions.<a href="/src/api/resources/payrocCloud/resources/refundInstructions/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.RefundInstruction</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a refund instruction.  

To retrieve a refund instruction, you need its refundInstructionId. Our gateway returned the refundInstructionId in the response of the [Submit Refund Instruction](https://docs.payroc.com/api/schema/payroc-cloud/refund-instructions/submit) method.  

Our gateway returns the status of the refund instruction. If the payment device completed the refund instruction, the response also includes a link to the refund.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.payrocCloud.refundInstructions.retrieve({
    refundInstructionId: "a37439165d134678a9100ebba3b29597"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.payrocCloud.RetrieveRefundInstructionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.payrocCloud.refundInstructions.<a href="/src/api/resources/payrocCloud/resources/refundInstructions/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to cancel a refund instruction.  

You can cancel a refund instruction only if its status is `inProgress`. To retrieve the status of a refund instruction, use our [Retrieve Refund Instruction](https://docs.payroc.com/api/schema/payroc-cloud/refund-instructions/retrieve) method.  

To cancel a refund instruction, you need its refundInstructionId. Our gateway returned the refundInstructionId in the response of the [Submit Refund Instruction](https://docs.payroc.com/api/schema/payroc-cloud/refund-instructions/submit) method. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.payrocCloud.refundInstructions.delete({
    refundInstructionId: "a37439165d134678a9100ebba3b29597"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.payrocCloud.DeleteRefundInstructionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `RefundInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## PayrocCloud SignatureInstructions
<details><summary><code>client.payrocCloud.signatureInstructions.<a href="/src/api/resources/payrocCloud/resources/signatureInstructions/client/Client.ts">submit</a>({ ...params }) -> Payroc.SignatureInstruction</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to submit an instruction to capture a customer's signature on a payment device.  

Our gateway returns information about the signature instruction and a signatureInstructionId, which you need for the following methods:
- [Retrieve signature instruction](https://docs.payroc.com/api/schema/payroc-cloud/signature-instructions/retrieve) - View the details of the signature instruction.
- [Cancel signature instruction](https://docs.payroc.com/api/schema/payroc-cloud/signature-instructions/delete) - Cancel the signature instruction.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.payrocCloud.signatureInstructions.submit({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    serialNumber: "1850010868",
    processingTerminalId: "1234001"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.payrocCloud.SignatureInstructionRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SignatureInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.payrocCloud.signatureInstructions.<a href="/src/api/resources/payrocCloud/resources/signatureInstructions/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.SignatureInstruction</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a signature instruction.  

To retrieve a signature instruction, you need its signatureInstructionId. Our gateway returned the signatureInstructionId in the response of the [Submit Signature Instruction](https://docs.payroc.com/api/schema/payroc-cloud/signature-instructions/submit) method.  

Our gateway returns the status of the instruction. If the payment device completed the instruction, the response also includes a link to retrieve the signature.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.payrocCloud.signatureInstructions.retrieve({
    signatureInstructionId: "a37439165d134678a9100ebba3b29597"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.payrocCloud.RetrieveSignatureInstructionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SignatureInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.payrocCloud.signatureInstructions.<a href="/src/api/resources/payrocCloud/resources/signatureInstructions/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to cancel a signature instruction.  

To cancel a signature instruction, you need its signatureInstructionId. Our gateway returned the signatureInstructionId in the response of the [Submit signature instruction](https://docs.payroc.com/api/schema/payroc-cloud/signature-instructions/submit) method.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.payrocCloud.signatureInstructions.delete({
    signatureInstructionId: "a37439165d134678a9100ebba3b29597"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.payrocCloud.DeleteSignatureInstructionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SignatureInstructionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## PayrocCloud Signatures
<details><summary><code>client.payrocCloud.signatures.<a href="/src/api/resources/payrocCloud/resources/signatures/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.RetrieveSignaturesResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve a signature that a payment device captured using Payroc Cloud. 

Our gateway returns the following information about the signature:
- Image of the signature
- Format of the image
- Date that the device captured the image
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.payrocCloud.signatures.retrieve({
    signatureId: "JDN4ILZB0T"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.payrocCloud.RetrieveSignaturesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SignaturesClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## RepeatPayments PaymentPlans
<details><summary><code>client.repeatPayments.paymentPlans.<a href="/src/api/resources/repeatPayments/resources/paymentPlans/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.PaymentPlan, Payroc.PaymentPlanPaginatedList></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of payment plans for a processing terminal.  

**Note:** If you want to view the details of a specific payment plan and you have its paymentPlanId, use our [Retrieve Payment Plan](https://docs.payroc.com/api/schema/repeat-payments/payment-plans/retrieve) method.  

Our gateway returns the following information about each payment plan in the list:  

  -	Name, length, and currency of the plan  
  -	How often our gateway collects each payment  
  -	How much our gateway collects for each payment  
  -	What happens if the merchant updates or deletes the plan  

For each payment plan, we return the paymentPlanId, which you can use to perform follow-on actions.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.repeatPayments.paymentPlans.list({
    processingTerminalId: "1234001",
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.repeatPayments.paymentPlans.list({
    processingTerminalId: "1234001",
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.repeatPayments.ListPaymentPlansRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentPlansClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.repeatPayments.paymentPlans.<a href="/src/api/resources/repeatPayments/resources/paymentPlans/client/Client.ts">create</a>({ ...params }) -> Payroc.PaymentPlan</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to create a payment schedule that you can assign customers to.  

**Note:** This method is part of our Repeat Payments feature. To help you understand how this method works with our Subscriptions endpoints, go to [Repeat Payments](https://docs.payroc.com/guides/integrate/repeat-payments).  

When you create a payment plan you need to provide a unique paymentPlanId that you use to run follow-on actions:  

-	[Retrieve Payment Plan](https://docs.payroc.com/api/schema/repeat-payments/payment-plans/retrieve)  - View the details of the payment plan.  
-	[Update Payment Plan](https://docs.payroc.com/api/schema/repeat-payments/payment-plans/partially-update)  - Update the details of the payment plan.  
-	[Delete Payment Plan](https://docs.payroc.com/api/schema/repeat-payments/payment-plans/delete)  - Delete the payment plan.  
-	[Create Subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/create)  - Subscribe a customer to the payment plan.  

The request includes the following settings:  

-	**type** - Indicates if our gateway or the merchant collects payments. If the merchant manually collects payments, integrate with the [Pay Manual Subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/pay) method.  
-	**recurringOrder** - Amount of each payment if the gateway automatically collect payments.  
-	**setupOrder** - Setup fee that our gateway immediately collects from the customer's payment method.  
-	**onUpdate and onDelete** - Indicates what happens to associated subscriptions if the merchant updates or deletes the payment plan.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.repeatPayments.paymentPlans.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    body: {
        paymentPlanId: "PlanRef8765",
        name: "Premium Club",
        description: "Monthly Premium Club subscription",
        currency: "USD",
        length: 12,
        type: "automatic",
        frequency: "monthly",
        onUpdate: "continue",
        onDelete: "complete",
        customFieldNames: ["yourCustomField"],
        setupOrder: {
            amount: 4999,
            description: "Initial setup fee for Premium Club subscription",
            breakdown: {
                subtotal: 4347,
                taxes: [{
                        name: "Sales Tax",
                        rate: 5
                    }]
            }
        },
        recurringOrder: {
            amount: 4999,
            description: "Monthly Premium Club subscription",
            breakdown: {
                subtotal: 4347,
                taxes: [{
                        name: "Sales Tax",
                        rate: 5
                    }]
            }
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.repeatPayments.CreatePaymentPlansRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentPlansClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.repeatPayments.paymentPlans.<a href="/src/api/resources/repeatPayments/resources/paymentPlans/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.PaymentPlan</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a payment plan.  

To retrieve a payment plan, you need its paymentPlanId. Our gateway returned the paymentPlanId in the response of the [Create Payment Plan](https://docs.payroc.com/api/schema/repeat-payments/payment-plans/create) method.  

**Note:** If you don't have the paymentPlanId, use our [List Payment Plans](https://docs.payroc.com/api/schema/repeat-payments/payment-plans/list) method to search for the payment plan.  

Our gateway returns the following information about the payment plan:  

  -	Name, length, and currency of the plan  
  -	How often our gateway collects each payment  
  -	How much our gateway collects for each payment  
  -	What happens if the merchant updates or deletes the plan  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.repeatPayments.paymentPlans.retrieve({
    processingTerminalId: "1234001",
    paymentPlanId: "PlanRef8765"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.repeatPayments.RetrievePaymentPlansRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentPlansClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.repeatPayments.paymentPlans.<a href="/src/api/resources/repeatPayments/resources/paymentPlans/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to delete a payment plan.  

> **Important:** When you delete a payment plan, you can’t recover it. You also won’t be able to add subscriptions to the payment plan.  

To delete a payment plan, you need its paymentPlanId, which you sent in the request of the [Create Payment Plan](https://docs.payroc.com/api/schema/repeat-payments/payment-plans/create) method.  

**Note:** If you don't have the paymentPlanId, use our [List Payment Plans](https://docs.payroc.com/api/schema/repeat-payments/payment-plans/list) method to search for the payment plan.  

The value you sent for the onDelete parameter when you created the payment plan indicates what happens to associated subscriptions when you delete the plan:  

  -	`complete` - Our gateway stops taking payments for the subscriptions associated with the payment plan.  
  -	`continue` - Our gateway continues to take payments for the subscriptions associated with the payment plan. To stop a subscription for a cancelled payment plan, go to the [Deactivate Subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/deactivate) method.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.repeatPayments.paymentPlans.delete({
    processingTerminalId: "1234001",
    paymentPlanId: "PlanRef8765"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.repeatPayments.DeletePaymentPlansRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentPlansClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.repeatPayments.paymentPlans.<a href="/src/api/resources/repeatPayments/resources/paymentPlans/client/Client.ts">partiallyUpdate</a>({ ...params }) -> Payroc.PaymentPlan</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to partially update a payment plan. Structure your request to follow the [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902) standard.  

To update a payment plan, you need its paymentPlanId, which you sent in the request of the [Create Payment Plan](https://docs.payroc.com/api/schema/repeat-payments/payment-plans/create) method.  

**Note:** If you don't have the paymentPlanId, use our [List Payment Plans](https://docs.payroc.com/api/schema/repeat-payments/payment-plans/list) method to search for the payment plan.  

You can update all of the properties of the payment plan except for the paymentPlanId.  

The value you sent for the onUpdate parameter when you created the payment plan indicates what happens to the associated subscriptions when you update the plan:  
- `update` - Our gateway updates the subscriptions associated with the payment plan.
- `continue` - Our  gateway doesn't update the subscriptions associated with the payment plan.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.repeatPayments.paymentPlans.partiallyUpdate({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    paymentPlanId: "PlanRef8765",
    body: [{
            op: "remove",
            path: "path"
        }, {
            op: "remove",
            path: "path"
        }, {
            op: "remove",
            path: "path"
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.repeatPayments.PartiallyUpdatePaymentPlansRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `PaymentPlansClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## RepeatPayments Subscriptions
<details><summary><code>client.repeatPayments.subscriptions.<a href="/src/api/resources/repeatPayments/resources/subscriptions/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.Subscription, Payroc.SubscriptionPaginatedList></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of subscriptions.  

Note: If you want to view the details of a specific subscription and you have its subscriptionId, use our [Retrieve subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/retrieve) method.  

Use query parameters to filter the list of results that we return, for example, to search for subscriptions for a customer, a payment plan, or frequency.  

Our gateway returns information about the following for each subscription in the list:  

-	Payment plan the subscription is linked to.  
-	Secure token that represents cardholder’s payment details.  
-	Current state of the subscription, including its status, next due date, and invoices.  
-	Fees for setup and the cost of the recurring order.  
-	Subscription length, end date, and frequency.  

For each subscription, we also return the subscriptionId, the paymentPlanId, and the secureTokenId, which you can use to perform follow-actions. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.repeatPayments.subscriptions.list({
    processingTerminalId: "1234001",
    customerName: "Sarah%20Hazel%20Hopper",
    last4: "7062",
    paymentPlan: "Premium%20Club",
    frequency: "weekly",
    status: "active",
    endDate: "2025-07-01",
    nextDueDate: "2024-08-01",
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.repeatPayments.subscriptions.list({
    processingTerminalId: "1234001",
    customerName: "Sarah%20Hazel%20Hopper",
    last4: "7062",
    paymentPlan: "Premium%20Club",
    frequency: "weekly",
    status: "active",
    endDate: "2025-07-01",
    nextDueDate: "2024-08-01",
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.repeatPayments.ListSubscriptionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.repeatPayments.subscriptions.<a href="/src/api/resources/repeatPayments/resources/subscriptions/client/Client.ts">create</a>({ ...params }) -> Payroc.Subscription</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to assign a customer to a payment plan.  

**Note:** This method is part of our Repeat Payments feature. To help you understand how this method works with our Payment plans endpoints, go to [Repeat Payments](https://docs.payroc.com/guides/integrate/repeat-payments).  

When you create a subscription you need to provide a unique subscriptionId that you use to run follow-on actions:  

- [Retrieve Subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/retrieve) - View the details of the subscription.
- [Update Subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/partially-update) - Update the details of the subscription.
- [Deactivate Subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/deactivate) - Stop taking payments for the subscription.
- [Re-activate Subscription](https://docs.payroc.com/api/schema/payments/subscriptions/reactivate) - Start taking payments again for the subscription.
- [Pay Manual Subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/pay) - Manually collect a payment for the subscription.

The request includes the following settings:
- **paymentPlanId** - Unique identifier of the payment plan that the merchant wants to use. If you don't have the paymentPlanId, use our [List Payment Plans](https://docs.payroc.com/api/schema/repeat-payments/payment-plans/list) method to search for the payment plan.
- **paymentMethod** - Object that contains information about the secure token, which represents the customer's card details or bank account details.
- **startDate** - Date that you want to start to take payments.

You can also update the settings that the subscription inherited from the payment plan, for example, you can change the amount for each payment. If you change the settings for the subscription, it doesn't change the settings in the payment plan that it's linked to. 
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.repeatPayments.subscriptions.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    subscriptionId: "SubRef7654",
    paymentPlanId: "PlanRef8765",
    paymentMethod: {
        type: "secureToken",
        token: "1234567890123456789"
    },
    name: "Premium Club",
    description: "Premium Club subscription",
    setupOrder: {
        orderId: "OrderRef6543",
        amount: 4999,
        description: "Initial setup fee for Premium Club subscription"
    },
    recurringOrder: {
        amount: 4999,
        description: "Monthly Premium Club subscription",
        breakdown: {
            subtotal: 4347,
            taxes: [{
                    type: "rate",
                    rate: 5,
                    name: "Sales Tax"
                }]
        }
    },
    startDate: "2024-07-02",
    endDate: "2025-07-01",
    length: 12,
    pauseCollectionFor: 0
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.repeatPayments.SubscriptionRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.repeatPayments.subscriptions.<a href="/src/api/resources/repeatPayments/resources/subscriptions/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.Subscription</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a subscription.  

To retrieve a subscription, you need its subscriptionId. You sent the subscriptionId in the request of the [Create subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/create) method.  

**Note:** If you don't have the subscriptionId, use our [List subscriptions](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/list) method to search for the subscription.  

Our gateway returns information about the following for the subscription:  

-	Payment plan the subscription is linked to.  
-	Secure token that represents cardholder’s payment details.  
-	Current state of the subscription, including its status, next due date, and invoices.  
-	Fees for setup and the cost of the recurring order.  
-	Subscription length, end date, and frequency.  

We also return the paymentPlanId and the secureTokenId, which you can use to perform follow-on actions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.repeatPayments.subscriptions.retrieve({
    processingTerminalId: "1234001",
    subscriptionId: "SubRef7654"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.repeatPayments.RetrieveSubscriptionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.repeatPayments.subscriptions.<a href="/src/api/resources/repeatPayments/resources/subscriptions/client/Client.ts">partiallyUpdate</a>({ ...params }) -> Payroc.Subscription</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to partially update a subscription. Structure your request to follow the [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902) standard.  

To update a subscription, you need its subscriptionId, which you sent in the request of the [Create subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/create) method.  

**Note:** If you don't have the subscriptionId, use our [List subscriptions](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/list) method to search for the payment.  

You can update all of the properties of the subscription except for the following:  

**Can't delete**  
- recurringOrder
- description
- name

**Can't perform any PATCH operation**  
- currentState
- type
- frequency
- paymentPlan
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.repeatPayments.subscriptions.partiallyUpdate({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    subscriptionId: "SubRef7654",
    body: [{
            op: "remove",
            path: "path"
        }, {
            op: "remove",
            path: "path"
        }, {
            op: "remove",
            path: "path"
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.repeatPayments.PartiallyUpdateSubscriptionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.repeatPayments.subscriptions.<a href="/src/api/resources/repeatPayments/resources/subscriptions/client/Client.ts">deactivate</a>({ ...params }) -> Payroc.Subscription</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to deactivate a subscription.  

To deactivate a subscription, you need its subscriptionId, which you sent in the request of the [Create Subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/create) method.  

**Note:** If you don't have the subscriptionId, use our [List Subscriptions](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/list) method to search for the subscription.  

If your request is successful, our gateway stops taking payments from the customer.  

To reactivate the subscription, use our [Reactivate Subscription](https://docs.payroc.com/api/schema/payments/subscriptions/reactivate) method.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.repeatPayments.subscriptions.deactivate({
    processingTerminalId: "1234001",
    subscriptionId: "SubRef7654"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.repeatPayments.DeactivateSubscriptionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.repeatPayments.subscriptions.<a href="/src/api/resources/repeatPayments/resources/subscriptions/client/Client.ts">reactivate</a>({ ...params }) -> Payroc.Subscription</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to reactivate a subscription.  

To reactivate a subscription, you need its subscriptionId, which you sent in the request of the [Create Subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/create) method.  

**Note:** If you don't have the subscriptionId, use our [List Subscriptions](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/list) method to search for the subscription.  

If your request is successful, our gateway restarts taking payments from the customer.  

To deactivate the subscription, use our [Deactivate Subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/deactivate) method.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.repeatPayments.subscriptions.reactivate({
    processingTerminalId: "1234001",
    subscriptionId: "SubRef7654"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.repeatPayments.ReactivateSubscriptionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.repeatPayments.subscriptions.<a href="/src/api/resources/repeatPayments/resources/subscriptions/client/Client.ts">pay</a>({ ...params }) -> Payroc.SubscriptionPayment</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to manually collect a payment linked to a subscription. You can manually collect a payment only if the merchant chose not to let our gateway automatically collect each payment.  

To manually collect a payment, you need the subscriptionId of the subscription that's linked to the payment. You sent the subscriptionId in the request of the [Create Subscription](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/create) method.  

**Note:** If you don't have the subscriptionId, use our [List Subscriptions](https://docs.payroc.com/api/schema/repeat-payments/subscriptions/list) method to search for the subscription.  

The request includes an order object that contains information about the amount that you want to collect.  

In the response, our gateway returns information about the payment and a paymentId. You can use the paymentId in follow-on actions with the [Payments](https://docs.payroc.com/api/schema/card-payments/payments) endpoints or [Bank Transfer Payments](https://docs.payroc.com/api/schema/bank-transfer-payments/payments) endpoints.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.repeatPayments.subscriptions.pay({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    subscriptionId: "SubRef7654",
    operator: "Jane",
    order: {
        orderId: "OrderRef6543",
        amount: 4999,
        description: "Monthly Premium Club subscription"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.repeatPayments.SubscriptionPaymentRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SubscriptionsClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Reporting Settlement
<details><summary><code>client.reporting.settlement.<a href="/src/api/resources/reporting/resources/settlement/client/Client.ts">listBatches</a>({ ...params }) -> core.PayrocPager<Payroc.Batch, Payroc.ListBatchesSettlementResponse></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of batches that your merchants submitted to the processor on a specific date.  

**Note:** If you want to view the details of a specific batch and you have its batchId, use our [Retrieve Batch](https://docs.payroc.com/api/schema/reporting/settlement/retrieve-batch) method.  

Use query parameters to filter the list of results that we return, for example, to search for batches that were submitted by a specific merchant.  

> **Important:** You must provide a value for the date query parameter.  

Our gateway returns the following information about each batch in the list:  
-	Transaction information, including the number of transactions and total value of sales.  
-	Merchant information, including the merchant ID (MID) and the processing account that the batch is associated with.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.reporting.settlement.listBatches({
    before: "2571",
    after: "8516",
    limit: 1,
    date: "2027-07-02",
    merchantId: "4525644354"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.reporting.settlement.listBatches({
    before: "2571",
    after: "8516",
    limit: 1,
    date: "2027-07-02",
    merchantId: "4525644354"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.reporting.ListReportingSettlementBatchesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettlementClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.reporting.settlement.<a href="/src/api/resources/reporting/resources/settlement/client/Client.ts">retrieveBatch</a>({ ...params }) -> Payroc.Batch</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a batch.  

**Note:** To retrieve a batch, you need its batchId. If you don't have the batchId, use our [List Batches](https://docs.payroc.com/api/schema/reporting/settlement/list-batches) method to search for the batch.  

Our gateway returns the following information about the batch:  

-	Transaction information, including the number of transactions and total value of sales.  
-	Merchant information, including the merchant ID (MID) and the processing account that the batch is associated with.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.reporting.settlement.retrieveBatch({
    batchId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.reporting.RetrieveBatchSettlementRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettlementClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.reporting.settlement.<a href="/src/api/resources/reporting/resources/settlement/client/Client.ts">listTransactions</a>({ ...params }) -> core.PayrocPager<Payroc.Transaction, Payroc.ListTransactionsSettlementResponse></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a paginated list of your merchants’ transactions.  

**Note:** If you want to view the details of a specific transaction and you have its transactionId, use our [Retrieve Transaction](https://docs.payroc.com/api/schema/reporting/settlement/retrieve-transaction) method.  

Use query parameters to filter the list of results that we return, for example, to search for transactions for a specific merchant.  

> **Important:** You must provide a value for either the date query parameter or the batchId query parameter.  

Our gateway returns the following information about each transaction in the list:  

-	Merchant and processing account that ran the transaction.  
-	Transaction type, date, amount, and the payment method that the customer used.  
-	Batch that contains the transaction, and authorization details for the transaction.  
-	Processor that settled the transaction and the ACH deposit containing the transaction.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.reporting.settlement.listTransactions({
    before: "2571",
    after: "8516",
    limit: 1,
    date: "2024-07-02",
    batchId: 1,
    merchantId: "4525644354",
    transactionType: "Capture"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.reporting.settlement.listTransactions({
    before: "2571",
    after: "8516",
    limit: 1,
    date: "2024-07-02",
    batchId: 1,
    merchantId: "4525644354",
    transactionType: "Capture"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.reporting.ListReportingSettlementTransactionsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettlementClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.reporting.settlement.<a href="/src/api/resources/reporting/resources/settlement/client/Client.ts">retrieveTransaction</a>({ ...params }) -> Payroc.Transaction</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a transaction.  

**Note:** To retrieve a transaction, you need its transactionId. If you don't have the transactionId, use our [List Transactions](https://docs.payroc.com/api/schema/reporting/settlement/list-transactions) method to search for the transaction.  

Our gateway returns the following information about the transaction:  

-	Merchant and processing account that ran the transaction.  
-	Transaction type, date, amount, and the payment method that the customer used.  
-	Batch that contains the transaction, and authorization details for the transaction.   
-	Processor that settled the transaction and the ACH deposit containing the transaction.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.reporting.settlement.retrieveTransaction({
    transactionId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.reporting.RetrieveTransactionSettlementRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettlementClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.reporting.settlement.<a href="/src/api/resources/reporting/resources/settlement/client/Client.ts">listAuthorizations</a>({ ...params }) -> core.PayrocPager<Payroc.Authorization, Payroc.ListAuthorizationsSettlementResponse></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve a [paginated](https://docs.payroc.com/api/pagination) list of authorizations.  

Use query parameters to filter the list of results that we return, for example, to search for authorizations linked to a specific merchant.  

> **Important:** You must provide a value for either the date query parameter or the batchId query parameter.  

Our gateway returns the following information about each authorization in the list:
- Authorization response from the issuing bank.
- Amount that the issuing bank authorized.
- Merchant that ran the authorization.
- Details about the customer's card, the transaction, and the batch.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.reporting.settlement.listAuthorizations({
    before: "2571",
    after: "8516",
    limit: 1,
    date: "2024-07-02",
    batchId: 1,
    merchantId: "4525644354"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.reporting.settlement.listAuthorizations({
    before: "2571",
    after: "8516",
    limit: 1,
    date: "2024-07-02",
    batchId: 1,
    merchantId: "4525644354"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.reporting.ListReportingSettlementAuthorizationsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettlementClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.reporting.settlement.<a href="/src/api/resources/reporting/resources/settlement/client/Client.ts">retrieveAuthorization</a>({ ...params }) -> Payroc.Authorization</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about an authorization.  

**Note:** To retrieve an authorization, you need its authorizationId. If you don't have the authorizationId, use our [List Authorizations](https://docs.payroc.com/api/schema/reporting/settlement/list-authorizations) method to search for the authorization.  

Our gateway returns the following information about the authorization:
- Authorization response from the issuing bank.
- Amount that the issuing bank authorized.
- Merchant that ran the authorization.
- Details about the customer's card, the transaction, and the batch.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.reporting.settlement.retrieveAuthorization({
    authorizationId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.reporting.RetrieveAuthorizationSettlementRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettlementClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.reporting.settlement.<a href="/src/api/resources/reporting/resources/settlement/client/Client.ts">listDisputes</a>({ ...params }) -> core.PayrocPager<Payroc.Dispute, Payroc.ListDisputesSettlementResponse></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of disputes.  

Use query parameters to filter the list of results that we return, for example, to search for disputes linked to a specific merchant.  

> **Important:** You must provide a value for the date query parameter.  

Our gateway returns the following information about each dispute in the list:  
- Its status, type, and description.  
- Transaction that the dispute is linked to, including the transaction date, merchant who ran the transaction, and the payment method that the cardholder used.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.reporting.settlement.listDisputes({
    before: "2571",
    after: "8516",
    limit: 1,
    date: "2024-07-02",
    merchantId: "4525644354"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.reporting.settlement.listDisputes({
    before: "2571",
    after: "8516",
    limit: 1,
    date: "2024-07-02",
    merchantId: "4525644354"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.reporting.ListReportingSettlementDisputesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettlementClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.reporting.settlement.<a href="/src/api/resources/reporting/resources/settlement/client/Client.ts">listDisputesStatuses</a>({ ...params }) -> Payroc.DisputeStatus[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return the status history of a dispute.  

To view the status history of a dispute, you need its disputeId. If you don't have the disputeId, use our [List Disputes](https://docs.payroc.com/api/schema/reporting/settlement/list-disputes) method to search for the dispute. 

Our gateway returns a list that contains each status change, the date it was changed, and its updated status.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.reporting.settlement.listDisputesStatuses({
    disputeId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.reporting.ListDisputesStatusesSettlementRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettlementClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.reporting.settlement.<a href="/src/api/resources/reporting/resources/settlement/client/Client.ts">listAchDeposits</a>({ ...params }) -> core.PayrocPager<Payroc.AchDeposit, Payroc.ListAchDepositsSettlementResponse></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of ACH deposits that we paid to your merchants.  

**Note:** If you want to view the details of a specific ACH deposit and you have its achDepositId, use our [Retrieve ACH Deposit](https://docs.payroc.com/api/schema/reporting/settlement/retrieve-ach-deposit) method.  

Use query parameters to filter the list of results that we return, for example, to search for ACH deposits that we paid to a specific merchant.  

> **Important:** You must provide a value for the date query parameter.  

Our gateway returns the following information about each ACH deposit in the list: 
- Merchant that we sent the ACH deposit to.
- Total amount that we paid the merchant.
- Breakdown of sales, returns, and fees.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.reporting.settlement.listAchDeposits({
    before: "2571",
    after: "8516",
    limit: 1,
    date: "2024-07-02",
    merchantId: "4525644354"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.reporting.settlement.listAchDeposits({
    before: "2571",
    after: "8516",
    limit: 1,
    date: "2024-07-02",
    merchantId: "4525644354"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.reporting.ListReportingSettlementAchDepositsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettlementClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.reporting.settlement.<a href="/src/api/resources/reporting/resources/settlement/client/Client.ts">retrieveAchDeposit</a>({ ...params }) -> Payroc.AchDeposit</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about an ACH deposit that we paid to a merchant.  

**Note:** To retrieve an ACH deposit, you need its achDepositId. If you don't have the achDepositId, use our [List ACH Deposits](https://docs.payroc.com/api/schema/reporting/settlement/list-ach-deposits) method to search for the ACH deposit.  

Our gateway returns the following information about the ACH deposit:  

- Merchant that we sent the ACH deposit to.  
- Total amount that we paid the merchant.  
- Breakdown of sales, returns, and fees.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.reporting.settlement.retrieveAchDeposit({
    achDepositId: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.reporting.RetrieveAchDepositSettlementRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettlementClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.reporting.settlement.<a href="/src/api/resources/reporting/resources/settlement/client/Client.ts">listAchDepositFees</a>({ ...params }) -> core.PayrocPager<Payroc.AchDepositFee, Payroc.ListAchDepositFeesSettlementResponse></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a list of ACH deposit fees.

> **Important:** You must provide a value for either the 'date' query parameter or the 'achDepositId' query parameter.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.reporting.settlement.listAchDepositFees({
    before: "2571",
    after: "8516",
    limit: 1,
    date: "2024-07-02",
    achDepositId: 1,
    merchantId: "4525644354"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.reporting.settlement.listAchDepositFees({
    before: "2571",
    after: "8516",
    limit: 1,
    date: "2024-07-02",
    achDepositId: 1,
    merchantId: "4525644354"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.reporting.ListReportingSettlementAchDepositFeesRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SettlementClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Tokenization SecureTokens
<details><summary><code>client.tokenization.secureTokens.<a href="/src/api/resources/tokenization/resources/secureTokens/client/Client.ts">list</a>({ ...params }) -> core.PayrocPager<Payroc.SecureTokenWithAccountType, Payroc.SecureTokenPaginatedListWithAccountType></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to return a [paginated](https://docs.payroc.com/api/pagination) list of secure tokens.  

**Note:** If you want to view the details of a specific secure token and you have its secureTokenId, use our [Retrieve Secure Token](https://docs.payroc.com/api/schema/tokenization/secure-tokens/retrieve) method.  

Use query parameters to filter the list of results that we return, for example, to search for secure tokens by customer or by the first four digits of a card number.  

Our gateway returns information about the following for each secure token in the list:  

  -	Payment details that the secure token represents.  
  -	Customer details, including shipping and billing addresses.  
  -	Secure token that you can use to carry out transactions.  

  For each secure token, we also return the secureTokenId, which you can use to perform follow-on actions.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const pageableResponse = await client.tokenization.secureTokens.list({
    processingTerminalId: "1234001",
    secureTokenId: "MREF_abc1de23-f4a5-6789-bcd0-12e345678901fa",
    customerName: "Sarah%20Hazel%20Hopper",
    phone: "2025550165",
    email: "sarah.hopper@example.com",
    token: "296753123456",
    first6: "453985",
    last4: "7062",
    before: "2571",
    after: "8516",
    limit: 1
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.tokenization.secureTokens.list({
    processingTerminalId: "1234001",
    secureTokenId: "MREF_abc1de23-f4a5-6789-bcd0-12e345678901fa",
    customerName: "Sarah%20Hazel%20Hopper",
    phone: "2025550165",
    email: "sarah.hopper@example.com",
    token: "296753123456",
    first6: "453985",
    last4: "7062",
    before: "2571",
    after: "8516",
    limit: 1
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.tokenization.ListSecureTokensRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SecureTokensClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tokenization.secureTokens.<a href="/src/api/resources/tokenization/resources/secureTokens/client/Client.ts">create</a>({ ...params }) -> Payroc.SecureToken</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to create a secure token that represents a customer's payment details.  

When you create a secure token, you need to generate and provide a secureTokenId that you use to run follow-on actions:  
- [Retrieve Secure Token](https://docs.payroc.com/api/schema/tokenization/secure-tokens/retrieve) – View the details of the secure token.  
- [Delete Secure Token](https://docs.payroc.com/api/schema/tokenization/secure-tokens/delete) – Delete the secure token.  
- [Update Secure Token](https://docs.payroc.com/api/schema/tokenization/secure-tokens/partially-update) – Update the details of the secure token.  
- [Update Account Details](https://docs.payroc.com/api/schema/tokenization/secure-tokens/update-account) – Update the secure token with the details from a single-use token.  

**Note:** If you don't generate a secureTokenId to identify the token, our gateway generates a unique identifier and returns it in the response.  

If the request is successful, our gateway returns a token that the merchant can use in transactions instead of the customer's sensitive payment details, for example, when they [run a sale](https://docs.payroc.com/api/schema/card-payments/payments/create).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokenization.secureTokens.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    operator: "Jane",
    mitAgreement: "unscheduled",
    customer: {
        firstName: "Sarah",
        lastName: "Hopper",
        dateOfBirth: "1990-07-15",
        referenceNumber: "Customer-12",
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
        },
        contactMethods: [{
                type: "email",
                value: "jane.doe@example.com"
            }],
        notificationLanguage: "en"
    },
    ipAddress: {
        type: "ipv4",
        value: "104.18.24.203"
    },
    source: {
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

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.tokenization.TokenizationRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SecureTokensClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tokenization.secureTokens.<a href="/src/api/resources/tokenization/resources/secureTokens/client/Client.ts">retrieve</a>({ ...params }) -> Payroc.SecureTokenWithAccountType</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to retrieve information about a secure token.  

To retrieve a secure token, you need its secureTokenID, which you sent in the request of the [Create Secure Token](https://docs.payroc.com/api/schema/tokenization/secure-tokens/create) method.  

**Note:** If you don't have the secureTokenId, use our [List Secure Tokens](https://docs.payroc.com/api/schema/tokenization/secure-tokens/list) method to search for the secure token.  

Our gateway returns the following information about the secure token:  

  -	Payment details that the secure token represents.  
  -	Customer details, including shipping and billing addresses.  
  -	Secure token that you can use to carry out transactions.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokenization.secureTokens.retrieve({
    processingTerminalId: "1234001",
    secureTokenId: "MREF_abc1de23-f4a5-6789-bcd0-12e345678901fa"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.tokenization.RetrieveSecureTokensRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SecureTokensClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tokenization.secureTokens.<a href="/src/api/resources/tokenization/resources/secureTokens/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to delete a secure token and its related payment details from our vault.  

To delete a secure token, you need its secureTokenId, which you sent in the request of the [Create Secure Token](https://docs.payroc.com/api/schema/tokenization/secure-tokens/create) method.  

**Note:** If you don’t have the secureTokenId, use our [List Secure Tokens](https://docs.payroc.com/api/schema/tokenization/secure-tokens/list) method to search for the secure token.  

When you delete a secure token, you can’t recover it, and you can’t reuse its identifier for a new token.  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokenization.secureTokens.delete({
    processingTerminalId: "1234001",
    secureTokenId: "MREF_abc1de23-f4a5-6789-bcd0-12e345678901fa"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.tokenization.DeleteSecureTokensRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SecureTokensClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tokenization.secureTokens.<a href="/src/api/resources/tokenization/resources/secureTokens/client/Client.ts">partiallyUpdate</a>({ ...params }) -> Payroc.SecureToken</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to partially update a secure token. Structure your request to follow the [RFC 6902](https://datatracker.ietf.org/doc/html/rfc6902) standard.  

To update a secure token, you need its secureTokenId, which you sent in the request of the [Create Secure Token](https://docs.payroc.com/api/schema/tokenization/secure-tokens/create) method.  

**Note:** If you don't have the secureTokenId, use our [List Secure Tokens](https://docs.payroc.com/api/schema/tokenization/secure-tokens/list) method to search  for the payment.  

You can update all of the properties of the secure token, except the following:  
- processingTerminalId  
- type  
- token  
- status  
- source/Card  
  - type  
  - cardNumber  
  - cardType  
  - currency  
  - debit  
  - surcharging  
- source/ACH account  
  - accountNumber  
  - routingNumber  
- source/PAD account  
  - type  
  - accountNumber  
  - transitNumber  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokenization.secureTokens.partiallyUpdate({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    secureTokenId: "MREF_abc1de23-f4a5-6789-bcd0-12e345678901fa",
    body: [{
            op: "remove",
            path: "path"
        }, {
            op: "remove",
            path: "path"
        }, {
            op: "remove",
            path: "path"
        }]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.tokenization.PartiallyUpdateSecureTokensRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SecureTokensClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tokenization.secureTokens.<a href="/src/api/resources/tokenization/resources/secureTokens/client/Client.ts">updateAccount</a>({ ...params }) -> Payroc.SecureToken</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to update a secure token if you have a single-use token from Hosted Fields.  

**Note:** If you don't have a single-use token, you can update saved payment details with our [Update Secure Token](https://docs.payroc.com/api/resources#updateSecureToken) method. For more information about our two options to update a secure token, go to [Update saved payment details](https://docs.payroc.com/guides/integrate/update-saved-payment-details).  
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokenization.secureTokens.updateAccount({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    secureTokenId: "MREF_abc1de23-f4a5-6789-bcd0-12e345678901fa",
    body: {
        type: "singleUseToken",
        token: "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.tokenization.UpdateAccountSecureTokensRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SecureTokensClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Tokenization SingleUseTokens
<details><summary><code>client.tokenization.singleUseTokens.<a href="/src/api/resources/tokenization/resources/singleUseTokens/client/Client.ts">create</a>({ ...params }) -> Payroc.SingleUseToken</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Use this method to create a single-use token that represents a customer’s payment details.  

A single-use token expires after 30 minutes and merchants can use them only once.  

**Note:** To create a reusable permanent token, go to [Create Secure Token](https://docs.payroc.com/api/schema/tokenization/secure-tokens/create).  

In the request, send the customer’s payment details. If the request is successful, our gateway returns a token that you can use in a follow-on action, for example, [run a sale](https://docs.payroc.com/api/schema/card-payments/payments/create).
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokenization.singleUseTokens.create({
    "Idempotency-Key": "8e03978e-40d5-43e8-bc93-6894a57f9324",
    processingTerminalId: "1234001",
    channel: "web",
    operator: "Jane",
    source: {
        type: "card",
        cardDetails: {
            entryMethod: "raw",
            device: {
                model: "bbposChp",
                serialNumber: "1850010868"
            },
            rawData: "A1B2C3D4E5F67890ABCD1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Payroc.tokenization.SingleUseTokenRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `SingleUseTokensClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>
