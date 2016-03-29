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

function logInFile(filename, text) {
    fs.appendFile(filename, text, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}


console.log("BlackJack game. You got 0 points now\n");
//BlackJack Game
rl.setPrompt('Print "more" (or just press Enter), "done" or "exit" > ');
rl.prompt();
var score = 0, userScore = 0, maxScore = 21, gameResult;
var activeGame = true;
rl.on('line', (line) => {
    switch(line) {
        case "done":
        case "exit":
            gameResult = `You result is "${userScore}"!\n`;
            activeGame = false;
            break;
        case "more":
        default:
        score = getNaturalRandom(1,10);
        userScore += score;
        gameResult = `Added "${score}", you have "${userScore}" points now\n`;
        if(userScore == 21) {
            gameResult = gameResult + "YOU WON!!!";
            activeGame = false;
        }
        else if(userScore > 21) {
            gameResult = gameResult + "you lose =(";
            activeGame = false;
        }
        break;
    }
    console.log(gameResult);
    logInFile(argv.log, gameResult); //тут пишет в файл только не при выходе

    if(!activeGame) {
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
    logInFile(argv.log, gameResult); //и тут пишет в файл только не при выходе
});