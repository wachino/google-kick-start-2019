# Analysis

The problem asks us to calculate the summation of power of each wakeup call: POWER<sub>1</sub> + POWER<sub>2</sub> + ... + POWER<sub>**K**</sub>, where POWER<sub>i</sub> is just the summation of the i-th exponential-power of all the contiguous subarrays of the Parameter Array.

## Small dataset

For Small dataset, you can iterate over every subarray of the given array and calculate the summation of POWER<sub>i</sub> for all i ≤ **K**. Thus, the simplest brute solution will work for Small dataset.

Psuedocode for Small dataset:

```
  result = 0
  for(k in 1 to K) {
    for(L in 1 to N) {
      for(R in L to N) {
        for(j in L to R) {
          result = result + A[j] * pow(j-L+1,k)
          result %= 1000000007
        }
      }
    }
  }
```

The overall time complexity is O(**N**<sup>3</sup> \* **K**).

## Large dataset

The above solution wont work for Large dataset. To solve for Large dataset, let's iterate over every position x and calculate the contribution by A<sub>x</sub> to the result for all subarrays ending at x.

Suppose A<sub>x</sub> is the first and only element in the subarray. Then we need to add A<sub>x</sub> _ 1<sup>1</sup> + A<sub>x</sub> _ 1<sup>2</sup> ... A<sub>x</sub> _ 1<sup>**K**</sup> to the result.<br>
Suppose A<sub>x</sub> is the second and last element in the subarray. Then we need to add A<sub>x</sub> _ 2<sup>1</sup> + A<sub>x</sub> _ 2<sup>2</sup> ... A<sub>x</sub> _ 2<sup>**K**</sup> to the result.<br>
Suppose A<sub>x</sub> is the third and last element in the subarray. Then we need to add A<sub>x</sub> _ 3<sup>1</sup> + A<sub>x</sub> _ 3<sup>2</sup> ... A<sub>x</sub> _ 3<sup>**K**</sup> to the result.<br>
Similary, looking at the pattern, if A<sub>x</sub> is the pth element in the subarray, we need to add A<sub>x</sub> _ p<sup>1</sup> + A<sub>x</sub> _ p<sup>2</sup> ... A<sub>x</sub> _ p<sup>**K**</sup> to the result.<br>
If you look closely at the last expression, you will notice that it's the summation of a geometric progression. So it can also be written as A<sub>x</sub> _ (p<sup>**K**+1</sup> -1)/(p - 1). The value of p can be from 2 to x, since x is supposed to be the last element of the subarray. Note that we need to handle the p = 1 case separately since the above expression isn't valid for p = 1. For p = 1, we will simply add A<sub>x</sub> _ **K** to the expression.<br>
Thus the summation of the power of each wakeup call is simply Σ A<sub>x</sub> _ (**K** + (p<sup>**K**+1</sup> -1)/(p - 1)) for all 2 ≤ p ≤ x and 1 ≤ x ≤ **N**. But if you implement an O(**N**<sup>2</sup> _ log(**K**)) solution for this by iterating over each x and p, and using fast exponentiation, it won't be fast enough. We can use the fact that for a fixed value of x, we just need to calculate A<sub>x</sub> \* Σ (**K** + (p<sup>**K**+1</sup> - 1)/(p - 1)) for 2 ≤ p ≤ x. Note that multiplicand for x can be derived in constant time from the multiplicand in case of x - 1. See the pseudo code below.

```
  result = 0
  GP_sum = K # Handling p = 1 case separately.
  mod = 1000000007
  for(x in 1 to N) {
    if x != 1
      GP_sum = GP_sum + (pow(x, K+1)-1) * pow(x-1, mod-2) # Multipyting by inverse modulo of x-1.
      GP_sum %= mod

    result = result + GP_sum * A[x]
    result %= mod
  }
```
