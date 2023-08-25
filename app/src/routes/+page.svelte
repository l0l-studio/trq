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
	let userData = {
		displayName: 'John Doe',
		github: 'johndoe',
		website:
			'https://comicvine.gamespot.com/a/uploads/original/11160/111605805/8687496-monkey_d__luffy__gear_5____updated_by_b_a_i_o_r_e_t_t_o_df3gezw-fullview.png',
		bio: 'I am a software developer.',
		email: 'john@johndoe.com'
	};
	// just for testing
</script>

{#if $validationPromise}
	{#await $validationPromise}
		<p>loading</p>
	{:then data}
		<div class="text-center">
			<h2 class=" justify-center">Welcome</h2>
		</div>
		<div class=" flex justify-evenly">
			<ProfileCard data={userData} />

			<!-- <p>profile stuff here</p> -->
			<NewPageDialog user={{}} savePage={() => {}} />
			<ProfileCard />
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
