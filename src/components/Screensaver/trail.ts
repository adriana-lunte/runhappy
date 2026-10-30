// Cursor trail for the Report Card intro (Adriana, 2026-10-30): a brand yellow line that follows the mouse in smooth
// curves, thinning out and fading to nothing at its tail. Mouse only: touch screens have no cursor. Color and width come from the tokens
// (--color-brand-accent-yellow, --size-cursor-trail).

/** How long a point of the trail stays on screen, in milliseconds. */
const lifeMs = 300;

interface Point {
	x: number;
	y: number;
	time: number;
}

/** About how far apart, in CSS pixels, the points of the smoothed curve are. */
const step = 2;

/**
 * The mouse positions joined by a smooth curve (Catmull-Rom) instead of straight lines, as points about `step`
 * apart. Each point keeps a time between its neighbours', so the tail still thins out evenly.
 */
function smooth(points: Point[]): Point[] {
	const curve: Point[] = [points[0]];
	for (let i = 0; i < points.length - 1; i++) {
		const [p0, p1, p2, p3] = [
			points[Math.max(0, i - 1)],
			points[i],
			points[i + 1],
			points[Math.min(points.length - 1, i + 2)]
		];
		const count = Math.max(1, Math.ceil(Math.hypot(p2.x - p1.x, p2.y - p1.y) / step));
		for (let k = 1; k <= count; k++) {
			const t = k / count;
			const along = (a: number, b: number, c: number, d: number) =>
				0.5 *
				(2 * b +
					(c - a) * t +
					(2 * a - 5 * b + 4 * c - d) * t * t +
					(3 * b - a - 3 * c + d) * t * t * t);
			curve.push({
				x: along(p0.x, p1.x, p2.x, p3.x),
				y: along(p0.y, p1.y, p2.y, p3.y),
				time: p1.time + (p2.time - p1.time) * t
			});
		}
	}
	return curve;
}

/** Draws the trail on a full-screen canvas. */
export function cursorTrail(canvas: HTMLCanvasElement) {
	const context = canvas.getContext('2d');
	if (!context) return;
	const styles = getComputedStyle(canvas);
	const color = styles.getPropertyValue('--color-brand-accent-yellow').trim();
	const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
	const width = parseFloat(styles.getPropertyValue('--size-cursor-trail')) * rem;

	let points: Point[] = [];
	let frame = 0;

	function resize() {
		const ratio = window.devicePixelRatio;
		canvas.width = window.innerWidth * ratio;
		canvas.height = window.innerHeight * ratio;
		context!.setTransform(ratio, 0, 0, ratio, 0, 0);
	}

	function move(event: PointerEvent) {
		if (event.pointerType !== 'mouse') return;
		// Every position since the last frame, so fast moves still draw a smooth line (some browsers give none).
		const coalesced = event.getCoalescedEvents?.() ?? [];
		for (const e of coalesced.length ? coalesced : [event])
			points.push({ x: e.clientX, y: e.clientY, time: performance.now() });
		if (!frame) frame = requestAnimationFrame(draw);
	}

	function draw(now: number) {
		points = points.filter((point) => now - point.time < lifeMs);
		context!.clearRect(0, 0, window.innerWidth, window.innerHeight);
		if (points.length > 1) {
			// A ribbon around the curve, as wide as the token at the cursor and thinning to nothing at the tail. It is
			// drawn in small pieces that meet edge to edge, each a little more see-through towards the tail: nothing
			// overlaps, so the fade shows no dots.
			const curve = smooth(points);
			const life = (point: Point) => Math.max(0, 1 - (now - point.time) / lifeMs);
			const edges = curve.map((point, i) => {
				const before = curve[Math.max(0, i - 1)];
				const after = curve[Math.min(curve.length - 1, i + 1)];
				const length = Math.hypot(after.x - before.x, after.y - before.y) || 1;
				const nx = -(after.y - before.y) / length;
				const ny = (after.x - before.x) / length;
				const half = (width / 2) * life(point);
				return [
					[point.x + nx * half, point.y + ny * half],
					[point.x - nx * half, point.y - ny * half]
				] as const;
			});
			context!.fillStyle = color;
			for (let i = 1; i < curve.length; i++) {
				const [a, b] = edges[i - 1];
				const [c, d] = edges[i];
				context!.globalAlpha = life(curve[i]);
				context!.beginPath();
				context!.moveTo(...a);
				context!.lineTo(...c);
				context!.lineTo(...d);
				context!.lineTo(...b);
				context!.closePath();
				context!.fill();
			}
			// A round tip at the cursor.
			const head = curve.at(-1)!;
			context!.globalAlpha = 1;
			context!.beginPath();
			context!.arc(head.x, head.y, width / 2, 0, 2 * Math.PI);
			context!.fill();
		}
		frame = points.length ? requestAnimationFrame(draw) : 0;
	}

	resize();
	window.addEventListener('resize', resize);
	window.addEventListener('pointermove', move);
	return {
		destroy() {
			cancelAnimationFrame(frame);
			window.removeEventListener('resize', resize);
			window.removeEventListener('pointermove', move);
		}
	};
}
