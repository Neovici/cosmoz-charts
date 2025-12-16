import config from '@neovici/cfg/eslint/index.mjs';

export default [
	...config,
	{
		rules: {
			'max-lines-per-function': 0,
			'no-unused-expressions': 0,
			'@typescript-eslint/no-unused-expressions': 0,
			'import/group-exports': 0,
			// Disable rules that were removed in ESLint 9
			'valid-jsdoc': 'off',
		},
	},
	{
		ignores: ['coverage/*', 'dist/*', 'storybook-static/*'],
	},
];
