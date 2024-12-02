// https://adventofcode.com/2024/day/1

import { getFileAsIterator } from '../../lib/helpers.ts';

const { hrtime } = process;

const inputFile = './src/01/input.txt';

(async () => {
  const debugStart = hrtime();

  // console.log(inputFile);

  const file = await getFileAsIterator(inputFile);
  for await (const line of file.readLines()) {
    console.log(line);
  }

  const debugEnd = hrtime(debugStart);
  console.log(
    `Execution time: ${debugEnd[0] * 1000 + debugEnd[1] / 1000000}ms`
  );
})();
