const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  // testTimeout: 30000, // 10s unit => milliseconds
  // testMatch: ['**/__tests__/*/*.test.ts'],
  // testPathIgnorePatterns: ['/node_modules/'],
   transform: {
    ...tsJestTransformCfg,
  },
};