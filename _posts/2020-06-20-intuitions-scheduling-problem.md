---
layout: post
title:  "Basic Mathematical Intuitions for Speed-Scaled Task Scheduling"
excerpt: ""
categories: [internship]
---

In this post, I will describe basic intuitions developing for speed-scaled scheduling and extend them to more general workloads. I will express the workload as a directed acyclic graph (DAG), where the nodes represent the jobs that need to be completed and the edges represent the precedence constraints between jobs.


### Optimal dynamic speed scaling with 1 machine, n jobs


Suppose that we have $n$ tasks of various sizes ready to be scheduled on 1 machine. We will first consider the workload case with no precedence constraints. The cost to run some task $i$ is $T_i + E_i$, where $T_i$ is the total time that $i$ needs to wait and run and $E_i = P^{-1}(s_i)$, where $P^{-1}$ is the inverse power function and $s_i$ is the speed at which task $i$ runs at. We will define $P(s) = s^2$, where $s$ is the speed; in words, this is the power to run at speed $s$. Our objective is to minimize $T+E = \sum_i T_i + E_i$. 

Let's consider an instance where $n$ jobs of size $x_1 \geq x_2 \geq \dots \geq x_n$ arrive at time 0. Then,


$$T + E = \left(\frac{x_n}{s_n} + \frac{x_n}{s_n}P(s_n)\right) + \left(\frac{x_n}{s_n} + \frac{x_{n-1}}{s_{n-1}} + \frac{x_{n-1}}{s_{n-1}}P(s_{n-1})\right) + \dots$$


$$= x_n\left(\frac{n}{s_n} + \frac{P(s_n)}{s_n}\right) + x_{n-1}\left(\frac{n-1}{s_{n-1}} + \frac{P(s_{n-1})}{s_{n-1}}\right) + \dots $$


From above, we can observe that in this case, optimal speeds are dependent only on the number of jobs in the system, not the sizes. For each task $i$, the optimal speed occurs when 

$$
\frac{i}{s_i} = \frac{P(s_i)}{s_i}
$$


$$
\frac{i}{s_i} = s_i
$$

$$
s_i^2 = i
$$

$$
s_i = \sqrt{i}
$$

This implies that the speed at which a task $i$ runs at is dependent on the number of remaining tasks, $i$, left on the machine. This is also true for the objective of minimizing mean response time and energy: since the speed is optimized when $\frac{1}{n}(\frac{i}{s_i}) = \frac{P(s_i)}{s_i}$, the optimal speed that each task runs at is $s_i = \sqrt{\frac{i}{n}}$. Moreover, we can accurately calculate the pseudosize of a task to be precisely the number of tasks remaining. 

This relationship holds even if the tasks arrive with precedence constraints; since there is only one machine, we can simply construct a valid permutation of all the tasks such that the precedence constraints are satisfied. 




### Optimal dynamic speed scaling with m machines, n jobs 

#### Theoretical Intuition


We will first show that with no precedence constraints, the optimal schedule for a workload with $n$ unit size tasks is when tasks are distributed evenly across all $m$ machines. For simplicity, we will describe this using a 2-machine example. 

Suppose that we have $n$ tasks of size 1 ready to be scheduled on 2 machines, $m_1, m_2$, with no precedence constraints. 
We will have tasks indexed as $(1, 2, \dots, n)$ and define $N_1, N_2$ as the set of tasks assigned to machines $m_1, m_2$, respectively. Then, $N_1  = (1, 2, \dots, \mid N_1\mid )$ and $N_2 = (\mid N_1 \mid + 1, \dots, n )$. For each task $i$ running at speed $s_i$, we will define its power cost as $P(s_i) = s_i^2$.


On $m_1$, we have

$$
\min_{s_k \text{for } k \in [1, \mid N_1\mid ]} \left( \sum_{i = 1}^{\mid N_1\mid } \frac{1}{\mid N_1\mid }(\frac{i}{s_i}) + \frac{P(s_i)}{s_i})\right)
$$


This implies that on $m_1$, the optimal speed in which tasks run at is $s_i = \sqrt{\frac{i}{\mid N_i\mid }}$. Likewise, on $m_2$, we have 


$$
\min_{s_k \text{for } k \in [\mid N_1\mid +1, n]} \left( \sum_{i = \mid N_1\mid +1}^{n} \frac{1}{\mid N_2\mid }(\frac{i}{s_i}) + \frac{P(s_i)}{s_i})\right)
$$

With re-indexing, we have 

$$
\min_{s_k \text{for } k \in [\mid N_1\mid +1, n]} \left( \sum_{i = 1}^{\mid N_2\mid } \frac{1}{\mid N_2\mid }(\frac{i + \mid N_1\mid }{s_{i+\mid N_1\mid }}) + \frac{P(s_{i+\mid N_1\mid })}{s_{i+\mid N_1\mid }})\right)
$$

This implies that on $m_2$, the optimal speed in which tasks run at is $s_{i+ \mid N_1 \mid } = \sqrt{\frac{i + \mid N_1 \mid }{\mid N_2 \mid }}$. 

Our overall objective function over both machines is 

$$
\min_{s_k \text{for } k \in [1, \mid N_1\mid ]} \left( \sum_{i = 1}^{\mid N_1\mid } \frac{1}{\mid N_1\mid }(\frac{i}{s_i}) + \frac{P(s_i)}{s_i})\right) + \min_{s_k \text{for } k \in [\mid N_1\mid +1, n]} \left( \sum_{i = 1}^{\mid N_2\mid } \frac{1}{\mid N_2\mid }(\frac{i + \mid N_1\mid }{s_{i+\mid N_1\mid }}) + \frac{P(s_{i+\mid N_1\mid })}{s_{i+\mid N_1\mid }})\right) 
$$

After re-indexing, plugging in the optimal speeds and refining the objective function, we have that

$$
\min_{\mid N_1\mid , \mid N_2\mid } \sum_{i = 1}^{\mid N_1\mid } \left( \frac{i}{\mid N_1\mid }\sqrt{\frac{\mid N_1\mid }{i}} + \sqrt{\frac{i}{\mid N_1\mid }} \right) + \sum_{i =  1}^{\mid N_2\mid } \left( \frac{i}{\mid N_2\mid }\sqrt{\frac{\mid N_2\mid }{i}} + \sqrt{\frac{i}{\mid N_2\mid }} \right) 
$$

$$
\min_{\mid N_1\mid , \mid N_2\mid } \sum_{i = 1}^{\mid N_1\mid } \left( 2\frac{i}{\mid N_1\mid } \right) + \sum_{i = \mid N_2\mid  + 1}^{n} \left( 2\frac{i}{\mid N_2\mid }  \right) 
$$

The function is minimized when $\mid N_1\mid  = \mid N_2\mid $. Moreover, we can accurately calculate the pseudosize of a task to be precisely the number of tasks remaining on its machine.


This relationship does not hold when tasks have precedence constraints, as tasks need to rely on the completion of tasks on other machines before they start, and these constraints make the overall objective function difficult to define. This prevents us from calculating the pseudosize of a task as it is now a combination of the number of remaining tasks on its machine and other machines.