const {getAllCombinations,getIntersectionOne,intersectionSlides,maxEntropySlides, calcInterestFactor} = require('./helpers')

test('test combinations', () => {
    expect(getAllCombinations([1,2,3])).toEqual([[0,1],[0,2],[1,2]])
})

test('test intersection 1', () => {
    const p1 = {
        tags: ['a','b']
    }
    const p2 = {
        tags: ['a','b']
    }
    expect(getIntersectionOne(p1,p2)).toBe(2)
})

test('test intersection 2', () => {
    const p1 = {
        tags: ['a','b']
    }
    const p2 = {
        tags: ['c','b']
    }
    expect(getIntersectionOne(p1,p2)).toBe(1)
})

test('test intersection 3', () => {
    const p1 = {
        tags: ['a','b']
    }
    const p2 = {
        tags: ['c','d']
    }
    expect(getIntersectionOne(p1,p2)).toBe(0)
})

test('test intersection 3', () => {
    const p1 = {   
        tags: ['a','b']
    }
    const p2 = {
        tags: ['c','d']
    }
    expect(getIntersectionOne(p1,p2)).toBe(0)
})

test('test intersection slides', () => {
    const p1 = {
        tags: ['a','b']
    }
    const p2 = {
        tags: ['c','d']
    }
    const p3 = {
        tags: ['a','d']
    }
    const p4 = {
        tags: ['c','b']
    }
    expect(intersectionSlides([p1,p2,p3,p4])).toEqual([{"combination": [0, 1], "intersections": 0}, {"combination": [2, 3], "intersections": 0}, {"combination": [0, 2], "intersections": 1}, {"combination": [0, 3], "intersections": 1}, {"combination": [1, 2], "intersections": 1}, {"combination": [1, 3], "intersections": 1}])
})

test('test intersection slides', () => {
    const p1 = {
        tags: ['a','b'],
        isTaken: false
    }
    const p2 = {
        tags: ['c','d'],
        isTaken: false
    }
    const p3 = {
        tags: ['a','d'],
        isTaken: false
    }
    const p4 = {
        tags: ['c','b'],
        isTaken: false
    }
    expect(maxEntropySlides([p1,p2,p3,p4])).toEqual( [ {photos: [ 0, 1 ], tags: [ 'a', 'b', 'c', 'd' ] }, { photos: [ 2, 3 ], tags: [ 'a', 'b', 'c', 'd' ] }
    ])
})


test('interst factor', () => {
    const s1 = {photos: [ 0, 1 ], tags: [ 'a', 'b', 'c', 'd' ] }
    const s2 = { photos: [ 2, 3 ], tags: [ 'a', 'b', 'c', 'd' ] }

    expect(calcInterestFactor(s1,s2)).toBe(0)
})

test('interst factor', () => {
    const s1 = {photos: [ 0, 1 ], tags: [ 'a', 'b', 'c', 'd' ] }
    const s2 = { photos: [ 2, 3 ], tags: [ 'e', 'f', 'c', 'd' ] }

    expect(calcInterestFactor(s1,s2)).toBe(2)
})

test('interst factor', () => {
    const s1 = {photos: [ 0, 1 ], tags: [ 'b', 'c', 'd' ] }
    const s2 = { photos: [ 2, 3 ], tags: [ 'e', 'f', 'c', 'd' ] }

    expect(calcInterestFactor(s1,s2)).toBe(1)
})