import { open } from 'node:fs/promises';

export const getFileAsIterator = async (
  filePath: string
): Promise<AsyncGenerator<string, void, unknown>> => {
  const file = await open(filePath);
  return file;
};

export const outputFileLineByLine = async (
  filePath: string
): Promise<AsyncGenerator<string, void, unknown>> => {
  const file = await open(filePath);
  for await (const line of file.readLines()) {
    if (!line) {
      break;
    }
    console.log(line);
  }
};

export const checkReport = (report: string[]) => {
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
      return false;
    }

    // if diff is more than 3, break (unsafe)
    if (Math.abs(current - next) > 3) {
      return false;
    }

    // if both increasing and decreasing, break (unsafe)
    if (increasing && decreasing) {
      return false;
    }

    // we're at the end of the report, it's safe
    if (i === report.length - 2) {
      return true;
    }
  }
};
