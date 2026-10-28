<!--
	Tooltip — Runhappy design system
	Not in Figma yet: design approved by Adriana on 2026-10-23 (see docs/decisions.md).

	Usage: the trigger is a snippet that receives the props it must spread on a focusable element.
	  <Tooltip text="Shown on hover and focus">
	    {#snippet trigger(props)}<button {...props} aria-label="More information">…</button>{/snippet}
	  </Tooltip>

	Accessibility (WCAG 1.4.13): opens on hover, keyboard focus and click (touch); stays open while the
	pointer is over the bubble; closes with Escape. The text is linked to the trigger with aria-describedby,
	or with aria-labelledby when it is the trigger's name (`labels`, icon-only buttons).
	Placement "right" added 2026-10-28 for the collapsed sidebar.
-->
<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface TooltipTriggerProps {
		/** Set when the tooltip describes the trigger (default). */
		'aria-describedby'?: string;
		/** Set when the tooltip is the trigger's name (`labels`), e.g. an icon-only button. */
		'aria-labelledby'?: string;
		onmouseenter: () => void;
		onmouseleave: () => void;
		onfocus: () => void;
		onblur: () => void;
		onclick: () => void;
	}

	export interface TooltipProps {
		/** Text shown in the bubble. Keep it short: one or two sentences. */
		text: string;
		/** The element that opens the tooltip. It must be focusable (usually a <button>). */
		trigger: Snippet<[TooltipTriggerProps]>;
		/**
		 * The text is the trigger's name, not an extra description (icon-only buttons), so screen readers
		 * don't hear it twice.
		 */
		labels?: boolean;
		/**
		 * "top" (default): above the trigger, flips below when there is no room.
		 * "right": next to the trigger, e.g. the collapsed sidebar. Positioned against the window, so a
		 * scrolling container does not cut it.
		 */
		placement?: 'top' | 'right';
		/** Keeps the bubble closed, e.g. while the trigger's menu is open. */
		suppressed?: boolean;
	}
</script>

<script lang="ts">
	let {
		text,
		trigger,
		labels = false,
		placement = 'top',
		suppressed = false
	}: TooltipProps = $props();

	const uid = $props.id();
	const tooltipId = `${uid}-tooltip`;
	// Small delay so the pointer can travel from the trigger to the bubble without closing it.
	const CLOSE_DELAY_MS = 100;

	// Minimum distance (in CSS pixels) the bubble keeps from the edges of the window.
	const VIEWPORT_MARGIN = 8;

	let open = $state(false);
	// Default: above the trigger, centered. Changes only when the bubble would not fit.
	let side = $state<'top' | 'bottom'>('top');
	let align = $state<'center' | 'start' | 'end'>('center');
	// Window position for placement "right", in rem (CSS variables read by the bubble's classes).
	let rightTop = $state('0rem');
	let rightLeft = $state('0rem');
	let wrapper: HTMLSpanElement;
	let bubble: HTMLSpanElement;
	let pointerInside = false;
	let focused = false;
	let closeTimer: ReturnType<typeof setTimeout> | undefined;

	// The bubble is only hidden (not removed), so it can be measured before showing it.
	function placeBubble() {
		const anchor = wrapper.getBoundingClientRect();
		if (placement === 'right') {
			const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
			rightTop = `${(anchor.top + anchor.height / 2) / rem}rem`;
			rightLeft = `${anchor.right / rem}rem`;
			return;
		}
		const { offsetWidth: width, offsetHeight: height } = bubble;
		const center = anchor.left + anchor.width / 2;

		if (center - width / 2 < VIEWPORT_MARGIN) align = 'start';
		else if (center + width / 2 > window.innerWidth - VIEWPORT_MARGIN) align = 'end';
		else align = 'center';

		side = anchor.top - height - VIEWPORT_MARGIN < 0 ? 'bottom' : 'top';
	}

	function show() {
		clearTimeout(closeTimer);
		placeBubble();
		open = true;
	}

	function hideSoon() {
		clearTimeout(closeTimer);
		closeTimer = setTimeout(() => {
			if (!pointerInside && !focused) open = false;
		}, CLOSE_DELAY_MS);
	}

	// Re-measure when the placement changes while shown (e.g. the sidebar collapse button).
	$effect(() => {
		if (open && placement) placeBubble();
	});

	// Placement "right" is positioned against the window: follow the trigger while the bubble is shown
	// (e.g. the sidebar changing width, or the page scrolling).
	$effect(() => {
		if (!open || placement !== 'right') return;
		let frame = requestAnimationFrame(function follow() {
			placeBubble();
			frame = requestAnimationFrame(follow);
		});
		return () => cancelAnimationFrame(frame);
	});

	function handleWindowKeydown(event: KeyboardEvent) {
		if (open && event.key === 'Escape') open = false;
	}

	const triggerProps: TooltipTriggerProps = $derived({
		...(labels ? { 'aria-labelledby': tooltipId } : { 'aria-describedby': tooltipId }),
		onmouseenter: () => {
			pointerInside = true;
			show();
		},
		onmouseleave: () => {
			pointerInside = false;
			hideSoon();
		},
		onfocus: () => {
			focused = true;
			show();
		},
		onblur: () => {
			focused = false;
			hideSoon();
		},
		onclick: show
	});
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<span bind:this={wrapper} class="relative inline-flex">
	{@render trigger(triggerProps)}
	<!-- Always in the page (only hidden), so screen readers can read it through aria-describedby. -->
	<span
		bind:this={bubble}
		id={tooltipId}
		role="tooltip"
		onmouseenter={triggerProps.onmouseenter}
		onmouseleave={triggerProps.onmouseleave}
		style:--tooltip-top={placement === 'right' ? rightTop : undefined}
		style:--tooltip-left={placement === 'right' ? rightLeft : undefined}
		class={[
			'w-max max-w-tooltip',
			placement === 'right'
				? 'fixed top-(--tooltip-top) left-(--tooltip-left) z-30 ml-8 -translate-y-1/2'
				: [
						'absolute z-10',
						side === 'top' ? 'bottom-full mb-8' : 'top-full mt-8',
						align === 'center' && 'left-1/2 -translate-x-1/2',
						align === 'start' && 'left-0',
						align === 'end' && 'right-0'
					],
			'rounded-xs bg-brand-background-inverse px-12 py-8 shadow-overlay',
			'type-ui-body-4-regular text-brand-text-inverse',
			'transition-opacity duration-150 motion-reduce:transition-none',
			open && !suppressed ? 'visible opacity-100' : 'invisible opacity-0'
		]}
	>
		{text}
	</span>
</span>
