# Analysis

## Test set 1 (Visible)

We need to divide each digits to two partitions: positive partition and negative partition, where positive partition means the digit is on the odd index (be calculated as _add_), and negative partition means the digit is in the even index (be calculated as _minus_).

We can use dynamic programming to solve test set 1. Let dp[i][j][k] denote if it is possible to achieve the state that when we are considering digits 1, 2, ... i, the current number of digits in the positive partition is j and the current sum modulo 11 is k. Then for each digit i, we can put 0, 1, ..., **A<sub>i</sub>** digits into the positive partition, and calculate if the current state is possible. We want to calculate dp[9][sum(**a**)/2][0], where sum(**A**) means the total sum of all elements in array **A**.

The time complexity is O(9 _ sum(**A**) _ 11 \* max(**A**)), which fits the time limit for test case 1. Here max(**A**) means the maximum of all elements in array **A**.

## Test set 2 (Hidden)

Assume the positive number of digits i is P<sub>i</sub>, and negative number of digits i is **A<sub>i</sub>** - P<sub>i</sub>. Then, we will have the following three equations:

<pre>
  (1) Σ P<sub>i</sub> = ceil(sum(A) / 2)
  (2) Σ i × (P<sub>i</sub> - (<b>A<sub>i</sub></b> - P<sub>i</sub>)) % 11 = 0
  (3) 0 ≤ P<sub>i</sub> ≤ <b>A<sub>i</sub></b>
</pre>

In order to solve this, initially we can put half the number of each digits to be in positive partition (e.g. P<sub>i</sub> = **A<sub>i</sub>** / 2, take care of odd numbers), and then try to adjust each P<sub>i</sub> to satisfy equation (2). For each i, we can adjust its P<sub>i</sub> from -**A<sub>i</sub>** / 2 to **A<sub>i</sub>** / 2.

We can prove the two following conclusions:

1. If there are at least two numbers of **A<sub>i</sub>** ≥ 10, then the solution must exist.

   This is very easy to prove. We can only adjust these two digits from -5 to 5, and each adjustment will result in a different remain value of modulo 11. Thus, we will get 0 finally.

1. If there are at least three numbers of **A<sub>i</sub>** ≥ 6, then the solution must exist.

   To prove this, we can prove that:

   <pre>
   For any 1 ≤ i < j < k ≤ 9, 0 ≤ r ≤ 10, the following equations:
   (1) (i * x<sub>1</sub> + j * x<sub>2</sub> + k * x<sub>3</sub>) % 11 = r
   (2) x<sub>1</sub> + x<sub>2</sub> + x<sub>3</sub> = 0
   (3) -3 ≤ x<sub>i</sub> ≤ 3
   will have a valid solution.
   </pre>

   This can be proved by iterating all possible situations, where the total number is 9**C**3 \* 11 \* 7 \* 7 = 45276, quite small.

According to these two conclusions, if there are at least two numbers ≥ 10 or at least three numbers ≥ 6, we can return YES immediately. Otherwise, there are at most one value ≥ 10, and at most two values ≥ 6, we can calculate all possible situations, where in the worst case time complexity is O(6<sup>7</sup> \* 10) = O(2799360) which fits the time limit for test case 2.
