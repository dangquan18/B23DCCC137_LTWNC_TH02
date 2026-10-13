import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  // Mỗi worker giữ một jsdom riêng; mặc định Jest mở (số CPU - 1) worker nên dễ hết RAM trên máy nhiều nhân.
  maxWorkers: 2,
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  transform: {
    '^.+[.]tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }],
  },
  moduleNameMapper: {
    '[.]css$': 'identity-obj-proxy',
  },
  clearMocks: true,
  restoreMocks: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/main.tsx', '!src/app/store.ts', '!src/**/*.d.ts', '!src/test/**'],
  coverageReporters: ['text', 'text-summary', 'html'],
  coverageThreshold: {
    './src/features/': {
      statements: 70,
    },
  },
};

export default config;
