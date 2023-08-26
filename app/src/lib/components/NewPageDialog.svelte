<script lang="ts">
	import { page as appPage } from '$app/stores';

	import short from 'short-uuid';

	//TODO: add proper types
	export let user, savePage: (a: typeof page) => void;

	const translator = short();
	const shortUuid = translator.new();
	let page = { id: shortUuid, authorId: user.id, note: '' };

	//TODO: move to utils
	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}

	function handleSave() {
		//TODO: add "copied to clipboard" popup
		copyToClipboard(`${$appPage.url.host}/${shortUuid}`);
		savePage(page);
	}
</script>

<div
	class=" flex-col bg-black border border-purple-500 rounded-lg shadow-lg p-4 float-left"
	style="margin: 0 auto;"
>
	<h1 class="font-bold text-purple-500 text-lg mb-4">{shortUuid}</h1>
	<div class="flex-col">
		<h3 class="mb-2 text-purple-500">Notes:</h3>
		<textarea class="border p-2 resize-none mb-2" id="notesInput" bind:value={page.note} />
	</div>
	<button
		class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
		on:click={handleSave}
	>
		Create
	</button>
</div>
