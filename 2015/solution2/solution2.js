const fs = require('fs')

const endl = "\r\n"
const lines = fs.readFileSync(`${__dirname}/../sample.in`).toString().split(endl)

const [numRows,numSlotsPerRow,numUnavailableSlots,numPools,numServers] = lines[0].split(' ').map(val => parseInt(val))

// create farm
const farm = new Array(numRows).fill([]).map(row => new Array(numSlotsPerRow).fill(true))

// initialize farm
const unavailableSlots = [];
for(let i = 1; i <= numUnavailableSlots; i++ ){
    unavailableSlots.push([...lines[i].split(' ')].map(el => parseInt(el)))
}

unavailableSlots.forEach(slot => {
    farm[slot[0]][slot[1]] = false;
})

// initialize servers
let servers = []
for(let i = numUnavailableSlots + 1; i < lines.length; i++ ){
    const [size,capacity] = lines[i].split(' ').map( val => parseInt(val))
    servers.push({
        id: i - (numUnavailableSlots + 1),
        size,
        capacity,
        position: null
    })
}

// ASSIGN POOLS

servers = servers.sort((a,b) => b.capacity - a.capacity)

servers.forEach((server,index) => {
    server.pool = index % numPools;
})

// allocate servers

servers[0].position = [0,1]
servers[1].position = [1,0]
servers[2].position = [0,4]

// print output
let outStr = servers[0].position ?`${servers[0].position[0]} ${servers[0].position[1]} ${servers[0].pool}` : 'x'
for(let i = 1 ; i < servers.length; i++) {
    outStr =  `${outStr}\n${servers[i].position ?`${servers[i].position[0]} ${servers[i].position[1]} ${servers[0].pool}` : 'x'}`
}

console.log(outStr);

