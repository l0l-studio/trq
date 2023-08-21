<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { accessToken, validationPromise } from '$lib/stores/auth';
	import LandingPage from '$lib/components/LandingPage.svelte';
	import ProfileCard from '$lib/components/ProfileCard.svelte';

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
		<h2>{data.login}</h2>
		<ProfileCard />
		<p>profile stuff here</p>
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
