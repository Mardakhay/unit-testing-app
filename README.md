# Unit Testing App

A React + TypeScript application built with Vite for practicing unit testing using modern tools.

## Tech Stack

- React
- TypeScript
- Vite
- Vitest
- @testing-library/react
- @testing-library/user-event
- @testing-library/jest-dom

## Features

- Component testing (Greeting, Counter, LoginForm, TodoApp)
- Form validation testing
- User interaction testing
- Utility function testing (math, string, validators)
- Error handling and edge case coverage

## Project Structure

```bash
src/
├── components/
│   ├── Counter.tsx
│   ├── Counter.test.tsx
│   ├── Greeting.tsx
│   ├── Greeting.test.tsx
│   ├── LoginForm.tsx
│   ├── LoginForm.test.tsx
│   ├── TodoApp.tsx
│   └── TodoApp.test.tsx
├── utils/
│   ├── math.ts
│   ├── math.test.ts
│   ├── string.ts
│   ├── string.test.ts
│   ├── validators.ts
│   └── validators.test.ts
├── App.tsx
├── App.css
├── main.tsx
└── setupTests.ts
````

## Installation

```bash
npm install
```

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the project for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run test
```

Runs tests in watch mode.

```bash
npm run test:run
```

Runs all tests once.

## Testing

The project uses:

* Vitest as the test runner
* @testing-library/react for rendering and querying components
* @testing-library/user-event for simulating user interactions
* @testing-library/jest-dom for extended DOM assertions

## Purpose

This project is built to practice modern frontend testing techniques in React applications.
