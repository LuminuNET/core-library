import typescript from 'rollup-plugin-typescript';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { version, name } from './package.json';

const input = './src/index.ts';
const tsPlugin = typescript({ module: 'es2015' });
const output = {
	banner: `/* ${name} | version ${version} | author Keimeno */`,
	name: '@luminu/core'
};

export default [
	{
		input,
		plugins: [
			tsPlugin,
			json(),
			resolve({ browser: true, modulesOnly: true }),
			commonjs()
		],
		external: ['unfetch/polyfill'],
		output: Object.assign({}, output, {
			exports: 'named',
			file: 'build/index.js',
			format: 'cjs'
		})
	}
];
