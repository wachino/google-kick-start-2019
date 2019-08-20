#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
#include <set>
#include <map>
#include <queue>

using namespace std;

int main()
{
  /*
  Limits:
    Time limit: 
      30 seconds per test set.
    Memory limit: 
      1GB.
    Vars
      1 ≤ T ≤ 100.
      1 ≤ K < N
      1 ≤ Ci ≤ 10^9, for all i.
      1 ≤ Xi ≤ 10^9, for all i.
      Xi ≠ Xj for all i ≠ j.

    Test set 1 (Visible)
      2 ≤ N ≤ 100

    Test set 2 (Hidden)
      There will be at most 5 cases with 500 < N ≤ 10^5.
      The remaining cases will have 2 ≤ N ≤ 500
  */

  int T;
  long long K, N;
  priority_queue<long long> heap;
  long long spots[100001];
  long long sortedSpotIndex[100001];
  long long buildCosts[100001];
  long long leftCosts[100001];
  long long rightCosts[100001];
  long long heapSum, lastSpot, mid, minTmpCost, min;
  cin >> T;

  for (int t = 0; t < T; t++)
  {
    cin >> K >> N;
    heap = priority_queue<long long>();
    lastSpot = 0LL;
    minTmpCost = LLONG_MAX;
    min = LLONG_MAX;

    for (int i = 0; i < N; i++)
    {
      cin >> spots[i];
      sortedSpotIndex[i] = i;
      leftCosts[i] = LLONG_MAX;
      rightCosts[i] = LLONG_MAX;
      if (spots[i] > lastSpot)
      {
        lastSpot = spots[i];
      }
    }
    for (int i = 0; i < N; i++)
    {
      cin >> buildCosts[i];
    }
    sort(sortedSpotIndex, sortedSpotIndex + N, [&spots](int a, int b) { return spots[a] < spots[b]; });
    heapSum = 0LL;
    mid = K / 2LL;
    for (int i = 0; i < mid; i++)
    {
      int id = sortedSpotIndex[i];
      long long vi = lastSpot - spots[id] + buildCosts[id];
      heap.push(vi);
      heapSum += vi;
    }
    minTmpCost = heapSum - mid * (lastSpot - spots[sortedSpotIndex[mid]]);
    leftCosts[mid] = minTmpCost;
    for (int i = mid; i < N - (K - mid) - 1; i++)
    {
      if (heap.empty())
      {
        leftCosts[i + 1] = minTmpCost;
        continue;
      }
      int id = sortedSpotIndex[i];
      long long vi = lastSpot - spots[id] + buildCosts[id];
      long long top = heap.top();
      if (vi < top)
      {
        heap.pop();
        heap.push(vi);
        heapSum -= top;
        heapSum += vi;
      }
      leftCosts[i + 1] = heapSum - mid * (lastSpot - spots[sortedSpotIndex[i + 1]]);
    }

    heap = priority_queue<long long>();
    heapSum = 0;
    for (int i = N - 1; i >= N - (K - mid); i--)
    {
      int id = sortedSpotIndex[i];
      long long vi = spots[id] + buildCosts[id];
      heap.push(vi);
      heapSum += vi;
    }
    minTmpCost = heapSum - spots[sortedSpotIndex[N - (K - mid) - 1]] * (K - mid);
    rightCosts[N - (K - mid) - 1] = minTmpCost;
    for (int i = N - (K - mid) - 1; i >= (K - mid); i--)
    {
      int id = sortedSpotIndex[i];
      long long vi = spots[id] + buildCosts[id];
      long long top = heap.top();
      if (vi < top)
      {
        heap.pop();
        heap.push(vi);
        heapSum -= top;
        heapSum += vi;
      }
      rightCosts[i - 1] = heapSum - spots[sortedSpotIndex[i - 1]] * (K - mid);
    }

    for (int i = mid; i < N - (K - mid); i++)
    {
      if (leftCosts[i] + rightCosts[i] + buildCosts[sortedSpotIndex[i]] < min)
      {
        min = leftCosts[i] + rightCosts[i] + buildCosts[sortedSpotIndex[i]];
      }
    }
    cout << "Case #" << t + 1 << ": " << min << endl;
  }

  return 0;
}