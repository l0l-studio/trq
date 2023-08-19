<h1 class="text-3xl font-bold">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div
	class="
    flex align-center m-5
    h-[70vh]
    "
>
	<iframe
		title="stream"
		src="https://player.twitch.tv/?channel=xanderjakeq&muted=true&parent=localhost"
		parent="localhost"
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
			<textarea
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
		</div>
		<iframe
			title="stream"
			src="https://www.twitch.tv/embed/xanderjakeq/chat?parent=localhost"
			parent="localhost"
			id="chat"
			class="
            pointer-events-none
            "
		/>
	</div>
</div>

<style lang="postcss">
</style>
