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
    
    // Navigera till den dynamiska routen /search/[pokemon]
    goto(base + '/search/' + search);
  }

  const type_colors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
  }

</script>

<main>
    <form onsubmit={handleSubmit}>
        <input type="text" name="search" placeholder="Sök upp en pokemon" />
    </form>
    <footer>
        {#each searches as search}
            <a href="{base + '/search/' + search.name}" style="background-color: {type_colors[search.types[0].type.name]};">{search.name}</a>
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