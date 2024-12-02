// https: //adventofcode.com/2024/day/2

const { hrtime } = process;

(async () => {
  const debugStart = hrtime();

  // add code here

  const debugEnd = hrtime(debugStart);
  console.log(
    `Execution time: ${debugEnd[0] * 1000 + debugEnd[1] / 1000000}ms`
  );
})();
