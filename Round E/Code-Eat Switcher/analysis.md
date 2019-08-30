# Analysis

## Test set 1 (Visible)

Let's start with the brute force way of solving the problem. We can iterate through all possible coding units for slot 1, let's say X. Now, we can calculate the coding unit left for slot 2 (**A<sub>i</sub>** - **X**). Using this we can calculate eating unit we can achieve for both slot 1 and slot 2 and compare it with **B<sub>i</sub>**. Time complexity for each test case would be O(**C<sub>max</sub>**\***D**).

## Test set 2 (Hidden)

Let's first solve for only 1 day. So assuming two time slots **S<sub>i</sub>**(**E<sub>i</sub>**, **C<sub>i</sub>**) and **S<sub>j</sub>**(**E<sub>j</sub>**, **S<sub>j</sub>**) we can see that to achieve every 1 unit of eating in **S<sub>i</sub>** slot we are losing **C<sub>i</sub>**/**E<sub>i</sub>** unit of coding, similarly for **S<sub>j</sub>** slot. Hence, we can observe that it's always a better choice to choose time slot **S<sub>i</sub>** if **C<sub>i</sub>**/**E<sub>i</sub>** ≤ **C<sub>j</sub>**/**E<sub>j</sub>**. Now, we have the order in which we should achieve the required eating unit.

For calculating minimum coding requirement we can maintain prefix cumulative and suffix cumulative sum of maximum coding and eating unit that can be achieved in a time slot. Then using binary search on prefix cumulative sum array, we can find out which minimum indexed time slot will give us eating more than required and we can remove the excess fraction of time for use in coding. We can compute the maximum coding unit achieved from unused time slots by using the suffix cumulative sum. This will take O(**S logS** + **S**) preprocessing time and O(**D logS**) for each test case.
