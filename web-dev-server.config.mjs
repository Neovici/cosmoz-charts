import { storybookPlugin } from '@web/dev-server-storybook';
import { fromRollup } from '@web/dev-server-rollup';
import rollupReplace from '@rollup/plugin-replace';

const replace = fromRollup(rollupReplace);

export default {
	plugins: [
		replace({
			preventAssignment: true,
			include: ['node_modules/echarts/**/*.js'],
			'process.env.NODE_ENV': '"development"'
		}),
		storybookPlugin({ type: 'web-components' })
	]
};
