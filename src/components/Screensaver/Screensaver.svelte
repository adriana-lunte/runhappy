<!--
	Screensaver — Runhappy (Report Card intro)
	Figma: Marketing → "Runhappy — 12s seamless loop"
	https://www.figma.com/design/ple2zsyYjnhOhYJw8MxTkj/Marketing?node-id=26-2

	Full-screen intro shown before the home page (decided 2026-10-28): "Runhappy." labels fall, pile up under the
	title and drop away. Any click, tap or key closes it. The page decides when it shows
	(once per visit, never with reduced motion: see src/lib/intro.ts).

	The animation is rebuilt from Figma's motion data (labels.ts) with the Web Animations API. The Figma frame is a
	fixed 1728 × 1117 stage, scaled to cover the screen. The title sits outside the stage so it can wrap on phones.
	Changes from Figma (Adriana): when the labels cover the screen (3 s in), they wait 2 s before falling
	(2026-10-28); once they are gone, the title and the floor labels wait 25 s more before their final drop
	(2026-10-30). The loop lasts 39 s instead of 12. The fall itself is reworked in fall.ts (2026-10-30).
-->
<script lang="ts" module>
	export interface ScreensaverProps {
		/** Big title shown over the labels. */
		title: string;
		/** The hint at the bottom, also the button that keyboard and screen reader users reach. */
		hint?: string;
		/** Called on any click, tap or key. */
		onclose: () => void;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import green from './label-green.svg';
	import pink from './label-pink.svg';
	import yellow from './label-yellow.svg';
	import { fallEasings, labels, type MotionTrack } from './fall.ts';
	import {
		easings,
		labelSize,
		loopMs,
		stage,
		title as titleMotion,
		type LabelColor
	} from './labels.ts';

	let { title, hint = 'Click anywhere to start', onclose }: ScreensaverProps = $props();

	const images: Record<LabelColor, string> = { yellow, pink, green };
	const curves = { ...easings, ...fallEasings };
	const uid = $props.id();
	const titleId = `${uid}-title`;

	let width = $state(0);
	let height = $state(0);
	let button: HTMLButtonElement;

	// Cover: the stage fills the screen, cropping its edges when the shape differs (as a background image would).
	const scale = $derived(
		width && height ? Math.max(width / stage.width, height / stage.height) : 1
	);
	const titleTop = $derived(height / 2 + (titleMotion.cy - stage.height / 2) * scale);

	// Every animation starts at the same moment, so the labels stay in step with each other and with the title.
	const startTime = typeof document === 'undefined' ? 0 : Number(document.timeline.currentTime);

	// The waits added to Figma's 12 s loop, at moments when every track is still (`at` is a share of the loop):
	// 2 s once the labels cover the screen (3 s in), 25 s once they are gone, before the title and floor drop (8.4 s in).
	const holds = [
		{ at: 0.25, ms: 2000 },
		{ at: 0.7, ms: 25000 }
	];
	const duration = loopMs + holds.reduce((sum, hold) => sum + hold.ms, 0);

	type Kind = 'x' | 'y' | 'rotate' | 'opacity';
	const frame: Record<Kind, (value: number, scale: number) => Keyframe> = {
		x: (value, s) => ({ translate: `${value * s}px 0` }),
		y: (value, s) => ({ translate: `0 ${value * s}px` }),
		rotate: (value) => ({ rotate: `${value}deg` }),
		opacity: (value) => ({ opacity: value })
	};

	/** Where a track waits: its last keyframe before the hold's moment (it stays still until its next keyframe). */
	const holdIndex = ([, times]: MotionTrack, at: number) =>
		times.findLastIndex((time) => time <= at);

	/** Plays one Figma track on an element, looping forever. `scale` only applies to moves (x, y). */
	function play(node: HTMLElement, options: { track: MotionTrack; kind: Kind; scale?: number }) {
		let animation: Animation;
		function start({ track, kind, scale: s = 1 }: typeof options) {
			animation?.cancel();
			const [values, times, eases] = track;
			const points = holds.map((hold) => ({ index: holdIndex(track, hold.at), ms: hold.ms }));
			const keyframes = values.flatMap((value, i) => {
				const ms = times[i] * loopMs + points.reduce((sum, p) => sum + (i > p.index ? p.ms : 0), 0);
				const key = { ...frame[kind](value, s), offset: ms / duration };
				const easing = curves[eases?.[i] ?? 'l'];
				// At a hold point the value stays still for that hold, then the track carries on as in Figma.
				const wait = points.filter((p) => p.index === i).reduce((sum, p) => sum + p.ms, 0);
				if (!wait) return [{ ...key, easing }];
				return [
					{ ...key, easing: 'linear' },
					{ ...key, offset: (ms + wait) / duration, easing }
				];
			});
			animation = node.animate(keyframes, { duration, iterations: Infinity });
			animation.startTime = startTime;
		}
		start(options);
		return { update: start, destroy: () => animation.cancel() };
	}

	function close(event: Event) {
		event.preventDefault();
		onclose();
	}

	onMount(() => button.focus());
</script>

<svelte:window onclick={close} onkeydown={close} />

<div
	role="dialog"
	aria-modal="true"
	aria-labelledby={titleId}
	class="fixed inset-0 z-50 overflow-hidden bg-ui-surface-surface-100 motion-reduce:hidden intro-seen:hidden"
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<!-- Title: under the labels, as in Figma (they fall over it and away). Outside the stage so it can wrap on phones. -->
	<div class="absolute inset-x-0 -translate-y-1/2 px-16" style:top="{titleTop}px">
		<div use:play={{ track: titleMotion.y, kind: 'y', scale }}>
			<p
				id={titleId}
				class="text-center type-ui-headline-6 text-balance text-ui-base-foreground sm:type-web-display-xl"
				use:play={{ track: titleMotion.opacity, kind: 'opacity' }}
			>
				{title}
			</p>
		</div>
	</div>

	<!-- The stage: Figma's frame, scaled to cover the screen. -->
	<div
		class="absolute top-1/2 left-1/2"
		style:width="{stage.width}px"
		style:height="{stage.height}px"
		style:transform="translate(-50%, -50%) scale({scale})"
		aria-hidden="true"
	>
		{#each labels as label, i (i)}
			<div
				class="absolute"
				style:left="{stage.width / 2 + label.cx - labelSize.width / 2}px"
				style:top="{label.cy - labelSize.height / 2}px"
				style:width="{labelSize.width}px"
				style:height="{labelSize.height}px"
			>
				<div class="size-full" use:play={{ track: label.x, kind: 'x' }}>
					<div class="size-full" use:play={{ track: label.y, kind: 'y' }}>
						<img
							src={images[label.color]}
							alt=""
							class="block size-full"
							use:play={{ track: label.rotate, kind: 'rotate' }}
						/>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<button
		bind:this={button}
		type="button"
		class="absolute bottom-32 left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-ui-base-foreground px-16 py-10 type-ui-button whitespace-nowrap text-ui-base-background focus-ring"
	>
		{hint}
	</button>
</div>
