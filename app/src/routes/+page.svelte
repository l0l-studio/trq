<script lang="ts">
	import { onMount } from 'svelte';
    import { PUBLIC_BOT_URL, PUBLIC_BOT_SUBPROTOCOL } from '$env/static/public'

	let ws: WebSocket | null;
	let chatInput = '';

	$: chatLen = chatInput.length;
	let characterLimit = 500;

	$: {
		chatInput = chatInput.replace('\n', ' ');
	}

	function sendChatMessage(event: SubmitEvent) {
		event.preventDefault();
		if (!ws) {
			return;
		}

		ws.send(chatInput);
        chatInput = '';
	}

	onMount(() => {
		if (ws) {
			return;
		}
        ws = new WebSocket(`${PUBLIC_BOT_URL}`, [`${PUBLIC_BOT_SUBPROTOCOL}`]);
		ws.onopen = function () {
			console.log('ws opened');
		};
		ws.onclose = function () {
			ws = null;
		};
		ws.onerror = function (evt) {
			console.log('Error ' + evt);
		};
		return false;
	});
</script>

<div
	class="
    flex align-center m-5
    h-[70vh]
    "
>
	<iframe
		title="stream"
		src="https://player.twitch.tv/?channel=xanderjakeq&muted=false&parent=localhost"
		allowfullscreen
		class="grow-[3]"
	/>

	<div
		id="chat-container"
		class="
        flex relative
        "
	>
		<div
			class="
            absolute
            bottom-0
            w-[100%]
            h-[8rem]
            p-2
            bg-white
            "
		>
			<form on:submit={sendChatMessage}>
				<textarea
					bind:value={chatInput}
					placeholder="ask me anything"
					class="
                w-[100%]
                h-[100%]
                rounded-sm
                p-2
                border-2
                border-yellow-400
                resize-none
                focus:outline-none
                focus:border-yellow-800
                "
				/>
				<div
					class="
                    flex
                    justify-between
                    "
				>
					<span>{chatLen}/{characterLimit}</span>
					<button
						type="submit"
						class="
                        rounded-md font-bold text-white
                        bg-indigo-800 p-2
                        "
					>
						chat
					</button>
				</div>
			</form>
		</div>
		<iframe
			title="stream"
			src="https://www.twitch.tv/embed/xanderjakeq/chat?parent=localhost&darkpopout"
			id="chat"
			class="
            pointer-events-none
            "
		/>
	</div>
</div>

<style lang="postcss">
</style>
