const fs = require('fs')
const {maxEntropySlides,calcInterestFactor} = require('./helpers')

const lines = fs.readFileSync(`${__dirname}/input/a_example.txt`).toString().split('\n')

const NUM_PHOTOS = parseInt(lines[0])

// initialize photos
const photos = [];
for(let i = 1; i <= NUM_PHOTOS; i++ ){
    const info = lines[i].split(' ')
    const numTags = parseInt(info[1])
    const tags = []
    for(let j = 2 ; j < 2 + numTags ; j++){
        tags.push(info[j])
    }
    photos.push({
        id: i - 1,
        orientation: info[0],
        tags
    })
}

// create slides
const sortedPhotos = photos.sort((a,b) => a.orientation.charCodeAt(0) - b.orientation.charCodeAt(0))

let unsortedSlides = [];
const verticalPhotots = [];
let ptr = 0;
while(ptr < sortedPhotos.length){
    if(sortedPhotos[ptr].orientation === 'H'){
        unsortedSlides.push({
            photos: [sortedPhotos[ptr].id],
            tags: sortedPhotos[ptr].tags,
            isPlaced: false
        })
        ptr++
    }else{
        verticalPhotots.push({
            photo: sortedPhotos[ptr].id,
            tags: sortedPhotos[ptr].tags,
            isTaken: false
        })
        ptr++
    }
}

// create slide from vertical photos
const verticalSlides = maxEntropySlides(verticalPhotots)

unsortedSlides = unsortedSlides.concat(verticalSlides)

// max tag
const maxTag = unsortedSlides.reduce((acc,slide,index) => slide.tags.length > unsortedSlides[acc].tags.length ? index : acc ,0)


// const sortedSlides  = []
// sortedSlides.push(unsortedSlides[maxTag])
// unsortedSlides[maxTag].isPlaced = true;
// for(let i = 1; i < unsortedSlides.length;i++){
//     if(unsortedSlides[i].isPlaced) continue;
//     const IntF = unsortedSlides.reduce((acc,slide,index) => {
//         acc[]
//         return acc
//     } ,{})
// }

// code goes here

const slides = unsortedSlides

// print slides
let outStr = `${slides.length}`
for(let i = 0; i<slides.length; i++) {
    outStr = `${outStr}\n${slides[i].photos.toString().replace(',',' ')}`
}

console.log(outStr);
