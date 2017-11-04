function Circle(args) {
	let center = args.center;
	let radius = args.radius;
	let color = args.color;
	function draw(context) {
		context.beginPath();
		context.fillStyle = color;
		context.arc(center[0], center[1], radius, 0, 2.0 * Math.PI);
		context.fill();
		context.closePath();
	}
	function intersect(x, y) {
		let sum = (x - center[0])**2 + (y - center[1])**2;
		let norm = Math.sqrt(sum);
		if (norm <= radius) {
			return true;
		}
		return false;
	}
	return {
		center,
		radius,
		color,
		draw,
		intersect
	};
}

export default Circle;
