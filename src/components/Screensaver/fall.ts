// The labels' fall, reworked in code from Figma's motion (Adriana, 2026-10-30).
// Figma's data (labels.ts) gives where each label starts, rests and ends; this file decides how it gets there:
// - weight: labels speed up as they fall (gravity), instead of moving at an even speed;
// - stagger: the pile builds from the bottom row up, instead of every label landing at the same moment;
// - bounce: each label bounces twice when it lands;
// - spin: labels turn while they fall, tip past their angle when they land and settle back;
// - floor: more labels stay on the floor when the rest drop away (about 45 instead of Figma's 30);
// - leaving: the labels over the screen let go one by one over a second (lower ones first) and fall turning.
// The labels still cover the screen at 3 s (coverAt in Screensaver.svelte), so the 2-second wait is unchanged.

import { labels as figmaLabels, loopMs, type Ease, type Label, type Track } from './labels.ts';

export type MotionEase = Ease | 'gravity' | 'rise';
export type MotionTrack = [values: number[], times: number[], easings?: MotionEase[]];
export interface MotionLabel extends Omit<Label, 'x' | 'y' | 'rotate'> {
	x: MotionTrack;
	y: MotionTrack;
	rotate: MotionTrack;
}

/** The curves added for the fall (easeInQuad, easeOutQuad). */
export const fallEasings: Record<'gravity' | 'rise', string> = {
	/** Speeds up, like an object falling. */
	gravity: 'cubic-bezier(0.11, 0, 0.5, 0)',
	/** Slows down, like an object reaching the top of a bounce. */
	rise: 'cubic-bezier(0.5, 1, 0.89, 1)'
};

/** Acceleration, in stage pixels per second². Higher falls faster and feels heavier. */
const gravity = 4400;
/** When the bottom row and the top row land, in seconds. The rows in between land in order. */
const firstLanding = 1.4;
const lastLanding = 2.5;
/** Up to this many seconds earlier or later, so a row does not land as one block. */
const landingJitter = 0.06;
/** The two bounces after landing: height in stage pixels, time to the top in seconds. */
const bounces = [
	{ height: 18, rise: 0.12 },
	{ height: 5, rise: 0.07 }
];
/** Turn while falling (degrees, between the two values) and how far a label tips past its angle on landing. */
const spin = [6, 14];
const tip = 3;
/** When labels drop away, the lower ones let go first, the top ones up to this many seconds later. */
const releaseSpread = 1;
/** Up to this many seconds earlier or later, so a row does not let go as one block. */
const releaseJitter = 0.1;
/** How far a label turns while it falls away, in degrees (between the two values, either way). */
const fallSpin = [30, 90];
/** Labels resting this low on the stage (center, in stage pixels from the top) stay on the floor too. */
const floorTop = 870;
/** Labels added to the floor drop with Figma's bottom row: they let go between these shares of the loop. */
const floorRelease = [0.835, 0.85];
/** The moment the labels cover the screen, as a share of the loop (3 s of 12). */
const coverAt = 0.25;

const share = (seconds: number) => (seconds * 1000) / loopMs;
const fallTime = (distance: number) => Math.sqrt((2 * Math.abs(distance)) / gravity);
/** A steady pseudo-random number between 0 and 1 per label, so the animation is the same on every visit. */
const noise = (i: number, salt: number) => {
	const n = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
	return n - Math.floor(n);
};

const tops = figmaLabels.map((label) => label.cy);
const highest = Math.min(...tops);
const lowest = Math.max(...tops);
/** 0 for the bottom row, 1 for the top row. */
const height = (cy: number) => (lowest - cy) / (lowest - highest);

/** The value a track has at a given time (its keyframe at that time). */
const valueAt = ([values, times]: Track, time: number) => values[times.indexOf(time)];

/** The frames of a track from `from` (included) to `to` (excluded), with their easings. */
function framesBetween([values, times, eases]: Track, from: number, to: number) {
	const frames: [number, number, MotionEase][] = [];
	times.forEach((time, i) => {
		if (time >= from && time < to) frames.push([values[i], time, eases?.[i] ?? 'l']);
	});
	return frames;
}

function toTrack(frames: [value: number, time: number, ease: MotionEase][]): MotionTrack {
	return [frames.map((f) => f[0]), frames.map((f) => f[1]), frames.map((f) => f[2])];
}

function rework(label: Label, i: number): MotionLabel {
	const [yValues, yTimes] = label.y;
	// Every Figma track ends by jumping back to its start: the last frame off screen, then the start values.
	const resetAt = yTimes.at(-2)!;
	const goneAt = yTimes.at(-3)!;
	// When the label leaves the pile: the frame before its first big move after the screen is covered.
	const leaves = yTimes.findIndex((time, k) => time > coverAt && Math.abs(yValues[k]) >= 20);
	const leaveAt = yTimes[leaves - 1];
	const staysInPile = leaveAt > coverAt;

	const startY = yValues[0];
	const startX = label.x[0][0];
	const rest = valueAt(label.rotate, coverAt);
	const turn = noise(i, 1) < 0.5 ? -1 : 1;
	const startAngle = rest + turn * (spin[0] + noise(i, 2) * (spin[1] - spin[0]));

	// Falling in.
	const landing = firstLanding + height(label.cy) * (lastLanding - firstLanding);
	const land = share(landing + (noise(i, 3) * 2 - 1) * landingJitter);
	const leave = land - share(fallTime(startY));
	const [first, second] = bounces.map((b) => ({ height: b.height, rise: share(b.rise) }));
	const settle = land + 2 * first.rise + 2 * second.rise;

	const y: [number, number, MotionEase][] = [
		[startY, 0, 'l'],
		[startY, leave, 'gravity'],
		[0, land, 'rise'],
		[-first.height, land + first.rise, 'gravity'],
		[0, land + 2 * first.rise, 'rise'],
		[-second.height, land + 2 * first.rise + second.rise, 'gravity'],
		[0, settle, 'l']
	];
	const x: [number, number, MotionEase][] = [
		[startX, 0, 'l'],
		[startX, leave, 'l'],
		[0, land, 'l']
	];
	const rotate: [number, number, MotionEase][] = [
		[startAngle, 0, 'l'],
		[startAngle, leave, 'l'],
		[rest - turn * tip, land, 'out'],
		[rest + (turn * tip) / 2, land + 2 * first.rise, 'out'],
		[rest, settle, 'l']
	];

	// Leaving the pile.
	if (staysInPile) {
		// The bottom row keeps Figma's timing for its final drop, with the same weight as the fall.
		const heavier = (frames: [number, number, MotionEase][]) =>
			frames.map(([value, time, ease]): [number, number, MotionEase] => [
				value,
				time,
				ease === 'in' ? 'gravity' : ease
			]);
		y.push(...heavier(framesBetween(label.y, leaveAt, resetAt)));
		x.push(...framesBetween(label.x, leaveAt, resetAt));
		rotate.push(...framesBetween(label.rotate, leaveAt, resetAt));
	} else {
		const endY = valueAt(label.y, goneAt);
		const endX = valueAt(label.x, goneAt);
		const onFloor = label.cy >= floorTop;
		if (onFloor) {
			// Floor labels drop at the end with Figma's bottom row, as before.
			const release = floorRelease[0] + noise(i, 4) * (floorRelease[1] - floorRelease[0]);
			const gone = release + share(fallTime(endY));
			const endAngle = valueAt(label.rotate, goneAt);
			y.push([0, coverAt, 'l'], [0, release, 'gravity'], [endY, gone, 'l'], [endY, goneAt, 'l']);
			x.push([0, coverAt, 'l'], [0, release, 'l'], [endX, gone, 'l'], [endX, goneAt, 'l']);
			rotate.push(
				[rest, coverAt, 'l'],
				[rest, release, 'l'],
				[endAngle, gone, 'l'],
				[endAngle, goneAt, 'l']
			);
		} else {
			const delay = height(label.cy) * releaseSpread + (noise(i, 5) * 2 - 1) * releaseJitter;
			const release = coverAt + share(Math.max(0, delay));
			const gone = release + share(fallTime(endY));
			const fallTurn = noise(i, 6) < 0.5 ? -1 : 1;
			const endAngle = rest + fallTurn * (fallSpin[0] + noise(i, 7) * (fallSpin[1] - fallSpin[0]));
			y.push([0, coverAt, 'l'], [0, release, 'gravity'], [endY, gone, 'l'], [endY, goneAt, 'l']);
			x.push([0, coverAt, 'l'], [0, release, 'l'], [endX, gone, 'l'], [endX, goneAt, 'l']);
			// The turn starts slowly as the label lets go and speeds up as it falls.
			rotate.push(
				[rest, coverAt, 'l'],
				[rest, release, 'in'],
				[endAngle, gone, 'l'],
				[endAngle, goneAt, 'l']
			);
		}
	}

	// Back to the start for the next loop.
	y.push([startY, resetAt, 'l'], [startY, 1, 'l']);
	x.push([startX, resetAt, 'l'], [startX, 1, 'l']);
	rotate.push([startAngle, resetAt, 'l'], [startAngle, 1, 'l']);

	return { ...label, x: toTrack(x), y: toTrack(y), rotate: toTrack(rotate) };
}

/** Every label with its reworked fall, in Figma's layer order. */
export const labels: MotionLabel[] = figmaLabels.map(rework);
