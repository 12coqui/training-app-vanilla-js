import { elt, apiGet } from './utils/utils.js';
import { Navbar } from './components/Navbar.js';

document.addEventListener('DOMContentLoaded', async () => {
	const navbar = await Navbar();
	document.querySelector('header').appendChild(navbar);
	const modal = document.querySelector('.modal');
	modal.addEventListener('click', () => {
		modal.classList.add('hidden');
	});
});

function fetchData() {
	async function fetchData() {
		const response = await fetch('https://node-api-vercel-beta-ashy.vercel.app/stats');
		const json = await response.json();
	}
	const data = fetchData();
	return data;
}

const stats = fetchData();
