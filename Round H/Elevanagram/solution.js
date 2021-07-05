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
    let digits = [0, ...readLine().split(/\s+/).map(Number)];
    console.log(`Case #${t + 1}: ${isMultiplePossible(digits) ? 'YES' : 'NO'}`);
  }
}

function isMultiplePossible(digits) {
  let countTen = 0;
  let countSix = 0;
  let lastTen = -1;
  for (let i = 1; i < 10; i++) {
    if (digits[i] >= 10) {
      countTen++;
      lastTen = i;
    }
    if (digits[i] >= 6) {
      countSix++;
    }
  }
  if (countTen >= 2 || countSix >= 3) {
    return true;
  }
  if (lastTen > -1) {
    digits[lastTen] = digits[lastTen] % 20;
  }
  return bt();

  function bt() {
    let a = 0;
    let asize = 0;
    let fullSize = 0;
    let b = 0;
    let found = false;

    for (let k = 1; k < digits.length; k++) {
      b += digits[k] * k;
      fullSize += digits[k];
    }
    btAux(1);
    return found;
    function btAux(i) {
      if (found) {
        return;
      }
      if (i == 10) {
        if (asize === Math.floor(fullSize / 2)) {
          found = Math.abs(a - b) % 11 === 0;
        }
        return;
      }

      for (let k = 0; k <= digits[i]; k++) {
        a += k * i;
        b -= k * i;
        asize += k;
        btAux(i + 1);
        a -= k * i;
        asize -= k;
        b += k * i;
      }
    }
  }
}
