/* eslint-disable no-alert, camelcase */
import { html } from 'haunted';
import { donut as bbDonut } from 'billboard.js';
import '../cosmoz-chart';

export default {
	title: 'Chart',
	component: 'cosmoz-chart'
};

const timeseries = () => html`
	<link rel="stylesheet" href="/node_modules/billboard.js/dist/billboard.css">
	<cosmoz-chart
		.config=${ { axis: { x: { type: 'timeseries' }}} }
		.data=${ {
			x: 'time',
			columns: [['time', '2019-03-13', '2019-03-25', '2019-04-02'], ['errors', 1, 5, 6]]
		} }
	></cosmoz-chart>
`,

	donut = () => html`
	<cosmoz-chart
		.data=${ {
			columns: [
				['supplier_missing', 120],
				['duplicate', 37],
				['reasonable_error', 1]
			],
			type: bbDonut(),
			names: {
				supplier_missing: 'Supplier missing'
			}
		} }
		@dataclick=${ () => alert('dataclick') }
	></cosmoz-chart>
`;

export {
	timeseries,
	donut
};
