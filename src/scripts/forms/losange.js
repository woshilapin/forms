function Losange(args) {
	let center = args.center;
	let radius = args.radius;
	let color = args.color;
	let corners = [];
	update(center, radius);
	function update(center, radius) {
		corners = [
			[center[0], center[1] - radius],
			[center[0] + radius/2, center[1]],
			[center[0], center[1] + radius],
			[center[0] - radius/2, center[1]],
		];
	}
	function draw(context) {
		update(this.center, this.radius);
		context.beginPath();
		context.fillStyle = this.color;
		context.moveTo(corners[0][0], corners[0][1]);
		context.lineTo(corners[1][0], corners[1][1]);
		context.lineTo(corners[2][0], corners[2][1]);
		context.lineTo(corners[3][0], corners[3][1]);
		context.lineTo(corners[0][0], corners[0][1]);
		context.fill();
		context.closePath();
	}
	function intersect(x, y) {
		let cx = this.center[0];
		let cy = this.center[1];
		let r = this.radius;
		if((y <= 2*x + cy + r - 2*cx)
			&& (y >= -2*x + cy - r + 2*cx)
			&& (y >= 2*x + cy - r - 2*cx)
			&& (y <= -2*x + cy + r + 2*cx)) {
			return true;
		}
		return false;
	}
	return {
		type: 'losange',
		center,
		radius,
		color,
		draw,
		intersect
	};
}

export default Losange;
