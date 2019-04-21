const rl = require('readline');

const rli = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity
});

async function* getLineGenerator() {
  for await (const line of rli) {
    yield line;
  }
}
const lineGenerator = getLineGenerator();

async function readLine() {
  const line = await lineGenerator.next();
  return line.value;
}

async function solve() {
  let res = '';
  const t = Number(await readLine());
  for (let i = 0; i < t; i++) {
    let [a, b] = (await readLine())
      .trim()
      .split(' ')
      .map(Number);
    let n = Number(await readLine());
    for (let j = 0; j < n; j++) {
      console.log(Math.floor((a + b + 1) / 2));

      res = await readLine();
      if ('CORRECT' === res) {
        break;
      } else if ('TOO_SMALL' === res) {
        a = (a + b + 1) / 2;
      } else if ('TOO_BIG' === res) {
        b = (a + b + 1) / 2 - 1;
      }
    }
  }
  rli.close();
  process.stdin.destroy();
}

solve();
