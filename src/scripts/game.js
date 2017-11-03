import Forms from './forms.js';

function Game({
	number,
	frame,
	radiusRange,
	colorSet
}) {
	let forms = [];

	function init(number) {
		while(forms.length < number) {
			let form = generateForm({
				radiusRange
			});
			forms.push(form);
		}
	}
	init(number);

	function generateForm({
		radiusRange
	}) {
		let formTemplates = Object.keys(Forms);
		let formRandomIndex = Math.floor(Math.random() * formTemplates.length);
		let formTemplate = Forms[formTemplates[formRandomIndex]];
		let radius = radiusRange.length === 2 ? Math.floor(Math.random() * (radiusRange[1] - radiusRange[0])) + radiusRange[0] : radiusRange;
		let x = Math.floor(Math.random() * (frame[2] - frame[0] - 2 * radius)) + radius;
		let y = Math.floor(Math.random() * (frame[3] - frame[1] - 2 * radius)) + radius;
		let center = [x, y];
		let color = colorSet[Math.floor(Math.random() * colorSet.length)];
		return formTemplate({
			center,
			radius,
			color
		});
	}

	return {
		forms
	};
}

export default Game;
