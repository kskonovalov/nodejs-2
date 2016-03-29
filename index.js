'use strict';

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getNaturalRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


rl.setPrompt('Eagle (1) or Tails (2) (or exit)? > ');
rl.prompt();

var result;

rl.on('line', (line) => {
    result = getNaturalRandom(1, 2).toString();
    switch(line) {
        case result:
            console.log("Yep!!\n");
            break;
        case "exit":
            console.log("Bye!!\n");
            process.exit(0);
            break;
        default:
            console.log(`No =( result was "${result}"\n`);
            break;
    }
    rl.prompt();
}).on('close', () => {
    console.log('You killed me!\n');
    process.exit(0);
});