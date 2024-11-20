export function Form(element, options) {
	const form = document.querySelector(element || 'form');
	const headersInputsNodes = form.querySelectorAll('.form-header input, .form-header select');
	if (options.hasOwnProperty('onSubmit') && options.onSubmit instanceof Function) {
		form.addEventListener('submit', options.onSubmit);
	}

	function collect() {
		const exercisesNodes = form.querySelectorAll('.exercise');
		let data = {};
		const exercises = [];
		headersInputsNodes.forEach(input => {
			data[input.name] = input.value;
		});
		exercisesNodes.forEach(exercise => {
			const exerciseData = {};
			exercise.querySelectorAll('input, select').forEach(input => {
				exerciseData[input.name] = input.value;
			});
			exercises.push(exerciseData);
		});
		data = { ...data, exercises };
		return data;
	}

	function assign(data) {
		const { exercises, ...rest } = data;
		const exercisesNodes = form.querySelectorAll('.exercise');
		headersInputsNodes.forEach(input => {
			input.value = rest[input.name];
		});
		exercisesNodes.forEach((exercise, index) => {
			const exerciseData = exercises[index];
			exercise.querySelectorAll('input, select').forEach(input => {
				input.value = exerciseData[input.name];
			});
		});
	}

	function reset() {
		inputs.forEach(input => {
			input.value = '';
		});
	}

	return {
		form,
		collect,
		assign,
		reset,
	};
}
