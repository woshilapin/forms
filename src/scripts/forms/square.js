function Square(args) {
	let center = args.center;
	let radius = args.radius;
	let color = args.color;
	function draw(context) {
		let r = this.radius;
		let cx = this.center[0];
		let cy = this.center[1];
		context.beginPath();
		context.fillStyle = this.color;
		context.fillRect(cx - r, cy - r, 2 * r, 2 * r);
		context.closePath();
	}
	function intersect(x, y) {
		let r = this.radius;
		let cx = this.center[0];
		let cy = this.center[1];
		if (x >= cx - r && x <= cx + r
			&& y >= cy - r && y <= cy + r) {
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

export default Square;
