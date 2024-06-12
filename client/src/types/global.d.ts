/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

export {};

declare global {
  interface ImportMetaEnv {
    VITE_API_RPEPOST_URL: string;
  }

  interface ImportMeta {
    env: ImportMetaEnv;
  }

  interface Global extends NodeJS.Global {
    import: ImportMeta;
  }

  namespace jest {
    interface Matchers<R = void>
      extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
  }
}
