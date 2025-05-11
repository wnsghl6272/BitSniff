# BitSniff

## Quick Start

### Running with Docker Compose
To run the project using Docker Compose, use the following command:
```bash
docker compose up
```

### Environment Variables
The required environment variables for the project are set in the `.env` file.  
If needed, refer to the `.env.example` file to configure your environment variables.

#### Required Environment Variables
Based on the `docker-compose.yml` file, you need to set the following environment variables in your `.env` file:

- `DATABASE_URL`: The URL for your database connection (e.g., `postgresql://user:password@localhost:5432/bitsniff`).
- `PORT`: The port on which the server will run (e.g., `5001`).
- `NODE_ENV`: The environment in which the application is running (e.g., `development` or `production`).

Make sure to replace the placeholder values with your actual configuration.

## Architecture

### Route Hierarchy
The application uses React Router for navigation with the following structure:
- `/`: Home page displaying network stats and latest transactions
- `/search`: Search page for transactions
- `/tx/:hash`: Transaction detail page
- `/wallet/:address`: Wallet information page
- `/block/:blockNumber`: Block information page

The routing is configured in `src/router.tsx` using `createBrowserRouter`, with error handling through `ErrorPage` component.

### Loaders and Actions Flow
The application implements a data fetching and state management system:

1. **Server-Side Data Fetching**:
   - Regular polling of blockchain data every 60 seconds (`FETCH_INTERVAL`)
   - Batch processing of transactions (`TRANSACTION_BATCH_SIZE = 5`)
   - Maximum storage of 50 transactions per network (`MAX_STORED_TRANSACTIONS`)

2. **API Integration**:
   - Retry mechanism for API calls with exponential backoff
   - Rate limiting handling (402 status code)
   - Error handling and logging

### SSE (Server-Sent Events) Implementation
The application uses SSE for real-time updates:

1. **Event Endpoints**:
   - `/events/stats`: Real-time network statistics updates
   - `/events/transactions`: Real-time transaction updates

2. **Client Management**:
   - Separate client sets for stats and transactions
   - Automatic client cleanup on connection close
   - Broadcast mechanism for updates

3. **Data Flow**:
   - Server maintains connected clients in memory
   - Updates are broadcast to all connected clients
   - Changes are tracked and only relevant updates are sent

### Caching Strategy
The application implements a multi-level caching strategy:

1. **Server-Side Caching**:
   - In-memory storage of latest transactions
   - Database caching of blockchain stats
   - Rate limiting and API call optimization

2. **Client-Side Caching**:
   - React Router's built-in caching
   - SSE connection for real-time updates
   - Optimized re-rendering through change detection

3. **Performance Optimizations**:
   - Batch processing of transactions
   - Parallel processing of Bitcoin and Ethereum data
   - Efficient change detection and update broadcasting

This architecture ensures that the application is efficient, scalable, and provides a seamless user experience.

## DB Choice

### Why PostgreSQL over SQLite?
I chose PostgreSQL over SQLite because the project required caching and persisting high-frequency blockchain data (Bitcoin, Ethereum) and delivering it to clients via Server-Sent Events (SSE).

- **Concurrency**: PostgreSQL handles concurrent writes and reads more reliably than SQLite, which is important when storing real-time data from external APIs and serving it simultaneously.
- **Scalability**: PostgreSQL is production-ready and better suited for scaling, unlike SQLite which is ideal for local or small-scale apps.
- **Structured queries**: The ability to perform complex filtering and sorting on time-series blockchain snapshots made PostgreSQL a strong fit.

### Why Prisma (instead of Drizzle or raw SQL)?
I selected Prisma as the ORM because it provides:

- **Type safety and auto-completion**: Speeds up development while reducing runtime errors.
- **Clear schema modeling**: Through the schema.prisma file, making it easier to manage evolving data structures like wallet stats or network snapshots.
- **Built-in migrations and seeding**: Helped automate the setup of cached blockchain data and ensured consistency across environments.

## API Quotas

### How to Respect Blockchair Free-Tier Limits
To stay within Blockchair's free-tier API limits (1 request per minute and 100-row data cap), I implemented the following strategies:

#### ⏱️ 1-Minute Cadence
- I used a cron job or scheduled `setInterval` on the backend to fetch new data only once every 60 seconds.
- This ensures no more than 1 request per minute is sent to the Blockchair API, fully complying with their rate limit.

#### 💾 Persist-Then-Serve Pattern
- API responses are immediately stored in my PostgreSQL database.
- The client (frontend) never queries Blockchair directly. Instead, it fetches the most recent stored data from my database (e.g., via SSE or REST).
- This avoids unnecessary API calls and respects the rate limit even during high client traffic.

#### 📉 100-Row Data Cap
- I implemented logic to truncate or archive older records, keeping only the most recent 100 rows per data type (e.g., stats or transactions).
- Alternatively, pagination or timestamp filtering is used to enforce the 100-row cap per query if full history needs to be retained.

## Testing

### Unit Tests
We use Vitest for unit testing. Here's an example of a test for the Loader component:

```tsx
// src/components/ui/loader.test.tsx
import { render, screen } from '@testing-library/react';
import { Loader } from './loader';

describe('Loader', () => {
  it('renders with default size', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('h-4 w-4');
  });

  it('renders with custom size', () => {
    render(<Loader size="lg" />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('h-8 w-8');
  });

  it('renders with custom className', () => {
    render(<Loader className="custom-class" />);
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('custom-class');
  });
});
```

### E2E Tests
We use Playwright for end-to-end testing. Here's an example of a test for the Home page:

```ts
// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5001');
  });

  test('should display network stats', async ({ page }) => {
    await page.waitForSelector('[data-testid="network-stats"]', { timeout: 60000 });
    await expect(page.locator('text=Bitcoin Stats')).toBeVisible();
    await expect(page.locator('text=Ethereum Stats')).toBeVisible();
  });

  test('should display latest transactions', async ({ page }) => {
    await page.waitForSelector('[data-testid="latest-transactions"]');
    await expect(page.locator('text=Network')).toBeVisible();
    await expect(page.locator('text=Hash')).toBeVisible();
  });
});
```

Run the tests using:
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e
```

