// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	} return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let scrabbleWord = input.question("Let's play some scrabble! Enter a word: ");
   return scrabbleWord;
};

let simpleScorer = function(word) {
   word = word.toLowerCase();
    let letterPoints = 0;
    for (let i = 0; i < word.length; i++) {
        letterPoints += 1;
    }
    return letterPoints;
};

let vowelBonusScorer = function(word) {
   word = word.toLowerCase();
   let letterPoints = 0
   const vowels = ['a','e','i','o','u'];
   for (i = 0; i < word.length; i++) {
       if (vowels.includes(word[i])) {
           letterPoints += 3;
       } else {
           letterPoints += 1;
       }
   } return letterPoints;
};

let scrabbleScorer = function (word) {
   let letterPoints = 0;
    for (let i = 0; i < word.length; i++) {
        letterPoints += Number(newPointStructure[word[i]]);
      } 
      return letterPoints;
};


const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer,
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer,
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer,
   }
];


function scorerPrompt(word) {
   let selectedScorerAlgorithim = input.question(`Which scoring algorithm would you like to use?\n 
   0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}
   1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}
   2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}
   Enter 0, 1, or 2: `);

   if (selectedScorerAlgorithim == 0) {
      console.log(`Score for ${word}: ${simpleScorer(word)}`);
   } else if (selectedScorerAlgorithim == 1) {
      console.log(`Score for ${word}: ${vowelBonusScorer(word)}`);
   } else if (selectedScorerAlgorithim == 2) {
      console.log(`Score for ${word}: ${scrabbleScorer(word)}`);
   } else {
      console.log('You have entered an invalid input - Try again.');
   } 
   return selectedScorerAlgorithim;
} 

function transform(oldPointStructure) {
   let newStructure = {}; 
   for (item in oldPointStructure) {
      for (j = 0; j < oldPointStructure[item].length; j++) {
         let newPointStructure = oldPointStructure[item][j].toLowerCase();
         newStructure[newPointStructure] = Number(item);
     }
   } return newStructure;
};

let newPointStructure = transform(oldPointStructure);
// {
   // a: 1,
   // e: 1, 
   // i: 1,
   // o: 1,
   // u: 1, 
   // l: 1,
   // n: 1,
   // r: 1,
   // s: 1,
   // t: 1,
   // d: 2,
   // g: 2, 
   // b: 3,
   // c: 3,
   // m: 3, 
   // p: 3, 
   // f: 4,
   // h: 4,
   // v: 4,
   // w: 4,
   // y: 4, 
   // k: 5,
   // j: 8,
   // x: 8,
   // q: 10,
   // z: 10
// };

function runProgram() {
   let wordProvided = initialPrompt();
   scorerPrompt(wordProvided);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
