const fs = require('fs')
const {createChoseDeliveries} = require('./helpers')

const lines = fs.readFileSync(`${__dirname}/input/a_example`).toString().split('\n')

const [NUM_PIZZAS, num2Pteam, num3Pteam, num4Pteam] = lines[0].split(' ').map(val => parseInt(val))

// initialize pizzas
const pizzas = []
for(let i = 1 ; i<= NUM_PIZZAS; i++) {
    const info = lines[i].split(' ')
    const numIng = parseInt( info[0] )
    const ingred = []
    for(let j = 0;  j < info.length ; j++){ 
        ingred.push(info[j])
    }

    pizzas.push({
        id: i - 1,
        tags: ingred
    })
}

// make deliveries
const deliveries = createChoseDeliveries(pizzas,{
    2: num2Pteam,
    3: num3Pteam,
    4: num4Pteam
})

// print output 
let outStr = `${deliveries.length}`
for(let i = 0; i < deliveries.length; i++){
    outStr = `${outStr}\n${deliveries[i].team} ${deliveries[i].pizzas.join(' ')}`
}

fs.writeFileSync(`${__dirname}/output/a_output.txt`,outStr)