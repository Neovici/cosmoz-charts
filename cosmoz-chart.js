import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

const bb = window.bb;
const bbProps = ['area', 'axis', 'bar', 'bubble', 'clipPath', 'color',
	'donut', 'gauge', 'grid', 'interaction', 'legend', 'line', 'padding', 'pie',
	'point', 'radar', 'regions', 'resize', 'size', 'spline', 'subchart', 'svg',
	'title', 'tooltip', 'transition', 'zoom'];
const bbEvents = ['onafterinit', 'onbeforeinit', 'oninit', 'onout', 'onover',
	'onrendered', 'onresize', 'onresized'];
const bbDataEvents = ['onclick', 'onmax', 'onmin', 'onout', 'onover',
	'onselected', 'onunselected'];

/**
 * `cosmoz-chart`
 * Create beautiful charts using billboard.js
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class CosmozChart extends PolymerElement {
	static get template() {
		return html`<div id="chart"></div>`;
	}

	static get properties() {
		return bbProps.concat('data').reduce((acc, i) => {
			acc[i] = {type: Object};
			return acc;
		}, {});
	}

	static get observers() {
		const configParams = bbProps.join(',');
		return [
			'_onDataUpdate(data)',
			'_onConfigUpdate(' + configParams + ')'
		];
	}

	connectedCallback() {
		super.connectedCallback();

		this.render();
	}

	render() {
		// configure events for data points interactions
		const dataEvents = bbDataEvents.reduce((acc, i) => {
			const event = i.replace('on', '').replace('click', 'dataclick');

			acc[i] = (d, el) =>
				this.dispatchEvent(new CustomEvent(event, {
					detail: {d, el}
				}));

			return acc;
		}, {});

		// configure events for chart interactions
		const chartEvents = bbEvents.reduce((acc, i) => {
			acc[i] = () => this.dispatchEvent(new CustomEvent(i.replace('on', '')));
			return acc;
		}, {});

		// configure chart
		const props = bbProps.reduce((acc, i) => {
			if (this[i] != null) {
				acc[i] = this[i];
			}
			return acc;
		}, {});

		const config = Object.assign(
			{ bindto: this.$.chart },
			{ data: Object.assign({}, this.data, dataEvents) },
			props,
			chartEvents
		);

		this.chart = bb.generate(config);
	}

	_attachDom(dom) {
		this.appendChild(dom);
	}

	_onDataUpdate(data) {
		if (this.chart == null) {
			return;
		}

		this.chart.load(data);
	}

	_onConfigUpdate() {
		if (this.chart == null) {
			return;
		}

		this.render();
	}
}

window.customElements.define('cosmoz-chart', CosmozChart);
