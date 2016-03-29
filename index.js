'use strict';

const readline = require('readline'); //for input
const fs = require('fs'); //for file work
const argv = require('minimist')(process.argv.slice(2)); //for options

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getNaturalRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function logInFile(fs, filename, text) {
    fs.appendFile(filename, text, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

//Eagle or Tails Game
rl.setPrompt('Eagle (1) or Tails (2) (or exit)? > ');
rl.prompt();
var randResult, gameResult;
rl.on('line', (line) => {
    randResult = getNaturalRandom(1, 2).toString();
    switch(line) {
        case randResult:
            gameResult = `"${randResult}" == "${line}" Yep!!\n`;
            break;
        case "exit":
            gameResult = `Bye!!\n`;
            break;
        default:
            gameResult = `"${randResult}" == "${line}" No =(\n`;
            break;
    }

    console.log(gameResult);
    logInFile(fs, argv.log, gameResult); //тут пишет в файл только не при выходе

    if(line == "exit") {
        process.exit(0);
    }

    rl.prompt();

}).on('close', () => {
    gameResult = `You killed me!\n`;
    console.log(gameResult);  //и тут пишет в файл только не при выходе
    process.exit(0);
});

process.on('exit', (data) => {
    gameResult = "exited!!";
    console.log(gameResult);
    logInFile(fs, argv.log, gameResult); //и тут пишет в файл только не при выходе
});