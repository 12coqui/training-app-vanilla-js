import { elt } from './utils.js';

export function Modal() {
	const modal = document.querySelector('.modal');
	modal.addEventListener('click', () => {
		close();
	});

	function render(type, message) {
		const wrapper = elt('div', { class: 'modal-wrapper' });
		const header = elt('div', { class: `modal-header ${type}` });
		const headerTitle = elt('h4', { class: 'modal-title' }, 'Modal Title');
		const close = elt('button', { class: 'modal-close' }, 'X');
		header.append(headerTitle, close);
		const content = elt('div', { class: 'modal-content' }, 'Hello World');
		const text = elt('p', { class: 'modal-text' }, 'This is a modal');
		text.textContent = message;
		content.appendChild(text);
		wrapper.append(header, content);
		modal.appendChild(wrapper);
	}

	function open() {
		modal.classList.remove('hidden');
	}

	function close() {
		modal.classList.add('hidden');
	}

	function alert(message) {
		render('alert', message);
		open();
	}

	function info(message) {
		render('info', message);
		open();
	}

	function warn(message) {
		render('warn', message);
		open();
	}

	function success(message) {
		render('success', message);
		open();
	}
}
