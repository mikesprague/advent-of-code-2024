// https://adventofcode.com/2024/day/3

import * as fs from 'node:fs';

// load input data
const input = fs.readFileSync(new URL('input.txt', import.meta.url), 'utf-8');
// console.log(input);

// define regex pattern
const regex = /(mul\(\d+,\d+\))/g;

// find all matches
const allMatches = input.match(regex);
// console.log(allMatches);
// console.log(allMatches.length);

// array to store matched numbers
const matchedNumbers = [];

// iterate through all matches and extract numbers
for (const match of allMatches) {
  const cleanMatch = match.replace('mul(', '').replace(')', '');
  const [num1, num2] = cleanMatch.split(',');
  matchedNumbers.push([
    Number(num1),
    Number(num2),
    Number(num1) * Number(num2),
  ]);
}

// get just the multiplied numbers
const multipliedMatches = matchedNumbers.map((match) => match[2]);
// console.log(multipliedMatches);
// console.log(multipliedMatches.length);

// sum all the multiplied numbers
const sum = multipliedMatches.reduce((acc, curr) => acc + curr, 0);

// output the result
console.log(`Result: ${sum}`);

const { hrtime } = process;

(async () => {
  const debugStart = hrtime();

  const debugEnd = hrtime(debugStart);
  console.log(
    `\nExecution time: ${debugEnd[0] * 1000 + debugEnd[1] / 1000000}ms`
  );
})();
