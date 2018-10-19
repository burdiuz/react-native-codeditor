import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export const LIBRARY_VAR_NAME = 'CodeEditor';

export const plugins = [
  resolve(),
  babel({
    presets: [['module:metro-react-native-babel-preset', { disableImportExportTransform: true }]],
    plugins: ['@babel/plugin-external-helpers'],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
    externalHelpers: true,
    babelrc: false,
  }),
  commonjs(),
  json(),
];

export const cjsConfig = {
  input: 'source/index.js',
  output: [
    {
      file: 'index.js',
      sourcemap: true,
      exports: 'named',
      format: 'cjs',
    },
  ],
  plugins,
  external: [
    'react',
    'react-native',
    'prop-types',
    '@actualwave/deferred',
    '@actualwave/event-dispatcher',
    '@actualwave/messageport-dispatcher',
  ],
};
