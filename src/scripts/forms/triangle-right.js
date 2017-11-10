function TriangleRight(args) {
	let center = args.center;
	let radius = args.radius;
	let color = args.color;
	function draw(context) {
		let r = this.radius;
		let cx = this.center[0];
		let cy = this.center[1];
		context.beginPath();
		context.fillStyle = this.color;
		context.moveTo(cx + r, cy);
		context.lineTo(cx - r, cy - r);
		context.lineTo(cx - r, cy + r);
		context.lineTo(cx + r, cy);
		context.fill();
		context.closePath();
	}
	function intersect(x, y) {
		let r = this.radius;
		let cx = this.center[0];
		let cy = this.center[1];
		if((x >= cx - r)
			&& (y >= (x - cx - r) / 2 + cy)
			&& (y <= (cx + r - x) / 2 + cy)) {
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

export default TriangleRight;
