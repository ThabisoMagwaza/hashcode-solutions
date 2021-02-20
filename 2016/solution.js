const { doesNotMatch } = require('assert');
const fs = require('fs')

const lines = fs.readFileSync(`${__dirname}/input/sample.in`).toString().split('\r\n');

const [numRows,numColumns,numDrones,TOTAL_TURNS,MAX_PAYLOAD] = lines[0].split(' ').map(val => parseInt(val))

// Initialize drones
const drones = []
for(let i = 0; i < numDrones; i++){
    drones.push({
        id: i,
        payload: 0,
        products: new Array(parseInt(lines[1])).fill(0),
        instructions: []
    })
}


// Initialize grid
const grid = new Array(numRows).fill([]).map(r => new Array(numColumns).fill(null))

// initialize products
const products = lines[2].split(' ').map(val => parseInt(val))

// initialize warehouses
const numWarehouses = parseInt(lines[3])
const warehouses = []

for(let i = 4; i < (4 + numWarehouses * 2); i += 2 ){
    warehouses.push({
        position: lines[i].split(' ').map(val => parseInt(val)),
        PRODUCT_STORAGE: lines[i+1].split(' ').map(val => parseInt(val))
    })
}

// initialize orders
const numOders = parseInt(lines[4 +(numWarehouses * 2)])
const orders = []
// const orderStates = {
//     0: NOT_DISCOVERED,
//     1: DISCOVERED,
//     2: FULFILLED
// }

for(let i = 5 +(numWarehouses * 2); i < lines.length ; i+=3){
    orders.push({
        position: lines[i].split(' ').map(val => parseInt(val)) ,
        items: lines[i+2].split(' ').map(val => parseInt(val))
    })
}

// Calculate instructions
drones[0].instructions = ["0 L 0 0 1", "0 L 0 1 1"]
drones[0].instructions = ["1 D 2 2 1", "1 L 1 2 1"]

// create output
const numInstructions = drones.reduce((acc,curr) =>acc+=curr.instructions.length,0)

let outStr = `${numInstructions}`
drones.forEach(drone => {
    drone.instructions.forEach(instr => {
        outStr = `${outStr}\n${instr}`
    })
})

console.log(outStr);




