module.exports = {
  testEnvironment: 'node',
  testTimeout: 10000, // 10s unit => milliseconds
  testMatch: ['**/tests/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/'],
};