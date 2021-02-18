const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
const readline = require('readline')
/**
 * Stores file contents in a array line by line
 * @param {string} file path to file 
 * @returns {Array} Array containing lines
 */
module.exports.getLines =  file => {
    const lines = fs.readFileSync(file).toString();
    return lines.split('\n')
}