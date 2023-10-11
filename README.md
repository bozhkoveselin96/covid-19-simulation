# Simulation Description

This simulation revolves around a default matrix (world) with dimensions 10x10, populated by 100 individuals.
Initialization

At the outset, a form allows you to input the duration of the simulation in days.

- `Day 0` - On `day 0`, just before the first infected person is introduced, all **100** individuals are in good health.

- `Day 1` - The simulation begins with the introduction of the first infected person, randomly placed within the matrix (world).

Infection Dynamics
Each infected person can transmit the infection to only one person per day.

Transmission priority is as follows:
- To the right of the infected
- Over the infected
- To the left of the infected
- Below the infected

Infection Rules
- On the day a person is infected, they cannot further infect anyone.
- Infected individuals recover after 3 days and become immune to further infection.

This simulation offers an intriguing exploration of infection dynamics within a confined matrix. Feel free to experiment with the simulation parameters and observe the spread and recovery patterns.
