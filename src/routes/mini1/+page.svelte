<script>

import {users_store} from "$lib/user";
let users = [];
    
import { onMount } from 'svelte';
	import { preventDefault } from "svelte/legacy";
onMount(() => {
    /*Check if has more then 2 characters*/
    if($users_store.length > 2){
        users = JSON.parse($users_store);
    }
});

let name
let email
let password
let year = $state()
let male
let female
let other

function handleSubmit(){
    if (!name || !email || !password || !(male || female || other)){
        alert("Var vänlig ange alla uppgifter")
        return
    }
    let gender = male ? "male" : female ? "female" : "other"
    alert(name+"\n"+email+"\n"+password+"\n"+year+"\n"+gender)

    let new_user = {username: name, password: password, email: email, birth_year: year, gender: gender};
    users = [...users, new_user];
    $users_store = JSON.stringify(users);
}

const pieces = [
    {color: "darkmagenta", blocks: [ // T
        {x: 0, y: 0},
        {x: 0, y: -1},
        {x: 1, y: 0},
        {x: -1, y: 0}, 
    ]},
    {color: "cyan", blocks: [ // I
        {x: 0, y: 0},
        {x: 1, y: 0},
        {x: 2, y: 0},
        {x: -1, y: 0}, 
    ]},
    {color: "red", blocks: [ // Z
            {x: -1, y: -1},
            {x: 0, y: -1},
            {x: 0, y: 0},
            {x: 1, y: 0}, 
    ]},
    {color: "green", blocks: [ // S
            {x: 1, y: -1},
            {x: 0, y: -1},
            {x: 0, y: 0},
            {x: -1, y: 0}, 
    ]},
    {color: "yellow", blocks: [ // Square
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: 1, y: 1}, 
    ]},
    {color: "orange", blocks: [ // L
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 1, y: -1},
            {x: -1, y: 0}, 
    ]},
    {color: "blue", blocks: [ // J
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: -1, y: -1},
            {x: -1, y: 0}, 
    ]},
]

let blocks = $state({})
let piece = $state(structuredClone(pieces[Math.floor(Math.random()*pieces.length)]))
let piece_x = $state(4)
let piece_y = $state(0)

function reset(){
    blocks = {};
    piece = structuredClone(pieces[Math.floor(Math.random()*pieces.length)]);
    piece_x = 4;
    piece_y = 0;
    if (typeof window !== "undefined")
        document.getElementById("form").reset()
}

function rotate(clockwise){


    piece.blocks.forEach(block => {
        if (clockwise){
            let temp = block.x;
            block.x = -block.y;
            block.y = temp;

        }
        else{
            let temp = block.x
            block.x = block.y
            block.y = -temp
        }
        
    });
}

function fix_piece(){
    for (let block of piece.blocks){
        blocks[block.x + piece_x + (block.y + piece_y) * 10] = piece.color
    }
    check_lines()
}

function check_lines(){
    let lines = {}
    for (let i=0; i<20; i++){
        lines[i] = 0
    }
    for (let id in blocks){
        lines[Math.floor(id/10)] ++;
    }
    for (let i=0; i<20; i++){
        if (lines[i] == 10){

            let new_blocks = {}
            for (let id in blocks){
                if (Math.floor(id/10) > i)
                    new_blocks[id] = blocks[id]
                else if (Math.floor(id/10) < i){
                    new_blocks[id - (-10)] = blocks[id]}
            }
            blocks = new_blocks

        }
    }
}

function pos_ok(x, y){
    if (x<0 | x>=10 | y>=20){
        return false}
    
    if (Object.hasOwn(blocks, x + y*10)){
        return false}

    return true    
}
function piece_ok(){
    for (let block of piece.blocks){
        if (!pos_ok(block.x + piece_x, block.y + piece_y))
            return false
    }
    return true
}

function keydown(event){
    if (event.repeat) 
        return

    switch (event.keyCode){
        case 37:
            piece_x--;
            if(!piece_ok())
                piece_x++;
            break
        case 39:
            piece_x++;
            if(!piece_ok())
                piece_x--;
            break
        case 38:
            rotate(true);
            if(!piece_ok())
                rotate(false);
            break
        case 13:
            event.preventDefault();
            break

    }
}

function drop(){
    for (let block of piece.blocks){
        if (!pos_ok(block.x + piece_x, block.y+piece_y+1)){
            fix_piece()
            piece = structuredClone(pieces[Math.floor(Math.random()*pieces.length)])
            piece_x = 4
            piece_y = 0
            if (!piece_ok())
                reset()
            return
        }
    }
    piece_y ++;
}

setInterval(drop, 333)

</script>

<svelte:window on:keydown={keydown}/>

<main>
    <form id="form" on:submit|preventDefault={handleSubmit}>
        <div class="form_item">
            <label for="name">Namn</label>
            <input type="text" id="name" bind:value={name} autocomplete="off" tabindex="-1">
        </div>
        <div class="form_item">
            <label for="email">E-post</label>
            <input type="email" id="email" bind:value={email} autocomplete="off" tabindex="-1">
        </div>
        <div class="form_item">
            <label for="password">Lösenord</label>
            <input type="password" id="password" bind:value={password} tabindex="-1">
        </div>
        <div class="form_item">
            <label for="birth year">Födelseår</label>
            <input type="range" id="birth year" bind:value={year} min=-10000 max=2030 tabindex="-1">
            <p>{Math.abs(year)} {year < 0? "f.Kr": ""}</p>
            
        </div>
        <div class="form_item">
            <label name="gender" for="male">Man</label>
            <input name="gender" type="radio" id="male" bind:value={male} tabindex="-1">
            <label name="gender" for="female">Kvinna</label>
            <input name="gender" type="radio" id="female" bind:value={female} tabindex="-1">
            <label name="gender" for="other">Annat</label>
            <input name="gender" type="radio" id="other" bind:value={other} tabindex="-1">
        </div>
        <input type="submit">
    </form>

    {#each Object.entries(blocks) as [pos, color]}
        <div class="block" style="background-color:{color}; border-color: {color}; left:{(pos%10)*10}%; top:{Math.floor(pos/10)*5}%"></div>
    {/each}
    {#each piece.blocks as block}
        {#if block.y + piece_y >= 0}
            <div class="block" style="background-color:{piece.color}; border-color: {piece.color}; left:{(block.x + piece_x)*10}%; top:{(block.y + piece_y)*5}%"></div>
        {/if}
    {/each}
</main>

<style>

main{
    display: flex;
    flex-direction: column-reverse;
    position: absolute;
    width: 45vh;
    height: 90vh;
    background-color:grey;
    justify-self: center;
    margin: 20px;

    box-shadow: 0 0 20px 20px black;

    outline-style: ridge;
    outline-width: 10px;
}
form{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 10px;
    
}
.form_item{
    background-color: bisque;
    width: 70%;
    text-align: center;
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
    border-style: solid;
    border-width: 4px;

}
.block{
    height: 5%;
    width: 10%;
    position: absolute;
    left:10%;

    border-style: outset;
    box-sizing: border-box;
    border-width: 10px;
    
}

</style>