import { elt } from '../utils/utils.js';

export function SessionCard(session) {
	const card = elt('div', { classList: 'session-card' });
	const cardHeader = elt('div', { classList: 'session-header' });
	const cardBody = elt('div', { classList: 'session-body' });
	const date = elt(
		'div',
		{ classList: 'session-date' },
		`Session date: ${new Intl.DateTimeFormat('es-ES').format(new Date(session.date))}`
	);
	const type = elt('div', { classList: 'session-type' }, `Session type: ${session.type}`);
	const duration = elt('div', { classList: 'session-duration' }, `Session duration: ${session.totalDuration}`);
	const buttonIcon = elt('img', { src: '../public/edit.svg', alt: 'edit exercise' });
	buttonIcon.setAttribute('data-id', session._id);
	const editButton = elt('button', { classList: 'edit-button' }, buttonIcon);
	editButton.addEventListener('click', editExercise);
	card.setAttribute('data-id', session._id);
	cardHeader.append(date, type, duration, editButton);
	session.exercises.forEach(exercise => {
		const card = Card(exercise);
		cardBody.appendChild(card);
	});
	card.append(cardHeader, cardBody);
	return card;
}

export function Card(exercise) {
	const exerciseCard = elt('div', { classList: 'exercise-card' });
	const type = elt('div', { classList: 'exercise-type' }, `Exercise type: ${exercise.type}`);
	const name = elt('div', { classList: 'exercise-name' }, `Exercise name: ${exercise.name}`);
	const sets = elt('div', { classList: 'exercise-sets' }, `Sets: ${exercise.sets}`);
	const reps = elt('div', { classList: 'exercise-reps' }, `Resps: ${exercise.reps}`);
	const weight = elt('div', { classList: 'exercise-weight' }, `Weight: ${exercise.weight}`);
	const duration = elt('div', { classList: 'exercise-duration' }, `Duration: ${exercise.duration}`);

	exerciseCard.append(type, name, sets, reps, weight, duration);
	return exerciseCard;
}

function editExercise(event) {
	const card = event.target;
	const exerciseId = card.getAttribute('data-id');
	window.location.href = `/create.html?id=${exerciseId}`;
}
