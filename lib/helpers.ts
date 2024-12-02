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
