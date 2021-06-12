# Analysis

## Test set 1 (Visible)

We can solve this test set by considering all ordered pairs of employees. For an ordered pair (i, j), we can check whether there is a skill that the i-th employee knows that the j-th employee does not know with a simple O(**C<sub>i</sub>** × **C<sub>j</sub>**) check using nested loops.

This solution runs in O(5<sup>2</sup> × **N<sup>2</sup>**).

## Test set 2 (Hidden)

We can solve this test set by defining m(i) as the number of employees who can mentor the i-th employee. If we can compute m(i), the answer to the problem is the sum of all m(i).

To compute m(i), we can count the number of employees who **cannot** mentor the i-th employee instead. We can observe that the j-th employee cannot mentor the i-th employee if and only if the set of skills known by the j-th employee is a subset of the set of skills known by the i-th employee. Therefore, we would like to count the number of employees whose set of skills is a subset of the set of skills known by the i-th employee.

To count this, we can consider every subset of {**A<sub>i1</sub>**, ..., **A<sub>iC<sub>i</sub></sub>**}. For a subset B, we can count the number of employees whose set of skills is exactly B. Taking the sum of all subsets gives us the number of employees whose set of skills knowledge is the subset of the set of skills known by the i-th employee. m(i) is simply the number of employees subtracted by this value.

To be able to compute the number of employees whose set of skills is exactly a given set, we can preprocess the set of skills into an occurrences hashmap. In other words, we can keep a hashmap that takes a set of skills as its key and returns the number of employees who knows the exact same set of skills as its value.

For each employee i, we need to consider every subset of {**A<sub>i1</sub>**, ..., **A<sub>iC<sub>i</sub></sub>**}. Since there can be up to 2<sup>5</sup> subsets, this solutions runs in O(2<sup>5</sup> × **N**).
