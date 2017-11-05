import _ from 'lodash';
import Game from './game.js';
import Firework from './fireworks.js';

const framerate = 1 / 30;

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
		"number": 10,
		"frame": [0, 0, canvas.width, canvas.height],
		"radiusRange": [50, 100], // can be a fixed integer or a range [10, 40]
		"formsSet": ['Circle', 'Square'],
		"colorSet": ['red', 'blue', 'green'],
	});
	let destroys = [];
	let fireworks = [];

	function renderForms() {
		for (let form of game.forms) {
			form.draw(context);
		}
	}

	function renderDestroys() {
		for (let form of destroys) {
			form.draw(context);
		}
	}

	function renderFireworks() {
		for(let firework of fireworks) {
			firework.draw(context);
		}
	}

	function render() {
		context.fillStyle = 'white';
		context.fillRect(0, 0, canvas.width, canvas.height);
		renderForms();
		renderDestroys();
		renderFireworks();
	}
	window.requestAnimationFrame(render);

	function animateDestroy() {
		_.reverse(destroys).forEach((form, index) => {
			if(form.radius < 4) {
				fireworks.push(
					Firework({
						"center": form.center,
						"color": form.color,
					})
				);
				destroys.splice(index, 1);
			} else {
				form.radius *= 0.75;
			}
		});
	}

	function animateFireworks() {
		_.reverse(fireworks).forEach((firework, index) => {
			firework.animate(framerate);
			if(firework.isOut([0, 0, canvas.width, canvas.height])) {
				fireworks.splice(index, 1);
			}
		});
	}

	let animationOn = false;
	function animate() {
		animateDestroy();
		animateFireworks();
		window.requestAnimationFrame(render);
		if(destroys.length > 0 || fireworks.length > 0) {
			setTimeout(animate, 1000 * framerate);
		} else {
			animationOn = false;
		}
	}

	canvas.addEventListener('click', event => {
		event.stopPropagation();
		_.reverse(game.forms).forEach((form, index) => {
			if (form.intersect(event.clientX, event.clientY)) {
				destroys.push(form);
				game.forms.splice(index, 1);
				if(!animationOn) {
					animationOn = true;
					animate();
				}
			}
		});
		window.requestAnimationFrame(render);
	});
});
