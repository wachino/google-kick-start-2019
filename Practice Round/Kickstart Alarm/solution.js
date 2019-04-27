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

const mod = BigInt(1000000007);

function solution() {
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    let [N, K, x1, y1, C, D, E1, E2, F] = readLine()
      .split(' ')
      .map(Number);
    const a = Array(N + 1).fill(0);
    a[1] = (x1 + y1) % F;
    let x;
    let y;
    for (let i = 2; i <= N; i++) {
      x = (C * x1 + D * y1 + E1) % F;
      y = (D * x1 + C * y1 + E2) % F;
      a[i] = (x + y) % F;
      x1 = x;
      y1 = y;
    }

    let ans = BigInt(0);
    let bK = BigInt(K);
    let la = bK;
    let xx;
    for (let i = 2; i <= N + 1; i++) {
      ans = (ans + ((((la * BigInt(N + 2 - i)) % mod) * BigInt(a[i - 1])) % mod)) % mod;
      xx = ((power(BigInt(i), bK + 1n) - 1n) * power(BigInt(i - 1), mod - 2n)) % mod;
      xx--;
      if (xx < 0) {
        xx += mod;
      }
      la += xx;
      la %= mod;
    }

    console.log(`Case #${t + 1}: ${ans}`);
  }
}

function power(x, y) {
  let t = 1n;
  while (y != 0) {
    if (y % 2n == 1n) {
      t = (t * x) % mod;
    }
    x = (x * x) % mod;
    y /= 2n;
  }
  return t;
}
