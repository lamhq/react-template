# React Template

Starter code for a Single-page web application built with React.

## Requirements

- **Node.js**: Version 22.12.0 or higher
- **pnpm**: Version 10.12.3 or higher


## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite with SWC plugin for fast compilation
- **UI Library**: MUI Joy (Material-UI's next-generation design system)
- **State Management**:
  - Jotai for atomic state management
  - TanStack Query for server state management
- **Routing**: React Router v7
- **Form Handling**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Error Handling**: React Error Boundary
- **Testing**:
  - Vitest for unit testing
  - Testing Library for component testing
  - Playwright for end-to-end testing
- **Development Tools**:
  - Storybook for component development
  - ESLint for code linting
  - Prettier for code formatting
  - Husky for git hooks
  - Commitlint for conventional commits
- **Mocking**: MSW (Mock Service Worker) for API mocking


## Highlights

- 🚀 **Modern React Setup**: Latest React 19 with TypeScript and Vite for optimal development experience
- 🎨 **Component-Driven Development**: Storybook integration for isolated component development
- 🧪 **Comprehensive Testing**: Unit tests with Vitest, E2E tests with Playwright, and MSW for API mocking
- 🛡️ **Type Safety**: Full TypeScript support with strict type checking
- 🔧 **Developer Experience**: Hot reload, ESLint, Prettier, and git hooks for consistent code quality
- 🧪 **Comprehensive ESLint Config**: Multi-layered linting with React, TypeScript, Testing Library, Playwright, and Storybook rules
- 📦 **Modular Architecture**: Well-organized feature-based folder structure
- 🌐 **API Integration**: Configured proxy for backend API calls and comprehensive error handling
- ⚡ **Performance Optimized**: SWC for fast compilation and optimized build output
- 📱 **Responsive Design**: MUI Joy components with built-in responsive design patterns

## Source Code Structure

The project follows a feature-based architecture with atomic design principles:

```
src/
├── common/                 # Shared components and utilities
│   ├── atoms/              # Basic UI components
│   ├── molecules/          # Composite components
│   └── hooks.ts            # Shared hooks
├── auth-state/             # Authentication helper module
├── confirm/                # Confirmation dialog module
├── error/                  # Error handling module
├── notification/           # Notification module
├── pages/                  # Top-level page components
├── templates/              # Layout templates
├── auth/                   # Authentication feature
├── todos/                  # Todo feature
├── main.tsx                # Application entry point
└── routes.tsx              # Route definitions

tests/                      # End-to-end tests
├── setup.ts                # Test configuration
├── signin.spec.ts          # Authentication tests
└── todos/                  # Feature-specific E2E tests
    ├── add-todo.spec.ts
    ├── delete-todo.spec.ts
    ├── list-todo.spec.ts
    └── update-todo.spec.ts
```

**Architecture Principles**:
- **Feature-based organization**: Each feature has its own directory with all related files
- **Atomic design**: Components are organized as atoms (basic), molecules (composite), and organisms (complex)
- **Separation of concerns**: API calls, state management, types, and components are clearly separated
- **Reusable components**: Common components are shared across features
- **Co-located tests**: Unit tests live alongside their components; E2E tests are in a separate directory


## Run the Application

Install project dependencies**:
```bash
pnpm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

**Proxy Configuration**:
- API requests to `/api/*` are automatically proxied to `http://localhost:3000` during development.
- To customize the proxy target, modify the `server.proxy` configuration in `vite.config.ts`.


## Run Storybook

Launch Storybook for component development:

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`


## Run Unit Tests

Execute unit tests with Vitest:

```bash
npm run test
```

For watch mode during development, the test command runs in watch mode by default.


## Run End-to-End Tests

First, install Playwright browsers (required for first-time setup):

```bash
pnpm exec playwright install
```

Run E2E tests with Playwright:

```bash
npm run e2e-test
```

To run tests in headed mode or with specific browsers, you can use Playwright CLI directly:

```bash
npx playwright test --headed
npx playwright test --browser=firefox
```


## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The build output will be generated in the `dist/` directory.


## Available GitHub Actions

The project includes automated CI/CD workflows:

### Lint Workflow (`.github/workflows/lint.yml`)

Runs on push and pull requests to `main` branch:

- **Code Style Check**: Runs ESLint to check code quality
- **Format Check**: Validates code formatting with Prettier
- **Type Check**: Performs TypeScript type checking

### Test Workflow (`.github/workflows/test.yml`)

Runs on push and pull requests to `main` branch:

- **Unit Tests**: Executes Vitest unit tests with coverage reporting
- **E2E Tests**: Runs Playwright end-to-end tests with artifact uploads

Both workflows use a custom setup action (`.github/actions/setup`) for consistent environment configuration across jobs.
