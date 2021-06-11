process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on('end', (_) => {
  inputString = inputString
    .trim()
    .split('\n')
    .map((str) => str.trim());
  solution();
});

function readLine() {
  return inputString[currentLine++];
}

let dpRebuilds = [];
let dp = [];

function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let [n, k] = readLine().split(' ').map(Number);
    dpRebuilds = Array(n)
      .fill(null)
      .map(() => Array(n).fill(-1));
    dp = Array(n)
      .fill(null)
      .map(() => Array(k + 1).fill(-1));
    let heights = readLine().split(' ').map(Number);

    console.log(`Case #${t + 1}: ${minRebuildsToK(heights, n - 1, k)}`);
  }
}
function minRebuildsToK(heights, x, k) {
  if (dp[x][k] === -1) {
    if (x == 0) {
      dp[x][k] = 0;
    } else if (k === 0) {
      dp[x][k] = rebuildsToSameHeight(heights, 0, x);
    } else {
      let min = -1;
      for (let i = 0; i < x; i++) {
        let tmp = minRebuildsToK(heights, i, k - 1) + rebuildsToSameHeight(heights, i + 1, x);
        if (min == -1 || tmp < min) {
          min = tmp;
        }
      }
      dp[x][k] = min;
    }
  }

  return dp[x][k];
}
function rebuildsToSameHeight(heights, i, j) {
  if (i >= j) {
    return 0;
  }
  if (dpRebuilds[i][j] == -1) {
    dpRebuilds[i][j] =
      j -
      i +
      1 -
      heights
        .slice(i, j + 1)
        .sort((a, b) => b - a)
        .join(',')
        .match(/(\d+)(?:,\1)*/g)
        .map((s) => s.split(',').length)
        .sort((a, b) => b - a)[0];
  }
  return dpRebuilds[i][j];
}
