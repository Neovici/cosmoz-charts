import {
	component, html, useLayoutEffect, useMemo
} from 'haunted';
/* eslint-disable no-unused-expressions */
/**
 * billboard.js
 * @type {BillboardJS}
 */
import { bb } from 'billboard.js/src/core';

export {
	format, utcFormat
} from 'd3';
export { schemePaired as defaultColorScheme } from 'd3-scale-chromatic';

const
	/**
	 * Chart events
	 * @type {Array}
	 */
	bbEvents = [
		'onafterinit',
		'onbeforeinit',
		'oninit',
		'onout',
		'onover',
		'onrendered',
		'onresize',
		'onresized'
	],

	/**
	* Chart datapoint events
	* @type {Array}
	*/
	bbDataEvents = [
		'onclick',
		'onmax',
		'onmin',
		'onout',
		'onover',
		'onselected',
		'onunselected'
	],
	getBBEvents = host => Object.fromEntries(bbEvents.map(ev => [ev, () => host.dispatchEvent(new CustomEvent(ev.replace('on', '')))])),
	getBBDataEvents = host => Object.fromEntries(bbDataEvents.map(ev => [ev, (d, el) =>
		host.dispatchEvent(new CustomEvent(ev.replace('on', '').replace('click', 'dataclick'), {
			detail: {
				d,
				el
			}
		}))])),
	configure = (cfg, host, bindto) => ({
		...getBBEvents(host),
		...cfg,
		data: {
			...host.data,
			...getBBDataEvents(host)
		},
		bindto
	}),

	useChart = host => {
		const {
				config,
				data
			} = host,
			chartRef = useMemo(() => ({
				el: host.appendChild(document.createElement('div'))
			}), []);

		useLayoutEffect(() => {
			const chart = bb.generate(configure(config, host, chartRef.el));
			chart.$.svg.style('max-width', '100%');
			chartRef.chart = chart;
		}, [config]);

		useLayoutEffect(() => {
			chartRef.chart?.load(data);
		}, [data]);

		useLayoutEffect(() => () => {
			chartRef.chart?.destroy();
		}, []);
	},
	renderChart = () => html`
		<style>:host { display: block }</style>
		<slot></slot>
	`,

	/**
	 * @param {HTMLElement} host The host custom element
	 * @return {TemplateResult}
	 *
	 * `cosmoz-chart`
	 * Create beautiful charts using billboard.js.
	 *
	 * All billboard.js configuration options are exposed as properties. All events
	 * are dispatched as CustomEvents.
	 *
	 * ## Billboard.js Documentation
	 * * [API](https://naver.github.io/billboard.js/release/latest/doc/index.html)
	 * * [Examples](https://naver.github.io/billboard.js/demo/)
	 *
	 * @customElement
	 * @polymer
	 * @demo demo/index.html
	 */
	chart = host => renderChart(useChart(host));

// /**
//  * Resizes the chart.
//  * @param  {Boolean} hard force dimensions re-calculation
//  * @return {void}
//  */
// resize(hard) {
// 	this.chart.resize();

// 	if (hard) {
// 		this.chart.internal.clearLegendItemTextBoxCache();
// 		this.chart.internal.resetCache();
// 		// a second resize is required to fully update the dimensions
// 		this.chart.resize();
// 	}
// }

customElements.define('cosmoz-chart', component(chart));
