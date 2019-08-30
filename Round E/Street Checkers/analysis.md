# Analysis

## Test set 1 (Visible)

Let's rephrase the problem into counting the number of **X**'s within the range [**L**, **R**] that satisfies |(# of odd divisors) - (# of even divisors)| ≤ 2.

To solve this problem under the constraint that **R** < 10<sup>6</sup>. We can simply preprocesses each **X** between 1 and 10<sup>6</sup> whether **X** is interesting or not. To find whether **X** is interesting, we can apply any O(√**X**) time algorithm finding out all divisors of **X**. After storing the result for each **X**, we build a prefix sum array **F** storing for counts. Thus, each query can be answered by computing **F[R] - F[L-1]** in constant time. The total time complexity would then be O(**R<sub>max</sub>√R<sub>max</sub> + T**), which suffices to pass the first test set.

## Test set 2 (Hidden)

We need a slightly sophisticated observation here. The intuition comes from observing that any divisor to an odd integer is still odd. For any integer **X** we can extract all power of 2 factors and rewrite as **X=A\*2<sup>B</sup>**, where **A** is an odd integer and **B** is a nonnegative integer.

Now, we can partition all divisors to **X** into sets of divisors leading with each odd divisors **d<sub>1</sub>**, **d<sub>2</sub>**, ..., **d<sub>k</sub>** of **A**:

{**d<sub>1</sub>**, **d<sub>1</sub>**\*2, **d<sub>1</sub>**\*2<sup>2</sup>, ..., **d<sub>1</sub>**\*2<sup>B</sup>},<br>
{**d<sub>2</sub>**, **d<sub>2</sub>**\*2, **d<sub>2</sub>**\*2<sup>2</sup>, ..., **d<sub>2</sub>**\*2<sup>B</sup>},<br>
...<br>
{**d<sub>k</sub>**, **d<sub>k</sub>**\*2, **d<sub>k</sub>**\*2<sup>2</sup>, ..., **d<sub>k</sub>**\*2<sup>B</sup>}.

By looking at the above diagram we can infer that **X** has **k** odd divisors and **k**\***B** even divisors. The criteria to a number being interesting is now equivalent to |**k**\*(**B**-1)| ≤ 2.

There are only a few cases of (**B**, **k**) pairs that satisfies the above expression:

Case 1: **B**=0, **k**=1 or 2.<br>
Case 2: **B**=1, **k** can be any value.<br>
Case 3: **B**=2, **k**=1 or 2.<br>
Case 4: **B**=3, **k**=1.

So, what we really need to do here is to count the number of **X**'s in the range [**L**, **R**] satisfying each case.

Case 1 implies that **X**=1 or a odd prime. One can count the number of primes within range [**L**, **R**] using [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes). Case 2 implies that **A** can be any odd integer, so in this case **X** is in the form of (4\***K**+2) and hence can be counted in O(1) time. Case 3 implies that **A**=1 or an odd prime. One can count the number of primes within range [**L**/4, **R**/4]. Case 4 implies that **X**=8. Count it whenever 8 belongs to the range.

From the above case analysis, one can see that the running time is dominated by Sieve of Eratosthenes. Fortunately, we only need to use sieve method on arrays of size O(**R**-**L**+1) to count the number of odd primes within ranges [**L**, **R**] and [**L**/4, **R**/4]. If we apply sieving using numbers 2, 3, 4, ..., √**R**, the algorithm runs in O(**T**\*(**R** - **L** + 1)\*log(√**R**)) time, which suffices to pass this test set.

For a more efficient algorithm, one can sieve using prime numbers no more than √**R**. These prime numbers again can be obtained by a sieving algorithm. At the end you will get an algorithm that runs in O(√**R** log log √**R**) + O((**R** - **L** + 1) log log √**R**) time per test case.
