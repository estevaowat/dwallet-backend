/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * htt
 */

import { pathsToModuleNameMapper } from 'ts-jest/utils'
import { compilerOptions } from './tsconfig.json'
 
export default { 
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
   preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  })
};
