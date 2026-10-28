// Shared state between the Sidebar column and the pieces inside it (items, groups, sections, user).
import { getContext, setContext } from 'svelte';

export interface SidebarContext {
	/** The column is narrow: icons only, names in tooltips. */
	readonly collapsed: boolean;
	/** Opens the column (e.g. when a group is clicked while collapsed). */
	expand: () => void;
}

const KEY = Symbol('sidebar');

export function setSidebarContext(context: SidebarContext) {
	setContext(KEY, context);
}

/** Outside a Sidebar (e.g. a lone item in a story) the pieces behave as in the open column. */
export function getSidebarContext(): SidebarContext {
	return getContext<SidebarContext | undefined>(KEY) ?? { collapsed: false, expand: () => {} };
}
