<script>
	import { onMount } from 'svelte';
	import { accessToken } from '$lib/stores/auth';

	export let data = {
		displayName: '',
		github: '',
		website: '',
		bio: '',
		email: ''
	};

	onMount(async () => {
		const response = await fetch('https://api.twitch.tv/helix/users', {
			headers: {
				Authorization: `Bearer ${$accessToken}`,
				'Client-ID': 'k1voln47iaefm5u78y2ljjmn9vnmug'
			}
		});

		const responseData = await response.json();
		const userData = responseData.data.length > 0 ? responseData.data[0] : null;

		if (userData) {
			data = {
				displayName: userData.display_name,
				// github: userData.profile_image_url,
				website: userData.profile_image_url,
				bio: userData.description,
				email: userData.email
			};
		}
	});
</script>

<div class="card rounded-md shadow-2xl bg-purple-500 hover:bg-purple-600 p-6">
	<h2>{data.displayName}</h2>
	<p>{data.bio}</p>
	<p>{data.email}</p>
	<img src={data.website} alt="profile image" />
	<p>{data.github}</p>
</div>

<style>
	.card {
		transition: background-color 0.3s ease-in-out;
	}

	.card:hover {
		background-color: #9427b0;
	}
</style>
