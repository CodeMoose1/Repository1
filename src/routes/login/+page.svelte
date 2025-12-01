<script>
    import { base } from '$app/paths';
        
    import {users_store} from "$lib/user";
    let users = [];
    
    import { onMount } from 'svelte';
    onMount(() => {
        /*Check if has more then 2 characters*/
        if($users_store.length > 2){
            users = JSON.parse($users_store);
        }
    });


    let email
    let password

    function handleSubmit(){
        if (users.some(user => user.email === email && user.password === password)){
            alert("Du är inloggad")
        }
        else{
            alert("Fel e-mail eller lösenord")
        }
    }
</script>

<main>
    <div class = "container">
        <h1 style="color:blanchedalmond;">
            Inloggning
        </h1>
        <form class="form" on:submit|preventDefault={handleSubmit}>
            
            <div class="box">
                <label for="email">E-post</label>
                <input type="email" id="email" bind:value={email}>
            </div>

            <div class="box">
                <label for="password">Lösenord</label>
                <input type="password" id="password" bind:value={password}>
            </div>

            <input type="submit" value="Logga in">

            

        </form>

        <h2 style="color:blanchedalmond">Har du inte ett konto? <a href="{base}/register">Registrera dig</a></h2>
    </div>
</main>

<style>
 main{
        background-image: url("https://t4.ftcdn.net/jpg/05/21/65/59/360_F_521655929_N80d5GaCQJ2VP073PfTXJTe9mkvsNtHE.jpg");
        background-size: cover;
        width: 100%;
        height: 100%;
        padding: 5%;
        min-height: 500px;
    }

    
    .container{
        border: solid 5px rosybrown;
        border-radius: 10px;
        width: 35%;
        height: 30%;
        background-color: #3a2e3b;
        margin: auto;

        display:flex;
        flex-direction: column;
        justify-items: space-evenly;
        align-items: center;
        min-width: 300px;
        min-height: 500px;
    } 
    .form{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;


        width: 90%;
        height: 80%;
    }
    .box{
        background-color:darksalmon;
        display:flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 80%;
        min-height: 50px;
        border-radius: 5px;
        outline-width: 5px;
        outline-color: coral;
        padding: 10px;
        margin: 10px;
        transition-duration: 0.5s;
        
    }
    .box:hover { flex-grow:2; }
        
</style>
