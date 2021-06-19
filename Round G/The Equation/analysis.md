# Analysis

## Test set 1 (Visible)

For the first test set, notice that the maximum value of **k** is 127. This is because each **A<sub>i</sub>** is at most 100, so the leading digit of **A<sub>i</sub>** is at most 26 = 64. If **k** ≥ 128, then the leading digit of k is at least 2<sup>7</sup> = 128, meaning that (**A<sub>i</sub>** xor k) ≥ 128 > **M**.

Hence, we can compute the answer by checking each value of **k** less than 128 and finding the largest one which produces a sum less than **M**.

## Test set 2 (Hidden)

For the second test set, the reasoning above tells us that **k** < 2<sup>50</sup>, which is too big for us to check every value.

Instead, notice that each bit of **k** only affects a single bit of each **A<sub>i</sub>**. We can use this property to compute each bit of **k** separately.

For each 1 ≤ _i_ ≤ 50, define _ones(i)_ to be the number of rules **A<sub>i</sub>** with the i-th bit (numbered starting from the least significant bit) equal to 1. Likewise, define _zeroes(i)_ to be the number of rules with the _i_-th bit equal to 0. Then we can re-write the sum:

Σ<sub>1 ≤ j ≤ **N**</sub> **A<sub>j</sub>** xor **k**

as:

Σ<sub>i : i-th bit of **k** is 1</sub> 2<sup>i</sup>×*zeroes(i)* + Σ<sub>i : i-th bit of **k** is 0</sub> 2<sup>i</sup>×*ones(i)*

Note that we can minimize this sum by choosing the i-th bit of **k** to be 1 if _ones(i)_ ≥ _zeroes(i)_, or 0 otherwise. Define _f(j)_ to be the minimum value of the above sum over all bits _i_ ≤ _j_. We can use _f(j)_ to determine if a feasible value of k exists for the lowest j bits, which lets us solve this problem greedily. The greedy solution is as follows: starting from the most significant bit i, check if we can set it to be one (by adding cost of setting this bit to one and _f(i-1)_). If this value is less than or equal to m, there exists a feasible k with the _i_-th bit set to one. Since we want to set to maximize k, it is optimal for us to set this bit to 1. Otherwise, if the sum is larger than m, set the bit to zero. Then iterate by decreasing m by the cost at the current bit and checking the next most significant bit (i-1). In this way, we are able to find the largest feasible k. If _f(i)_ is precomputed, the runtime of this algorithm is O(**N**log(max(**A<sub>i</sub>**))).

Note that since **A<sub>i</sub>** ≤ 10<sup>15</sup> and **N** ≤ 1000, the maximum sum is a little more than 10<sup>18</sup>, so using 64-bit integers is sufficient for this problem.
