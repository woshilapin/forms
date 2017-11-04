function TriangleDown(args) {
	let center = args.center;
	let radius = args.radius;
	let color = args.color;
	function draw(context) {
		context.beginPath();
		context.fillStyle = color;
		context.moveTo(center[0], center[1] + radius);
		context.lineTo(center[0] - radius, center[1] - radius);
		context.lineTo(center[0] + radius, center[1] - radius);
		context.lineTo(center[0], center[1] + radius);
		context.fill();
		context.closePath();
	}
	function intersect(x, y) {
		if((y >= center[1] - radius)
			&& (y <= - 2 * x + center[1] + radius + 2 * center[0])
			&& (y <= 2 * x + center[1] + radius - 2 * center[0])) {
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

export default TriangleDown;
