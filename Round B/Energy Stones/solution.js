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
  const T = Number(readLine());
  for (let t = 0; t < T; t++) {
    var n = Number(readLine());

    var stones = [];
    for (let i = 0; i < n; i++) {
      let [seconds, energy, lose] = readLine()
        .split(' ')
        .map(Number);
      stones.push({ seconds, energy, lose });
    }
    stones.sort((a, b) => a.seconds * b.lose - b.seconds * a.lose);
    let max = maxEnergy(stones);

    console.log(`Case #${t + 1}: ${max}`);
  }
}

function maxEnergy(stones) {
  let maxTime = stones.reduce((acc, s) => acc + s.seconds, 0);
  var dynamicTable = Array(maxTime)
    .fill(0)
    .map(() => []);

  return maxEnergyAux(0, 0);

  function maxEnergyAux(time, i) {
    if (i >= stones.length) {
      return 0;
    }

    if (dynamicTable[time][i] == undefined) {
      let st = stones[i];
      dynamicTable[time][i] = Math.max(
        maxEnergyAux(time + st.seconds, i + 1) + Math.max(0, st.energy - st.lose * time),
        maxEnergyAux(time, i + 1)
      );
    }
    return dynamicTable[time][i];
  }
}
