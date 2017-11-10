function Circle(args) {
	let center = args.center;
	let radius = args.radius;
	let color = args.color;
	function draw(context) {
		context.beginPath();
		context.fillStyle = this.color;
		context.arc(this.center[0], this.center[1], this.radius, 0, 2.0 * Math.PI);
		context.fill();
		context.closePath();
	}
	function intersect(x, y) {
		let sum = (x - this.center[0])**2 + (y - this.center[1])**2;
		let norm = Math.sqrt(sum);
		if (norm <= this.radius) {
			return true;
		}
		return false;
	}
	return {
		type: 'circle',
		center,
		radius,
		color,
		draw,
		intersect,
	};
}

export default Circle;
