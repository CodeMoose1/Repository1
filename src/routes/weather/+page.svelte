<script>
import {onMount} from 'svelte'

const HOUSE_COLORS = ["gray", "darkgray", "dimgray", "brown", "white"]
let houses = []
let days = $state(["Söndag", "Måndag" , "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", ])
let shown_day = $state(0)

function make_houses(){
    for (let i=0; i<5+Math.floor(Math.random()*10); i++){
        houses.push({
            height: 5+Math.random()*20,
            width: 5+Math.random()*5,
            color: HOUSE_COLORS[Math.floor(Math.random()*HOUSE_COLORS.length)]
        })
    }
}
make_houses()

const d = new Date();
let day = d.getDay();


if (day>0){
   let removed_days = days.splice(0,day)
   days = days.concat(removed_days)
}

let posts = $state()

onMount(async () =>{
    posts=await getPosts()
    console.log(posts)

    getDay()
    make_clouds()
})

/* don't generate these pages at build time as we want to get the latest data from the API when a user navigates here */
export const ssr = false;
export const prerender = false;

async function getPosts() {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=63.8284&longitude=20.2597&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,sunset,sunrise,rain_sum,snowfall_sum&hourly=temperature_2m&current=wind_speed_10m,is_day,rain,snowfall,cloud_cover,temperature_2m,wind_direction_10m&timezone=auto')
        const users = await res.json()
        if (res.ok) {
            return users
        } else {
            throw new Error('Something went wrong!')
        }
    }
function getDay(){
    var title = document.getElementById("title")
    var element = document.getElementById("main");
    if(posts.current.is_day == 0){
        element.style.backgroundColor = 'rgba(0,0,0,0.8)'
        title.style.color = "white"
    }
    
}

let clouds = $state([])
function make_clouds(){
    console.log("created clouds")
    let n_clouds = 0
    if (posts.current.cloud_cover > 30)
        n_clouds++
    if (posts.current.cloud_cover > 60)
        n_clouds++
    if (posts.current.cloud_cover > 90)
        n_clouds++

    for (let i=0; i < n_clouds; i++){
        clouds.push({x:20+20*i , y: -20})
    }

    setInterval(()=>{
    clouds.forEach(cloud => {
        cloud.x = 20+Math.random()*40
        cloud.y = Math.random()*-10 - 15
    },);
    }, 4000)
}


    
</script>



<main id="main">
{#if posts}
    <div class="sun">
        
            {#if posts.current.is_day===1}
            ☀️
            {/if}
        
    </div>
    <div class="moon">
        {#if posts.current.is_day===0}
            🌙
        {/if}
    </div>

{/if}
    <h1 id="title">Väder Umeå</h1>
    
    <div class="atmosphere">
        <div class="earth">
            <div class="land">
                <h2>Umeå</h2>
            </div>
            {#if posts}
                {#if shown_day===0}
                    {#each clouds as cloud}
                        <div class="clouds" style="left:{cloud.x}%; top:{cloud.y}%">
                            
                        </div>
                        
                    {/each}
                {/if}
            {/if}
            {#each houses as house}
                <div class="house" style="height: {house.height}%; top: {-house.height+1.8}%; width: {house.width}%; left:{32+ Math.random()*(32-house.width)}%; background-color:{house.color}"></div>
            {/each}

       

        
        <div class="info">
            {#if posts}
            <h3>Väder</h3>
            {#if shown_day===0}
            <div class="weather">
                <div>
                    ☁️:{posts.current.cloud_cover} %
                </div>
                <div>
                    🌧️:{posts.current.rain} mm
                </div>
                <div>
                    🌨️:{posts.current.snowfall} cm
                </div>
                <div>
                    💨:{posts.current.wind_speed_10m} km/h
                </div>
            </div>
                {:else}
            <div class="weather">
                    

                <div>
                    🌧️:{posts.daily.rain_sum[shown_day]} mm
                </div>
                <div>
                    🌨️:{posts.daily.snowfall_sum[shown_day]} cm
                </div>
                <div>
                    💨:{posts.daily.wind_speed_10m_max[shown_day]} km/h
                </div>
                
            </div>
            {/if}
            
            <h3>Temperatur</h3>
            
            {#if shown_day===0}
            <div class="temperature">
                <div>

                    {posts.current.temperature_2m} °C
                    {posts.current.temperature_2m>0?"🔥":"❄️"}
                </div>
               
            </div> 
                {:else}
                <div class="temperature">
                    <div>
                        Högst: {posts.daily.temperature_2m_max[shown_day]} °C
                        {posts.daily.temperature_2m_max[shown_day]>0?"🔥":"❄️"}

                    </div>
                    <div>
                        Lägst: {posts.daily.temperature_2m_min[shown_day]} °C
                        {posts.daily.temperature_2m_min[shown_day]>0?"🔥":"❄️"}

                    </div>
                </div>
                {/if}
                

                

         
            {/if}
             </div>
        </div>
    </div>
    <div class = "calendar">
        {#each days as d, i}
            <button class="day" onclick={()=>{shown_day = i}} style="background-color:{i===shown_day?"yellow":""}">
                {d}
            </button>
        {/each}
    </div>
</main>


<style>
h1{
    text-align: center;
    z-index: 1;
}
h2{
    text-align: center;
    color: black;
    
}
p{
    text-align: center;
}
.atmosphere{
    position: absolute;
    margin: 100px;
    background-color: aqua;
    justify-self: center;
    padding: 10px;
    border-radius: 50%;
    width: 50vh;
    height: 50vh;
    box-shadow: 0 0 30px 30px aqua;
    
}
.earth{
    background-color: blue;
    width: 100%;
    height: 100%;
    justify-self: center;
    border-radius: 50%;
    
}
.land{
    background-color: green;
    width: 40%;
    height: 20%;
    overflow: hidden;
    justify-self: center;
    border-radius: 0px 0px 40% 40%;
}
.house{
    border-style: solid;
    border-width: 2px 2px 0px 2px;
    position: absolute;
    width: 40%;
    height: 50%;
    left: 30%;
    top: -70%;
    box-shadow: 0 0 2px 2px black;
}
.info{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: whitesmoke;
    width: 50%;
    height: 50%;
    justify-self: center;
    border-radius: 20px;
    border-style: solid;
    border-width: 8px;
    border-color: darkgray;
    overflow-y: scroll;
    scrollbar-width: none;
    
    
}



::-webkit-scrollbar {
    display: none;
}


#main{
    
    width: 100%;
    height: 100%;
}
.calendar{
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 10px;
    width: 100vw;
    
    
}
.day{
    width: 150px;
    height: 150px;
    margin: 5px;
    background-color:cadetblue;
    border-style: solid;
    border-width: 5px;
    border-radius: 20px;
    transition-duration: 0.3s;
    font-size: 30px;
    font-weight: bold;
}
.day:hover{
    background-color: aquamarine;
    flex-grow: 0.1;
    
}
#titel{
    
}
.weather{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: repeat(2,1fr);
    
}
.weather div{
    text-align: center;
}

.sun{
    font-size: 50px;
}
.moon{
    font-size: 50px;
    display: flex;
    justify-content: end;
}
.temperature{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: -5px;
}
.clouds{
    position: absolute;
    background-color:azure;
    opacity: 0.8;
    border-radius: 50%;
    width: 20%;
    height: 10%;
    z-index: 1;
    transition: 4000ms ease-in-out;
    box-shadow: 0 0 30px 5px black;
}
</style>