import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `cosmoz-charts`
 * Create beautiful charts using billboard.js
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class CosmozCharts extends PolymerElement {
	static get template() {
		return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
	}
	static get properties() {
		return {
			prop1: {
				type: String,
				value: 'cosmoz-charts',
			},
		};
	}
}

window.customElements.define('cosmoz-charts', CosmozCharts);
