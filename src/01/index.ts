// https://adventofcode.com/2024/day/1

import { getFileAsIterator } from '../../lib/helpers.ts';

const { hrtime } = process;

(async () => {
  const debugStart = hrtime();

  // input file
  const inputFile = './src/01/input.txt';

  // instantiate arrays to hold the numbers
  let leftList = [];
  let rightList = [];

  // use our helper to get the file as an iterator
  const file = await getFileAsIterator(inputFile);

  // iterate through the file line by line
  for await (const line of file.readLines()) {
    if (line.trim().length) {
      // split the line into two numbers
      const [left, right] = line.split('   ');
      // add the numbers to the list arrays
      leftList.push(Number(left.trim()));
      rightList.push(Number(right.trim()));
    }
  }

  // sort arrays in ascending order
  leftList = leftList.sort((a, b) => b - a);
  rightList = rightList.sort((a, b) => b - a);

  // get the length of the lists
  const listLen = leftList.length;

  // instantiate diffs array
  const diffs = [];

  // iterate through the lists
  for (let i = 0; i < listLen; i++) {
    // get the numbers from each lists
    const left = leftList[i];
    const right = rightList[i];
    // console.log(left, right);

    // calculate the difference between the two numbers
    let diff = left - right;
    diff = Math.abs(diff);

    // add the difference to the diffs array
    diffs.push(diff);
    // console.log(diff);
  }

  // console.log(diffs);

  // sum all diffs
  const totalOfDiffs = diffs.reduce((a, b) => a + b, 0);

  // output the total
  console.log(`Part 1: ${totalOfDiffs}`);

  // instantiate itemsWithCounts array
  const itemsWithCounts = [];

  // loop over the left list
  for (const item of leftList) {
    // check how many times the item appears in the right list
    const count = rightList.filter((x) => x === item).length;
    // add the count to the counts array
    itemsWithCounts.push([item, count]);
  }
  // console.log(itemsWithCounts);

  // instantiate similarityScores array
  const similarityScores = [];

  // loop over the itemsWithCounts array
  for (const [item, count] of itemsWithCounts) {
    // calculate the similarity score
    const similarityScore = item * count;
    // add the similarity score to the similarityScores array
    similarityScores.push(similarityScore);
  }

  // sum all similarity scores
  const totalOfSimilarityScores = similarityScores.reduce((a, b) => a + b, 0);

  // output the total
  console.log(`Part 2: ${totalOfSimilarityScores}`);

  const debugEnd = hrtime(debugStart);
  console.log(
    `\nExecution time: ${debugEnd[0] * 1000 + debugEnd[1] / 1000000}ms`
  );
})();
