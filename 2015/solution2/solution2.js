const fs = require('fs')

const {putServer,getSmallestRowIndex} = require('./helpers')

const endl = "\n"
const lines = fs.readFileSync(`${__dirname}/../dc.in`).toString().split(endl)

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

// Initialize pool row acc
const poolAcc = {}
for(let i = 0; i < numPools; i++){
    poolAcc[i] = new Array(numRows).fill(0)
    poolAcc[i] = poolAcc[i].map((val,index) => ({row:index,capacity:0}))
}

// allocate servers

function putServerRecursive(farm,rowPtr,server){
    if(rowPtr > farm.length - 1) return false
    const row = farm[rowPtr];
    if(!putServer(row,server,rowPtr,poolAcc)) {
        putServerRecursive(farm,rowPtr + 1, server)
    }
    return true;
}

servers.forEach(server => {
    putServerRecursive(farm,getSmallestRowIndex(poolAcc,server.pool,server),server)
})

// print output
let outStr = servers[0].position ?`${servers[0].position[0]} ${servers[0].position[1]} ${servers[0].pool}` : 'x'
for(let i = 1 ; i < servers.length; i++) {
    outStr =  `${outStr}\n${servers[i].position ?`${servers[i].position[0]} ${servers[i].position[1]} ${servers[i].pool}` : 'x'}`
}

fs.writeFileSync(`${__dirname}/../dc2.out`,outStr)

console.log('done');
