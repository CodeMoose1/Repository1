<script>
import { fade } from 'svelte/transition'

let varor = $state([{name: "Mjölk", amount: 1, bought: false, priority: 0}])

let new_vara
let new_amount

function add_vara(){
    if(new_vara && new_amount)
        varor.push({name:new_vara, amount:new_amount, bought: false, priority: -Infinity})
    fix_priorities()
    
}
function remove_vara(vara){
    varor = varor.filter(v => v !== vara)
    fix_priorities()
}

function sort_priority(){
    varor.sort((a, b) => a.priority - b.priority)
}

function fix_priorities(){
    sort_priority()
    let p = 0
    varor.forEach(vara => {
        if(!vara.bought){
            vara.priority = p
            p ++
        }
    });
    console.log(varor)
}

function raise_priority(vara){
    
    vara.priority -= 1
    varor[vara.priority].priority ++
    sort_priority()
}
function lower_priority(vara){
    
    vara.priority += 1
    varor[vara.priority].priority -= 1
    sort_priority()
}

</script>

<main class="container">
    <h1>
        Shoppinglist
    </h1>
    <div class = "categories_container">
        <section style="size:100%; list-style-position:inside;">
            <h2>Varor att köpa</h2>
            <ol>
                {#each varor as vara}
                    {#if !vara.bought}      
                        <li transition:fade>
                            <div class="item_frame">
                                <div style="display:flex; flex-direction:column; justify-content:center;">
                                    {#if vara.priority != 0}
                                        <button onclick={()=>raise_priority(vara)}>&#8593;</button>
                                    {/if}
                                    {#if vara.priority != varor.filter(v=>!v.bought).length-1}
                                        <button onclick={()=>lower_priority(vara)}>&#8595;</button>
                                    {/if}
                                </div>
                                <div class="product_lable">
                                    {vara.amount}st {vara.name}
                                </div>
                                <div>
                                    <button onclick={()=>remove_vara(vara)}>X</button>
                                    <button onclick={()=>{vara.bought=!vara.bought; vara.priority = Infinity; fix_priorities()}}>&#8594;</button>
                                </div>
                            </div>
                        </li>
                    {/if}
                {/each}
                
            </ol>

        </section>
        <section style="size:100%; list-style-position:inside;">
            <h2>Har köpt</h2>
            <ul>
                {#each varor as vara}
                    {#if vara.bought}     
                        <li transition:fade>
                            <div class="item_frame">
                                <button onclick={()=>{vara.bought=!vara.bought; fix_priorities()}}>&#8592;</button>
                                <div class="product_lable">
                                    {vara.name}
                                </div>
                                <button onclick={()=>remove_vara(vara)}>X</button>
                            </div>
                        </li>
                    {/if}
                {/each}
                
            </ul>

        </section>    


    </div>
    <div class="bottom_panel">
        <form onsubmit={add_vara}>
            <label for="name">Vara:</label>
            <input type="text" id="name" bind:value={new_vara}>
    
            <label for="antal">Antal:</label>
            <input type="number" bind:value={new_amount}>
    
            <input type="submit" id="add" value="Lägg till vara">
        </form>
    </div>

</main>

<style>
    
.container{
    display: grid;
    grid-template-rows: 1fr 8fr 1fr;
    place-self: center;
    color:black;

    background-color: green;
    width: 60vw;
    height: 90vh;
    border-radius: 20px;
}
.categories_container{
    display:grid;
    grid-template-columns: repeat(2,1fr);
    gap: 10px;
    overflow: auto;

    height:100%;
    
}
h1{
    background-color: olivedrab;
    border-radius: 10px;
    border-style: solid;
    border-width: thick;
    border-color: darkgreen;
    padding: 5px;
}
.item_frame{
    display:flex;
    background-color:sienna;
    padding: 5px;
    margin:5px;
    justify-content: space-between;
    align-items: center;

    border-style: solid;
    border-radius: 10px;
    border-color:darkred;
}
.product_lable{ 
    background-color:white; 
    color:black;
    padding:5px; 
    margin:3px; 
    border-radius:7px
}
.bottom_panel{
    color:white;
    display:flex;
    
    padding:15px;
}

.container h1{
    justify-self: center;
    align-self: center;
}

.container h2{
    color:black;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;
    font-size: 2em;
    margin: 0;
    padding: 10px
}

.categories_container section:first-child{  /* vilket barn vill vi styla? */
    background-color: rgba(0, 0, 0, 0.2); /* svart bakgrund med 10% opacitet */
    color:white
}
 
.categories_container section:last-child{  /* vilket barn vill vi styla? */
    background-color: rgba(0, 0, 0, 0.2); /* svart bakgrund med 30% opacitet */  
    color: white;
}
</style>