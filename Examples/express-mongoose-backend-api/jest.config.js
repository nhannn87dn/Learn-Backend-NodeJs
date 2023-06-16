module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000, // 10s unit => milliseconds
  testMatch: ['**/tests/*/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/'],
};