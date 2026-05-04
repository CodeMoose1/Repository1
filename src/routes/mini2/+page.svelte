<script>

const CELLS_X = 100
const CELLS_Y = 100
const WALL_WIDTH = 1
const PAC_MOVE_TIME = 333

let pac_x = $state(0)
let pac_y = $state(0)
let pac_dx = 0
let pac_dy = 0
let pac_tx = 0
let pac_ty = 0
let cells = $state({})

function get_cell(x, y){
    return x + y*CELLS_X}
function get_pos(cell){
    return [cell%CELLS_X, Math.floor(cell/CELLS_X)]}

function cell_legal(x, y){
    if (x < 0 || x >= CELLS_X)
        return false
    if (y < 0 || y >= CELLS_Y)
        return false
    let cell = get_cell(x, y)
    if (Object.hasOwn(cells, cell))
        return false
    return true
}

function move_legal(x, y, dir_x, dir_y){
    if (x + dir_x < 0 || x + dir_x >= CELLS_X)
        return false
    if (y + dir_y < 0 || y + dir_y >= CELLS_Y)
        return false
    
    let cell = get_cell(x, y)
    let type = cells[cell]
    
    if (dir_y < 0 && ((type & 1) !== 1))
        return false
    if (dir_y > 0 && ((type & 4) !== 4))
        return false
    if (dir_x < 0 && ((type & 8) !== 8))
        return false
    if (dir_x > 0 && ((type & 2) !== 2))
        return false

    return true
}

function generate(){
    const WALL_ODDS = 0.1
    for (let y=0; y<CELLS_Y; y++){
        for (let x=0; x<CELLS_X-1; x++){
            cells[get_cell(x + 1, y)] = 15
            if (Math.random() <= WALL_ODDS){
                cells[get_cell(x, y)] -= 2
                cells[get_cell(x + 1, y)] -= 8
            }
        }
        cells[get_cell(0, y)] -= 8
        cells[get_cell(CELLS_X-1, y)] -= 2
    }
    for (let x=0; x<CELLS_X; x++){
        for (let y=0; y<CELLS_Y-1; y++){
            if (Math.random() <= WALL_ODDS){
                cells[get_cell(x, y)] -= 4
                cells[get_cell(x, y + 1)] -= 1
            }
        }
        cells[get_cell(x, 0)] -= 1
        cells[get_cell(x, CELLS_Y-1)] -= 4
    }
}

function generate_backtrack(){
    let carver_x = Math.floor(Math.random()*CELLS_X)
    let carver_y = Math.floor(Math.random()*CELLS_Y)
    let start_cell = get_cell(carver_x, carver_y)
    cells = {}
    cells[start_cell] = 0

    let return_cells = []
    while (true){
        let available_cells = []
        for (let x of [carver_x - 1, carver_x + 1]){
            if (cell_legal(x, carver_y))
                available_cells.push(get_cell(x, carver_y))
        }
        for (let y of [carver_y - 1, carver_y + 1]){
            if (cell_legal(carver_x, y))
                available_cells.push(get_cell(carver_x, y))
        }
        if (available_cells.length === 0){
            if (return_cells.length === 0)
                return
            let new_pos = get_pos(return_cells.pop())
            carver_x = new_pos[0]
            carver_y = new_pos[1]
        }
        else{
            if (available_cells.length >= 2)
                return_cells.push(get_cell(carver_x, carver_y))
            let new_pos = get_pos(available_cells[Math.floor(Math.random()*available_cells.length)])
            let current_cell = get_cell(carver_x, carver_y)

            if (new_pos[0] > carver_x){
                cells[current_cell] += 2
                cells[get_cell(carver_x+1, carver_y)] = 8
            }else if (new_pos[0] < carver_x){
                cells[current_cell] += 8
                cells[get_cell(carver_x-1, carver_y)] = 2
            }else if (new_pos[1] > carver_y){
                cells[current_cell] += 4
                cells[get_cell(carver_x, carver_y+1)] = 1
            }else if (new_pos[1] < carver_y){
                cells[current_cell] += 1
                cells[get_cell(carver_x, carver_y-1)] = 4
            }
            
            carver_x = new_pos[0]
            carver_y = new_pos[1]

            
        }
        

    }

}

generate_backtrack()

function set_pac_dir(){
    if (move_legal(pac_x, pac_y, pac_tx, pac_ty)){
        pac_dx = pac_tx
        pac_dy = pac_ty
    }
    else if (!move_legal(pac_x, pac_y, pac_dx, pac_dy)){
        pac_dx = 0
        pac_dy = 0
    }
}

function pac_move(){
    pac_x += pac_dx
    pac_y += pac_dy
}

function keydown(event){
    if (event.repeat) 
        return

    switch (event.keyCode){
        case 38: // up
            pac_ty = -1
            pac_tx = 0
            break
        case 40: // down 
            pac_ty = 1
            pac_tx = 0
            break
        case 39: // right
            pac_tx = 1
            pac_ty = 0
            break
        case 37: // left
            pac_tx = -1
            pac_ty = 0
            break

    }
}

setInterval(()=>{
    set_pac_dir()
    pac_move()
}, PAC_MOVE_TIME)


</script>

<svelte:window on:keydown|preventDefault={keydown}/>

<h1>Pac the man</h1>
<main>
    <div class="pacman" style="transition: all {PAC_MOVE_TIME}ms linear; position: absolute; left:{100/CELLS_X * pac_x}%; top:{100/CELLS_Y * pac_y}%; width:{100/CELLS_X *0.8}%; height:{100/CELLS_Y*0.8}%">

    </div>
    {#each Object.entries(cells) as [pos, type]}
        <div style="position: absolute; width: {100/CELLS_X}%; height:{100/CELLS_Y}%; left: {(100/CELLS_X)*(pos%CELLS_X)}%; top: {(100/CELLS_Y)*Math.floor(pos/CELLS_X)}%; box-sizing:border-box;border-style:solid; border-width: {(type&1)!==1?WALL_WIDTH:0}px {(type&2)!==2?WALL_WIDTH:0}px {(type&4)!==4?WALL_WIDTH:0}px {(type&8)!==8?WALL_WIDTH:0}px"></div>
    {/each}

</main>

<style>

h1{
    text-align: center;
}
main{
    position: relative;
    height: 70vh;
    width: 70vh;
    background-color: darkgray;
    justify-self: center;
    outline-style: solid;
    outline-width: 7px;
    
    
}
.pacman{
    background-color: yellow;
    border-radius: 50%;
}
</style>