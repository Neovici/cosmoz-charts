import { html, component, useEffect } from '@pionjs/pion';
import { useMeta } from '@neovici/cosmoz-utils/hooks/use-meta';
import * as echarts from 'echarts/core';
import {
	GridComponent,
	LegendComponent,
	TitleComponent,
	TooltipComponent,
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
	UniversalTransition,
]);

const useChart = (host) => {
		const { option, theme, initOpts } = host,
			meta = useMeta({ chart: undefined, lastOption: undefined });

		useEffect(() => {
			const chart = echarts.init(host, theme, initOpts),
				onClick = (detail) =>
					host.dispatchEvent(new CustomEvent('data-click', { detail }));

			chart.on('click', onClick);
			meta.chart = chart;

			return () => {
				chart.off('click', onClick);
				chart.dispose();
			};
		}, [theme, initOpts]);

		useEffect(() => {
			// when a series is removed, echarts does not remove it from the view
			// as a workaround, when the number of series falls, we clear the chart
			// @see https://github.com/apache/echarts/issues/15585
			if (
				meta.lastOption &&
				meta.lastOption.series?.length > option.series?.length
			) {
				meta.chart.clear();
			}
			meta.chart.setOption(option);
			meta.lastOption = option;
		}, [option, theme, initOpts]);

		useEffect(() => {
			const observer = new ResizeObserver((entries) =>
				requestAnimationFrame(() =>
					meta.chart.resize({
						width: entries[0]?.contentRect.width,
					}),
				),
			);
			observer.observe(host);
			return () => observer.unobserve(host);
		}, []);
	},
	renderChart = () => html`
		<style>
			:host {
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
	chart = (host) => renderChart(useChart(host));

customElements.define('cosmoz-chart', component(chart));

export { echarts };
