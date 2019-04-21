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
    const n = Number(readLine());
    const beautyScores = readLine()
      .split('')
      .map(Number);
    const muralLength = Math.ceil(n / 2);
    let maxBeauty = beautyScores.slice(0, muralLength).reduce((a, b) => a + b);
    let currBeauty = maxBeauty;

    for (let j = muralLength; j < beautyScores.length; j++) {
      currBeauty += beautyScores[j];
      currBeauty -= beautyScores[j - muralLength];
      if (currBeauty > maxBeauty) {
        maxBeauty = currBeauty;
      }
    }
    console.log(`Case #${i + 1}: ${maxBeauty}`);
  }
}
