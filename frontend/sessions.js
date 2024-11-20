import { SessionCard } from './components/Card.js';
document.addEventListener('DOMContentLoaded', async () => {
	const sessionsWrapper = document.querySelector('#sessions-wrapper');
	const sessions = await fetch('/api/workout', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const json = await sessions.json();
	json.forEach(session => {
		sessionsWrapper.appendChild(SessionCard(session));
	});
});
