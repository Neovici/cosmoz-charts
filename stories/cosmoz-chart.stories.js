/* eslint-disable no-alert, camelcase */
import { html } from '@pionjs/pion';
import '../cosmoz-chart';

export default {
	title: 'Chart',
	component: 'cosmoz-chart',
};

const line = () => {
		const option = {
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
		return html`<cosmoz-chart .option=${option}></cosmoz-chart>`;
	},
	donut = () => {
		const option = {
			tooltip: {
				trigger: 'item',
			},
			legend: {
				top: '5%',
				left: 'center',
			},
			series: [
				{
					name: 'Access From',
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					label: {
						show: false,
						position: 'center',
					},
					emphasis: {
						label: {
							show: true,
						},
					},
					labelLine: {
						show: false,
					},
					data: [
						{ value: 1048, name: 'Search Engine' },
						{ value: 735, name: 'Direct' },
						{ value: 580, name: 'Email' },
						{ value: 484, name: 'Union Ads' },
						{ value: 300, name: 'Video Ads' },
					],
				},
			],
		};
		return html`<cosmoz-chart
			.option=${option}
			@data-click=${() => alert('data-click')}
		></cosmoz-chart>`;
	};

export { line, donut };
