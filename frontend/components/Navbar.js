import { elt } from '../utils/utils.js';
export function Navbar() {
	const nav = elt('nav', { classList: 'navbar' });
	const logo = elt('img', { src: './public/logo.svg', classList: 'logo' });
	const links = elt('div', { classList: 'links' });
	const home = elt('a', { href: '/', classList: 'link' }, 'Home');
	const sessions = elt('a', { href: '/sessions.html', classList: 'link' }, 'Sessions');
	const create = elt('a', { href: '/create.html', classList: 'link' }, 'New session');
	// const login = elt('a', { href: '/login.html', classList: 'link' }, 'Log in');
	links.append(home, sessions, create);
	nav.append(logo, links);
	return nav;
}
