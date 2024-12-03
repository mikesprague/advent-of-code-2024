// https://adventofcode.com/2024/day/2

import { getFileAsIterator } from '../../lib/helpers.ts';

const { hrtime } = process;

(async () => {
  const debugStart = hrtime();

  // input file
  const inputFile = './src/02/input.txt';

  // use our helper to get the file as an iterator
  const file = await getFileAsIterator(inputFile);

  const safeReports = [];

  // iterate through the file line by line
  for await (const line of file.readLines()) {
    if (line.trim().length) {
      const report = line.split(' ');
      // console.log(report);

      let increasing = false;
      let decreasing = false;

      for (let i = 0; i < report.length - 1; i++) {
        // get the current and next numbers in the report
        const current = Number(report[i].trim());
        const next = Number(report[i + 1].trim());

        // determine if the report is increasing or decreasing
        if (current < next) {
          increasing = true;
        } else if (current > next) {
          decreasing = true;
        }

        if (current === next) {
          // console.log('unsafe (no change): ', report.join(' '));
          break;
        }

        // if diff is more than 3, break (unsafe)
        if (Math.abs(current - next) > 3) {
          // console.log('unsafe (more than 3): ', report.join(' '));
          break;
        }

        // if both increasing and decreasing, break (unsafe)
        if (increasing && decreasing) {
          // console.log('unsafe (up and down): ', report.join(' '));
          break;
        }

        // we're at the end of the report, it's safe
        if (i === report.length - 2) {
          // console.log('safe: ', report.join(' '));
          safeReports.push(report);
        }
      }
    }
  }

  console.log(`Safe reports: ${safeReports.length}`);

  const debugEnd = hrtime(debugStart);
  console.log(
    `\nExecution time: ${debugEnd[0] * 1000 + debugEnd[1] / 1000000}ms`
  );
})();
