<!-- ProfileCard.svelte -->
<script>
	export let displayName = '';
	export let github = '';
	export let website = '';
	export let bio = '';
</script>

<div class="bg-white shadow-md p-6 rounded-lg">
	<h2 class="text-xl font-semibold mb-4">Profile Card</h2>

	<div class="mb-4">
		<p class="font-semibold">Display Name:</p>
		<p>{displayName}</p>
	</div>

	<div class="mb-4">
		<p class="font-semibold">Github:</p>
		<p>{github}</p>
	</div>

	<div class="mb-4">
		<p class="font-semibold">Website:</p>
		<p>{website}</p>
	</div>

	<div class="mb-4">
		<p class="font-semibold">Bio:</p>
		<p>{bio}</p>
	</div>

	<div class="mb-4">
		<p class="font-semibold">Chat Placeholder:</p>
		<p>Ask me anything</p>
	</div>
</div>

<div class="bg-white shadow-md p-6 rounded-lg">
	<h2 class="text-xl font-semibold mb-4">Profile Card</h2>

	<div class="mb-4">
		<p class="font-semibold">Display Name:</p>
		<p>{displayName}</p>
	</div>

	<div class="mb-4">
		<p class="font-semibold">Github:</p>
		<p>{github}</p>
	</div>

	<div class="mb-4">
		<p class="font-semibold">Website:</p>
		<p>{website}</p>
	</div>

	<div class="mb-4">
		<p class="font-semibold">Bio:</p>
		<p>{bio}</p>
	</div>

	<div class="mb-4">
		<p class="font-semibold">Chat Placeholder:</p>
		<p>Ask me anything</p>
	</div>
</div>

<style>
	/* Add Tailwind classes or custom styles here */
</style>
