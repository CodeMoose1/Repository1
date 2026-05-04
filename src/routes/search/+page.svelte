<script>
  import {search_store} from "$lib/searches";
  import { onMount } from 'svelte';
  let searches = $state([])
  onMount(() => {
    if($search_store.length > 2){
        searches = JSON.parse($search_store);
    }
    });
  // Importera goto-funktionen för att navigera mellan sidor
  import { goto } from '$app/navigation';
  import {base} from '$app/paths';
  
  // Funktion som hanterar formulärets submit-händelse
  function handleSubmit(e) {
    // Förhindra att sidan laddas om (standardbeteende för formulär)
    e.preventDefault();
    
    // Skapa ett FormData-objekt från formuläret
    const formData = new FormData(e.target);
    
    // Hämta värdet från input-fältet med name="search"
    const search = formData.get('search');
    add_search(search)
    // Navigera till den dynamiska routen /search/[pokemon]
    goto(base + '/search/' + search);
  }

  function add_search(name){
    if (searches.some((s)=>s===name))
        return
    searches.push(name)
    if (searches.length > 5)
        searches.shift()
    $search_store = JSON.stringify(searches)
  }

</script>

<main>
    <form onsubmit={handleSubmit}>
        <input type="text" name="search" placeholder="Sök upp en pokemon" />
    </form>
    <footer>
        {#each searches as search}
            <a href="{base + '/search/' + search}" style="background-color: rgb({Math.random()*255}, {Math.random()*255}, {Math.random()*255});">{search}</a>
        {/each}
    </footer>
</main>

<style>

input{
    padding: 10px;
    
    border: inset 10px gray;
}
input::placeholder{
    font-style: italic;
}
footer{
    position: fixed;
    display: flex;
    justify-content: center;
    gap:20px;
    bottom: 0;
    left: 0;
    width: 100%;
}
footer a{
    font-size: x-large;
    color: black;
}

</style>