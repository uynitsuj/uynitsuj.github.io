---
layout: post
title:  "Leading Heuristic Algorithm for Homogeneous-Sized Task Scheduling"
excerpt: "Discussion of new heuristic that is giving near perfect performance bounds."
categories: [internship]
---

Over the past month, I have developed strong analytical intuition for structures of the optimal speed-scaled scheme in simple workload cases to minimize the total response time and energy. The overall objective is to construct a scheduling framework that can provide us a worst-case approximation guarantee for the objective function value. As the problem uses the speed-scaling technique to optimize time and energy used, our goal is to accurately calculate or approximate the optimal speed that a task should run at. Here, I will also bring up the notion of pseudosize; the pseudosize of a task is dependent on the number of dependencies on the task's machine and other machines. We rely on finding the optimal pseudosize to estimate the optimal speed that each task needs to run at. As described below, the idea of an optimal pseudosize is easy to conceptualize using any DAG workload and 1 machine. It because more difficult in multi-machine examples due to the precedence relationships of tasks between machines. 

From my observations on how ordering, DAG structure, and optimal pseudosize relate to one another, I have been able to construct a heuristic that has been fairly accurate in its pseudosize approximations given an ordering and the DAG in the case of mean response time. Below, I omitted the explicit pseudocode but I do refer to certain variable names to outline the algorithm correctness for the pseudosize approximation algorithm and the intuitions behind it:

#### Intuitions for Algorithm Correctness

INPUT: an ordering (obtained by a modified version of ETF) and the DAG.  <br />

OUTPUT: $p(\cdot)$ mapping a task to its approximated pseudosize  <br />



This is a dynamic programming algorithm. For the base case, we assign pseudosizes to the set of tasks running in the last time interval. The optimal pseudosize for these tasks can be easily verified to be 1; by construction, all these tasks must have no remaining tasks in the next interval relying on their completion. <br />

Next, we iteratively work backward through the task groups. For some interval set $intervalset[i]$, we work to find subsets of the tasks in the set that will be assigned the same pseudosize if they have dependencies in the next immediate interval $intervalset[i+1]$. We only look at the next interval group because of the observation that in this problem setting of precedence-constrained speed scaling, optimal task speeds continue to display the similar behaviors as the setting of no precedence constraints (i.e. there, speeds are dependent on number of remaining tasks on the same machine), but now, a task's speed solely relies on the remaining tasks on the same machine and children that can immediately run after the task. Otherwise, there is no urgency for the task to run faster, so the psuedosize will be kept small. In the heuristic, we will use these two interval sets to construct the set of active dependencies and subset of tasks; for each task $j'$ in the set of dependencies, at least two tasks (that have yet to be given pseudosize assignments) in $intervalset[i]$ are either both are parents of $j'$, or at least one task in $intervalset[i]$ is a parent of $j'$ and at least one task in $intervalset[i]$ has $j'$ running immediately afterwards on its assigned machine. These parents will be placed in the subset of tasks. <br />

We then use the information from the dependencies set and the task subset to assign the same pseudosizes for all tasks in the task subset. The intuition for assigning the same pseudosize is that the task subset should complete at the same time before their dependencies start to help minimize idle time (having some task finish earlier doesn't allow its dependencies start earlier $\implies$ idle time). As a result, assuming that the interval gives the same start time for all tasks in $intervalset[i]$, we assign them the same speed of $s_j$, and the pseudosize is directly related to speed. <br />

In our heuristic, we then update the pseudosize of all the tasks in our task subset to 

$$p(j) \leftarrow \frac{\sum_{j' \in c} p(j') + (\text{number of tasks in the subset of tasks})}{\text{number of tasks in the subset of tasks}}$$




Here, $s_j$ is the speed of task $j$ and $d_j$ is intuitively the number of tasks actively waiting on task $j$'s completion (in the 1 machine case, $d_j$ is the number of remaining tasks after task $j$). Thus, when the algorithm identifies a task subset with multiple tasks, then as our heuristic assumes that they start and end at the same time, we will give them the same speed. Given that these tasks $j$ in the task subset will have the same speed, our optimization problem becomes



$$
\sum_{j \in \text{task subset}} \frac{d_j}{s_j}  = \sum_{j \in \text{task subset}} s_j
$$


$$
\frac{\sum_{j \in \text{task subset}} d_j}{s_j} = (\text{number of tasks in task subset})(s_j)
$$


$$
s_j = \sqrt{\frac{\sum_{j \in \text{task subset}} d_j}{\text{number of tasks in task subset}}}
$$


$$
s_j = \sqrt{ \frac{\sum_{j' \in c} p(j') + (\text{number of tasks in the subset of tasks})}{\text{number of tasks in task subset}}}
$$



Our current interpretation of the pseudosize is the value inside the square root, giving us our current method of approximating the pseudosize. 
        


This current heuristic has been performing very well on the empirical side (as numerical reference, the worst-case ratio of the overall objective function value was 1.1087 after running hundreds of random DAGs instances with up to 1000 nodes, 1000 edges, 1000 machines), though work is still being done on analytically proving that the objective function value with the approximated pseudosizes is close to the optimal.  

