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
    let [D, S] = readLine().split(/\s+/).map(Number);
    let slots = [];
    for (let i = 0; i < S; i++) {
      let [c, e] = readLine().split(/\s+/).map(Number);
      slots.push({ c, e });
    }
    slots.sort((a, b) => b.c / b.e - a.c / a.e);
    let sums = [{ c: slots[0].c, e: slots[S - 1].e }];
    for (let i = 1; i < S; i++) {
      let prev = sums[i - 1];
      sums.push({ c: prev.c + slots[i].c, e: prev.e + slots[S - i - 1].e });
    }
    let ans = [];
    for (let i = 0; i < D; i++) {
      let [a, b] = readLine().split(/\s+/).map(Number);
      ans.push(canAchieve(sums, slots, a, b));
    }
    console.log(`Case #${t + 1}: ${ans.join('')}`);
  }
}

function canAchieve(sums, slots, a, b) {
  let left = 0;
  let right = sums.length - 1;
  let mid;
  while (left <= right) {
    mid = (left + right) >> 1;
    if (sums[mid].c < a) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  if (left >= sums.length) {
    return 'N';
  }
  let rest = (sums[left].c - a) / slots[left].c;
  let eatAvailable =
    slots[left].e * rest + (sums[sums.length - 2 - left] ? sums[sums.length - 2 - left].e : 0);
  return eatAvailable >= b ? 'Y' : 'N';
}
