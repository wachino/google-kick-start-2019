#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
#include <set>
#include <map>

using namespace std;

int main()
{
  /*
  Limits:
    Time limit: 
      15 seconds per test set.
    Memory limit: 
      1GB.
    Vars
      1 ≤ T ≤ 100.
      1 ≤ Hi ≤ N, for all i.
    Test set 1 (Visible):
      2 ≤ N ≤ 100.
      1 ≤ G ≤ 100.
      0 ≤ M ≤ 100.
    Test set 2 (Hidden):
      2 ≤ N ≤ 10^5.
      1 ≤ G ≤ 10^5.
      0 ≤ M ≤ 10^9.
  */
  int T, N, G, M;
  int initialPos;
  char dir;
  int positions[100001];
  int rememberBy[100001];
  int clockWiseGroupRememberBy[100001];
  int antiClockWiseGroupRememberBy[100001];
  int lastGroupVisitedAt[100001];
  map<int, set<int>> clockGroups;
  map<int, set<int>> counterClockGroups;

  cin >> T;

  for (int t = 0; t < T; t++)
  {
    clockGroups.clear();
    counterClockGroups.clear();
    cin >> N >> G >> M;

    for (int i = 0; i < G; i++)
    {
      cin >> initialPos >> dir;
      if (dir == 'C')
      {
        positions[i] = ((initialPos + M - 1) % N);
        clockGroups[((initialPos + M - 1) % N)].insert(i);
      }
      else
      {
        positions[i] = (((initialPos - M - 1) % N) + N) % N;
        counterClockGroups[(((initialPos - M - 1) % N) + N) % N].insert(i);
      }
      rememberBy[i] = 0;
    }
    for (int i = 0; i < N; i++)
    {
      lastGroupVisitedAt[i] = -1;
      clockWiseGroupRememberBy[i] = 0;
      antiClockWiseGroupRememberBy[i] = 0;
    }

    if (!clockGroups.empty())
    {
      int last = clockGroups.begin()->first;
      auto it = clockGroups.rbegin();
      int next = it->first;
      int pastTime = last + 1;
      for (int i = N - 1; i >= 0; i--)
      {
        if (next == i)
        {
          last = next;
          pastTime = 0;
          it++;
          if (it != clockGroups.rend())
          {
            next = it->first;
          }
        }
        if (pastTime <= M)
        {
          lastGroupVisitedAt[i] = pastTime;
        }
        pastTime++;
      }
    }

    if (!counterClockGroups.empty())
    {
      int last = counterClockGroups.rbegin()->first;
      auto cit = counterClockGroups.begin();
      int next = cit->first;
      int pastTime = N - last;
      for (int i = 0; i < N; i++)
      {
        if (next == i)
        {
          last = next;
          pastTime = 0;
          cit++;
          if (cit != counterClockGroups.end())
          {
            next = cit->first;
          }
        }
        if (pastTime <= M)
        {
          if (lastGroupVisitedAt[i] == -1 || pastTime < lastGroupVisitedAt[i])
          {
            lastGroupVisitedAt[i] = pastTime;
          }
        }
        pastTime++;
      }
    }

    for (int i = 0; i < N; i++)
    {
      if (lastGroupVisitedAt[i] != -1)
      {
        if (clockGroups.count((i + lastGroupVisitedAt[i]) % N))
        {
          clockWiseGroupRememberBy[(i + lastGroupVisitedAt[i]) % N]++;
        }
        if (counterClockGroups.count((((i - lastGroupVisitedAt[i]) % N) + N) % N))
        {
          antiClockWiseGroupRememberBy[(((i - lastGroupVisitedAt[i]) % N) + N) % N]++;
        }
      }
    }
    for (int i = 0; i < N; i++)
    {
      if (clockGroups.count(i))
      {
        set<int> g = clockGroups[i];
        for (auto groupIt = g.begin(); groupIt != g.end(); groupIt++)
        {
          rememberBy[*groupIt] += clockWiseGroupRememberBy[i];
        }
      }
      if (counterClockGroups.count(i))
      {
        set<int> cg = counterClockGroups[i];
        for (auto cgroupIt = cg.begin(); cgroupIt != cg.end(); cgroupIt++)
        {
          rememberBy[*cgroupIt] += antiClockWiseGroupRememberBy[i];
        }
      }
    }

    cout << "Case #" << t + 1 << ":";

    for (int i = 0; i < G; i++)
    {
      cout << " " << rememberBy[i];
    }
    cout << endl;
  }

  return 0;
}