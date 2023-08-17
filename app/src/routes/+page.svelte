<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<iframe
    title="stream"
	src="https://player.twitch.tv/?channel=xanderjakeq&muted=true&parent=localhost"
	parent="localhost"
	allowfullscreen
/>

<div id="chat-container">
	<iframe
        title="stream"
		src="https://www.twitch.tv/embed/xanderjakeq/chat?parent=localhost&darkoutput"
		parent="localhost"
		height="<height>"
		width="<width>"
		id="chat"
	/>
</div>

<style>
	iframe {
		width: 80vw;
		height: 70vh;
	}
	#chat-container {
		width: 20vw;
		height: 50vh;
	}
</style>
