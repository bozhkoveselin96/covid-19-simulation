# Description of the simulation.
#### By default we have a matrix (world) 10x10, with 100 people.
#### Аt the beginning you have a form for entering the number of days of the simulation.
#### Once the simulation begins, the day before the first infected person is released (day 0), all people (100) are healthy.
#### The first day (day 1) the first infected person is randomly placed in the matrix (world).
#### Each infected person can infect only one person per day and the priority is as follows:
- to the right of the infected;
- over the infected;
- to the left of the infected;
- bellow the infected;

#### On the day a person is infected, he cannot infect anyone 
#### The infected recover after 3 days and can no longer be infected

