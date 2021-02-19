const {getPutIndex,putServer,getSmallestRowIndex} = require('./helpers')


test('getIndex 1', ()  => {
	expect(getPutIndex([true,true,true],3)).toBe(0)
});

test('getIndex 2', ()  => {
	expect(getPutIndex([false,true,true],2)).toBe(1)
});

test('getIndex 3', ()  => {
	expect(getPutIndex([false,false,false],2)).toBe(-1)
});

test('getIndex 4', ()  => {
	expect(getPutIndex([true,false,false],3)).toBe(-1)
});

test('getIndex 5', ()  => {
	expect(getPutIndex([false,false,true],3)).toBe(-1)
});

test('putServer 1', ()  => {
    const row = [true,true,true]
    putServer(row,{size:3})
	expect(row).toEqual([false,false,false])
});

test('putServer 2', ()  => {
    const row = [false,true,true]
    putServer(row,{size:2})
	expect(row).toEqual([false,false,false])
});

test('putServer 3', ()  => {
	expect(putServer([false,false,false],{size:2})).toBe(false)
});

test('putServer 4', ()  => {
	expect(putServer([true,false,false],{size:3})).toBe(false)
});

test('putServer 5', ()  => {
	expect(putServer([false,false,true],{size:3})).toBe(false)
});

test('smallest get smallest index 1', () => {
	const poolAcc = {
		0: [{
			row: 0,
			capacity: 10
		},{
			row: 1,
			capacity: 0
		},{
			row: 2,
			capacity: 0
		},{
			row: 3,
			capacity: 0
		},],
	}

	const server = {
		capacity: 10
	}

	expect(getSmallestRowIndex(poolAcc,0,server)).toBe(1)
})

test('smallest get smallest index 2', () => {
	const poolAcc = {
		0: [{
			row: 0,
			capacity: 10
		},{
			row: 1,
			capacity: 8
		},{
			row: 2,
			capacity: 5
		},{
			row: 3,
			capacity: 2
		},],
	}

	const server = {
		capacity: 7
	}

	expect(getSmallestRowIndex(poolAcc,0,server)).toBe(3)
})

test('smallest get smallest index 3', () => {
	const poolAcc = {
		0: [{
			row: 0,
			capacity: 10
		},{
			row: 1,
			capacity: 8
		},{
			row: 2,
			capacity: 5
		},{
			row: 3,
			capacity: 2
		},],
	}

	const server = {
		capacity: 10
	}

	expect(getSmallestRowIndex(poolAcc,0,server)).toBe(0)
})


test('smallest get smallest index 4', () => {
	const poolAcc = {
		0: [{
			row: 0,
			capacity: 0
		},{
			row: 1,
			capacity: 0
		},{
			row: 2,
			capacity: 0
		},{
			row: 3,
			capacity: 0
		},],
	}

	const server = {
		capacity: 10
	}

	expect(getSmallestRowIndex(poolAcc,0,server)).toBe(0)
})