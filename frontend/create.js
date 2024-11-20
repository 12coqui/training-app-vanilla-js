import { elt } from './utils/utils.js';
import { Form } from './utils/form.js';

window.addEventListener('DOMContentLoaded', () => {
	const urlParams = new URLSearchParams(window.location.search);
	const sessionId = urlParams.get('id');
	if (sessionId) {
		fetch(`/api/workout/${sessionId}`)
			.then(response => response.json())
			.then(data => {
				data.exercises.forEach(exercise => {
					createNewExercise();
				});
				const newDate = data.date.split('T')[0];
				form.assign({ ...data, date: newDate });
			});
		document.querySelector('h1').textContent = 'Edit Session';
		document.querySelector('button[type="submit"]').textContent = 'Edit Session';
	}
});

const form = Form('form', {
	onSubmit,
});

async function onSubmit(event) {
	event.preventDefault();
	const urlParams = new URLSearchParams(window.location.search);
	const sessionId = urlParams.get('id');
	const data = form.collect();
	const url = '/api/workout';
	const response = await fetch(`${url}/${sessionId && sessionId}`, {
		method: `${sessionId ? 'PATCH' : 'POST'}`,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	const json = await response.json();
	if (response.ok) {
		window.location.href = `/sessions`;
	}
}

const newExerciseButton = document.querySelector('#new-exercise');
const exercisesWrapper = document.querySelector('#exercises-wrapper');

const createInputGroup = (label, type, name) => {
	const labelId = crypto.randomUUID();
	const inputGroup = elt('div', { classList: 'form-group' });
	const inputLabel = elt('label', { classList: 'form-label', for: labelId }, label);
	const input = elt('input', { type: type, classList: 'form-input', id: labelId, name });
	inputGroup.appendChild(inputLabel);
	inputGroup.appendChild(input);
	return inputGroup;
};

function createNewExercise() {
	const exercise = elt('div', { classList: 'exercise' });
	const type = createInputGroup('Type', 'text', 'type');
	const name = createInputGroup('Name', 'text', 'name');
	const duration = createInputGroup('Duration', 'text', 'duration');
	const sets = createInputGroup('Sets', 'text', 'sets');
	const reps = createInputGroup('Reps', 'text', 'reps');
	const weight = createInputGroup('Weight', 'text', 'weight');
	const removeButton = elt('button', { classList: 'remove-button' });
	const removeIcon = elt('img', { src: './public/trash-2.svg', alt: 'remove exercise' });
	removeButton.appendChild(removeIcon);
	exercise.append(type, name, sets, reps, weight, duration, removeButton);
	removeButton.addEventListener('click', () => {
		exercise.remove();
	});
	exercisesWrapper.appendChild(exercise);
}

newExerciseButton.addEventListener('click', createNewExercise);
