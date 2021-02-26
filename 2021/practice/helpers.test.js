const {getAllCombinations,createDelivery,createAllDeliveries, createChoseDeliveries} = require('./helpers')


test('test combinations', () => {
        expect(getAllCombinations([0,1,2,3,4],4)).toEqual([[0,1,2,3],[1,2,3,4],[2,3,4,0],[3,4,0,1],[4,0,1,2]])
})


test('test delivery creation', () => {
    const pizzas = [{
            tags: ['ON', 'PP', 'OL']
        },
        {
            tags: ['MS', 'TM', 'BAS']
        },
        {
            tags: ['TM', 'MSH', 'BAS']
        },
    ]
    expect(createDelivery(pizzas,[0,1,2])[0]).toBe(7)
})

test('test all delivery creation', () => {
    const pizzas = [{
            tags: ['ON', 'PP', 'OL']
        },
        {
            tags: ['MS', 'TM', 'BAS']
        },
        {
            tags: ['TM', 'MSH', 'BAS']
        },
    ]
    expect(createAllDeliveries(pizzas)).toEqual([[7, [0, 1, 2]], [7, [1, 2, 0]], [7, [2, 0, 1]], [7, [0, 1, 2, 0]], [7, [1, 2, 0, 1]], [7, [2, 0, 1, 2]], [6, [0, 1]], [6, [2, 0]], [4, [1, 2]]])
})

test('test chosen delivery creation', () => {
    const pizzas = [{
            tags: ['ON', 'PP', 'OL']
        },
        {
            tags: ['MS', 'TM', 'BAS']
        },
        {
            tags: ['TM', 'MSH', 'BAS']
        },
    ]
    console.log(createChoseDeliveries(pizzas));
    expect(createChoseDeliveries(pizzas)).toEqual([{team:3,pizzas:[0,1,2]}])
})

