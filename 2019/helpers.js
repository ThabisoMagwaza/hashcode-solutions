function maxEntropySlides(photos){
    const combinations = intersectionSlides(photos)
    const slides = []
    combinations.forEach(comb => {
        if(photos[comb.combination[0]].isTaken || photos[comb.combination[1]].isTaken) return


        const tagsSet = new Set([...photos[0].tags, ...photos[1].tags])

        slides.push({
            photos: comb.combination,
            tags: [...tagsSet],
            isPlaced: false
        })
        photos[comb.combination[0]].isTaken = true
        photos[comb.combination[1]].isTaken = true
    })
    return slides
}

function intersectionSlides(photos){
    const combinations = getAllCombinations(photos);
    let int = combinations.reduce((acc,comb) => {
        acc.push({
            combination: comb,
            intersections: getIntersectionOne(photos[comb[0]], photos[comb[1]]),
        })

        return acc
    },[])

    return int.sort((a,b) => a.intersections - b.intersections)
}

function getIntersectionOne(p1,p2){
    const set1 = new Set(p1.tags)
    const set2 = new Set(p2.tags)
    const int = intersection(set1,set2)
    return int.size
}

function getAllCombinations(slides){
    const combinations = []

    for(let i = 0; i < slides.length; i++){
        for(let j = i+1;j < slides.length; j++){
            if(!slides[j]) break;
            combinations.push([i,j])
        }
    }

    return combinations
}

function calcInterestFactor(s1,s2) {
    const set1 = new Set(s1.tags)
    const set2 = new Set(s2.tags)
    const s1Ds2 = difference(set1,set2)
    const s2Ds1 = difference(set2,set1)
    const int = intersection(set1,set2)

    return Math.min(s1Ds2.size,s2Ds1.size,int.size)
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

function difference(set1, set2) {
    const differenceSet = new Set();
    set1.forEach(value => {
        if (!set2.has(value)) { // {1}
            differenceSet.add(value);
        }
    });
    return differenceSet;
};




module.exports.getAllCombinations = getAllCombinations
module.exports.getIntersectionOne = getIntersectionOne
module.exports.intersectionSlides = intersectionSlides
module.exports.maxEntropySlides = maxEntropySlides
module.exports.calcInterestFactor = calcInterestFactor