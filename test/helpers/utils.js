import {templatize} from '@polymer/polymer/lib/utils/templatize';

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