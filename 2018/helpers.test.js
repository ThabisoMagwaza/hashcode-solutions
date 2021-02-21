const {calcDistance, scanOne,scanAll, canTakeRide,findVehiclesAll } = require('./helper')

test('test calc dist', () => {
    const trip = {
        start: [0,0],
        end: [0,3]
    }

    expect(calcDistance(trip)).toBe(3)
})

test('test calc dist', () => {
    const trip = {
        start: [0,0],
        end: [1,3]
    }

    expect(calcDistance(trip)).toBe(4)
})

test('test calc dist', () => {
    const trip = {
        start: [1,0],
        end: [0,3]
    }

    expect(calcDistance(trip)).toBe(4)
})

test('test scanOne 1', () => {
    const trip = {
        start: [0,0],
        end: [0,2],
        earliestStart: 0,
        lastestFinish: 5
    }
    const vehicle = {
        tick: 3
    }

    expect(scanOne(vehicle,[trip],2)).toEqual([null])
})

test('test scanOne 2', () => {
    const trip = {
        start: [0,0],
        end: [0,2],
        earliestStart: 0,
        lastestFinish: 5
    }
    const vehicle = {
        tick: 0
    }

    expect(scanOne(vehicle,[trip],2)).toEqual([[4,3]])
})

test('test scanOne 3', () => {
    const trip = {
        start: [0,0],
        end: [0,2],
        earliestStart: 0,
        lastestFinish: 5
    }
    const vehicle = {
        tick: 2
    }

    expect(scanOne(vehicle,[trip],2)).toEqual([[2,3]])
})

test('test scanOne 3', () => {
    const trip1 = {
        start: [0,0],
        end: [0,2],
        earliestStart: 0,
        lastestFinish: 5
    }
    const trip2 = {
        start: [1,2],
        end: [1,0],
        earliestStart: 3,
        lastestFinish: 7
    }
    const vehicle = {
        tick: 2
    }

    expect(scanOne(vehicle,[trip1,trip2],2)).toEqual([[2,3],[4,6]])
})

// test('test scanAll 3', () => {
//     const trip1 = {
//         start: [0,0],
//         end: [0,2],
//         earliestStart: 0,
//         lastestFinish: 5
//     }
//     const trip2 = {
//         start: [1,2],
//         end: [1,0],
//         earliestStart: 3,
//         lastestFinish: 7
//     }
//     const vehicle1 = {
//         tick: 2
//     }
//     const vehicle2 = {
//         tick: 0
//     }

//     expect(scanAll([vehicle1,vehicle2],[trip1,trip2],2)).toEqual({
//         0: [[2,3],[4,6]],
//         1: [[4,3],[4,6]]
//     })
// })

test('test take ride 1', () => {
    const ride = {
        start: [0,0],
        end: [1,3],
        earliestStart: 0,
        lastestFinish: 9,
        lastestStart: 5
    }
    const vehicle = {
        tick: 0,
        position: [0,0]
    }
    expect(canTakeRide(vehicle, ride)).toEqual([true,true])
})

test('test take ride 2', () => {
    const ride = {
        start: [3,1],
        end: [2,4],
        earliestStart: 0,
        lastestFinish: 9,
        lastestStart: 5
    }
    const vehicle = {
        tick: 0,
        position: [0,0]
    }
    expect(canTakeRide(vehicle, ride)).toEqual([true,false])
})

test('test take ride 3', () => {
    const ride = {
        start: [3,1],
        end: [2,4],
        earliestStart: 0,
        lastestFinish: 5,
        lastestStart: 1
    }
    const vehicle = {
        tick: 0,
        position: [0,0]
    }
    expect(canTakeRide(vehicle, ride)).toEqual([false,false])
})

test('test find vehicles 1', () => {
    const ride = {
        start: [3,1],
        end: [2,4],
        earliestStart: 0,
        lastestFinish: 5,
        lastestStart: 1
    }
    const vehicle1 = {
        tick: 0,
        position: [0,0]
    }
    const vehicle2 = {
        tick: 0,
        position: [0,0]
    }

    const vehicle3 = {
        tick: 0,
        position: [0,0]
    }
    expect(findVehiclesAll(ride,[vehicle1,vehicle2,vehicle3])).toBe(-1)
})

test('test find vehicles 2', () => {
    const ride = {
        start: [3,1],
        end: [2,4],
        earliestStart: 0,
        lastestFinish: 8,
        lastestStart: 4
    }
    const vehicle1 = {
        tick: 0,
        position: [0,0]
    }
    const vehicle2 = {
        tick: 0,
        position: [0,0]
    }

    const vehicle3 = {
        tick: 0,
        position: [0,0]
    }
    expect(findVehiclesAll(ride,[vehicle1,vehicle2,vehicle3])).toBe(0)
})