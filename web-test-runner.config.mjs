import { chromeLauncher } from '@web/test-runner';
import { fromRollup } from '@web/dev-server-rollup';
import rollupReplace from '@rollup/plugin-replace';
import { seleniumLauncher } from '@web/test-runner-selenium';
import webdriver from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox.js';

const replace = fromRollup(rollupReplace);

export default {
	nodeResolve: true,
	coverageConfig: {
		reportDir: 'coverage',
		threshold: {
			statements: 70,
			branches: 70,
			functions: 50,
			lines: 70
		}
	},

	plugins: [
		replace({
			preventAssignment: true,
			include: ['node_modules/echarts/**/*.js'],
			'process.env.NODE_ENV': '"development"'
		})
	],

	files: [
		'**!(node_modules)/*.test.js'
	],
	testFramework: { config: { ui: 'tdd' }},
	browsers: [
		chromeLauncher(),
		seleniumLauncher({
			driverBuilder: new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless())
		})
	]

};
