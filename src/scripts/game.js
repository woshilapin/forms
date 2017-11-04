import Forms from './forms.js';

function Game({
	number,
	frame,
	radiusRange,
	formsSet,
	colorSet,
}) {
	let forms = [];

	function init(number) {
		while(formsSet.length < number) {
			let formTemplates = Object.keys(Forms);
			let formRandomIndex = Math.floor(Math.random() * formTemplates.length);
			formsSet.push(formTemplates[formRandomIndex]);
		}
		while(forms.length < number) {
			console.log(formsSet);
			let form = generateForm(formsSet[0]);
			if(!isOverlapping(form, forms)) {
				forms.push(form);
				formsSet.splice(0, 1);
			} else {
				console.log('Forms overlapping!');
			}
		}
	}
	init(number);

	function generateForm(formName) {
		let formTemplate = Forms[formName];
		let radius = radiusRange.length === 2
			? Math.floor(Math.random() * (radiusRange[1] - radiusRange[0])) + radiusRange[0]
			: radiusRange;
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

	function isOverlapping(formA, formB) {
		if(Array.isArray(formB)) {
			for(let f of formB) {
				if(isOverlapping(formA, f)) {
					return true;
				}
			}
			return false;
		}
		let boxA = [
			formA.center[0] - formA.radius,
			formA.center[1] - formA.radius,
			formA.center[0] + formA.radius,
			formA.center[1] + formA.radius,
		];
		let boxB = [
			formB.center[0] - formB.radius,
			formB.center[1] - formB.radius,
			formB.center[0] + formB.radius,
			formB.center[1] + formB.radius,
		];
		if(boxA[0] > boxB[0] && boxA[0] < boxB[2] && boxA[1] > boxB[1] && boxA[1] < boxB[3]) {
			return true;
		}
		if(boxA[2] > boxB[0] && boxA[2] < boxB[2] && boxA[1] > boxB[1] && boxA[1] < boxB[3]) {
			return true;
		}
		if(boxA[0] > boxB[0] && boxA[0] < boxB[2] && boxA[3] > boxB[1] && boxA[3] < boxB[3]) {
			return true;
		}
		if(boxA[2] > boxB[0] && boxA[2] < boxB[2] && boxA[3] > boxB[1] && boxA[3] < boxB[3]) {
			return true;
		}
		if(boxB[0] > boxA[0] && boxB[0] < boxA[2] && boxB[1] > boxA[1] && boxB[1] < boxA[3]) {
			return true;
		}
		if(boxB[2] > boxA[0] && boxB[2] < boxA[2] && boxB[1] > boxA[1] && boxB[1] < boxA[3]) {
			return true;
		}
		if(boxB[0] > boxA[0] && boxB[0] < boxA[2] && boxB[3] > boxA[1] && boxB[3] < boxA[3]) {
			return true;
		}
		if(boxB[2] > boxA[0] && boxB[2] < boxA[2] && boxB[3] > boxA[1] && boxB[3] < boxA[3]) {
			return true;
		}
		return false;
	}

	return {
		forms
	};
}

export default Game;
