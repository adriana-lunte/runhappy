// Cursor trail for the Report Card intro (Adriana, 2026-10-30): a solid brand yellow line that follows the mouse,
// thinning out to nothing at its tail. Mouse only: touch screens have no cursor. Color and width come from the tokens
// (--color-brand-accent-yellow, --size-cursor-trail).

/** How long a point of the trail stays on screen, in milliseconds. */
const lifeMs = 300;

interface Point {
	x: number;
	y: number;
	time: number;
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
			// One solid ribbon around the path, as wide as the token at the cursor and thinning to nothing at the
			// tail. Drawn as a single shape so no part overlaps another (overlaps showed as dots).
			const left: [number, number][] = [];
			const right: [number, number][] = [];
			points.forEach((point, i) => {
				const before = points[Math.max(0, i - 1)];
				const after = points[Math.min(points.length - 1, i + 1)];
				const dx = after.x - before.x;
				const dy = after.y - before.y;
				const length = Math.hypot(dx, dy) || 1;
				// 1 at the cursor, 0 at the end of the tail.
				const half = (width / 2) * (1 - (now - point.time) / lifeMs);
				left.push([point.x - (dy / length) * half, point.y + (dx / length) * half]);
				right.push([point.x + (dy / length) * half, point.y - (dx / length) * half]);
			});
			const head = points.at(-1)!;
			context!.fillStyle = color;
			context!.beginPath();
			context!.moveTo(...left[0]);
			for (const corner of left.slice(1)) context!.lineTo(...corner);
			for (const corner of right.reverse()) context!.lineTo(...corner);
			context!.closePath();
			// A round tip at the cursor.
			context!.moveTo(head.x + width / 2, head.y);
			context!.arc(head.x, head.y, width / 2, 0, 2 * Math.PI);
			context!.fill('nonzero');
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
