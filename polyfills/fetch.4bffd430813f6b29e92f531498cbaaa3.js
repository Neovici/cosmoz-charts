!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.WHATWGFetch={})}(this,(function(e){"use strict";var t="undefined"!=typeof globalThis&&globalThis||"undefined"!=typeof self&&self||"undefined"!=typeof global&&global||{},r="URLSearchParams"in t,o="Symbol"in t&&"iterator"in Symbol,n="FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(e){return!1}}(),i="FormData"in t,s="ArrayBuffer"in t;if(s)var a=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],u=ArrayBuffer.isView||function(e){return e&&a.indexOf(Object.prototype.toString.call(e))>-1};function c(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e)||""===e)throw new TypeError('Invalid character in header field name: "'+e+'"');return e.toLowerCase()}function f(e){return"string"!=typeof e&&(e=String(e)),e}function l(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return o&&(t[Symbol.iterator]=function(){return t}),t}function h(e){this.map={},e instanceof h?e.forEach((function(e,t){this.append(t,e)}),this):Array.isArray(e)?e.forEach((function(e){if(2!=e.length)throw new TypeError("Headers constructor: expected name/value pair to be length 2, found"+e.length);this.append(e[0],e[1])}),this):e&&Object.getOwnPropertyNames(e).forEach((function(t){this.append(t,e[t])}),this)}function d(e){if(!e._noBody)return e.bodyUsed?Promise.reject(new TypeError("Already read")):void(e.bodyUsed=!0)}function p(e){return new Promise((function(t,r){e.onload=function(){t(e.result)},e.onerror=function(){r(e.error)}}))}function y(e){var t=new FileReader,r=p(t);return t.readAsArrayBuffer(e),r}function b(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function v(){return this.bodyUsed=!1,this._initBody=function(e){var t;this.bodyUsed=this.bodyUsed,this._bodyInit=e,e?"string"==typeof e?this._bodyText=e:n&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:i&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:r&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():s&&n&&((t=e)&&DataView.prototype.isPrototypeOf(t))?(this._bodyArrayBuffer=b(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):s&&(ArrayBuffer.prototype.isPrototypeOf(e)||u(e))?this._bodyArrayBuffer=b(e):this._bodyText=e=Object.prototype.toString.call(e):(this._noBody=!0,this._bodyText=""),this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):r&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},n&&(this.blob=function(){var e=d(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))}),this.arrayBuffer=function(){if(this._bodyArrayBuffer){var e=d(this);return e||(ArrayBuffer.isView(this._bodyArrayBuffer)?Promise.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):Promise.resolve(this._bodyArrayBuffer))}if(n)return this.blob().then(y);throw new Error("could not read as ArrayBuffer")},this.text=function(){var e,t,r,o,n,i=d(this);if(i)return i;if(this._bodyBlob)return e=this._bodyBlob,t=new FileReader,r=p(t),o=/charset=([A-Za-z0-9_-]+)/.exec(e.type),n=o?o[1]:"utf-8",t.readAsText(e,n),r;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),r=new Array(t.length),o=0;o<t.length;o++)r[o]=String.fromCharCode(t[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},i&&(this.formData=function(){return this.text().then(g)}),this.json=function(){return this.text().then(JSON.parse)},this}h.prototype.append=function(e,t){e=c(e),t=f(t);var r=this.map[e];this.map[e]=r?r+", "+t:t},h.prototype.delete=function(e){delete this.map[c(e)]},h.prototype.get=function(e){return e=c(e),this.has(e)?this.map[e]:null},h.prototype.has=function(e){return this.map.hasOwnProperty(c(e))},h.prototype.set=function(e,t){this.map[c(e)]=f(t)},h.prototype.forEach=function(e,t){for(var r in this.map)this.map.hasOwnProperty(r)&&e.call(t,this.map[r],r,this)},h.prototype.keys=function(){var e=[];return this.forEach((function(t,r){e.push(r)})),l(e)},h.prototype.values=function(){var e=[];return this.forEach((function(t){e.push(t)})),l(e)},h.prototype.entries=function(){var e=[];return this.forEach((function(t,r){e.push([r,t])})),l(e)},o&&(h.prototype[Symbol.iterator]=h.prototype.entries);var w=["CONNECT","DELETE","GET","HEAD","OPTIONS","PATCH","POST","PUT","TRACE"];function m(e,r){if(!(this instanceof m))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');var o,n,i=(r=r||{}).body;if(e instanceof m){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,r.headers||(this.headers=new h(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,i||null==e._bodyInit||(i=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=r.credentials||this.credentials||"same-origin",!r.headers&&this.headers||(this.headers=new h(r.headers)),this.method=(o=r.method||this.method||"GET",n=o.toUpperCase(),w.indexOf(n)>-1?n:o),this.mode=r.mode||this.mode||null,this.signal=r.signal||this.signal||function(){if("AbortController"in t)return(new AbortController).signal}(),this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&i)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(i),!("GET"!==this.method&&"HEAD"!==this.method||"no-store"!==r.cache&&"no-cache"!==r.cache)){var s=/([?&])_=[^&]*/;if(s.test(this.url))this.url=this.url.replace(s,"$1_="+(new Date).getTime());else{this.url+=(/\?/.test(this.url)?"&":"?")+"_="+(new Date).getTime()}}}function g(e){var t=new FormData;return e.trim().split("&").forEach((function(e){if(e){var r=e.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");t.append(decodeURIComponent(o),decodeURIComponent(n))}})),t}function O(e,t){if(!(this instanceof O))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');if(t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.status<200||this.status>599)throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");this.ok=this.status>=200&&this.status<300,this.statusText=void 0===t.statusText?"":""+t.statusText,this.headers=new h(t.headers),this.url=t.url||"",this._initBody(e)}m.prototype.clone=function(){return new m(this,{body:this._bodyInit})},v.call(m.prototype),v.call(O.prototype),O.prototype.clone=function(){return new O(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new h(this.headers),url:this.url})},O.error=function(){var e=new O(null,{status:200,statusText:""});return e.ok=!1,e.status=0,e.type="error",e};var E=[301,302,303,307,308];O.redirect=function(e,t){if(-1===E.indexOf(t))throw new RangeError("Invalid status code");return new O(null,{status:t,headers:{location:e}})},e.DOMException=t.DOMException;try{new e.DOMException}catch(t){e.DOMException=function(e,t){this.message=e,this.name=t;var r=Error(e);this.stack=r.stack},e.DOMException.prototype=Object.create(Error.prototype),e.DOMException.prototype.constructor=e.DOMException}function _(r,o){return new Promise((function(i,a){var u=new m(r,o);if(u.signal&&u.signal.aborted)return a(new e.DOMException("Aborted","AbortError"));var l=new XMLHttpRequest;function d(){l.abort()}if(l.onload=function(){var e,t,r={statusText:l.statusText,headers:(e=l.getAllResponseHeaders()||"",t=new h,e.replace(/\r?\n[\t ]+/g," ").split("\r").map((function(e){return 0===e.indexOf("\n")?e.substr(1,e.length):e})).forEach((function(e){var r=e.split(":"),o=r.shift().trim();if(o){var n=r.join(":").trim();try{t.append(o,n)}catch(e){console.warn("Response "+e.message)}}})),t)};0===u.url.indexOf("file://")&&(l.status<200||l.status>599)?r.status=200:r.status=l.status,r.url="responseURL"in l?l.responseURL:r.headers.get("X-Request-URL");var o="response"in l?l.response:l.responseText;setTimeout((function(){i(new O(o,r))}),0)},l.onerror=function(){setTimeout((function(){a(new TypeError("Network request failed"))}),0)},l.ontimeout=function(){setTimeout((function(){a(new TypeError("Network request timed out"))}),0)},l.onabort=function(){setTimeout((function(){a(new e.DOMException("Aborted","AbortError"))}),0)},l.open(u.method,function(e){try{return""===e&&t.location.href?t.location.href:e}catch(t){return e}}(u.url),!0),"include"===u.credentials?l.withCredentials=!0:"omit"===u.credentials&&(l.withCredentials=!1),"responseType"in l&&(n?l.responseType="blob":s&&(l.responseType="arraybuffer")),o&&"object"==typeof o.headers&&!(o.headers instanceof h||t.Headers&&o.headers instanceof t.Headers)){var p=[];Object.getOwnPropertyNames(o.headers).forEach((function(e){p.push(c(e)),l.setRequestHeader(e,f(o.headers[e]))})),u.headers.forEach((function(e,t){-1===p.indexOf(t)&&l.setRequestHeader(t,e)}))}else u.headers.forEach((function(e,t){l.setRequestHeader(t,e)}));u.signal&&(u.signal.addEventListener("abort",d),l.onreadystatechange=function(){4===l.readyState&&u.signal.removeEventListener("abort",d)}),l.send(void 0===u._bodyInit?null:u._bodyInit)}))}_.polyfill=!0,t.fetch||(t.fetch=_,t.Headers=h,t.Request=m,t.Response=O),e.Headers=h,e.Request=m,e.Response=O,e.fetch=_,Object.defineProperty(e,"__esModule",{value:!0})})),function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,r,o){return r&&t(e.prototype,r),o&&t(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}function o(e){return o=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},o(e)}function n(e,t){return n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},n(e,t)}function i(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function s(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=o(e);if(t){var s=o(this).constructor;r=Reflect.construct(n,arguments,s)}else r=n.apply(this,arguments);return function(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return i(e)}(this,r)}}function a(){return a="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=o(e)););return e}(e,t);if(n){var i=Object.getOwnPropertyDescriptor(n,t);return i.get?i.get.call(arguments.length<3?e:r):i.value}},a.apply(this,arguments)}var u=function(){function t(){e(this,t),Object.defineProperty(this,"listeners",{value:{},writable:!0,configurable:!0})}return r(t,[{key:"addEventListener",value:function(e,t,r){e in this.listeners||(this.listeners[e]=[]),this.listeners[e].push({callback:t,options:r})}},{key:"removeEventListener",value:function(e,t){if(e in this.listeners)for(var r=this.listeners[e],o=0,n=r.length;o<n;o++)if(r[o].callback===t)return void r.splice(o,1)}},{key:"dispatchEvent",value:function(e){if(e.type in this.listeners){for(var t=this.listeners[e.type].slice(),r=0,o=t.length;r<o;r++){var n=t[r];try{n.callback.call(this,e)}catch(e){Promise.resolve().then((function(){throw e}))}n.options&&n.options.once&&this.removeEventListener(e.type,n.callback)}return!e.defaultPrevented}}}]),t}(),c=function(t){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&n(e,t)}(f,t);var c=s(f);function f(){var t;return e(this,f),(t=c.call(this)).listeners||u.call(i(t)),Object.defineProperty(i(t),"aborted",{value:!1,writable:!0,configurable:!0}),Object.defineProperty(i(t),"onabort",{value:null,writable:!0,configurable:!0}),Object.defineProperty(i(t),"reason",{value:void 0,writable:!0,configurable:!0}),t}return r(f,[{key:"toString",value:function(){return"[object AbortSignal]"}},{key:"dispatchEvent",value:function(e){"abort"===e.type&&(this.aborted=!0,"function"==typeof this.onabort&&this.onabort.call(this,e)),a(o(f.prototype),"dispatchEvent",this).call(this,e)}}]),f}(u),f=function(){function t(){e(this,t),Object.defineProperty(this,"signal",{value:new c,writable:!0,configurable:!0})}return r(t,[{key:"abort",value:function(e){var t;try{t=new Event("abort")}catch(e){"undefined"!=typeof document?document.createEvent?(t=document.createEvent("Event")).initEvent("abort",!1,!1):(t=document.createEventObject()).type="abort":t={type:"abort",bubbles:!1,cancelable:!1}}var r=e;if(void 0===r)if("undefined"==typeof document)(r=new Error("This operation was aborted")).name="AbortError";else try{r=new DOMException("signal is aborted without reason")}catch(e){(r=new Error("This operation was aborted")).name="AbortError"}this.signal.reason=r,this.signal.dispatchEvent(t)}},{key:"toString",value:function(){return"[object AbortController]"}}]),t}();function l(e){return e.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL?(console.log("__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL=true is set, will force install polyfill"),!0):"function"==typeof e.Request&&!e.Request.prototype.hasOwnProperty("signal")||!e.AbortController}"undefined"!=typeof Symbol&&Symbol.toStringTag&&(f.prototype[Symbol.toStringTag]="AbortController",c.prototype[Symbol.toStringTag]="AbortSignal"),function(e){if(l(e))if(e.fetch){var t=function(e){"function"==typeof e&&(e={fetch:e});var t=e,r=t.fetch,o=t.Request,n=void 0===o?r.Request:o,i=t.AbortController,s=t.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL,a=void 0!==s&&s;if(!l({fetch:r,Request:n,AbortController:i,__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL:a}))return{fetch:r,Request:u};var u=n;(u&&!u.prototype.hasOwnProperty("signal")||a)&&((u=function(e,t){var r;t&&t.signal&&(r=t.signal,delete t.signal);var o=new n(e,t);return r&&Object.defineProperty(o,"signal",{writable:!1,enumerable:!1,configurable:!0,value:r}),o}).prototype=n.prototype);var c=r;return{fetch:function(e,t){var r=u&&u.prototype.isPrototypeOf(e)?e.signal:t?t.signal:void 0;if(r){var o;try{o=new DOMException("Aborted","AbortError")}catch(e){(o=new Error("Aborted")).name="AbortError"}if(r.aborted)return Promise.reject(o);var n=new Promise((function(e,t){r.addEventListener("abort",(function(){return t(o)}),{once:!0})}));return t&&t.signal&&delete t.signal,Promise.race([n,c(e,t)])}return c(e,t)},Request:u}}(e),r=t.fetch,o=t.Request;e.fetch=r,e.Request=o,Object.defineProperty(e,"AbortController",{writable:!0,enumerable:!1,configurable:!0,value:f}),Object.defineProperty(e,"AbortSignal",{writable:!0,enumerable:!1,configurable:!0,value:c})}else console.warn("fetch() is not available, cannot install abortcontroller-polyfill")}("undefined"!=typeof self?self:global)}));