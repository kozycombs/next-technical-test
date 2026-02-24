# iTunes Search App

A full-stack React application with Material-UI, Redux Toolkit, and TypeScript, featuring iTunes API search with infinite scroll pagination. Served by an Express.js server with API proxy.

## Features

- 🔍 **iTunes Search** - Search for music, albums, artists, apps, and more
- ♾️ **Infinite Scroll** - Automatically load more results as you scroll
- 🎨 **Material-UI** - Modern, responsive UI with custom theme
- 📦 **Redux Toolkit** - Centralized state management
- 🔒 **TypeScript** - Full type safety across the stack
- 🧪 **Unit Tests** - Comprehensive test coverage with Vitest
- 🚀 **Hot Reload** - Fast development with Vite
- 🌐 **API Proxy** - CORS-free iTunes API access through Node.js

## Project Structure

```
.
├── client/                          # React application source
│   ├── src/
│   │   ├── components/
│   │   │   ├── scrollTop/          # Scroll-to-top button
│   │   │   └── search/             # Search components
│   │   │       ├── SearchBar/      # Search input & buttons
│   │   │       ├── SearchItem/     # Individual result card
│   │   │       └── SearchResults/  # Results grid & infinite scroll
│   │   ├── features/
│   │   │   └── search/             # Search Redux logic
│   │   │       ├── searchSlice.ts  # Search state & async thunks
│   │   │       └── index.ts        # Barrel exports
│   │   ├── pages/
│   │   │   └── SearchPage/         # Main search page
│   │   ├── store/
│   │   │   ├── store.ts            # Redux store configuration
│   │   │   └── hooks.ts            # Typed Redux hooks
│   │   ├── test/
│   │   │   ├── setup.ts            # Test configuration
│   │   │   ├── testUtils.tsx       # Test helpers
│   │   │   └── mockData.ts         # Mock iTunes data
│   │   ├── App.tsx                 # Root component with theme
│   │   ├── App.css
│   │   ├── main.tsx                # React entry point
│   │   └── index.css
│   └── index.html
├── dist/                            # Client production build (generated)
├── dist-server/                     # Server production build (generated)
├── coverage/                        # Test coverage reports (generated)
├── server.ts                        # Express server with API proxy
├── vite.config.ts                   # Vite configuration
├── vitest.config.ts                 # Vitest test configuration
├── tsconfig.json                    # TypeScript config for client
├── tsconfig.server.json             # TypeScript config for server
└── package.json
```

## Getting Started

### Installation

```bash
npm install
```

### Development Mode

**Recommended: Full Stack Development (with hot reload)**

```bash
# Terminal 1: Run the Express server with API proxy
npm run dev:server

# Terminal 2: Run the Vite dev server with hot reload
npm run dev
```

Then open `http://localhost:5173` in your browser.

- Vite dev server runs on port **5173** (with hot reload)
- Express API server runs on port **3000**
- Vite proxies `/api/*` requests to Express server

**Alternative: Production-like Development**

```bash
npm run start:dev
```

This runs the TypeScript server directly using `tsx` at `http://localhost:3000` (no hot reload)

### Production Mode

To build and run the production version:

**Recommended approach (one command):**

```bash
npm run build:start
```

This will:

1. Build the React client to `dist/` directory
2. Start the Express server using `tsx` (runs TypeScript directly)
3. Serve the built app at `http://localhost:3000`

**Manual approach (two commands):**

```bash
npm run build:client  # Build React app
npm run start:dev     # Start server with tsx
```

### Testing

Run the comprehensive test suite:

```bash
# Run tests in watch mode (interactive)
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with interactive UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

**Test Coverage:**

- ✅ 48 tests across 6 test files
- ✅ Search Redux slice
- ✅ All React components
- ✅ User interactions & async operations
- ✅ Material-UI integration

## Available Scripts

### Development

- `npm run dev` - Start Vite development server on port 5173 (with hot reload)
- `npm run dev:server` - Start Express server on port 3000 with auto-reload
- `npm run start:dev` - Run TypeScript server directly with tsx

### Building

- `npm run build:client` - Build React app for production (outputs to `dist/`)
- `npm run build` - Type-check and build client with Vite
- `npm run build:server` - Compile TypeScript server to JavaScript (optional, not needed for `build:start`)
- `npm run typecheck` - Run TypeScript type checking

### Testing

- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once (CI mode)
- `npm run test:ui` - Run tests with interactive UI
- `npm run test:coverage` - Generate coverage report

### Production

- `npm run build:start` - **Recommended**: Build client and start server with tsx (one command)
- `npm start` - Start compiled Express server (requires `npm run build:server` first)
- `npm run preview` - Preview production build locally with Vite

## API Endpoints

The Express server provides the following endpoints:

- `GET /api/health` - Server health status
- `GET /api/search?q={query}&limit={limit}&offset={offset}` - iTunes search proxy
  - Proxies requests to iTunes Search API
  - Avoids CORS issues
  - Returns up to 200 results

## Technologies Used

### Frontend

- **React 19** - UI library with functional components
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management with slices
- **Material-UI (MUI)** - Component library with custom theme
- **Emotion** - CSS-in-JS styling
- **Vite** - Fast build tool and dev server

### Backend

- **Express.js 5** - Web server framework
- **Node.js** - Runtime environment
- **tsx** - TypeScript execution for development

### Testing

- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM implementation for Node.js
- **@testing-library/user-event** - User interaction simulation

## Architecture Highlights

### Client-Side Pagination

- Fetches up to 200 results from iTunes API at once
- Displays 10 results initially
- Loads 10 more results on scroll (infinite scroll)
- All pagination logic handled in Redux

### Infinite Scroll

- Uses window scroll events (not element scroll)
- Triggers when user is 300px from bottom
- Automatically loads more results from client-side cache
- Displays "All results loaded" when complete

### Redux State Management

- **Search Slice**: Query, results, loading, error states
- Typed hooks: `useAppDispatch`, `useAppSelector`
- Async thunks for API calls with iTunes API

### Component Structure

- **Feature-based organization**: Components grouped by feature
- **Component folders**: Each component in its own folder with TS and CSS files
- **Direct imports**: No barrel exports (index.ts files removed)
- **Material-UI integration**: Custom theme with blue/pink palette

## TypeScript Features

- ✅ Full TypeScript support for React components
- ✅ Typed Redux store with `RootState` and `AppDispatch`
- ✅ Type-safe Redux hooks
- ✅ TypeScript Express server
- ✅ Strict type checking enabled
- ✅ Separate TypeScript configurations for client and server
- ✅ Interface definitions for iTunes API responses

## Development Workflow

1. **Start both servers** (recommended):

   ```bash
   # Terminal 1
   npm run dev:server

   # Terminal 2
   npm run dev
   ```

2. **Open browser** to `http://localhost:5173`

3. **Make changes** - Vite hot reload updates instantly

4. **Run tests** to verify changes:

   ```bash
   npm test
   ```

5. **Build for production**:
   ```bash
   npm run build:client
   ```

## License

MIT
