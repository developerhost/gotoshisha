# Gotoshisha - React Native Maps Application

This project is a React Native application using Expo and React Native Maps, with a backend API built using Hono + Cloudflare Workers.

## Project Structure

- **Frontend**: React Native + Expo + TypeScript
- **Backend**: Hono + Cloudflare Workers + D1 Database + Prisma
- **Testing**: Vitest for both frontend and backend
- **Linting**: ESLint with TypeScript support
- **CI/CD**: GitHub Actions for automated testing and linting

## Development Setup

### Prerequisites

- Node.js 20+
- Yarn package manager
- Expo CLI

### Frontend Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the development server:
   ```bash
   yarn start
   # or for iOS
   yarn ios
   # or for Android
   yarn android
   ```

3. For tunnel mode (recommended for testing):
   ```bash
   yarn start:clear
   ```

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Generate Prisma client:
   ```bash
   yarn db:generate
   ```

5. Start development server:
   ```bash
   yarn dev
   ```

## Available Scripts

### Frontend Scripts

- `yarn start` - Start Expo development server
- `yarn ios` - Start iOS simulator
- `yarn android` - Start Android emulator
- `yarn web` - Start web development server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues automatically
- `yarn test` - Run tests in watch mode
- `yarn test:run` - Run tests once
- `yarn type-check` - Run TypeScript type checking

### Backend Scripts

- `yarn dev` - Start development server with Wrangler
- `yarn build` - Build for production
- `yarn deploy` - Deploy to Cloudflare Workers
- `yarn lint` - Run ESLint
- `yarn test:run` - Run tests
- `yarn db:generate` - Generate Prisma client
- `yarn db:push` - Push schema changes to database

## CI/CD

This project uses GitHub Actions for continuous integration. The CI pipeline includes:

### Frontend CI
- TypeScript type checking
- ESLint linting
- Vitest unit tests

### Backend CI
- Prisma client generation
- TypeScript type checking
- ESLint linting
- Vitest unit tests

### Build Check
- Backend build verification
- Expo web export verification

The CI runs on:
- Push to `main` and `develop` branches
- Pull requests to `main` and `develop` branches

## Testing

### Running Tests

```bash
# Frontend tests
yarn test:run

# Backend tests
cd backend && yarn test:run

# All tests (from root)
yarn test:run
```

### Test Structure

- Frontend tests are located in `src/` directory alongside source files
- Backend tests are located in `backend/src/` directory
- Test files follow the pattern `*.test.ts`
- Tests use Vitest with Japanese descriptions following the project guidelines

## Code Quality

### Linting

```bash
# Frontend linting
yarn lint

# Backend linting
cd backend && yarn lint

# Fix linting issues
yarn lint:fix
```

### Type Checking

```bash
# Frontend type checking
yarn type-check

# Backend type checking
cd backend && yarn type-check
```

### Expected Result

![Expected result](./docs/expected.png)

### Actual result

By simulating the result of asset bundling by using expo-asset to cache the assets on startup on App.tsx.

![Actual result](./docs/actual.png)
