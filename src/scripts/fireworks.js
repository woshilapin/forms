import _ from 'lodash';
import Particle from './particle.js';

function Firework({
	center,
	color,
}) {
	let size = 1;
	let particles = [];

	function init(number, speed) {
		let fullAngle = 2.0 * Math.PI;
		let step = fullAngle / number;
		for(let angle = 0; angle < fullAngle; angle += step) {
			let sx = Math.cos(angle) * speed;
			let sy = Math.sin(angle) * speed;
			particles.push(
				Particle({
					center: [center[0], center[1]],
					color,
					size,
					speed: [sx, sy],
				})
			);
		}
	}
	init(64, 1024);
	init(32, 512);
	init(16, 256);

	function draw(context) {
		for(let particle of particles) {
			particle.draw(context);
		}
	}

	function animate(framerate) {
		for(let particle of particles) {
			particle.animate(framerate);
		}
	}

	function isOut(frame) {
		let finished = true;
		_.reverse(particles).forEach((particle, index) => {
			if(particle.isOut(frame)) {
				particles.splice(index, 1);
			} else {
				finished = false;
			}
		});
		return finished;
	}

	return {
		draw,
		animate,
		isOut,
	};
}

export default Firework;
