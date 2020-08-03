---
layout: post
title:  "In-Depth Intro to Speed-Scaled Task Scheduling on Large-Scale ML cloud platforms"
excerpt: "Overview and motivation for summer internship project 2020."
categories: [internship]
---

The prominence of large-scale, general-purpose machine learning platforms on the cloud such as Microsoft Azure and Google Cloud Platform have accelerated the construction of increasingly computationally demanding models with considerable energy use. Just look at the numbers; as noted in a recent NYTimes article about AI research (cited below), the Allen Institute for Artificial Intelligence reported the observation that compared to the past 6 years, the volume of calculations needed to be a leader in advanced A.I. had soared an estimated 300,000 times. Concurrently, the cost of training and energy also scales up dramatically. <br />


In the machine learning community, these model workflows are typically expressed via a directed acyclic graph, where vertices and directed edges represent the tasks in job batches and precedence relationships between tasks, respectively. The energy consumption of the platforms relies on how these precedence-constrained tasks are scheduled across machines, motivating the goal of developing speed-scaling scheduling designs that optimize a trade-off between energy consumption and performance. However, finding the optimal schedule for the tasks is NP-hard; there is no general polynomial-time algorithm with guaranteed solutions. Instead, approximation algorithms and/or heuristics would have to be constructed for this optimization problem. <br />

The earliest variant of a scheduling approximation algorithm, List Scheduling, was proposed by Graham in 1966. The problem sets up a sequence of $n$ precedence-constrained tasks for assignment to $m$ identical machines. The goal of the algorithm was to minimize the makespan, the completion time of the last job. List Scheduling was proven to be a $(2 - \frac{1}{m})$-approximation algorithm, which is currently the best guarantee for the simple case. Makespan is not the only performance metric used for scheduling problems; other common metrics include total weighted completion time and mean total response time. Over the past 50 years, regardless of metric, two features of the scheduling problem have proven difficult to generalize and incorporate into approximation algorithms: (i) machines are heterogeneous with different processing speeds, (ii) there exists a non-zero communication time between tasks. <br />

A breakthrough happened in 2019 when a general greedy algorithmic framework was developed to incorporate both issues. Yu Su (my grad mentor) proposed Generalized Earliest Time First (GETF), a theoretical result that computes a makespan of at most length $O(\frac{\log m}{\log \log m})\text{OPT}^{(i)} + C$, where $\text{OPT}^{(i)}$ is the optimal schedule length when communication time is ignored and $C$ is the amount of communication time in a chain in the precedence graph. GETF uses a group assignment function (solved as a linear programming (LP) problem, relaxed from a mixed-integer linear programming (MILP) problem) to group machines of similar speeds and uses the Earliest Time First (ETF) greedy allocation rule to assign tasks to machines. <br />

However, no previous work has been done to analyze the incorporation of power consumption as a metric for scheduling performance. This drives the motivation for designing an algorithmic speed-scaled scheduler that accounts for the trade-offs between power consumption and performance. <br />

This summer, my grad student and I plan to investigate how to combine performance metrics such as makespan and mean total response time with energy usage into the optimization problem. This project will be done as an extension of Su's theoretical work on GETF. The development of a new framework using a modified optimization strategy will enable us to give an improved generalization of the scheduling problem under settings that can be realistically modeled to real-world systems scenarios that balance the power and performance trade-off. <br />

### References

1. Ruben Mayer, Christian Mayer, and Larissa Laich. The tensorow partitioning and scheduling problem.
Proceedings of the 1st Workshop on Distributed Infrastructures for Deep Learning - DIDL 17, 2017.
2. Michael R. Garey and David S. Johnson. Computers and intractability: a guide to the theory of NP -
completeness. W.H. Freeman and Co., 2003.
3. E. G. Coman and R. L. Graham. Optimal scheduling for two-processor systems. Acta Informatica, 1(3):200-213, 1972.
4. Shi Li. Scheduling to minimize total weighted completion time via time-indexed linear programming
relaxations. 2017 IEEE 58th Annual Symposium on Foundations of Computer Science (FOCS), 2017.
5. Yu Su, Xiaoqi Ren, Shai Vardi, Adam Wierman, and Yuxiong He. Communication-aware scheduling of
precedence-constrained tasks. ACM SIGMETRICS Performance Evaluation Review, 47(2):21-23, 2019.
6. Jing-Jang Hwang, Yuan-Chieh Chow, Frank D. Anger, and Chung-Yee Lee. Scheduling precedence graphs
in systems with interprocessor communication times. volume 18, page 244-257, 1989.
7. Emma Strubell, Ananya Ganesh, and Andrew Mccallum. Energy and policy considerations for deep
learning in nlp. Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics, 2019.
8. Steve Lohr. Universities and Tech Giants Back National Cloud Computing Project. NYTimes, 2020
