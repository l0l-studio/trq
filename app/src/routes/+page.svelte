<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { accessToken, validationPromise } from '$lib/stores/auth';
	import LandingPage from '$lib/components/LandingPage.svelte';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import NewPageDialog from '$lib/components/NewPageDialog.svelte';

	if (browser) {
		const hash = $page.url.hash;

		if (hash) {
			$accessToken = hash.substring(14).split('&')[0];
		}
	}
</script>

{#if $validationPromise}
	{#await $validationPromise}
		<p>loading</p>
	{:then data}
		<div class="text-center">
			<h2 class=" justify-center">Welcome</h2>
		</div>
		<div class=" flex justify-evenly">
			<!-- <p>profile stuff here</p> -->
			<NewPageDialog />
		</div>
	{:catch}
		<div
			class="
            max-w-[500px]
            "
		>
			<LandingPage />
		</div>
	{/await}
{/if}
