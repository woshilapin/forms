function Particle({
	center,
	size,
	speed,
	color,
}) {
	function draw(context) {
		context.save();
		context.beginPath();
		context.globalAlpha = Math.random() > 0.5 ? 1 : 0;
		context.fillStyle = color;
		context.arc(center[0], center[1], size, 0, 2.0 * Math.PI);
		context.fill();
		context.closePath();
		context.restore();
	}

	function animate(framerate) {
		center[0] += (framerate * speed[0]);
		center[1] += (framerate * speed[1]);
		speed = speed.map(s => s * 0.9);
		speed[1] += 16;
		center[0] += Math.random() - Math.random();
		center[1] += Math.random() - Math.random();
	}

	function isOut([tlx, tly, brx, bry]) {
		let cx = center[0];
		let cy = center[1];
		if(cx > tlx && cx < brx && cy < bry) {
			return false;
		}
		return true;
	}

	return {
		draw,
		animate,
		isOut,
	}
}

export default Particle;
