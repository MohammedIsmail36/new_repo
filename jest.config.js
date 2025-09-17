/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/__mocks__/resize-observer.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', {
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
      ],
    }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@hookform|react-hook-form|cmdk)/)',
  ],
};

module.exports = config;