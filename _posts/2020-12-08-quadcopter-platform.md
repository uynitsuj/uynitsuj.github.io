---
layout: post
title:  "Autonomous Quadcopter Projects"
excerpt: "Development of Maze Traversal & Spatial Mapping algorithms"
categories: [projects]
image: Post5/main.png
---

[read as PDF](/pdf/QC.pdf)

Team : Ashwani Aggarwal, Ashwin Srinivasan, Diego Suazo, Justin Yu

We will discuss the two projects we worked on with our prototype quadcopter - maze traversal and spatial visualization.  At a high level, the former involved the quadcopter autonomously traversing a maze via an algorithm we coded. The latter involved extracting and processing sensor data from the quadcopter to construct a 3D map of the ambient space.

## Maze Traversal

#### Objectives

The primary objective of the maze traversal project was for the quadcopter to successfully autonomously navigate through a maze constructed out of PVC tubes and netting and land in the landing zone.  For simplicity, we only worked with a single maze design (Fig 1) without dead ends.

Furthermore, our optimization objectives were to minimize collisions and achieve a smooth rapid traversal.  In particular, we wanted to tune PID parameters and various other parameters within the code to accomplish this.

Finally, we wanted to ensure the reliability of the traversal algorithm under varying conditions ranging from atmospheric conditions to the calibration of the quadcopters sensors on a given day.


![Fig1]({{ site.url }}/img/Post5/f1.png)
<div align="center"> <i> Fig 1. Diagram of Maze </i> </div>

#### Traversal Algorithm

Our approach to the algorithm for the quadcopter’s flight is rooted in the idea that since the maze has no dead ends, we should be able to tell from the data from the four LiDAR sensors and the current heading of the quadcopter if it should turn, continue in the same direction, or land.  Assuming this holds, the algorithm just needs to start the quadcopter in the correct direction and then adjust it or end flight based on the LiDAR data.

Therefore, we can reduce the problem of determining an algorithm for these state changes based on the current state and the LiDAR data  (Fig 2).  The first point to realize here is that we generally want the quadcopter to move in the direction where there is the most room for it to advance in the maze.  But, at the same time, we do not want it to turn around if it has just come from a long corridor.  Therefore, we restrict our attention to the forward, left, and right directions relative to the quadcopter’s current heading.

It turns out, however, that this is not sufficient to prevent the quadcopter from potentially reversing.  If the quadcopter repeats this logic in the next instant, it will conclude that it needs to turn right again resulting in it ultimately going backward (Fig 3).

![Fig2]({{ site.url }}/img/Post5/f2.png)
<div align="center"> <i> Fig 2. Algorithm Turning Quadcopter Right </i> </div>

To solve this problem, our approach was to introduce a delay between decisions to allow the quadcopter to implement the direction it has chosen and clear corner scenarios like this.  After experimenting thoroughly, we concluded that a three-second delay was the optimal value to keep the algorithm reliable, while not slowing down traversal.

![Fig3]({{ site.url }}/img/Post5/f3.png)
<div align="center"> <i> Fig 3. Algorithm Causing Quadcopter to Reverse </i> </div>

The aforementioned logic allows the quadcopter to decide whether to turn or continue in its current heading, but we also need to be able to decide when to land.  It turns out this can be solved simply by checking if each of the forward, left, and right LiDAR distances are sufficiently small (about 40 cm) when updating the heading.  If so, this means the quadcopter has nowhere left to go and has reached the end of the maze.

To summarize this algorithm (Fig 4), first, the quadcopter sets its heading as “forward” (relative to its nose) and takes off.  Then it moves in the direction of the heading for three seconds (the delay).  After that, it completes its check of whether or not to land and whether or not to turn.  If it decides to land, the algorithm is complete.  Otherwise, it returns to moving in the direction of the new heading for three seconds and loops.  

In the background, we have a collision avoidance protocol that checks if the quadcopter is getting too close to any walls and if so, acts to move it away possibly overriding its movement in the heading direction.  This algorithm is influenced by the cutoff distance for it to activate and several parameters in the Mission Planner software including the PID control, all of which had to be tuned.

![Fig4]({{ site.url }}/img/Post5/f4.png)
<div align="center"> <i> Fig 4. Maze Algorithm Chart </i> </div>

<iframe width="560" height="315" src="https://www.youtube.com/embed/uZTgKDcrUIk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Discussion of Results and Recommendations

Overall, we feel that our results on the maze project met the objectives that we set out to accomplish.  Our best flight had only one minor collision and was completed in just under thirty seconds.  As such, we believe that we met the primary objective of navigating the maze autonomously and the optimization objectives of reducing collisions and increasing speed.

Additionally, the algorithm in its current state works, theoretically, on any maze as long as it has no dead-ends, similar starting and ending conditions, and similar corridor width.  Albeit, we were not able to test this due to time restrictions.

The primary place for improvement that we noted was in reliability, especially in consistently minimizing collisions.  For the most part, we were able to complete the maze reliably, however, we often had in the range of three to five collisions.  

If given more time and resources, we would recommend finer tuning of collision avoidance and PID parameters and perhaps investing in better LiDAR sensors to get a more accurate idea of the space around the quadcopter for decision making.

## Spatial Visualization

#### Objectives

For our this project, we set out to construct a 3-dimensional visualization of the space our quadcopter is flying in, based on post hoc analysis of onboard sensor data obtained from the quadcopter’s exploration flight-logs. Several high-level objectives include extracting position, orientation, and LiDAR data from the quadcopter flight logs. Furthermore, an algorithm to fly the quadcopter such that reliable data can be obtained is necessary. Finally, we wanted to develop a correct and reliable algorithm for rendering the space using the extracted data.

#### Log Extraction

To render the space of the quadcopter by analyzing past flight data, we needed to successfully extract useful sensor information from the Mission Planner logs. To define the quadcopter position and orientation, referred to from this point as the quadcopter pose, we required linear acceleration, altitude, and gyroscope orientation data. To estimate the distance of the ambient environment to build a spatial map, we required distance data.

These data values are made available to the quadcopter by the downward-facing ultrasonic sensor, the LiDAR box situated at the top of the quadcopter, and the 9 DoF IMU system integrated with the BeagleBone Blue microcontroller. This data is subsequently logged throughout a flight, along with many other sensor readings. We take interest in only the aforementioned data types, and thus as a part of our log extraction process, we run our log through a Windows Powershell command that filters for rows containing the keywords “IMU”, “PRX”, “CTUN”, or “ATT” (Fig 5). The result is a dataset (Fig 6) that includes only the data types that we are interested in manipulating and plotting to our map with our visualization algorithm.

<div align="center"> <i>  select-string IMU,PRX,CTUN,ATT ‘53 10-13-2020 11-31-05 AM.bin.log’ | select-object -expandproperty line > outfile.csv </i> </div>
<div align="center"> <i> Fig 5. Windows Powershell Keyword Filter Command </i> </div>

![Fig6]({{ site.url }}/img/Post5/f6.png)
<div align="center"> <i> Fig 6. First 35 Rows of a Filtered Log </i> </div>

#### Flight & Spatial Visualization Algorithm

One of our objectives is for the logged data to be reliable, so we needed to design our flight algorithm with this in mind. And to do this, we devised a flight algorithm so that our quadcopter ascended, spun around 3 times, and then landed. Our quadcopter PID and collision avoidance layers were left unchanged from the maze traversal task.

For the spatial visualization, the algorithm runs a core loop iterating over the rows of data      (Fig 8). Taking a log such as the one shown in the previous section, our objective is to manipulate the raw data to produce a visualization of the flight path and an environment map that is intuitive to us.

At the start of the algorithm’s core loop, we are only concerned with the very first row of data, ignoring the headers. We read in the data type and based on what that data type is, we manipulate the raw data in a certain way with some math, and we update a buffer to hold this information temporarily. For example, if the data row was from the IMU, we want to double-integrate the linear acceleration values with respect to time to obtain absolute displacement information, which we subsequently store in a dx and dy buffer.

Once a buffer is updated, we take these things -- the pitch-roll-yaw, altitude, dx dy, and define the quadcopters pose. The quadcopter pose is represented in our algorithm by a 4x4 homogeneous transformation matrix and contains information about the quadcopter’s location in 3d space as well as its orientation.

The math to update the pose estimation involves a series of affine transformations on a 4x4 matrix, which we’ll briefly touch on (Fig 7). Precisely, the transformation includes a translation, rotation, followed by another translation. To define an updated pose, we take a 4x4 matrix containing the dx and dy displacement information from the buffer. This effectively translates a point along the x-y plane according to the environment frame, but not the quadcopter frame. Next, the resultant matrix is dotted with a rotation matrix containing the roll-pitch-yaw information from the buffer. This effectively makes our first dx & dy displacement matrix a translation from the origin in relation to the quadcopter reference frame. Finally, this result is dotted with another translation matrix which translates the point using the x-y-z cartesian coordinates from the previous pose. Finally, the altitude buffer updates the z coordinate in the pose matrix. This produces a 4x4 matrix containing the quadcopter’s updated location in 3d space as well as its new orientation.

![Fig7]({{ site.url }}/img/Post5/f7.png)
<div align="center"> <i> Fig 7. Affine Transformation Series to Determine the Updated Pose Estimate Matrix P </i> </div>


Through a similar process, we manipulate the LiDAR readings and add these to a LiDAR scatter point list where they all get added to our mapped visualization.

Finally, the loop moves on to the next row where the same process is repeated for a new data type.

![Fig8]({{ site.url }}/img/Post5/f8.png)
<div align="center"> <i> Fig 8. Visualization Algorithm Core Loop </i> </div>

#### Discussion of Results and Recommendations

We feel that the results of the code, data extraction, and modeling were satisfactory. We were able to achieve a model which showed a structure that did resemble our enclosed space (Fig 9), and we did so while extracting the data we needed from the quadcopter, and being able to manipulate it. It also appeared that the orientation given by the gyroscope was fairly accurate.

On top of our results, which prove the concepts of modifying the quadcopter with sensors and analyzing the data that comes from the IMU, we also found a significant room for improvement.

Due to the unreliable nature of the IMU, the positional readings experienced significant amounts of drift, which could be improved upon given better IMUs, or an improved filter or technique, such as a Kalman filter. For the mapping portion, better LiDAR sensors could be implemented, and other technology and techniques like SLAM or cameras can improve the visual aspect of this project.

![Fig9]({{ site.url }}/img/Post5/f9.png)
<div align="center"> <i> Fig 9. Resultant environment map </i> </div>

## Conclusion

Our successful maze flight following the implementation of our algorithm and parameters was achieved in less than thirty seconds, with one minimal collision. The drone had countless occasions where it could have hit a wall or edge of a wall, but successfully avoided it, and showed that it met all the needs of our customer and their audience. The drone can successfully fly through a maze, by itself, in an efficient manner. Beyond that, the algorithm also works for any arbitrary maze, meaning a layout like the one we tested isn’t necessary, and any university or enthusiast can use it for personal use.

To further minimize collisions from one to zero, further time could be spent from us, or from the universities and enthusiasts to improve the flight parameters, or modifications could be made to improve sensors and actuators on the prototype. What is presented by the prototype is sufficient for a successful and efficient flight, but the client’s customers can explore physical and parameter improvements.

For our spatial visualization project, we were able to successfully, albeit roughly, map a square enclosure. Proving both the effectiveness and possible use of the LiDAR sensor on a quadcopter. LiDAR data, along with flight data from the quadcopter in general, can be extracted successfully with timestamps, which implies that countless analytical procedures, such as our modeling of the positional data, can be achieved. The “box” plotted using the LiDAR also proves the quadcopter can be modified successfully beyond its standard use of flying.

From this project we have learned more about why pure IMU positional tracking is unreliable. It is apparent that better IMU’s will not provide any substantial improvements, but we should instead look to employ advanced filtering techniques, such as a Kalman filter, for tasks and projects that require a greater degree of accuracy. Other improvements can also include using cameras and SLAM techniques for better localization and mapping.
