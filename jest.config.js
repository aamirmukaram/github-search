module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    transform_regex: ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    }]
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/app/$1',
  },
};
