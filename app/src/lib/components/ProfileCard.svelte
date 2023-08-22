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
				github: userData.id,
				website: userData.profile_image_url,
				bio: userData.description,
				email: userData.email
			};
		}
	});
</script>

<div class="relative">
	<div>
		<img
			class="rounded-full absolute top-0 left-0 z-10 w-16 h-16 border-4 border-purple-400"
			src={data.website}
			alt="profilePic"
		/>
	</div>
	<div
		class="card justify-start border-4 border-purple-400 rounded-md shadow-2xl bg-white p-6"
		style="padding-left: 5rem;"
	>
		<h2 class="text-2xl font-bold mb-2">{data.displayName}</h2>
		<p class="text-gray-700 text-base">{data.bio}</p>
		<p class="text-gray-700 text-base">{data.email}</p>
		<p class="text-gray-700 text-base">{data.github}</p>
	</div>
</div>

<style>
	.card {
		transition: background-color 0.3s ease-in-out;
	}

	.card:hover {
		background-color: #f3f4f6;
	}
</style>
