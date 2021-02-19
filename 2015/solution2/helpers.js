function getPutIndex(row,size){
    for(let cell = 0;cell<row.length;cell++){
        if(cell + size > row.length) return -1
        if(!row[cell]) {
            if(cell === row.length - 1) return -1;
            continue; 
        };
        
        let counter = 0;
        while(counter < size){
            if(!row[cell + counter]) break;
            counter++;
        }

        if(counter !== size) continue;

        return cell;
    }
}

function putServer(row,server,rowNum = 0,poolAcc = null){
    const index = getPutIndex(row,server.size);
    if(index < 0) return false;

    let counter = 0;
    while(counter < server.size){
        row[index + counter] = false
        counter++
    }

    server.position = [rowNum,index]

    // keep this accumulator sorted
    if(poolAcc){
        const capacityAcc = poolAcc[server.pool];
        const acc = capacityAcc.find(val => val.row === rowNum);
        acc.capacity += server.capacity
        capacityAcc.sort((a,b) => b.capacity - a.capacity)
    }

    return true;
}

function getSmallestRowIndex(poolAcc,pool,server){
    const capacityAcc = poolAcc[pool];

    if(capacityAcc[0] === 0) return capacityAcc[0].row;

    let counter = 1;
    while(counter !== 0){
        if(capacityAcc[counter].capacity + server.capacity <= capacityAcc[0].capacity) return capacityAcc[counter].row;
        counter = (counter + 1) % capacityAcc.length;
    }
    return capacityAcc[0].row;
}

module.exports.getPutIndex = getPutIndex;
module.exports.putServer = putServer;
module.exports.getSmallestRowIndex = getSmallestRowIndex;