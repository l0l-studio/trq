<!--
//TODO: do this if we have time to be fancy
<script lang="ts" generics="T">
	import type { SvelteComponent } from 'svelte';
	export let title: string, items: T[], ItemComponent: SvelteComponent<{ item: T }>;
</script>

<div class="bg-white shadow-md p-6 rounded-lg">
	{#each items as item}
		<ItemComponent {item} />
	{/each}
</div>
-->
