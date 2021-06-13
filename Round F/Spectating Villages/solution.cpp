#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
#include <set>
#include <map>

using namespace std;

long long maxBeauty(long long node, long long parentOn, long long on);

long long beauty[100001];
vector<long long> roads[100001];
long long mb[100001][2][2];
vector<vector<long long>> dp[100001];

void removeParents(long long node, long long parent)
{
  if (parent != -1)
  {
    roads[node].erase(remove(roads[node].begin(), roads[node].end(), parent), roads[node].end());
  }
  for (auto it = roads[node].begin(); it != roads[node].end(); it++)
  {
    removeParents(*it, node);
  }
}

void computeDinamic(long long node, long long child, long long on)
{

  if (dp[node][child - 1][on] == -1)
  {
    computeDinamic(node, child - 1, on);
  }

  if (on)
  {
    long long a = maxBeauty(roads[node][child - 1], 0, 0);
    if (child == 1)
    {
      a = maxBeauty(roads[node][child - 1], 0, 1);
    }
    dp[node][child][1] = max(
        dp[node][child - 1][1] + max(a, maxBeauty(roads[node][child - 1], 0, 1)),
        dp[node][child - 1][0] + maxBeauty(roads[node][child - 1], 0, 1));
  }
  else
  {
    dp[node][child][0] =
        dp[node][child - 1][0] + maxBeauty(roads[node][child - 1], 0, 0);
  }
}

long long maxBeauty(long long node, long long parentOn, long long on)
{
  if (mb[node][parentOn][on] == -1)
  {
    long long ans = 0;
    if (on)
    {
      ans += beauty[node];
      for (auto it = roads[node].begin(); it != roads[node].end(); it++)
      {
        ans += max(maxBeauty(*it, on, 1), maxBeauty(*it, on, 0));
      }
    }
    else
    {
      if (parentOn)
      {
        ans += beauty[node];
        for (auto it = roads[node].begin(); it != roads[node].end(); it++)
        {
          ans += max(maxBeauty(*it, on, 0), maxBeauty(*it, on, 1));
        }
      }
      else
      {
        if (dp[node][roads[node].size()][0] == -1)
        {
          computeDinamic(node, roads[node].size(), 0);
        }
        if (dp[node][roads[node].size()][1] == -1)
        {
          computeDinamic(node, roads[node].size(), 1);
        }
        long long a = dp[node][roads[node].size()][0];
        if (roads[node].size() > 0)
        {
          a = beauty[node] + dp[node][roads[node].size()][1];
        }
        ans += max(a, dp[node][roads[node].size()][0]);
      }
    }
    mb[node][parentOn][on] = ans;
  }
  return mb[node][parentOn][on];
}

int main()
{
  long long T;
  long long V;
  long long x, y;

  cin >> T;

  for (long long t = 0; t < T; t++)
  {
    cin >> V;
    for (long long i = 0; i < V; i++)
    {
      cin >> beauty[i];
      roads[i].clear();
      mb[i][0][0] = -1;
      mb[i][0][1] = -1;
      mb[i][1][0] = -1;
      mb[i][1][1] = -1;

      dp[i].clear();
    }
    for (long long i = 0; i < V - 1; i++)
    {
      cin >> x >> y;
      x--;
      y--;
      roads[x].push_back(y);
      roads[y].push_back(x);
    }
    removeParents(0, -1);

    for (long long i = 0; i < V; i++)
    {
      for (long long j = 0; j <= roads[i].size(); j++)
      {
        vector<long long> pb;
        pb.push_back(-1);
        pb.push_back(-1);
        dp[i].push_back(pb);
      }
      dp[i][0][0] = 0;
      dp[i][0][1] = 0;
    }
    long long a = maxBeauty(0, 0, 0);
    long long b = maxBeauty(0, 0, 1);
    cout << "Case #" << t + 1 << ": " << max(a, b) << endl;
  }

  return 0;
}