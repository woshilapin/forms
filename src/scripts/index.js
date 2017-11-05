import _ from 'lodash';
import Game from './game.js';
import Firework from './fireworks.js';

const framerate = 1 / 30;

let number = 10;
let radiusRange = [50, 100];
let formsSet = ['Circle', 'Square'];

const query = new URLSearchParams(window.location.search);
number = query.get('number') || query.get('nombreFormes') || number;
if(query.has('radiusRange') || query.has('tailleFormes')) {
	let radiusRangeQuery = query.get('radiusRange') || query.get('tailleFormes');
	let radiusRangeArray = radiusRangeQuery.split(',').map(s => parseInt(s));
	if(radiusRangeArray.length === 1) {
		radiusRange = radiusRangeArray[0];
	} else {
		radiusRange = radiusRangeArray;
	}
}
if(query.has('formsSet') || query.has('listeFormes')) {
	let formsSetQuery = query.get('formsSet') || query.get('listeFormes');
	formsSet = formsSetQuery.split(',') || formsSet;
}

window.addEventListener('load', () => {
	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');
	window.width = window.innerWidth;
	window.height = window.innerHeight;
	canvas.width = window.width;
	canvas.height = window.height;
	let game = Game({
		"frame": [0, 0, canvas.width, canvas.height],
		"colorsSet": ['rgb(186,0,0)', 'rgb(0,0,186)', 'rgb(0,186,0)'],
		number,
		radiusRange, // can be a fixed integer or a range [10, 40]
		formsSet,
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
