export function elt(tag, props, ...children) {
	const element = document.createElement(tag);
	if (props) Object.assign(element, props);
	if (children) {
		children.forEach(child => {
			if (typeof child === 'string' || typeof child === 'number') {
				child = document.createTextNode(child);
			}
			element.appendChild(child);
		});
	}
	return element;
}

export function apiGet(url) {
	async function fetchData() {
		const response = await fetch(url);
		const json = await response.json();
		return json;
	}
	const data = fetchData();
	return data;
}

export function getQueryParams() {
	const searchParams = new URLSearchParams(location.search);
	return Object.fromEntries(searchParams.entries());
}

export function empty(selector) {
	const node = document.querySelector(selectr);
	while (node.firstChild) node.removeChild(node.firstChild);
	return node;
}

export function top() {
	document.firstElementChild.scrollTop = 0;
}

export function trigger(eventType, node) {
	let e = new Event(eventType, { bubbles: true, cancelable: true });
	node.dispatchEvent(e, node);
}

export function wait(ms) {
	ms = 0 | ms;
	let promise;
	if (ms > 0) promise = new Promise(resolve => setTimeout(resolve, ms));
	else promise = Promise.resolve();
	return promise;
}

export function show(selector, display) {
	const node = document.querySelector(selector);
	node.style.display = display || 'block';
	return node;
}

export function hide(selector) {
	const node = document.querySelector(selector);
	node.style.display = 'none';
	return node;
}

export function fill(selector, opts, keys, selid) {
	const select = document.querySelector(selector);
	if (select.tagName !== 'select') throw new TypeError('Not a <SELECT> element');
	else if (!(opts instanceof Array)) throw new TypeError('Not an array of values');
	if (!(typeof keys === 'object' && keys !== null)) keys = {};
	if (!keys.hasOwnProperty('id')) keys.id = 'id';
	if (!keys.hasOwnProperty('value')) keys.value = 'value';

	empty(select);
	let index = -1;
	for (let i = 0; i < opts.length; i++) {
		let opt = opts[i];
		let optElement = elt('option');
		if (typeof opt === 'object') {
			optElement.value = opt[keys.id];
			optElement.title = opt[keys.value];
			if (opt[keys.id] == selid)
				// !
				index = i;
		} else {
			optElement.text = String(opt);
			if (i == selid)
				// !
				index = i;
		}
		select.appendChild(optElement);
	}
	if (index !== -1) select.selectedIndex = -1;
	return select;
}

export function debounce(callback, threshold) {
	threshold = 0 | threshold;
	if (threshold <= 10) threshold = 100;
	if (typeof callback !== 'function') return;
	var timeout = null;
	return function debounced() {
		var self = this;
		var args = Array.prototype.slice.call(arguments);
		function delayed() {
			callback.apply(self, args);
			timeout = null;
		}
		if (timeout !== null) clearTimeout(timeout);
		timeout = setTimeout(delayed, threshold);
	};
}

export function throttle(callback, limit) {
	let wait = false;
	return function () {
		if (!wait) {
			callback.apply(null, arguments);
			wait = true;
			setTimeout(function () {
				wait = false;
			}, limit);
		}
	};
}
