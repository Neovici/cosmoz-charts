import { assert, fixture, html, nextFrame, oneEvent } from '@open-wc/testing';
import '../cosmoz-chart.js';

const lineOption = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [150, 230, 224, 218, 135, 147, 260],
			type: 'line',
		},
	],
};

suite('cosmoz-chart', () => {
	test('draws a simple line chart', async () => {
		const chart = await fixture(
			html`<cosmoz-chart .option=${lineOption}></cosmoz-chart>`,
		);

		assert.ok(chart.querySelector('canvas'));
	});

	test('sets chart-rendered attribute when rendering completes', async () => {
		const chart = await fixture(
			html`<cosmoz-chart .option=${lineOption}></cosmoz-chart>`,
		);

		// wait for the chart-finished event if not already rendered
		if (!chart.hasAttribute('chart-rendered')) {
			await oneEvent(chart, 'chart-finished');
		}

		assert.isTrue(chart.hasAttribute('chart-rendered'));
	});

	test('dispatches chart-finished event when rendering completes', async () => {
		const chart = await fixture(
			html`<cosmoz-chart .option=${lineOption}></cosmoz-chart>`,
		);

		// if already rendered, update option to trigger a new cycle
		if (chart.hasAttribute('chart-rendered')) {
			chart.option = {
				...lineOption,
				series: [
					{
						data: [260, 147, 135, 218, 224, 230, 150],
						type: 'line',
					},
				],
			};
			await nextFrame();
		}

		const ev = await oneEvent(chart, 'chart-finished');
		assert.ok(ev);
		assert.instanceOf(ev, CustomEvent);
	});

	test('removes chart-rendered attribute before setOption and restores it after', async () => {
		const chart = await fixture(
			html`<cosmoz-chart .option=${lineOption}></cosmoz-chart>`,
		);

		// wait for initial render
		if (!chart.hasAttribute('chart-rendered')) {
			await oneEvent(chart, 'chart-finished');
		}
		assert.isTrue(chart.hasAttribute('chart-rendered'));

		// update option to trigger removeAttribute
		chart.option = {
			...lineOption,
			series: [
				{
					data: [260, 147, 135, 218, 224, 230, 150],
					type: 'line',
				},
			],
		};
		await nextFrame();

		// attribute should be removed before setOption
		assert.isFalse(chart.hasAttribute('chart-rendered'));

		// wait for re-render to complete
		await oneEvent(chart, 'chart-finished');
		assert.isTrue(chart.hasAttribute('chart-rendered'));
	});
});
