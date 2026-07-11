# NaviQ
### Intelligent Indoor Campus Navigation & Emergency Evacuation System For KIIT Campus - 25

<p align="center">

<img src="logo.png" width="160"/>

<h3>Navigate Smarter. Evacuate Faster.</h3>

<p>
An intelligent web-based campus navigation system that helps users find the safest route inside a multi-floor academic building while comparing different pathfinding algorithms in real time.
</p>

</p>

---

## Project Overview

Imagine entering a huge university building for the very first time.

You need to find:

- your classroom
- the library
- director's office
- washroom
- exit
- staircase
- lift

Now imagine an emergency such as a fire or earthquake.

The usual route suddenly becomes blocked.

What should happen?

Instead of confusing people, **NaviQ** instantly searches for another safe path and recommends the best possible route using Artificial Intelligence search algorithms.

This project demonstrates how AI search techniques can make indoor navigation smarter and emergency evacuation safer.

---

# Why NaviQ?

Large educational campuses often have:

- Multiple floors
- Hundreds of classrooms
- Complex corridors
- Several exits
- Dynamic obstacles during emergencies

Traditional maps cannot adapt when paths become blocked.

NaviQ solves this by generating routes dynamically and comparing multiple algorithms before selecting the most efficient one.

---

# What Makes NaviQ Unique?

### Smart Indoor Navigation

Navigate between different rooms inside a campus building.

---

### Multi-Floor Support

Supports navigation across

- Ground Floor
- First Floor
- Second Floor
- Third Floor

---

### Intelligent Pathfinding

Instead of relying on one algorithm, NaviQ executes multiple search algorithms and compares them automatically.

Algorithms include:

- Breadth First Search (BFS)
- Depth First Search (DFS)
- Best First Search
- A* Search

---

### Dynamic Emergency Simulation

During evacuation,

the system intentionally blocks parts of the best path to simulate situations like

- Fire
- Smoke
- Debris
- Closed Corridors

The algorithms immediately calculate a new safe route.

---

### Performance Analysis

Every algorithm is evaluated based on

- Path Length
- Path Cost
- Nodes Explored
- Execution Time

The system then recommends the best algorithm for the current scenario.

---

### Random Campus Generation

Every generated map is different.

This allows testing on hundreds of different building layouts without manually designing each one.

---

# Project Workflow

```text
Generate Campus Map
        │
        ▼
Choose Floor
        │
        ▼
Select Start Location
        │
        ▼
Select Destination
        │
        ▼
Run All Algorithms
        │
        ▼
Compare Results
        │
        ▼
Select Best Route
        │
        ▼
Simulate Emergency
        │
        ▼
Recalculate New Safe Path
```

---

# Algorithms Used

| Algorithm | Purpose |
|-----------|----------|
| BFS | Finds shortest path in unweighted maps |
| DFS | Explores deep paths before backtracking |
| Best First Search | Uses heuristic distance to goal |
| A* Search | Combines path cost with heuristic for optimal navigation |

---

# How the System Chooses the Best Route

Instead of selecting the shortest path only,

NaviQ evaluates:

- Travel Cost
- Number of explored nodes
- Execution time

A combined score is calculated.

The algorithm with the lowest score becomes the recommended evacuation route.

---

# Campus Locations

The simulator contains realistic campus landmarks such as

### Academic Blocks

- A Block
- B Block
- C Block

### Facilities

- Library
- Director Office
- Ladies Washroom
- Gents Washroom

### Vertical Movement

- Lift 1
- Lift 2
- Lift 3

- Stairs 1
- Stairs 2
- Stairs 3

### Emergency

- Multiple Exit Points

---

# Emergency Simulation

Normal navigation

```text
Start
   │
   ▼
Safe Route
   │
   ▼
Destination
```

Emergency

```text
Start
   │
   ▼
Route Blocked
   │
   ▼
Alternative Route Calculated
   │
   ▼
Safe Exit
```

This demonstrates real-world disaster management where corridors may suddenly become unusable.

---

# Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)

## Algorithms

- Breadth First Search
- Depth First Search
- Best First Search
- A* Search

## Concepts

- Artificial Intelligence
- Graph Search
- Heuristic Search
- Indoor Navigation
- Emergency Evacuation
- Dynamic Obstacle Handling

---

# Project Structure

```
NaviQ
│
├── index.html
├── style.css
├── script.js
├── logo.png
└── README.md
```

---

# User Guide

### Step 1

Generate a new campus.

---

### Step 2

Select a floor.

---

### Step 3

Choose your starting location.

---

### Step 4

Choose your destination.

---

### Step 5

Click

```
Find Best Path
```

---

### Step 6

Observe

- Best route
- Algorithm comparison
- Execution statistics

---

### Step 7

Watch the emergency simulation where the route becomes blocked and a new safe path is generated.

---

# Example Scenario

Suppose a student wants to travel from

```
Library
```

to

```
A-101
```

Initially,

BFS may find the shortest route.

Suddenly,

a corridor is blocked because of an emergency.

NaviQ recalculates another safe path using all algorithms again and recommends the most efficient alternative.

---

# Educational Value

This project demonstrates practical applications of

- Artificial Intelligence
- Graph Theory
- Search Algorithms
- Emergency Planning
- Smart Campus Technology
- Human-Centered Computing

It is suitable for:

- AI Laboratory
- Data Structures
- Graph Theory
- Smart City Projects
- Disaster Management Demonstrations
- Academic Mini Projects

---

# Future Improvements

Possible future enhancements include

- Interactive building blueprint import
- Real-time fire sensor integration
- Live IoT obstacle detection
- Voice-guided indoor navigation
- GPS + Indoor Hybrid Navigation
- Mobile application
- Wheelchair-friendly route optimization
- Real campus deployment
- Dijkstra's Algorithm
- Bidirectional Search
- Floyd-Warshall Analysis
- Machine Learning based congestion prediction

---

# Learning Outcomes

After exploring NaviQ, a learner will understand

- How search algorithms work
- Difference between BFS and DFS
- Why A* is efficient
- Heuristic search concepts
- Dynamic obstacle handling
- Indoor navigation systems
- Emergency evacuation planning
- Algorithm performance comparison

---

# Project Highlights

- Multi-floor campus simulation
- Dynamic obstacle generation
- Emergency evacuation planning
- AI-based route optimization
- Real-time algorithm comparison
- Interactive visualization
- Beginner-friendly interface
- Lightweight and fast
- No external libraries required

---

# Author

**Pratik Pokhrel**

B.Tech Computer Science & Engineering

KIIT Deemed to be University

---

# License

This project is developed for educational and research purposes.

Feel free to learn from it, improve it, and build even smarter navigation systems.

---

<p align="center">

### If this project helped you understand AI-powered campus navigation, consider giving it a ⭐.

**Happy Learning!**

</p>
