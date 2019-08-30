# Analysis

## Test set 1 (Visible)

First, let's rephrase the problem: Given a [complete](https://en.wikipedia.org/wiki/Complete_graph) undirected graph, where each edge has weight 1 or 2, what is the cost of the [Minimum Spanning Tree](https://en.wikipedia.org/wiki/Minimum_spanning_tree)? There are a few different algorithms for solving this problem, such as [Prim's Algorithm](https://en.wikipedia.org/wiki/Prim%27s_algorithm) and [Kruskal's algorithm](https://en.wikipedia.org/wiki/Kruskal%27s_algorithm). Using either of these algorithms gives an O(**N<sup>2</sup>** log **N**) solution per test case (or O(**N<sup>2</sup>**) if you use the fact that each edge weight is either 1 or 2).

## Test set 2 (Hidden)

Intuitively, we want to include as many edges of weight 1 as possible. Once we've included as many such edges as we can, then we know that the rest of the edges in the spanning tree will be weight 2.

Using this idea, we have the following solution: first create a [spanning forest](https://en.wikipedia.org/wiki/Spanning_tree#Spanning_forests) using only edges of weight 1. We can now connect each of the components of the spanning forest together using X-1 edges of weight 2, where X is the number of components (this is possible since the graph is complete).

Since we only need to print the minimum cost and not the actual minimum spanning tree, we can simplify the problem to simply counting the number of components in the graph where we only consider the edges of weight 1.

This solves the problem in O(**N**).
