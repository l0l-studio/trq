<script lang="ts">
	import defaultImg from '$lib/images/black&white.png';

	//TODO: add proper types
	export let user, saveProfile;

	let isEditing = false;
	const userKeys = Object.keys(user).filter((key) => {
		return !['id', 'username', 'email'].includes(key);
	});

	function toggleEdit() {
		if (isEditing) {
			saveProfile(user);
		}
		isEditing = !isEditing;
	}
</script>

<div class="w-1/3">
	<div
		class="
        flex flex-col justify-center border
        border-blue-600 rounded-md shadow-xl
        bg-black text-white p-6
        "
		style="padding-left: 5rem;"
	>
		<div>
			<img
				class="rounded-lg w-16 h-16 border-2 border-gray-300"
				src={user.profPic || defaultImg}
				alt="profilePic"
			/>
		</div>
		<h2 class="text-2xl font-bold mb-2">{user.username}</h2>

		{#if !isEditing}
			{#each userKeys as key}
				<div class="flex gap-[5px] py-1">
					<span class="font-bold">{key}:</span>
					<p
						class="
                        max-w-min text-ellipsis overflow-hidden
                        whitespace-nowrap
                        "
					>
						{user[key]}
					</p>
				</div>
			{/each}
		{:else}
			{#each userKeys as key}
				<div class="flex gap-[5px] py-1">
					<span class="font-bold">{key}:</span>
					{#if key != 'bio'}
						<input bind:value={user[key]} class="text-black" />
					{:else}
						<textarea bind:value={user[key]} class="text-black" />
					{/if}
				</div>
			{/each}
		{/if}

		<button
			on:click={toggleEdit}
			class="
            text-white
            bg-purple-500
            hover:bg-purple-400
            max-w-min
            px-2
            rounded-sm
            "
		>
			{isEditing ? 'save' : 'edit'}
		</button>
	</div>
</div>

<style>
</style>
