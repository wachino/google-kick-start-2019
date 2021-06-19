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
    let [N, M] = readLine().split(/\s+/).map(BigInt);
    let laws = readLine().split(/\s+/).map(BigInt);
    let bits = Array(51).fill(0n);
    let sum = laws.reduce((a, b) => a + b);
    let k = 0n;
    for (let p = 0n; p <= 50n; p++) {
      let c = 0n;
      for (let i = 0n; i < N; i++) {
        if ((laws[i] & (1n << p)) === 0n) {
          c++;
        }
      }
      if (c <= N / 2n) {
        k |= 1n << p;
        sum -= (N - 2n * c) << p;
      }
      bits[p] = c;
    }

    for (let p = 50n; p >= 0n; p--) {
      if ((k & (1n << p)) === 0n && sum + ((2n * bits[p] - N) << p) <= M) {
        k |= 1n << p;
        sum += (2n * bits[p] - N) << p;
      }
    }

    console.log(`Case #${t + 1}: ${sum <= M ? k : -1}`);
  }
}
