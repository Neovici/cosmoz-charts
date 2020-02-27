import {
	html, PolymerElement
} from '@polymer/polymer/polymer-element.js';

/**
 * billboard.js
 * @type {BillboardJS}
 */
import { bb } from 'billboard.js/src/core';

export {
	format, utcFormat
} from 'd3';
export { schemePaired as defaultColorScheme } from 'd3-scale-chromatic';

/**
 * Billboard.js configuration properties
 * @type {Array}
 */
const bbProps = [
		'area',
		'axis',
		'bar',
		'bubble',
		'clipPath',
		'color',
		'donut',
		'gauge',
		'grid',
		'interaction',
		'legend',
		'line',
		'padding',
		'pie',
		'point',
		'radar',
		'regions',
		'resize',
		'size',
		'spline',
		'subchart',
		'svg',
		'title',
		'tooltip',
		'transition',
		'zoom'
	],

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
	];

/**
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
class CosmozChart extends PolymerElement {
	/**
	 * Fired when a data point is clicked.
	 *
	 * @event dataclick
	 * @param {Object} data the data point that was clicked
	 * @param {Element} element the DOM element that was clicked
	 */

	/**
	 * Configures the template.
	 * @type {String}
	 */
	static get template() {
		return html`
			<style>:host { display: block }</style>
			<slot id="slot"></slot>
		`;
	}

	/**
	 * Configures the light DOM template.
	 * @type {String}
	 */
	static get lightTemplate() {
		return html`<div id="chart"></div>`;
	}

	/**
	 * Configures all billboard.js options as properties.
	 * @type {Object}
	 */
	static get properties() {
		return bbProps.concat('data', 'config').reduce((acc, i) => {
			acc[i] = { type: Object };
			return acc;
		}, {});
	}

	/**
	 * Configures observers for properties.
	 * @type {Array}
	 */
	static get observers() {
		const configParams = bbProps.join(',');
		return [
			'_onDataUpdate(data)',
			'_onConfigUpdate(config,' + configParams + ')'
		];
	}

	/**
	 * Renders the chart when connected.
	 * @return {void}
	 */
	connectedCallback() {
		super.connectedCallback();

		this.render();
	}

	/**
	 * Renders a billboard.js chart.
	 * @return {void}
	 */
	render() {
		// configure events for data points interactions
		const dataEvents = bbDataEvents.reduce((acc, i) => {
				const event = i.replace('on', '').replace('click', 'dataclick');

				acc[i] = (d, el) =>
					this.dispatchEvent(new CustomEvent(event, {
						detail: {
							d,
							el
						}
					}));

				return acc;
			}, {}),

			// configure events for chart interactions
			chartEvents = bbEvents.reduce((acc, i) => {
				acc[i] = () => this.dispatchEvent(new CustomEvent(i.replace('on', '')));
				return acc;
			}, {}),

			// configure chart
			props = bbProps.reduce((acc, i) => {
				if (this[i] != null) {
					acc[i] = this[i];
				}
				return acc;
			}, {}),

			bindto = this.$.slot.assignedNodes()
				.find(node => node.id === 'chart'),

			config = Object.assign(
				{ bindto },
				{ data: Object.assign({}, this.data, dataEvents) },
				this.config || {},
				props,
				chartEvents
			);

		this.chart = bb.generate(config);
		this.chart.$.svg.style('max-width', '100%');
	}

	/**
	 * Resizes the chart.
	 * @param  {Boolean} hard force dimensions re-calculation
	 * @return {void}
	 */
	resize(hard) {
		this.chart.resize();

		if (hard) {
			this.chart.internal.clearLegendItemTextBoxCache();
			this.chart.internal.resetCache();
			// a second resize is required to fully update the dimensions
			this.chart.resize();
		}
	}

	/**
	 * Render both in the shadow and the light DOM.
	 * @param  {DocumentFragment} dom the template
	 * @return {void}
	 */
	_attachDom(dom) {
		this.appendChild(CosmozChart.lightTemplate.content);
		return super._attachDom(dom);
	}

	/**
	 * Updates the chart when the data is updated.
	 * @param  {Object} data the data
	 * @return {void}
	 */
	_onDataUpdate(data) {
		if (this.chart == null) {
			return;
		}

		this.chart.load(data);
	}

	/**
	 * Updates the chart when the configuration properties change.
	 * @return {void}
	 */
	_onConfigUpdate() {
		if (this.chart == null) {
			return;
		}

		this.render();
	}
}

window.customElements.define('cosmoz-chart', CosmozChart);
