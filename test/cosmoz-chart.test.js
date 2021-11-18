import { assert, html, fixture, fixtureSync, nextFrame, oneEvent } from '@open-wc/testing';
import { spy } from 'sinon';
import { line } from '../cosmoz-chart.js';

const intersects = (el1, el2) => {
		const r1 = el1.getBoundingClientRect(),
			r2 = el2.getBoundingClientRect();

		return r2.top >= r1.top && r2.top <= r1.bottom && (r2.left >= r1.left && r2.left <= r1.right)
		|| r2.bottom >= r1.top && r2.bottom <= r1.bottom && (r2.left >= r1.left && r2.left <= r1.right)
		|| r2.top >= r1.top && r2.top <= r1.bottom && (r2.right >= r1.left && r2.right <= r1.right)
		|| r2.bottom >= r1.top && r2.bottom <= r1.bottom && (r2.right >= r1.left && r2.right <= r1.right);
	},

	elementsOverlap = (element, index, elements) =>
		elements.slice(0, index)
			.concat(elements.slice(index + 1))
			.some(otherElement => intersects(element, otherElement) || intersects(otherElement, element)),

	overlap = obj => Array.from(obj).some(elementsOverlap);

suite('cosmoz-chart', () => {
	test('draws a simple line chart', async () => {
		const chart = await fixture(html`
			<cosmoz-chart .data=${ {
				type: line(),
				columns: [
					['data1', 1, 2, 3],
					['data2', 1, 2, 3],
					['data3', 1, 2, 3],
					['data4', 1, 2, 3],
					['data5', 1, 2, 3],
					['data6', 1, 2, 3],
					['data7', 1, 2, 3],
					['data8', 1, 2, 3]
				]
			} }
			></cosmoz-chart>`);

		assert.isFalse(overlap(chart.querySelectorAll('.bb-legend-item text')), 'expected element to not overlap');
		assert.ok(chart.querySelector('.bb-line-data1'));
		assert.lengthOf(chart.querySelectorAll('circle'), 24);
	});

	test('configures axis', async () => {
		const chart = await fixture(html`
			<cosmoz-chart .data=${ {
				columns: [['data1', 10, 20, 30]]
			} }
			.config=${ {
				axis: {
					x: { show: false },
					y: {
						tick: {
							format(x) {
								return x + '%';
							},
							count: 5
						}
					}
				},
				line: { point: false }
			} }
			></cosmoz-chart>`);

		assert.equal(window.getComputedStyle(chart.querySelector('.bb-axis-y')).visibility, 'visible');
		assert.lengthOf(chart.querySelectorAll('.bb-axis-y .tick'), 5);
	});

	test('updates the chart when the data changes', async () => {
		const chart = await fixture(html`
			<cosmoz-chart .data=${ {
				columns: [['data1', 1, 2, 3]]
			} }
			></cosmoz-chart>`);
		assert.notOk(chart.querySelector('.bb-line-data2'));

		chart.data = {
			columns: [
				['data1', 2, 3, 4, 5, 6],
				['data2', 20, 30, 40, 50, 60]
			]
		};
		await nextFrame();

		assert.ok(chart.querySelector('.bb-line-data1'));
		assert.ok(chart.querySelector('.bb-line-data2'));
		assert.lengthOf(chart.querySelectorAll('circle'), 10);
	});

	test('updates the chart when the config changes', async () => {
		const chart = await fixture(html`
			<cosmoz-chart .data=${ {
				columns: [['data1', 10, 20, 30]]
			} }
			></cosmoz-chart>`);

		assert.equal(window.getComputedStyle(chart.querySelector('.bb-axis-x')).visibility, 'visible');

		chart.config = {
			axis: {
				x: { show: false },
				y: {
					tick: {
						format(x) {
							return x + '%';
						},
						count: 5
					}
				}
			}
		};
		await nextFrame();

		assert.equal(window.getComputedStyle(chart.querySelector('.bb-axis-x')).visibility, 'hidden');
		assert.equal(window.getComputedStyle(chart.querySelector('.bb-axis-y')).visibility, 'visible');
		assert.lengthOf(chart.querySelectorAll('.bb-axis-y .tick'), 5);
	});

	test('cleanup on unmount', async () => {
		const chart = await fixture(html`
			<cosmoz-chart .data=${ {
				columns: [['data1', 10, 20, 30]]
			} }
			></cosmoz-chart>`);

		assert.isAbove(chart.firstChild.children.length, 1);
		chart.remove();
		await nextFrame();
		assert.isBelow(chart.firstChild.children.length, 1);

	});

	test('triggers events', async () => {
		const chart = fixtureSync(html`
			<cosmoz-chart .data=${ {
				columns: [['data1', 10, 20, 30]]
			} }
			></cosmoz-chart>`);
		await oneEvent(chart, 'rendered');
		const onDataClick = spy();
		chart.addEventListener('dataclick', onDataClick);

		await nextFrame();
		await nextFrame();
		await nextFrame();
		const el = chart.querySelector('.bb-event-rect');

		assert.ok(el);
		const eBox = el.getBoundingClientRect();

		el.dispatchEvent(new MouseEvent('click', {
			bubbles: true,
			composed: true,
			cancelable: true,
			clientX: eBox.left + eBox.width / 2,
			clientY: eBox.top + eBox.height / 2
		}));

		assert.isTrue(onDataClick.calledOnce);
		assert.isTrue(onDataClick.calledWithMatch({
			detail: {
				d: {
					x: 1,
					value: 20
				}
			}
		}));
	});

	test('triggers a chart resize', async () => {
		const chart = await fixture(html`
			<cosmoz-chart .data=${ {
				columns: [['data1', 10, 20, 30]]
			} }
			.config=${ { axis: { x: { show: false }}} }
			></cosmoz-chart>`);
		assert.isAbove(parseFloat(chart.querySelector('svg').getAttribute('width')), 100);
		chart.style.width = '100px';
		await nextFrame();
		await nextFrame();
		await nextFrame();
		assert.closeTo(parseFloat(chart.querySelector('svg').getAttribute('width')), 100, 1);
	});

	test('re-renders after element becomes visible [#15]', async () => {
		const chart = await fixture(html`
			<cosmoz-chart style="display: none" .data=${ {
				columns: [
					['data1', 1, 2, 3],
					['data2', 1, 2, 3],
					['data3', 1, 2, 3],
					['data4', 1, 2, 3],
					['data5', 1, 2, 3],
					['data6', 1, 2, 3],
					['data7', 1, 2, 3],
					['data8', 1, 2, 3]
				]
			} }
			></cosmoz-chart>`);

		chart.style.display = '';
		await nextFrame();
		await nextFrame();
		assert.isFalse(overlap(chart.querySelectorAll('.bb-legend-item text')), 'expected element to not overlap');
		assert.isAbove(chart.querySelector('g:nth-of-type(1)').getBoundingClientRect().height, 280);
	});

	test('re-renders after element has size', async () => {
		const chart = await fixture(html`
			<cosmoz-chart style="display: none" .data=${ {
				columns: [
					['data1', 1, 2, 3],
					['data2', 1, 2, 3],
					['data3', 1, 2, 3],
					['data4', 1, 2, 3],
					['data5', 1, 2, 3],
					['data6', 1, 2, 3],
					['data7', 1, 2, 3],
					['data8', 1, 2, 3]
				]
			} }
			></cosmoz-chart>`);

		chart.style.display = '';
		chart.style.width = '0';
		await nextFrame();
		await nextFrame();

		chart.style.width = '';
		await nextFrame();
		await nextFrame();

		assert.isFalse(overlap(chart.querySelectorAll('.bb-legend-item text')), 'expected element to not overlap');
		assert.isAbove(chart.querySelector('g:nth-of-type(1)').getBoundingClientRect().height, 280);
	});


});

