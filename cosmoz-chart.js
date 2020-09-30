import {
	component, html, useEffect, useMemo
} from 'haunted';
import bb from 'billboard.js';

export { utcFormat } from 'd3-time-format';
export { format } from 'd3-format';
export { schemePaired as defaultColorScheme } from 'd3-scale-chromatic';
export * from 'billboard.js';

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
	useChartResize = (host, chartRef) => useEffect(() => {
		const observer = new ResizeObserver(entries => requestAnimationFrame(() => {
			const width = entries[0]?.contentRect.width;
			if (width === 0 || width === chartRef.width) {
				return;
			}
			chartRef.width = width;
			chartRef.chart.internal.cache.cache = {};
			chartRef.chart.resize();
		}));

		observer.observe(host);

		return () => {
			observer.unobserve(host);
		};
	}, []),

	useChart = host => {
		const {
				config,
				data
			} = host,
			chartRef = useMemo(() => ({
				el: host.appendChild(document.createElement('div')),
				width: 0
			}), []);

		useEffect(() => {
			chartRef.chart = bb.generate(configure(config, host, chartRef.el));
		}, [config]);

		useEffect(() => {
			chartRef.chart?.load(data); /* eslint-disable-line no-unused-expressions */
		}, [data]);

		useChartResize(host, chartRef);

		useEffect(() => () => requestAnimationFrame(() => {
			chartRef.chart?.destroy(); /* eslint-disable-line no-unused-expressions */
		}), []);
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

customElements.define('cosmoz-chart', component(chart));
