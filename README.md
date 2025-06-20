# Tour MCP Server

A TypeScript-based Node.js application designed to serve as an MCP (Model Context Protocol) server.

## Features

- **Full TypeScript Support**: Complete type safety and modern JavaScript features
- **Structured Logging**: Consistent logging throughout the application
- **Configuration Management**: Environment-based configuration system
- **Testing Setup**: Jest configuration for unit testing
- **Code Quality**: ESLint configuration for code linting
- **Development Tools**: Hot reloading and development scripts

## Project Structure

```
tour-mcp-server/
├── src/                    # Source code
│   ├── config/            # Configuration management
│   │   └── config.ts      # Main configuration class
│   ├── utils/             # Utility functions and classes
│   │   └── logger.ts      # Logging utility
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Common types and interfaces
│   ├── __tests__/         # Test files
│   │   └── config.test.ts # Configuration tests
│   └── index.ts           # Application entry point
├── dist/                  # Compiled JavaScript (generated)
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Jest testing configuration
├── .eslintrc.js           # ESLint configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tour-mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Available Scripts

- **`npm run dev`**: Start the application in development mode with hot reloading
- **`npm run build`**: Compile TypeScript to JavaScript
- **`npm start`**: Run the compiled application
- **`npm run watch`**: Watch for file changes and recompile automatically
- **`npm test`**: Run tests
- **`npm run lint`**: Check code for linting issues
- **`npm run lint:fix`**: Fix automatically fixable linting issues
- **`npm run clean`**: Remove compiled files

### Development Workflow

1. Start development mode:
   ```bash
   npm run dev
   ```

2. The application will start and you'll see logs indicating the startup process.

3. Make changes to the source code in the `src/` directory.

4. The application will automatically restart when you save changes.

### Environment Variables

The application supports the following environment variables:

- `NODE_ENV`: Environment mode (development, production, test) - defaults to 'development'
- `PORT`: Port number for the server - defaults to 3000
- `LOG_LEVEL`: Logging level (debug, info, warn, error) - defaults to 'info'
- `DEBUG`: Enable debug mode - defaults to true in development

Example `.env` file:
```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
DEBUG=true
```

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Code Quality

### Linting

The project uses ESLint with TypeScript support. Run linting:
```bash
npm run lint
```

Fix automatically fixable issues:
```bash
npm run lint:fix
```

### TypeScript Configuration

The TypeScript configuration (`tsconfig.json`) includes:
- Strict type checking
- Modern ES2022 target
- Source maps for debugging
- Declaration file generation
- CommonJS module system

## Architecture

### Configuration Management

The `Config` class in `src/config/config.ts` handles all application configuration:
- Environment variable loading
- Default value management
- Type-safe configuration access

### Logging

The `Logger` class in `src/utils/logger.ts` provides:
- Structured logging with timestamps
- Different log levels (debug, info, warn, error)
- Context-aware logging
- Development-only debug logging

### Type Safety

Common types and interfaces are defined in `src/types/index.ts`:
- API response structures
- Configuration interfaces
- Generic utility types

## Contributing

1. Follow the existing code style and patterns
2. Add tests for new functionality
3. Ensure all tests pass before submitting changes
4. Update documentation as needed

## License

MIT License - see LICENSE file for details. 