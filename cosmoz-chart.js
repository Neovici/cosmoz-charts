import { html, component, useEffect, useMemo } from 'haunted';
import * as echarts from 'echarts/core';
import {
	GridComponent,
	LegendComponent,
	TitleComponent,
	TooltipComponent
} from 'echarts/components';
import { LineChart, PieChart } from 'echarts/charts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
	GridComponent,
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	LineChart,
	PieChart,
	CanvasRenderer,
	LabelLayout,
	UniversalTransition
]);

const
	useChart = host => {
		const { option } = host,
			ref = useMemo(() => ({ }), []);

		useEffect(() => {
			const chart = echarts.init(host),
				onClick = detail => host.dispatchEvent(new CustomEvent('data-click', { detail }));

			chart.on('click', onClick);
			ref.chart = chart;

			return () => {
				chart.off('click', onClick);
				chart.dispose();
			};
		}, []);

		useEffect(() => {
			ref.chart.setOption(option);
		}, [option]);

		useEffect(() => {
			const observer = new ResizeObserver(entries => requestAnimationFrame(() => ref.chart.resize({
				width: entries[0]?.contentRect.width
			})));
			observer.observe(host);
			return () => observer.unobserve(host);
		}, []);
	},
	renderChart = () => html`
		<style>
			:host{
				display: block;
				min-height: var(--cosmoz-chart-min-height, 320px);
			}
		</style>
		<slot></slot>
	`,

	/**
	 * @param {HTMLElement} host The host custom element
	 * @return {TemplateResult}
	 *
	 * `cosmoz-chart`
	 * Create beautiful charts using [echarts](https://echarts.apache.org).
	 *
	 * All echarts configuration options can be set using the `option` property.
	 * The echarts `click` event is exposed as `data-click`.
	 *
	 *
	 * @customElement
	 */
	chart = host => renderChart(useChart(host));

customElements.define('cosmoz-chart', component(chart));

export { echarts };
