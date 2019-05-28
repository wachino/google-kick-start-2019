#include <iostream>
#include <algorithm>
#include <vector>
#include <iterator>
#include <set>

using namespace std;
vector<pair<int, int>> rowIntervals[50001];
vector<pair<int, int>> columnIntervals[50001];
int R, C;

void visit(int row, int column)
{
  auto colit = find_if(columnIntervals[column].begin(), columnIntervals[column].end(), [&](pair<int, int> p) {
    return p.first <= (row - 1) && (row - 1) <= p.second;
  });
  if (colit != columnIntervals[column].end())
  {
    ++(colit->second);
  }
  auto colit2 = find_if(columnIntervals[column].begin(), columnIntervals[column].end(), [&](pair<int, int> p) {
    return p.first <= (row + 1) && (row + 1) <= p.second;
  });
  if (colit2 != columnIntervals[column].end())
  {
    --(colit2->first);
  }
  if (colit != columnIntervals[column].end() && colit2 != columnIntervals[column].end())
  {
    colit->second = colit2->second;
    columnIntervals[column].erase(colit2);
  }
  else if (colit == columnIntervals[column].end() && colit2 == columnIntervals[column].end())
  {
    columnIntervals[column].push_back(make_pair(row, row));
  }

  auto rowit = find_if(rowIntervals[row].begin(), rowIntervals[row].end(), [&](pair<int, int> p) {
    return p.first <= (column - 1) && (column - 1) <= p.second;
  });
  if (rowit != rowIntervals[row].end())
  {
    ++(rowit->second);
  }
  auto rowit2 = find_if(rowIntervals[row].begin(), rowIntervals[row].end(), [&](pair<int, int> p) {
    return p.first <= (column + 1) && (column + 1) <= p.second;
  });
  if (rowit2 != rowIntervals[row].end())
  {
    --(rowit2->first);
  }
  if (rowit != rowIntervals[row].end() && rowit2 != rowIntervals[row].end())
  {
    rowit->second = rowit2->second;
    rowIntervals[row].erase(rowit2);
  }
  else if (rowit == rowIntervals[row].end() && rowit2 == rowIntervals[row].end())
  {
    rowIntervals[row].push_back(make_pair(column, column));
  }
}

pair<int, int> solve(int startRow, int startColumn, const string &instructions, int N)
{

  int currRow = startRow - 1;
  int currColumn = startColumn - 1;
  rowIntervals[currRow].push_back(make_pair(currColumn, currColumn));
  columnIntervals[currColumn].push_back(make_pair(currRow, currRow));

  for (int i = 0; i < N; i++)
  {
    if (instructions[i] == 'N')
    {
      auto it = find_if(columnIntervals[currColumn].begin(), columnIntervals[currColumn].end(), [&](pair<int, int> p) {
        return p.first <= currRow && currRow <= p.second;
      });
      currRow = (it->first - 1);
      visit(currRow, currColumn);
    }
    else if (instructions[i] == 'S')
    {
      auto it = find_if(columnIntervals[currColumn].begin(), columnIntervals[currColumn].end(), [&](pair<int, int> p) {
        return p.first <= currRow && currRow <= p.second;
      });
      currRow = it->second + 1;
      visit(currRow, currColumn);
    }

    else if (instructions[i] == 'W')
    {
      auto it = find_if(rowIntervals[currRow].begin(), rowIntervals[currRow].end(), [&](pair<int, int> p) {
        return p.first <= currColumn && currColumn <= p.second;
      });
      currColumn = it->first - 1;
      visit(currRow, currColumn);
    }
    else if (instructions[i] == 'E')
    {
      auto it = find_if(rowIntervals[currRow].begin(), rowIntervals[currRow].end(), [&](pair<int, int> p) {
        return p.first <= currColumn && currColumn <= p.second;
      });
      currColumn = it->second + 1;
      visit(currRow, currColumn);
    }
  }
  return make_pair(currRow + 1, currColumn + 1);
}

int main()
{
  int T, N, startRow, startColumn;
  string instructions;

  cin >> T;
  for (int t = 0; t < T; t++)
  {
    cin >> N >> R >> C >> startRow >> startColumn;
    getline(cin, instructions);

    for (int i = 0; i < max(R, C); i++)
    {
      rowIntervals[i].clear();
      columnIntervals[i].clear();
    }

    getline(cin, instructions);

    pair<int, int> sol = solve(startRow, startColumn, instructions, N);

    cout << "Case #" << t + 1 << ": " << sol.first << " " << sol.second << endl;
  }

  return 0;
}