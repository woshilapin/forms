function Losange(args) {
	let center = args.center;
	let radius = args.radius;
	let color = args.color;
	let corners = [
		[center[0], center[1] - radius],
		[center[0] + radius, center[1]],
		[center[0], center[1] + radius],
		[center[0] - radius, center[1]],
	]
	function draw(context) {
		context.beginPath();
		context.fillStyle = color;
		context.moveTo(corners[0][0], corners[0][1]);
		context.lineTo(corners[1][0], corners[1][1]);
		context.lineTo(corners[2][0], corners[2][1]);
		context.lineTo(corners[3][0], corners[3][1]);
		context.lineTo(corners[0][0], corners[0][1]);
		context.fill();
		context.closePath();
	}
	function intersect(x, y) {
		if ((y >= x + center[1] - radius - center[0])
		&& (y <= -x + center[1] + radius + center[0])
		&& (y <= x + center[1] + radius - center[0])
		&& (y >= -x + center[1] - radius + center[0])) {
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

export default Losange;
