module.exports = {
	root: true,
	env: { node: true, es6: true },
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		sourceType: 'module',
		extraFileExtensions: ['.json'],
	},
	ignorePatterns: ['init/**', 'dist/**', 'node_modules/**', 'tests/**', '*.js'],
	overrides: [
		{
			files: ['package.json'],
			extends: ['plugin:n8n-nodes-base/community'],
		},
		{
			files: ['nodes/**/*.ts'],
			extends: ['plugin:n8n-nodes-base/nodes'],
		},
	],
};
