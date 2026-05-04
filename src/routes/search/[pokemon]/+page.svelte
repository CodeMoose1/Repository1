
<script>
  import {search_store} from "$lib/searches";
  import { onMount } from 'svelte';
  let searches = []
  onMount(() => {
    if($search_store.length > 2){
        searches = JSON.parse($search_store);
    }
    if (searches.some((s)=>s.name===data.response.name))
        return
    searches.push(data.response)
    if (searches.length > 5)
        searches.shift()
    $search_store = JSON.stringify(searches)
  });

  import { base } from '$app/paths';
  /** @type {import('./$types').PageData} */
  export let data;
  
</script>

<a href="{base}/search">Back to search</a>
{#await data}
  <p>.. waiting</p>
{:then pokemon} 
<article>
  {#each Object.entries(pokemon.response.sprites) as sprites}
    {#if typeof sprites[1] == "string"}
     <img src={sprites[1]} alt={pokemon.response.name}/>
    {/if}
  {/each}
</article>
<h1>{pokemon.response.name}</h1>
<section>
    <h2>Height</h2>
    <p>{pokemon.response.height}</p>

    <h2>Weight</h2>
    <p>{pokemon.response.weight}</p>

    <h2>Base experience</h2>
    <p>{pokemon.response.base_experience}</p>
</section>

{/await}

<style>

article{
    display: flex;
    justify-content: center;
    width: 90%;
    height: 30%;
    gap: 1em;

    overflow-x: auto;
}
section{
    overflow-y: auto;
}
h1{
    font-size: 3em;
}
h2{
    text-align: center;
}
p{
    text-align: center;
}

</style>


  