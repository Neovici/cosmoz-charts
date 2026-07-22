/* eslint-disable no-alert */
import { html } from '@pionjs/pion';
import '../cosmoz-chart';

export default {
	title: 'Chart',
	component: 'cosmoz-chart',
};

export const line = () => {
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
};

export const donut = () => {
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

export const gauge = () => {
	const option = {
		series: [
			{
				type: 'gauge',
				startAngle: 180,
				endAngle: 0,
				center: ['50%', '75%'],
				radius: '90%',
				min: 0,
				max: 100,
				axisTick: { show: false },
				splitLine: { show: false },
				axisLabel: { show: false },
				title: { offsetCenter: [0, '-10%'], fontSize: 20 },
				detail: { fontSize: 30, offsetCenter: [0, '-35%'] },
				data: [{ value: 70, name: 'Score' }],
				pointer: {
					icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
					length: '12%',
					width: 20,
					offsetCenter: [0, '-75%'],
					itemStyle: { color: 'black' },
				},
				axisLine: {
					lineStyle: {
						width: 40,
						color: [
							[0.33, '#FF6E76'],
							[0.66, '#FDDD60'],
							[1, '#7CFFB2'],
						],
					},
				},
			},
		],
	};
	return html`<cosmoz-chart .option=${option}></cosmoz-chart>`;
};
