
<!--Delar upp sidan i två delar-->
<main>
  <div class = "page">

    <h1> Victor Lindblom </h1>
    <h2>Här har jag samlat min uppgifter jag gjort i samband med webbutveckling i årskurs 2 på Maja Beskowgymnasiet!</h2>
    <h3>Inspirerade citat för min webbutvecklingsresa:</h3>
    <!--Under denna kommer vi lägga till fler element-->
    <p id="inspo">
    "The only way to learn a new programming language is by writing programs in it." - <strong>Dennis Ritchie</strong>, creator of the C programming language.
    </p>

    <p style="background-color:pink">
        "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it." - <span>Patrick McKenzie, software engineer and entrepreneur</span>.
    </p>

  </div>
    <!--Här kommer vi lägga till en bild senare i uppgiften 1.2.4 Extra styling-->  

</main>

<style>
  main{
    /*Styling för att dela upp sidan i två delar. */
    /*Vi kommer gå igenom detta i detalj senare*/
    margin: auto;
    width: 80vw;
    height: 70vh;
    display: grid;
    grid-template-columns: repeat(2,50%);
    overflow: hidden;
  }
  div{
    /*Styling för att centrera texten i behållaren*/
    margin: auto;
  }

  h1{
    color:#008000;
  }
  h2{
    color:blueviolet;
  }
  h3{
    color: rgb(255, 100, 0)
  }
  #inspo{
    font-family: courier;
    font-size: 160%;
  }

  span{
      color: green;
  }
  
  /* Vi skiljer elementen med ett kommatecken(,) för att ge möjligheten till att ge flera element samma styling */
  h1, h2, h3, p {
    display: block;
    /*Ger utrymme mellan element*/
    margin: 10px;
  }

  .page{
    background-color:bisque;
  }
  
  


  </style>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000b76" fill-opacity="1" d="M0,160L75.8,192L151.6,128L227.4,64L303.2,64L378.9,96L454.7,224L530.5,128L606.3,192L682.1,224L757.9,224L833.7,32L909.5,32L985.3,256L1061.1,96L1136.8,192L1212.6,320L1288.4,64L1364.2,256L1440,224L1440,320L1364.2,320L1288.4,320L1212.6,320L1136.8,320L1061.1,320L985.3,320L909.5,320L833.7,320L757.9,320L682.1,320L606.3,320L530.5,320L454.7,320L378.9,320L303.2,320L227.4,320L151.6,320L75.8,320L0,320Z"></path></svg>