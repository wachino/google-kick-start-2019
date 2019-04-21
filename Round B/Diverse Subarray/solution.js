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
    let [n, s] = readLine()
      .split(' ')
      .map(Number);
    var trinkets = readLine()
      .split(' ')
      .map(Number);
    var max = 0;
    var taken = {};
    var curr = 0;
    var tmp;
    for (let j = 0; j < trinkets.length; j++) {
      taken = [];
      curr = 0;
      for (let k = j; k < trinkets.length; k++) {
        tmp = taken[trinkets[k]] || 0;
        if (tmp === s) {
          curr -= s;
        } else if (tmp < s) {
          curr++;
        }
        taken[trinkets[k]] = tmp + 1;
        if (curr > max) {
          max = curr;
        }
      }
    }

    console.log(`Case #${i + 1}: ${max}`);
  }
}
