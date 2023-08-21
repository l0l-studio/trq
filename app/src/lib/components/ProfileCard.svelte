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
				github: '',
				website: userData.offline_image_url,
				bio: userData.description,
				email: userData.email
			};
		}
	});
</script>

<div>
	<h2>{data.displayName}</h2>
	<p>{data.bio}</p>
	<p>{data.email}</p>
	<p>{data.website}</p>
	<p>{data.github}</p>
</div>
