import '@testing-library/jest-dom';

// Define the type for the global object to include import.meta.env
type Global = typeof globalThis & {
  import: {
    meta: {
      env: {
        VITE_API_RPEPOST_URL: string;
      };
    };
  };
};

// Mock import.meta.env
(globalThis as Global).import = {
  meta: {
    env: {
      VITE_API_RPEPOST_URL: 'http://localhost:4000/api/rpe',
    },
  },
};
