<script lang="ts">
	export let data = {
		displayName: '',
		github: '',
		website: '',
		bio: '',
		email: ''
	};
</script>

<div class="relative w-1/3">
	<div>
		<img
			class="rounded-lg absolute top-0 left-0 z-10 w-16 h-16 border-2 border-gray-300"
			src={data.website}
			alt="profilePic"
		/>
	</div>
	<div
		class="card justify-center border border-blue-600 rounded-md shadow-xl bg-black text-blue-600 p-6"
		style="padding-left: 5rem;"
	>
		<h2 class="text-2xl font-bold mb-2">{data.displayName}</h2>
		<p class="text-blue-700 text-base">{data.bio}</p>
		<p class="text-blue-700 text-base">{data.email}</p>
		<p class="text-blue-700 text-base">{data.github}</p>
	</div>
</div>

<style>
	.card {
		transition: background-color 0.3s ease-in-out;
	}

	.card:hover {
		background-color: #6a74f9;
	}
</style>
