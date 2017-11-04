import _ from 'lodash';
import Game from './game.js';

window.addEventListener('load', () => {
	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');
	window.width = window.innerWidth;
	window.height = window.innerHeight;
	canvas.width = window.width;
	canvas.height = window.height;
	canvas.center = {
		x: window.width / 2.0,
		y: window.height / 2.0
	};
	let game = Game({
		"number": 5,
		"frame": [0, 0, canvas.width, canvas.height],
		"radiusRange": [50, 100], // can be a fixed integer or a range [10, 40]
		"formsSet": ['Circle', 'Square'],
		"colorSet": ['red', 'blue', 'green'],
	});

	function draw() {
		context.fillStyle = 'white';
		context.fillRect(0, 0, canvas.width, canvas.height);
		for (let form of game.forms) {
			form.draw(context);
		}
	}

	function render() {
		draw();
	}
	window.requestAnimationFrame(render);

	canvas.addEventListener('click', event => {
		event.stopPropagation();
		_.reverse(game.forms).forEach((form, index) => {
			if (form.intersect(event.clientX, event.clientY)) {
				game.forms.splice(index, 1);
			}
		});
		window.requestAnimationFrame(render);
	});
});
