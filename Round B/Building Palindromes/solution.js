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
    var precalculated = getPrecalculated(blocks);

    for (let j = 0; j < q; j++) {
      let [l, r] = readLine()
        .split(' ')
        .map(Number);
      if (check(precalculated, l - 1, r)) {
        solution++;
      }
    }

    console.log(`Case #${i + 1}: ${solution}`);
  }
}
function check(precalculated, l, r) {
  const left = l ? precalculated[l - 1] : 0;
  const right = precalculated[r - 1];
  return (
    (left ^ right)
      .toString(2)
      .split('')
      .map(Number)
      .reduce((a, b) => a + b) <= 1
  );
}

function getPrecalculated(blocks) {
  let precalculated = Array(blocks.length).fill(0);
  let curr = 0;
  for (let i = 0; i < blocks.length; i++) {
    curr = curr ^ (1 << (blocks[i].charCodeAt(0) - 65));
    precalculated[i] = curr;
  }
  return precalculated;
}
