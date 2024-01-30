module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./tests'],
  silent: false,
  verbose: true,
  collectCoverageFrom: ['../src/**'],
  coverageReporters: ['text']
};