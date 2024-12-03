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
const sumMatches = multipliedMatches.reduce((acc, curr) => acc + curr, 0);

// output the result for part one
console.log(`Part one result: ${sumMatches}`);

// array to store clean matched numbers
const cleanMatchedNumbers = [];

// split the input by 'do()'
const segments = input.split('do()');

// iterate through all segments
for (const segment of segments) {
  // split the segment by 'don't()'
  const [goodPart, badPart] = segment.split(`don't()`);

  // find all matches in the good part
  const goodPartMatches = goodPart.match(regex);

  // if there are no matches, skip
  if (!goodPartMatches) {
    continue;
  }

  // iterate through all matches and extract numbers
  for (const match of goodPartMatches) {
    const cleanMatch = match.replace('mul(', '').replace(')', '');
    // console.log(cleanMatch);
    const [num1, num2] = cleanMatch.split(',');
    cleanMatchedNumbers.push([
      Number(num1),
      Number(num2),
      Number(num1) * Number(num2),
    ]);
  }
}
// console.log(cleanMatchedNumbers);

// get just the multiplied numbers
const cleanMultipliedMatches = cleanMatchedNumbers.map((match) => match[2]);
// console.log(cleanMultipliedMatches);

// sum all the multiplied numbers
const sumCleanMultipliedMatches = cleanMultipliedMatches.reduce(
  (acc, curr) => acc + curr,
  0
);

// output the result for part two
console.log(`Part two result: ${sumCleanMultipliedMatches}`);

const { hrtime } = process;

(async () => {
  const debugStart = hrtime();

  const debugEnd = hrtime(debugStart);
  console.log(
    `\nExecution time: ${debugEnd[0] * 1000 + debugEnd[1] / 1000000}ms`
  );
})();
