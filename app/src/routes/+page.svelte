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
        overflow-hidden flex relative
        "
	>
		<div
			class="
            absolute w-[100%] h-[100%]
            opacity-0 hover:opacity-100
            flex justify-center items-center
            p-5
            "
		>
			<span
				class="
                text-white z-10 pointer-events-none
                "
			>
				use the custom chat input below to chat without logging in
			</span>
			<div
				class="
                absolute w-[100%] h-[100%] bg-black
                opacity-0 hover:opacity-100 top-0
                left-0 z-0
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
<div
	class="
    "
>
	<input placeholder="ask the dev anything" />
</div>

<style lang="postcss">
</style>
