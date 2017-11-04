function TriangleRight(args) {
	let center = args.center;
	let radius = args.radius;
	let color = args.color;
	function draw(context) {
		context.beginPath();
		context.fillStyle = color;
		context.moveTo(center[0] + radius, center[1]);
		context.lineTo(center[0] - radius, center[1] - radius);
		context.lineTo(center[0] - radius, center[1] + radius);
		context.lineTo(center[0] + radius, center[1]);
		context.fill();
		context.closePath();
	}
	function intersect(x, y) {
		if((x >= center[0] - radius)
			&& (y >= (x - center[0] - radius) / 2 + center[1])
			&& (y <= (center[0] + radius - x) / 2 + center[1])) {
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

export default TriangleRight;
