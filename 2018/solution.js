const fs = require('fs')

const lines = fs.readFileSync(`${__dirname}/input/example2.in`).toString().split('\n')

const [numRows, numColumns, numVehicles, numRides, numBonus, TOTAL_STEPS] = lines[0].split(' ').map(val => parseInt(val))

// intialize rides
let rides = []
for(let i = 1; i <= numRides; i++ ){
    const info = lines[i].split(' ').map(val => parseInt(val))
    rides.push({
        start: [info[0],info[1]],
        end: [info[2],info[3]],
        earliestStart: info[4],
        lastestFinish: info[5]
    })
    const ride = rides[rides.length -1];
    ride.distance = Math.abs(ride.start[0] - ride.end[0]) +  Math.abs(ride.start[1] - ride.end[1])
    ride.lastestStart = ride.lastestFinish - ride.distance;
}

rides = rides.sort((a,b) => a.distance !== b.distance ? b.distance - a.distance : a.lastestStart - b.lastestStart)

// initialize cars
const vehicles = []
for(let i = 0; i < numVehicles; i++){
    vehicles.push({
        id: i,
        rides: [],
        position: [0,0],
        ticks: 0
    })
}

// Allocate rides 
// vehicles[0].rides = [0]
// vehicles[1].rides = [2,1]

// simulation
let step = 0;
while(step < TOTAL_STEPS){
    step++;
}


// print output
let outStr = `${vehicles[0].rides.length} ${vehicles[0].rides.toString().replace(',',' ')}`;
for(let i = 1 ; i < vehicles.length; i++){
    outStr = `${outStr}\n${vehicles[i].rides.length} ${vehicles[i].rides.toString().replace(',',' ')}`
}

console.log(outStr);