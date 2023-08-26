<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	import { userStore } from '$lib/stores/auth';
	import { accessToken, validationPromise } from '$lib/stores/auth';
	import LandingPage from '$lib/components/LandingPage.svelte';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import NewPageDialog from '$lib/components/NewPageDialog.svelte';

	export let data: PageData;
	const { user, pages } = data;

	if (browser) {
		const hash = $page.url.hash;

		if (hash) {
			$accessToken = hash.substring(14).split('&')[0];
		}
	}

	$: {
		$userStore = { displayName: data.user.username, ...$userStore, ...user };
	}

	function saveProfile(data) {
		//save to db
		console.log('save me to db', data);
	}

	async function savePage(data) {
		const res = await fetch('http://localhost:8080/api/v1/pages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		//TODO: append to pagelist somewhere
		console.log(await res.json());
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
			<ProfileCard user={$userStore} {saveProfile} />

			<NewPageDialog user={$userStore} {savePage} />
			<div class="flex">
				{#each pages as page}
					<div class="bg-white shadow-md p-6 m-2 rounded-lg">
						<h2 class="text-xl font-semibold mb-4 hover:text-blue-500">
							<a href={`/${page.id}`}>
								{page.id}
							</a>
						</h2>

						<div class="mb-4">
							<p class="font-semibold">Note:</p>
							<p>{page.note || ''}</p>
						</div>
					</div>
				{/each}
			</div>
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
