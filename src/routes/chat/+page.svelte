<script>
    import { enhance } from "$app/forms";
    import ElizaBot from 'elizabot';
    import {chat_store} from "$lib/chat";
    import { onMount } from 'svelte';
    let chat = $state([])

    const eliza = new ElizaBot();

    function first_message(){
        chat = chat = [{ user: 'Eliza', message: eliza.getInitial() }];
    }

    onMount(() => {
        /*Check if has more then 2 characters*/
        if($chat_store.length > 2){
            chat = JSON.parse($chat_store);
        }
        else {
            first_message()
        }
    });



    
    async function write(message) {
        //TODO: Add the new message to the chat
        chat.push({ user: 'You', message: message })

        
        //Hämta HTML-elementet med id:et visible
        var element = document.getElementById("visible");
        //Ändrar elementets CSS-egenskap display till default
        element.style.display = "flex"; // Visa elementet
            

        // random delay for Eliza's response time
        await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

        //TODO: Add Eliza's response to the chat
        chat.push({ user: 'Eliza', message: eliza.transform(message) })
        element.style.display = "none";

        $chat_store = JSON.stringify(chat)
    }

    function get_time(){
        var date = new Date()
        return date.getHours() + ":" + date.getMinutes()
        
    }
    
    function clear_chat(){
        first_message()
        $chat_store = JSON.stringify(chat)
    }

</script>

<main>
    <section style="overflow-y:auto;" class="chat">
        {#each chat as message}

            <article data-time={get_time()} class={message.user}>
                <p>{message.message}</p>
            </article>
            
        {/each}
        <article id="visible">
            <span class="circle"></span><span class="circle"></span><span class="circle"></span>
        </article>
    </section>
    
    <section class = "bottom">
        <form method="post"
        use:enhance={({ formElement, formData, action, cancel }) => {
        cancel(); //don't post anything to server
        const text = formData.get("message"); // what does "text" refer to?
        write(text);

        // TODO: reset the form using _____.reset() - what do we want to reset? the element or the data?
        formElement.reset()
        }}>
            <input type="text" name="message" class="box" placeholder="skriv">
        </form>

        <button class="clear_button" onclick={clear_chat}>Clear</button>
    </section>
</main>

<style>
main{
    display: grid;
    grid-template-rows: 90% 10%;

    width: 60vw;
    height: 70vh;
    background-color: gray;
    place-self: center;
    padding: 10px;
    border-style: solid;
    border-width: 5px;
    border-color:black;
    border-radius: 20px;
}
.chat{
    border-style: solid;
    border-width: 4px 0px 4px 0px;
    background-color: lightslategray;
}
.bottom{
    display: flex;
    justify-content: space-between;
}
.clear_button{
    margin: 10px;
    transition: all 0.1s ease-out;
    background-color: red;
    border-radius: 5px;
    border-style: solid;
    border-width: 3px;
    border-color: brown;
}
.clear_button:hover{
    transform: scale(1.1, 1.1);
}
.clear_button:active{
    transform: scale(0.9, 0.9);
}

.Eliza{
    display: flex;
    margin: 10px;
    padding: 10px;
    border-radius: 10px 10px 10px 0px;
    background-color: aqua;
    width: 80%;
    justify-self: left;
    transition: all 0.2s ease-out;
}
.Eliza:hover{
    background-color:lightskyblue;
}
.Eliza::before{
    content: "Eliza";
    font-size: 0.8em;
    color: white;
}
.You{
    display: flex;
    margin: 10px;
    padding: 10px;
    border-radius: 10px 10px 0px 10px;
    background-color:cadetblue;
    width: 80%;
    justify-self: right;
    justify-content: flex-end;
    transition: all 0.2s ease-out;
}
.You:hover{
    background-color: aquamarine;
}
.You::after{
    content: "You";
    font-size: 0.8em;
    color: white;
}
.You::before {
  content: attr(data-time);
  font-size: 0.8em;
  color: white;
  margin-right: auto;
}
.box{
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: aqua;
    width: 90%;
    border-style: solid;
    border-width: 4px;
    border-color: dimgrey;
    transition: all 0.2s ease-out;
}
form{
    width: 100%;
}
.box:focus{
    box-shadow: 0 0 5px 5px darkturquoise;
}
.box::placeholder{
    font-style: italic;
}
.Eliza:first-child{
    background-color: darkcyan;
}   
#visible{
    display: none;
    width: 100px;
    height: 60px;
    padding: 0px;
    background-color:blue;
    border-radius: 10px;

    justify-content: center;
    align-items: center;
}
.circle{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: black;

    animation-name: typing;
    animation-duration: 1000ms;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

}

/* CSS-stilar för .circle med index 1 (den första cirkeln) */
.circle:nth-child(1) {
    animation-delay: 0ms; /* Ingen fördröjning */
}
/* CSS-stilar för .circle med index 2 (den andra cirkeln) */
.circle:nth-child(2) {
    animation-delay: 333ms; /* Starta animationen efter 333 millisekunder (ms) */
}
/* CSS-stilar för .circle med index 3 (den tredje cirkeln) */
.circle:nth-child(3) {
    animation-delay: 666ms; /* Starta animationen efter 666 ms */
}

@keyframes typing{
    0%{
        transform: scale(1);
    }
    25%{
        transform: scale(1);
    }
    50%{
        transform: scale(1.4);
    }
    100%{
        transform: scale(1);
    }
}

</style>