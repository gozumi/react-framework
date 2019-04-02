module.exports = {
  coverageDirectory: '<rootDir>/reports/tests/coverage',
  setupFilesAfterEnv: ['<rootDir>/test-configuration/setup-tests.ts'],
  setupFiles: [
    '<rootDir>/test-configuration/gherkin-support.ts'
  ],
  globals: {
    AUTH_REDIRECT_URL: 'AUTH_REDIRECT_URL',
    AUTH_CLIENT_ID: 'AUTH_CLIENT_ID',
    AUTH_DOMAIN: 'AUTH_DOMAIN',
    SERVICE_URL_BASE: 'SERVICE_URL_BASE',
    'ts-jest': {
      diagnostics: {
        ignoreCodes: ['2304']
      }
    }
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.feature$': 'gherkin-jest'
  },
  testRegex: '\\.spec\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
    'feature'
  ],
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  moduleNameMapper: {
    '\\.(css|jpg|jpeg|png|gif|svg)': '<rootDir>/__mocks__/__file__.ts',
    '(worker-loader!web-workers)': '<rootDir>/__mocks__/__web-worker__.ts'
  },
  "testPathIgnorePatterns": ['/node_modules/', 'dist']
}
