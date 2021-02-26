const { log } = require('console')
const fs = require('fs')
const { serialize } = require('v8')
const {createChoseDeliveries} = require('./helpers')
const Queue = require('./queue')

const lines = fs.readFileSync(`${__dirname}/input/f.txt`).toString().split('\n')

const [T, numIntersections, numStreets, numCars, POINTS] = lines[0].split(' ').map(val => parseInt(val))



const streets = []
for(let i = 1; i <= numStreets; i++){
    const info = lines[i].split(' ')
    const str = {
        name: info[2],
        start: parseInt(info[0]),
        end: parseInt(info[1]),
        L: parseInt(info[3])
    }
    streets.push(str)
}


const cars = []
for(let i = numStreets + 1; i <= numStreets + 1 + numCars; i++){
    const info = lines[i].split(' ')
    cars.push({
        id: i - (numStreets + 1),
        path: info.slice(1),
        isMoving: false
    })
}

const intersections = {}
for(let i = 0; i < numIntersections; i++){
    intersections[i] = {isPrinted: false,greens: null}
}

// console.log(streets,cars);

cars.forEach(car => {
    car.path.forEach(str => {
        const street = streets.find(s => s.name === str)
        
        if(!intersections[street.end].greens) intersections[street.end].greens = {}

        if(intersections[street.end].greens[street.name]){
            intersections[street.end].greens[street.name]++
        }else{
            intersections[street.end].greens[street.name] = 1
        }
    })
})



Object.keys(intersections).forEach(inters => {
    if(intersections[inters].greens) intersections[inters].greens = Object.entries(intersections[inters].greens)
})
    

// console.log(intersections);

const schedule = []

streets.forEach(street => {
    if(intersections[street.end].greens){
        if(intersections[street.end].isPrinted) return
        
        schedule.push({
            intersection: street.end,
            greens:  intersections[street.end].greens
        })
        intersections[street.end].isPrinted = true
    }

})

// console.log(schedule)

let str = `${schedule.length}`
schedule.forEach(sh => {
    str = `${str}\n${sh.intersection}`
    str = `${str}\n${sh.greens.length}`
    sh.greens.forEach(g => {
        str += `\n${g[0]} ${g[1]}`
    })
    
})

// console.log(str)

fs.writeFileSync(`${__dirname}/out/f_out.txt`, str)