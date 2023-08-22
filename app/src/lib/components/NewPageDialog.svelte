<script>
	// import { navigate } from 'svelte-navigator';
	import { v4 as uuidv4 } from 'uuid';

	let page = { username: '', notes: '' };
	let shortUuid = '';

	// async function savePage() {
	// 	const pageId = uuidv4();
	// 	const response = await fetch('/api/pages', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({ username: page.username, notes: page.notes, pageId })
	// 	});
	// 	if (response.ok) {
	// 		shortUuid = pageId.slice(0, 8);
	// 		alert(`Page created with ID: ${shortUuid}`);
	// 		navigate(`/pages/${shortUuid}`);
	// 	} else {
	// 		alert('Failed to create page');
	// 	}
	// }
</script>

<div
	class="w-1/3 bg-white border border-purple-500 rounded-lg shadow-lg p-4 float-left"
	style="margin: 0 auto;"
>
	<h1 class="font-bold text-lg mb-4">New Page</h1>
	<div class="flex-col">
		<label for="usernameInput" class="mb-2">Username:</label>
		<input class="border p-2 bg-gray-100 mb-2" id="usernameInput" bind:value={page.username} />
		<label for="notesInput" class="mb-2">Notes:</label>
		<textarea
			class="border p-2 bg-gray-100 resize-none mb-2"
			id="notesInput"
			bind:value={page.notes}
		/>
	</div>
	<!-- <button
		class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
		on:click={savePage}>Create Page</button
	> -->
</div>
