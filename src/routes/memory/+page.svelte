<script>
    

    let bluePoints = $state(0)
    let redPoints = $state(0)
    let blueTurn = $state(true)
    let winner_text = $state("")

    let flipped_cards = []

    const images = [
                    "https://storage.googleapis.com/nextspaceflight/media/starship/Starship-Super%20Heavy%20Block%201-2.webp", 
                    "https://upload.wikimedia.org/wikipedia/commons/b/b9/Artemis_I_Launch_%28NHQ202211160017%29.jpg",
                    "https://storage.googleapis.com/nextspaceflight/media/rockets/Saturn_V.webp",
                    "https://storage.googleapis.com/nextspaceflight/media/rockets/Soyuz_2.1a_Crew.webp",
                    "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:51,cw:548,ch:548,q:80,w:548/ka5acHNs3trfycsfvB5aeY.jpg",
                    "https://storage.googleapis.com/nextspaceflight/media/rockets/Falcon_9_Block_5.webp"
                ]
    let cards = $state([])
    for (let i = 0; i<12; i++){
        cards.push({image: images[i%6], flipped: false, matched: false})
    }

    shuffle()

    function shuffle(){
        cards.sort(() => Math.random() - 0.5);
    }

    function restart(){
        cards.forEach((card)=>{
            card.flipped = false
            card.matched = false
        })
        shuffle()
        bluePoints = 0
        redPoints = 0
        winner_text = ""
    }
    function check_win(){
        if(cards.some((card)=>!card.matched))
            return
        if (bluePoints > redPoints)
            winner_text = "Blue is the winner!"
        else if (redPoints > bluePoints)
            winner_text = "Red is the winner!"
        else
            winner_text = "It is a tie!"
    }

    function card_pressed(card){
        if(card.flipped | card.matched)
            return
        if(flipped_cards.length>=2)
            return

        card.flipped = true

        
        flipped_cards.push(card)

        if(flipped_cards.length == 2){
            if(flipped_cards[0].image == flipped_cards[1].image){
                flipped_cards[0].matched = true
                flipped_cards[1].matched = true
                if(blueTurn)
                    bluePoints++
                else
                    redPoints++
                flipped_cards = []
                check_win()
                return
            }
            setTimeout(()=>{
                flipped_cards.forEach((card)=>{
                    card.flipped = false
                })
                flipped_cards = []
                blueTurn = !blueTurn
                return
            }, 1000)
        }
    }

</script>

<h1>Memory</h1>
<main class:background= { !blueTurn } >

{#each cards as card}
    <div class="card" class:flipped= { card.flipped } onclick={()=> card_pressed(card)}>
        <img src="https://img.freepik.com/free-vector/flat-design-silver-stars-pattern_23-2149988776.jpg?semt=ais_hybrid&w=740&q=80" alt="framsida" class = "front" >
        <img src={card.image} alt="raket" class = "back">
    </div>
{/each}
</main>

<h2 style={bluePoints > redPoints ? "color: cornflowerblue;" : bluePoints < redPoints ? "color: red;": ""}>
    {winner_text}
</h2>

<div class="button_container">
    <button onclick={restart}>
        Restart
    </button>
</div>

<aside>
    <p>{redPoints}</p>
</aside>

<aside class = "blue">
    <p>{bluePoints}</p>
</aside>
<aside class = "turn" class:blue= { blueTurn }>

</aside>

    
<style>
h1{
    text-align: center;
    font-size: 3em;
    text-shadow: 0px 0px 10px grey;
}
h2{
    text-align: center;
    color:black;
    font-size: xx-large;
    text-shadow: 0px 0px 20px black;
}

@media (min-height: 650px){
  main{
    grid-template-columns: repeat(4, 150px);
    grid-template-rows: repeat(3, 150px);
  }
}
@media (max-height: 650px){
  main{
    grid-template-columns: repeat(6, 150px);
    grid-template-rows: repeat(2, 150px);
  }
}
          

main{
    display: grid;
    justify-content: center;
    background-color:cornflowerblue;
    box-shadow: 0 0 10px 10px cornflowerblue;
    padding:20px;
    transition: all 0.5s linear;
}
.background{
    background-color: red;
    box-shadow: 0 0 10px 10px red;
}
.card{
    justify-self: center;
    align-self: center;
    position: relative;

    width: 90%;
    height: 90%;
    
    border-style:solid;
    border-width: 4px;
    border-color: lightgray;
    border-radius: 20px;

    transform-style: preserve-3d;
    transition: transform 0.5s;
}
.card img{
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    position: absolute;
    border-radius: 15px;
    
}
.card:not(.flipped):hover{
    transform: scale(1.05);
}
.back{
    
    transform: rotateY(180deg);
}
.front{
}
.flipped{
    transform: rotateY(180deg);
}

aside{
    width: 100px;
    height: 100px;
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border-style: solid;
    border-color:darkred;
    border-width: 5px;
}

p{
    font-size: 30px;
}
.blue{
    background-color:cornflowerblue;
    border-color: blue;
    left: 10px;
}
.turn{
    box-shadow: 0 0 10px 10px yellowgreen;
    z-index: -1;

}
.button_container{
    display: flex;
    position: fixed;
    justify-content: center;
    flex-direction: row;
    bottom: 20px;
    width: 100%;
}
button{
    padding: 20px;
    font-size: large;
    border-radius: 10px;
    border-style: solid;
    border-width: 5px;
    border-color: dimgray;
    transition: all 0.2s ease-out;
}
button:hover{
    transform: scale(1.05);
}
button:active{
    transform: scale(0.95);
}
                          
</style>