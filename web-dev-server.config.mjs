import cfg from '@neovici/cfg/web/dev-server.mjs';
import { storybookPlugin } from '@web/dev-server-storybook';
import { fromRollup } from '@web/dev-server-rollup';
import rollupReplace from '@rollup/plugin-replace';

export const replace = fromRollup(rollupReplace)({
	preventAssignment: true,
	include: ['node_modules/echarts/**/*.js'],
	'process.env.NODE_ENV': '"development"',
});

export default {
	...cfg,
	plugins: [
		...cfg.plugins,
		replace,
		storybookPlugin({ type: 'web-components' }),
	],
};
