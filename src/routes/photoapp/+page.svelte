<script>
    let image = "https://picsum.photos/id/70/367/267"
    let photo = "https://picsum.photos/id/88/367/267"
    let picture = "https://picsum.photos/id/93/367/267"
</script>

<h1>
    Photoapp
</h1>
<p>
    Denna sida innehåller  <b>fina</b> bilder
</p>


<div class = "photos">
    <div class = "image-wrapper">
        <img src={image} alt="Flexbox egenskaper">
    </div>
    <div class = "image-wrapper">
        <img src={photo} alt="Galen bild">
    </div>
    <div class = "image-wrapper">
        <img src={picture} alt="Tokig bild">        
    </div>

</div>

<style>
    h1{
        text-align: center;
        font-size: 50px;
        margin: 20px;
        color: grey;
    }
    p{
        text-align: center;
    }

    .photos{
        display:flex;
        flex-wrap: wrap;
        max-width: 90vw;
        margin: auto;
        padding: 1vw;
        overflow: hidden;
        border-radius: 20px;
        justify-content: space-around;
        background-color: gainsboro;
    }
    .image-wrapper{
        display: flex;
        justify-content: center;
        flex-grow: 1;
        flex-basis: 300px;
        height: 400px;
        size: 300px;
        margin: 10px;
        align-items: center;
        transition: flex-grow 1s;
        transition-timing-function: ease;
        
    }
    
    .image-wrapper img{
        width: 100%;
        height: 100%;
        border: 2px solid white;
        border-radius: 20px;
        box-shadow: 4px 8px 10px rgba(0,0,0,0.2);
    }
    .image-wrapper:hover { flex-grow:2; }
    .image-wrapper:active { transform: scale(0.9); }
</style>