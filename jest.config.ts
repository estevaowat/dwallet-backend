import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
   clearMocks: true,
   coverageDirectory: 'coverage',
   coverageProvider: 'v8',
   preset: 'ts-jest',
   testEnvironment: 'node',
   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/src',
   }),
};
