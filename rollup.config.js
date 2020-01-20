import typescript from 'rollup-plugin-typescript';
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
		plugins: [tsPlugin],
		external: ['unfetch/polyfill'],
		output: Object.assign({}, output, {
			exports: 'named',
			file: 'build/index.js',
			format: 'esm'
		})
	}
];
