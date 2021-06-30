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
  int T, N;
  int citation;
  priority_queue<int, vector<int>, greater<int>> heap;

  cin >> T;
  for (int t = 0; t < T; t++)
  {
    cin >> N;
    heap = priority_queue<int, vector<int>, greater<int>>();
    cout << "Case #" << t + 1 << ":";

    int hIndex = 0;
    for (int i = 0; i < N; i++)
    {
      cin >> citation;
      heap.push(citation);
      while (!heap.empty() && heap.top() <= hIndex)
      {
        heap.pop();
      }
      if (heap.size() > hIndex)
      {
        hIndex++;
      }
      cout << " " << hIndex;
    }
    cout << endl;
  }

  return 0;
}