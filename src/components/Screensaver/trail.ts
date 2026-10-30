// Cursor trail for the Report Card intro (Adriana, 2026-10-30): a brand yellow line that follows the mouse, thinning
// out and fading at its tail. Mouse only: touch screens have no cursor. Color and width come from the tokens
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
		context!.strokeStyle = color;
		context!.lineCap = 'round';
		for (let i = 1; i < points.length; i++) {
			// 1 at the cursor, 0 at the end of the tail.
			const life = 1 - (now - points[i].time) / lifeMs;
			context!.globalAlpha = life;
			context!.lineWidth = width * life;
			context!.beginPath();
			context!.moveTo(points[i - 1].x, points[i - 1].y);
			context!.lineTo(points[i].x, points[i].y);
			context!.stroke();
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
