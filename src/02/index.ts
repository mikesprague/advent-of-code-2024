// https://adventofcode.com/2024/day/2

import { checkReport, getFileAsIterator } from '../../lib/helpers.ts';

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

      if (checkReport(report)) {
        safeReports.push(report.join(' '));
      } else {
        for (let i = 0; i < report.length; i++) {
          const nextReport = report.filter((_, index) => index !== i);

          if (checkReport(nextReport)) {
            safeReports.push(report.join(' '));
            break;
          }
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
