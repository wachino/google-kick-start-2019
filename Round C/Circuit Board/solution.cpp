#include <iostream>
#include <algorithm>
#include <vector>
#include <climits>

using namespace std;

int kadane(int arr[310], int minRow[300], int maxRow[300], int K, int n)
{

  int sum = 0, maxSum = INT_MIN, i;

  // local variable
  int local_start = 0;

  int currMin;
  int currMax;
  for (i = 0; i < n; ++i)
  {
    if (i == 0)
    {
      sum = 0;
      currMin = minRow[i];
      currMax = maxRow[i];
    }
    if (maxRow[i] > currMax)
    {
      currMax = maxRow[i];
    }
    if (minRow[i] > currMin)
    {
      currMin = minRow[i];
    }
    if (currMax - currMin > K)
    {
      sum = arr[i];
      currMin = minRow[i];
      currMax = maxRow[i];
    }
    else
    {
      sum += arr[i];
    }

    if (sum < 0)
    {
      sum = 0;
      if (i < n)
      {
        currMin = minRow[i + 1];
        currMax = maxRow[i + 1];
      }
      local_start = i + 1;
    }
    if (sum > maxSum)
    {
      maxSum = sum;
    }
  }

  return maxSum;
}

int main()
{
  int T;
  int R, C, K;
  int board[310][310];
  int maxRow[310];
  int minRow[310];
  int sumRow[310];
  cin >> T;
  for (int t = 0; t < T; t++)
  {
    int maxSum = INT_MIN;
    int sum;

    cin >> R >> C >> K;

    for (int i = 0; i < R; i++)
    {
      for (int j = 0; j < C; j++)
      {
        cin >> board[i][j];
      }
    }

    for (int i = 0; i < C; i++)
    {
      for (int j = i; j < C; j++)
      {
        for (int k = 0; k < R; k++)
        {
          if (i == j)
          {
            maxRow[k] = board[k][j];
            minRow[k] = board[k][j];
            sumRow[k] = 1;
          }
          else
          {
            if (board[k][j] > maxRow[k])
            {
              maxRow[k] = board[k][j];
            }
            if (board[k][j] < minRow[k])
            {
              minRow[k] = board[k][j];
            }
            if (maxRow[k] - minRow[k] > K || sumRow[k] < 0)
            {
              sumRow[k] = INT_MIN;
            }
            else
            {
              sumRow[k]++;
            }
          }
        }
        sum = kadane(sumRow, minRow, maxRow, K, R);
        if (sum > maxSum)
        {
          maxSum = sum;
        }
      }
    }

    cout << "Case #" << t + 1 << ": " << maxSum << endl;
  }

  return 0;
}