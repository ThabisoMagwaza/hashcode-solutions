const fs = require('fs')

const lineSeparator = '\r\n'
const lines = fs.readFileSync(`${__dirname}/input/sample.in`).toString().split(lineSeparator)

const [numVideos, numEndpoints, totalRequests, numCaches, MAX_CACHE_SIZE] = lines[0].split(' ').map(val => parseInt(val))

// Initialize videos
const videos = lines[1].split(' ').map(val => parseInt(val))

// Initialize endpoints
const endpoints = []
let i = 2;
let counter = 0;
while(counter < numEndpoints){
    const endpoint = {}
    const [ld,numCachesConnected] = lines[i].split(' ').map(val => parseInt(val))
     
    endpoint.ld = ld;
    endpoint.caches = [];
    for(let j = i+1 ; j< i+1 + numCachesConnected; j++){
        const [id,lc] = lines[j].split(' ').map(val => parseInt(val))
        endpoint.caches.push({
            id,
            lc          
        })
    }

    endpoints.push(endpoint)
    i += numCachesConnected + 1
    counter++;
} 

// Initialize requests
const requests = []

for(let j = i; j < lines.length; j++ ){
    const [video,endpoint,numRequests] = lines[j].split(' ').map(val => parseInt(val))
    requests.push({
        video,
        endpoint,
        numRequests
    })
}

// Initialize caches
const caches = [];
for(let c = 0; c < numCaches; c++){
    caches.push({
        videos: [],
        useSpace: 0
    })
}

// populate caches 
const numUsedCaches = 3;
caches[0].videos = [2]
caches[1].videos = [3,1]
caches[2].videos = [0,1]

// make output
let outStr = `${numUsedCaches}`
caches.forEach((cache,id) => {
    const vidsStr = cache.videos.length > 0 ? cache.videos.toString().replace(',', ' ') : ''
    if(vidsStr) outStr = `${outStr}\n${id} ${vidsStr}` 
})

