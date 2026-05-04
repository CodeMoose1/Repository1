<section>
    <div><h1>hej</h1></div>
    <div></div>
    <div><h2>hej</h2></div>
    <div></div>
    <div></div>
    <div><p>hej</p></div>
</section>

<style>
    section{
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 1fr 50px;
        width: 500px;
        height: 250px;
        gap:10px;
    }
    div:nth-child(2n){
        width: 50%;
        height: 50%;
        background-color: gray;
    }
    
</style>