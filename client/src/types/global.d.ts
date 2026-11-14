import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

export {};

declare global {
  namespace jest {
    interface Matchers<R = void>
      extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  }
}
