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

function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let [N, S] = readLine().split(' ').map(Number);
    let skills = [];
    let skillCount = {};
    for (let i = 0; i < N; i++) {
      let s = readLine()
        .split(' ')
        .slice(1)
        .map(Number)
        .sort((a, b) => a - b);
      skills.push(s);
      s = s.join(',');
      skillCount[s] = -~skillCount[s];
    }
    let sum = 0;
    for (let i = 0; i < N; i++) {
      for (let subset of subsets(skills[i])) {
        sum += skillCount[subset.sort((a, b) => a - b).join(',')] || 0;
      }
    }
    console.log(`Case #${t + 1}: ${N * N - sum}`);
  }
}

function* subsets(array, offset = 0) {
  while (offset < array.length) {
    let first = array[offset++];
    for (let subset of subsets(array, offset)) {
      subset.push(first);
      yield subset;
    }
  }
  yield [];
}
