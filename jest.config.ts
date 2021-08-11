import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
   preset: 'ts-jest',
   clearMocks: true,
   collectCoverage: true,
   coverageDirectory: 'coverage',
   coverageProvider: 'v8',
   setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
   moduleNameMapper: {
      ...pathsToModuleNameMapper(compilerOptions.paths, {
         prefix: '<rootDir>/src',
      }),
      '^jose/(.*)$': '<rootDir>/node_modules/jose/dist/node/cjs/$1',
   },
};
