process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString
    .trim()
    .split('\n')
    .map(str => str.trim());
  solution();
});

function readLine() {
  return inputString[currentLine++];
}

function solution() {
  const t = Number(readLine());
  for (let i = 0; i < t; i++) {
    let [n, p] = readLine()
      .split(' ')
      .map(Number);
    let skills = readLine()
      .split(' ')
      .map(Number);
    skills.sort((a, b) => a - b);
    let minTrainingHours = Number.POSITIVE_INFINITY;
    let sums = Array(skills).fill(0);
    let tmpSum = 0;
    for (let j = 0; j < skills.length; j++) {
      tmpSum += skills[j];
      sums[j] = tmpSum;
    }

    for (let j = p - 1; j < n; j++) {
      let candidate = skills[j] * p - (sums[j] - (j > p - 1 ? sums[j - p] : 0));
      if (candidate < minTrainingHours) {
        minTrainingHours = candidate;
      }
    }

    console.log(`Case #${i + 1}: ${minTrainingHours}`);
  }
}
