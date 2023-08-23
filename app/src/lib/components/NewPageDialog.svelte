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
	class=" flex-col bg-black border border-purple-500 rounded-lg shadow-lg p-4 float-left"
	style="margin: 0 auto;"
>
	<h1 class="font-bold text-purple-500 text-lg mb-4">New Page</h1>
	<div class="flex-col">
		<h2 class="mb-2 text-purple-600">Username:</h2>
		<input class="border p-2 bg-purple-300 mb-2" id="usernameInput" bind:value={page.username} />
		<h3 class="mb-2 text-purple-500">Notes:</h3>
		<textarea
			class="border p-2 bg-purple-300 resize-none mb-2"
			id="notesInput"
			bind:value={page.notes}
		/>
	</div>
	<button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
		>Create Page</button
	>
	<!-- on:click={savePage} add that to button when server rdy -->
</div>
