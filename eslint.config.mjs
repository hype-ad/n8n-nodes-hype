import communityNodes from '@n8n/eslint-plugin-community-nodes';
import tsParser from '@typescript-eslint/parser';

export default [
	{ ignores: ['dist/**', 'node_modules/**'] },
	{
		...communityNodes.configs.recommended,
		files: ['nodes/**/*.ts', 'credentials/**/*.ts', 'nodes/**/*.node.json', 'package.json'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				extraFileExtensions: ['.json'],
			},
		},
	},
];
