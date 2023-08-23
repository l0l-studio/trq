<script lang="ts">
	import '../app.css';

	import type { Writable } from 'svelte/store';
	import type { AccessTokenValidation } from '$lib/types/auth';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { authed, accessToken, validationPromise } from '$lib/stores/auth';

	$: pathname = $page.url.pathname;

	//TODO: move this to lib/utils/auth
	async function validateAccessToken(
		accessToken: string,
		auth: Writable<boolean>
	): Promise<AccessTokenValidation> {
		let res = await fetch('https://id.twitch.tv/oauth2/validate', {
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		});

		let data = await res.json();

		if (res.ok) {
			auth.set(true);
			localStorage.setItem('access_token', accessToken);
			return data;
		} else {
			throw new Error(data);
		}
	}

	//TODO: move this to lib/utils/auth
	function logout() {
		$authed = false;
		$accessToken = null;
		$validationPromise = new Promise((_, reject) => {
			reject({});
		});
		localStorage.removeItem('access_token');
		goto('/');
	}

	onMount(() => {
		$validationPromise = validateAccessToken($accessToken || '', authed);
	});

	//TODO: validate access_token every hour
</script>

<div
	class="
    flex
    flex-col
    
    max-w-[80vw]
    m-auto
    "
>
	<nav
		class="
        flex
        w-[100%]
        justify-between
    "
	>
		<a href="/">
			<h1 class="text-2xl font-bold text-center">trq</h1>
		</a>
		{#if pathname === '/'}
			{#if !$authed}
				<a
					href="https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=k1voln47iaefm5u78y2ljjmn9vnmug&redirect_uri=http://localhost:5173&scope=user%3Aread%3Aemail"
				>
					login
				</a>
			{:else}
				<button on:click={logout}> logout </button>
			{/if}
		{/if}
	</nav>

	<slot />
</div>
