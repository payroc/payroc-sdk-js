# Integration Tests

This directory contains integration tests that run against the Payroc UAT environment.

## Setup

Before running integration tests, you must set the following environment variables:

- `PAYROC_API_KEY_PAYMENTS` - API key for payment operations
- `PAYROC_API_KEY_GENERIC` - API key for generic operations
- `TERMINAL_ID_AVS` - Terminal ID with AVS enabled
- `TERMINAL_ID_NO_AVS` - Terminal ID without AVS

## Running Tests

To run all integration tests:

```bash
npm test tests/integration
```

To run a specific integration test:

```bash
npm test tests/integration/card-payments/refunds/create.test.ts
```

## Test Structure

Integration tests are organized by API resource and operation:

- `card-payments/refunds/` - Card payment refund tests
  - `create.test.ts` - Tests for creating unreferenced refunds

## Configuration

The integration tests use the UAT environment configuration defined in `setup.ts`. The environment URLs are:

- API: `https://api.uat.payroc.com`
- Identity: `https://identity.uat.payroc.com`

## Notes

- Integration tests use **vitest** as the test framework
- Integration tests have a 30-second timeout to accommodate network latency
- Tests are protected from Fern regeneration via `.fernignore`
- Test data is inlined in test files for simplicity
- When adding new tests, use the vitest syntax: `test("name", { timeout: 30000 }, async () => { ... })`
