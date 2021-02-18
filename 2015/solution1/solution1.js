const fs = require('fs');
const {getLines} = require('../../utils');

const lines = getLines('sample.in');

const [rows,columns,numUnavailable,numPools] = lines[0].split(' ');

// get unavailable cells
const unvailableCells = [];
for(let i = 1; i <= parseInt(numUnavailable); i++){
	unvailableCells.push(lines[i].split(' '));
}

// get servers
let servers = [];
for(let i = parseInt(numUnavailable) + 1; i < lines.length; i++){
	const server = lines[i].split(' ');
	servers.push({
		id: i-(parseInt(numUnavailable) + 1),
		size: parseInt(server[0]),
		capacity: parseInt(server[1]),
		position: null,
		isPlaced: false
	});
}

// sort
servers = servers.sort((a,b) => b.capacity - a.capacity);

// Assign pools
servers.forEach((server,index) => {
	server.pool = index % parseInt(numPools);
});

// Initialize farm
const farm = new Array(parseInt(rows)).fill([]);
farm.forEach((row,index) => {
	farm[index] = new Array(parseInt(columns)).fill(true);
});

// Set unavailable cells
unvailableCells.forEach( cell => {
	farm[parseInt(cell[0])][parseInt(cell[1])] = false;
});


function findCellToPlaceIn(rowNum,serverSize,farm,changeRow){
	if(rowNum > farm.length - 1) return null;
	const row = farm[rowNum];
	for(let cell = 0; cell < row.length ; cell++){
		if(row[cell] && (cell + serverSize) <= row.length ) return [rowNum,cell,changeRow];
	}
	return findCellToPlaceIn(rowNum+1,serverSize,farm,false);
}

function placeServer(server,row,farm){
	for(let r = row; r < farm.length; r++){
		const posToPlace = findCellToPlaceIn(r,server.size,farm,true);
		if(posToPlace){
			server.position = posToPlace;
			server.isPlaced = true;

			let counter = 0;
			while(counter !== server.size){
				farm[posToPlace[0]][posToPlace[1] + counter] = false;
				counter++;
			}

			return posToPlace[2];
		}
		return false;
	}
}

// place servers
let rowPtr = 0;

for(let i = 0; i < servers.length; i++) {
	const server = servers[i];
	if(placeServer(server,rowPtr,farm)) rowPtr = (rowPtr + 1) % farm.length; 
}


// print output
let output = servers[0].isPlaced ? `${servers[0].position[0]} ${servers[0].position[1]} ${servers[0].pool}` : 'x';
for(let i = 1; i < servers.length; i++){
	output = `${output}\n${servers[i].isPlaced ? `${servers[i].position[0]} ${servers[i].position[1]} ${servers[i].pool}` : 'x'}`;
}

console.log(output);
fs.writeFileSync('sample.out',output);