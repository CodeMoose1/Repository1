<script>
	import favicon from '$lib/assets/favicon.svg';
	import { base } from '$app/paths';

	let { children } = $props();

</script>

<nav>
	<a href="{base}/">Home</a>
	<a href="{base}/photoapp">Photo App</a>
	<a href="{base}/register">Register</a>
	<a href="{base}/login" >Login</a>
	<a href="{base}/shoppinglist">Shuppinglist</a>
	<a href="{base}/memory">Memory</a>
	<a href="{base}/chat">Chat</a>
	<a href="{base}/search">Search</a>
	<a href="{base}/mini1">Tetris</a>
	<a href="{base}/mini2">Pacman</a>
	<a href="{base}/weather">Weather</a>
</nav>

<svelte:head>

</svelte:head>

<style>
	
:global(body), :global(html){
  margin: 0%;
  padding: 0%;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
nav{
	text-align: center;
	padding: 5px;
}

</style>

{@render children?.()}
