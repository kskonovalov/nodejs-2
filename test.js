'use strict';

const argv = require('minimist')(process.argv.slice(2));

console.log();

const fs = require('fs');

fs.appendFile(argv.log, "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});