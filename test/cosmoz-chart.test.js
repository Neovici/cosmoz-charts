import { assert, html, fixture } from '@open-wc/testing';
import '../cosmoz-chart.js';

suite('cosmoz-chart', () => {
	test('draws a simple line chart', async () => {

		const option = {
				xAxis: {
					type: 'category',
					data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						data: [150, 230, 224, 218, 135, 147, 260],
						type: 'line'
					}
				]
			},
			chart = await fixture(html`<cosmoz-chart .option=${ option }>`);

		assert.ok(chart.querySelector('canvas'));
	});
});

