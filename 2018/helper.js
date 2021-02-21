function scanAll(vehicles,trips,bonus){
    return vehicles.reduce((acc,vehicle,id) => acc.id = scanOne(vehicle,trips,bonus), {});
}

function scanOne(vehicle, trips, bonus){
    const out = trips.map(trip => {
        const d = calcDistance(trip)
        const ls = trip.lastestFinish - d - 1
        if(vehicle.tick > ls) return null
        
        return vehicle.tick > trip.earliestStart ? [d,trip.earliestStart + d + 1 ] : [d + bonus, trip.earliestStart + d + 1 ]

    })

    return out;
}

function calcDistance(trip){
    return Math.abs(trip.start[0] - trip.end[0]) + Math.abs(trip.start[1] - trip.end[1]);
}


function findVehiclesAll(ride, vehicles){
    let v = vehicles.reduce((acc,vehicle,id) => {acc[id] = canTakeRide(vehicle,ride); return acc}, {})
    v.sort((a,b) => a[0] !== b[0] ? b[0] - a[0] : b[0] - a[0])
    return v[0].id ? v[0].id : -1;
}

function canTakeRide(vehicle,ride){
    const vehicleArrival = vehicle.tick + calcDistance2(vehicle.position,ride.start);
    if( vehicleArrival > ride.lastestStart ) return [false, false]

    return vehicleArrival <= ride.earliestStart ? [true,true] : [true,false]
}

function calcDistance2(p1,p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1])
}



module.exports.calcDistance = calcDistance
module.exports.scanOne = scanOne
module.exports.scanAll = scanAll
module.exports.findVehiclesAll = findVehiclesAll
module.exports.canTakeRide = canTakeRide