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
    let [n, q] = readLine()
      .split(' ')
      .map(Number);
    var blocks = readLine().split('');
    let solution = 0;

    for (let j = 0; j < q; j++) {
      let [l, r] = readLine()
        .split(' ')
        .map(Number);
      if (check(l - 1, r)) {
        solution++;
      }
    }

    console.log(`Case #${i + 1}: ${solution}`);
  }

  function check(l, r) {
    const dicc = {};
    for (let i = l; i < r; i++) {
      let char = blocks[i];
      if (!dicc[char]) {
        dicc[char] = 0;
      }
      dicc[char]++;
    }

    return Object.values(dicc).reduce((a, b) => a + (b % 2), 0) <= 1;
  }
}
