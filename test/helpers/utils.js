import {templatize} from '@polymer/polymer/lib/utils/templatize';

// @see https://github.com/PolymerElements/test-fixture/issues/47#issuecomment-453212161
// Helper code to make <template is="dom-template"> stampable by test-fixture
export const upgradeDomTemplates = () => {
	document.querySelectorAll('[is="dom-template"]').forEach(t => {
		t.stamp = function (...args) {
			if (!this._ctor) {
				this._ctor = templatize(this);
			}
			return new this._ctor(...args);
		};
	});
};

const intersects = (el1, el2) => {
	const r1 = el1.getBoundingClientRect(),
		r2 = el2.getBoundingClientRect();

	return r2.top >= r1.top && r2.top <= r1.bottom && (r2.left >= r1.left && r2.left <= r1.right)
		|| r2.bottom >= r1.top && r2.bottom <= r1.bottom && (r2.left >= r1.left && r2.left <= r1.right)
		|| r2.top >= r1.top && r2.top <= r1.bottom && (r2.right >= r1.left && r2.right <= r1.right)
		|| r2.bottom >= r1.top && r2.bottom <= r1.bottom && (r2.right >= r1.left && r2.right <= r1.right);
};

const elementsOverlap = (element, index, elements) =>
	elements.slice(0, index)
		.concat(elements.slice(index + 1))
		.some(otherElement => intersects(element, otherElement) || intersects(otherElement, element));

/** @this chai.Assertion */
const overlap = function () {
	const obj = chai.util.flag(this, 'object');
	this.assert(
		Array.from(obj).some(elementsOverlap),
		'expected elements to overlap',
		'expected elements not to overlap',
	);
};

chai.Assertion.addMethod('overlap', overlap);
