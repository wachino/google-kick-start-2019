#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>

using namespace std;

long long int dp[1001][1001][2];
vector<long long> positionsByColor[1001];

long long int getMinSecsToObserveKDogsWithIColors(int color, int k, int selectedLastColor)
{
  if (dp[color][k][selectedLastColor] < 0)
  {
    long long int minWithout, minWith, tmp, sk;
    if (!selectedLastColor)
    {
      minWithout = color > 0 ? getMinSecsToObserveKDogsWithIColors(color - 1, k, selectedLastColor) : INT_MAX;
      sk = 1;
      for (auto it = positionsByColor[color].begin(); it != positionsByColor[color].end() && sk <= k; it++)
      {
        tmp = (*it) * 2L + getMinSecsToObserveKDogsWithIColors(color - 1, k - sk, selectedLastColor);
        if (tmp < minWithout)
        {
          minWithout = tmp;
        }
        sk++;
      }
      dp[color][k][selectedLastColor] = minWithout;
    }
    else
    {
      minWith = color > 0 ? min(getMinSecsToObserveKDogsWithIColors(color - 1, k, selectedLastColor), getMinSecsToObserveKDogsWithIColors(color - 1, k, 1 - selectedLastColor)) : INT_MAX;
      sk = 1;
      for (auto it = positionsByColor[color].begin(); it != positionsByColor[color].end() && sk <= k; it++)
      {
        tmp = (*it) + getMinSecsToObserveKDogsWithIColors(color - 1, k - sk, 1 - selectedLastColor);
        if (tmp < minWith)
        {
          minWith = tmp;
        }

        tmp = (*it) * 2 + getMinSecsToObserveKDogsWithIColors(color - 1, k - sk, selectedLastColor);
        if (tmp < minWith)
        {
          minWith = tmp;
        }
        sk++;
      }
      dp[color][k][selectedLastColor] = minWith;
    }
  }

  return dp[color][k][selectedLastColor];
}

int main()
{
  /*
    Limits:
      1 ≤ T ≤ 100.
      1 ≤ K ≤ N.
      1 ≤ Ai ≤ 1000.
      1 ≤ Pi ≤ 105.

    Test set 1 (Visible):
      1 ≤ N ≤ 50.

    Test set 2 (Hidden):
      1 ≤ N ≤ 1000.
  */
  int T, N, K, color;
  int positions[1001];
  cin >> T;

  for (int t = 0; t < T; t++)
  {
    cin >> N >> K;
    for (int i = 0; i < 1001; i++)
    {
      positionsByColor[i].clear();
      for (int j = 0; j < 1001; j++)
      {
        if (j == 0)
        {
          dp[i][j][0] = 0;
          dp[i][j][1] = 0;
        }
        else
        {
          dp[i][j][0] = (i == 0 ? INT_MAX : -1);
          dp[i][j][1] = (i == 0 ? INT_MAX : -1);
        }
      }
    }
    for (int i = 0; i < N; i++)
    {
      cin >> positions[i];
    }
    for (int i = 0; i < N; i++)
    {
      cin >> color;
      positionsByColor[color].push_back(positions[i]);
    }
    for (int i = 0; i < 1001; i++)
    {
      sort(positionsByColor[i].begin(), positionsByColor[i].end());
    }

    cout << "Case #" << t + 1 << ": " << getMinSecsToObserveKDogsWithIColors(1000, K, 1) << endl;
  }

  return 0;
}