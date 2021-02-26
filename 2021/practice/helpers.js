function getAllCombinations(arr,size){
    const combinations = []
    let ptr = 0;
    let j = 0;
    while(j !== arr.length){
        const comb = []
        let i = ptr
        while(comb.length !== size ){
            comb.push(i)
            i = (i+1) % arr.length
        }
        combinations.push(comb)
        ptr = (ptr + 1) % arr.length
        j++
    }
    
    return combinations
}


function createDelivery(pizzas,ids){
    const tagsSet = new Set()
    ids.forEach(id => {
        pizzas[id].tags.forEach(tag => tagsSet.add(tag))
    })
    return [tagsSet.size, ids]
}

function createAllDeliveries(pizzas){
    const deliveries = []
    const sizes = [2,3,4]
    sizes.forEach(groupSize => {
        const combinations = getAllCombinations(pizzas,groupSize)
        combinations.forEach(comb => {
            deliveries.push(createDelivery(pizzas,comb))
        })
    })
    const sortedDel = deliveries.sort((a,b) => a !== b ? b[0] - a[0] : a[1].length - b[1].length)
    return sortedDel
}

function createChoseDeliveries(pizzas,groups){
    const deliveries = []
    const allDeliveries = createAllDeliveries(pizzas);
    let deliveredSet = new Set()
    allDeliveries.forEach(del => {
        if(groups[del[1].length] === 0) return

        const pizzaSet = new Set(del[1])
        if(intersection(deliveredSet,pizzaSet).size > 0) return
        deliveredSet =  union(deliveredSet,pizzaSet)
        deliveries.push(del)

        groups[del[1].length] -= 1
        console.log(groups);
    })
    return deliveries.map(del =>{ 
        return{
            team: del[1].length,
            pizzas: del[1]
        }
    })
}

function intersection (set1, set2) {
    const intersectionSet = new Set();
    set1.forEach(value => {
        if (set2.has(value)) {
            intersectionSet.add(value);
        }
    });
    return intersectionSet;
};

const union = (set1, set2) => {
    const unionAb = new Set();
    set1.forEach(value => unionAb.add(value));
    set2.forEach(value => unionAb.add(value));
    return unionAb;
};

module.exports.getAllCombinations = getAllCombinations
module.exports.createDelivery = createDelivery
module.exports.createAllDeliveries = createAllDeliveries
module.exports.createChoseDeliveries = createChoseDeliveries