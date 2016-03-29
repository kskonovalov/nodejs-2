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

function whoWon(userScore, robotScore) {
    if(userScore > robotScore)
        gameResult = "You won!\n";
    else if(userScore < robotScore)
        gameResult = "Robot won!\n";
    else gameResult = "Draw!\n";
    return gameResult;
}

console.log("BlackJack game. You and Robot have 0 points now\n");
//BlackJack Game
rl.setPrompt('Print "more" (or just press Enter), "done" or "exit" > ');
rl.prompt();
var maxScore = 21;
var score = 0, userScore = 0, robotScore = 0, gameResult;
var activeGame = true;
rl.on('line', (line) => {
    switch(line) {
        case "done":
        case "exit":
            gameResult = `You result is "${userScore}", robot result is "${robotScore}"!\n`;
            gameResult = gameResult + whoWon(userScore, robotScore);
            activeGame = false;
            break;
        case "more":
        default:
        score = getNaturalRandom(1,10);
        userScore += score;
        gameResult = `YOU: Added "${score}", you have "${userScore}" points now\n`;
        score = getNaturalRandom(1,10);
        robotScore += score;
        gameResult += `ROBOT: Added "${score}", robot have "${robotScore}" points now\n`;
        if(userScore > maxScore && robotScore > maxScore) {
            gameResult += "DRAW!";
            activeGame = false;
        }
        else if(userScore > maxScore) {
            gameResult += "You lose..";
            activeGame = false;
        }
        else if(robotScore > maxScore) {
            gameResult += "Robot lose!";
            activeGame = false;
        }
        else if(userScore == maxScore) {
            gameResult += "You won!!!";
            activeGame = false;
        }
        else if(robotScore == maxScore) {
            gameResult += "Robot won)";
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