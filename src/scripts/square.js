function Square(args) {
	let center = args.center;
	let radius = args.radius;
	let color = args.color;
	let corner = center.map(p => p - radius);
	let diameter = 2 * radius;
	function draw(context) {
		context.beginPath();
		context.fillStyle = color;
		context.fillRect(corner[0], corner[1], diameter, diameter);
		context.closePath();
	}
	function intersect(x, y) {
		if (x >= corner[0] && x <= corner[0] + diameter
			&& y >= corner[1] && y <= corner[1] + diameter) {
			return true;
		} else {
			return false;
		}
	}
	return {
		center,
		radius,
		color,
		draw,
		intersect
	};
}

export default Square;
