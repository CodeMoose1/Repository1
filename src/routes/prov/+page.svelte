<script>
    let colors = ["red", "blue", "green", "yellow", "purple", "orange"]
</script>

<div class="box">

    {#each colors as color, index}
    
        <div class="card" style="background-color:{color}">
            {index+1}
        </div>
    {/each}

</div>

<style>

.box{
    display: grid;
    grid-template-columns:repeat(3, 1fr);
    grid-template-rows:repeat(0, 1fr);
    width: 40vw;
    height: 40vh;
    margin:30px;
    padding:20px;
    background-color: darkgrey;
    border-radius: 10px;
}
.card{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin:10px;
    color:white;
}

</style>
