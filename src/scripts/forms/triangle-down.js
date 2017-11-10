function TriangleDown(args) {
	let center = args.center;
	let radius = args.radius;
	let color = args.color;
	function draw(context) {
		let r = this.radius;
		let cx = this.center[0];
		let cy = this.center[1];
		context.beginPath();
		context.fillStyle = this.color;
		context.moveTo(cx, cy + r);
		context.lineTo(cx - r, cy - r);
		context.lineTo(cx + r, cy - r);
		context.lineTo(cx, cy + r);
		context.fill();
		context.closePath();
	}
	function intersect(x, y) {
		let r = this.radius;
		let cx = this.center[0];
		let cy = this.center[1];
		if((y >= cy - r)
			&& (y <= - 2 * x + cy + r + 2 * cx)
			&& (y <= 2 * x + cy + r - 2 * cx)) {
			return true;
		}
		return false;
	}
	return {
		type: 'triangle',
		center,
		radius,
		color,
		draw,
		intersect
	};
}

export default TriangleDown;
