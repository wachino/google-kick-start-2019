#include <stdio.h>
#include <string.h>
int main()
{
    int T;
    scanf("%d", &T);
    int i = 0;
    int j = 0;
    int A, B, N;
    char res[20];

    for (i = 0; i < T; i++) {
         scanf("%d %d", &A, &B);
         scanf("%d", &N);
         for (j = 0; j < N; j++) {
             printf("%d\n",(A+B+1)/2);
             fflush(stdout);
             scanf("%s", res);
             if (strcmp("CORRECT",res) == 0) {
		break;
             } else if (strcmp("TOO_SMALL", res) == 0) {
                 A = (A+B+1)/2;
             } else if (strcmp("TOO_BIG", res) == 0) {
                 B = (A+B+1)/2 - 1;
             }
         }
    }
}