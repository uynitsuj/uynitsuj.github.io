---
layout: post
title:  "First attempt at a 6DoF robot arm"
excerpt: Keeping myself busy during quarantine
categories: [projects]
image: robots/ezgif-4-f28f910a4123.gif
---

When news of Covid-19 broke, I was cautiously optimistic that the virus would be less transmissible. Within a couple weeks however, I realized that we were in it for the long haul. I decided it was time to take advantage of an unprecedented amount of free time.

### My 3D-Printed 6DoF Arm Journey

My first design iteration did not have many things going for it to say the absolute least.

![Annotation 2020-04-20 140716]({{ site.url }}/img/Post3/Annotation 2020-04-20 140716.jpg)

Perhaps overly ambitious, I had taken heavy inspiration from the team over at Haddington Dynamics:

<div align="center"><iframe width="90%" height="315" src="https://www.youtube.com/embed/EgVPiBiKNjs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

I liked their design philosophy regarding weight distribution, placing heavy components such as stepper motors and gearboxes closer to the base, and using timing belts to transmit that power to the rest of the joints and end-effectors. If there was one thing I could take away from all of my time in high-school robotics, it would be: *keep end effectors as light as you can get away with*. So this setup seemed like a no-brainer.
<br>
It didn't take long for me to realize I had downplayed severely many of the the most obvious downsides that came with opting for such a setup.
<br>
*Firstly:*  
I had opted to use NEMA17 stepper motors. Besides the fact that the Haddington Dynamics guys did too, I decided to use NEMA17s because they were reasonably light, reasonably powerful, and my past robotics experience didn't include very many stepper motors, but instead DC brushed and brushless motors. I wanted some of my own experience with them. 
<br>
NEMA17s aren't very strong. This meant that a gearbox was required to increase the mechanical advantage produced by the motors if my arm had any hopes of lifting itself. For this, the Dexter guys used a harmonic flex-spline gearbox, featuring zero backlash, a surprising degree of back-driveability, however they are also mind-numbingly expensive to get a hold of.
<br>
Which sadly left me to my own devices...

![Annotation 2020-03-30 151859]({{ site.url }}/img/Post3/Annotation 2020-03-30 151859.jpg)

I spent many days and late-nights trying to fine-tune parameters of my 3D-printed planetary gearbox (you read that right... *never again*) to have minimal backlash with minimal friction. At the end of the day, I was never going to get very good results in either of these aspects since the accuracy of my printed parts is only as good as the accuracy of my printer. My reduction ratio was also decently high at 38.4:1. With the amount of friction in my 3D-printed gearboxes, the ability to back-drive my motors was simply out of the question.
<br>
*Secondly:*  
Unsurprisingly, sourcing niche parts like >1000mm loop timing belts is a difficult endeavour. I don't have a home machine shop, and sourcing pre-cut custom-length 1"x1" square tubing proved impossible. The Dexter guys used a *MarkForged* industrial 3D-printer for the printed parts and even had carbon-fiber reinforced structural parts printed from it. I was sitting here with my meek and humble (but able) Prusa Mk3S 3D-printer.
<br>
For these reasons, along with many other concerns I had about how the design was progressing, I made the executive decision to scrap this iteration.

### Back to the Basics

I determined that my best course of action was to reject modernity and return to tradition with the proven line of UR style arms from Universal Robots.

![Annotation 2020-08-06 223117]({{ site.url }}/img/Post3/Annotation 2020-08-06 223117.png)

This style of arm featured actuators situated directly at each joint within the arm, massively simplifying the design constraints.
<br>
I further iterated on my gearbox design, implementing finer gear teeth, allowing me to create larger reduction ratios and a more compact gearbox system. Now that the actuators were situated directly at the joints, I had to increase the diameter of the joint bases to help the design handle the increased radial and axial load. I was really interested in using thin-section bearings, but once again ran into some trouble. So in typical Justin Yu fashion, I tried my hand at designing a custom slewing bearing using printed cylindrical bearing beads (you'll find 3D-printing spheres to be quite difficult). This first iteration of the gearbox features a swept-cut side surface, which didn't make it onto the final iteration. This is one of my prouder creations.

<div class="row" style="margin-left:11vw">
  <div class="column" style="float: left">
    <img src="{{ site.url }}/img/Post3/Annotation2020-04-25231450.jpg" alt="Annotation2020-04-25231450" width="250px">
  </div>
  <div class="column" style="float: left">
    <img src="{{ site.url }}/img/Post3/IMG_1006.JPG" alt="IMG_1006.JPG" width="250px">
  </div>
  <div class="column" style="float: left">
    <img src="{{ site.url }}/img/Post3/IMG_1037.JPG" alt="IMG_1037.JPG" width="250px">
  </div>
  <div class="column" style="float: left">
    <img src="{{ site.url }}/img/Post3/IMG_1039.JPG" alt="IMG_1039.JPG" width="250px">
  </div>
</div>

After much time, I had finished the arm, complete with motor port covers featuring hexagonal patterns.

![IMG_1925]({{ site.url }}/img/Post3/IMG_1925.jpg){:height="40%" width="40%"}
<br>
![Annotation 2020-05-12 211349]({{ site.url }}/img/Post3/Annotation 2020-05-12 211349.jpg){:height="40%" width="40%"}

Time to start assembly!

![IMG_1499]({{ site.url }}/img/Post3/IMG_1499.jpg){:height="40%" width="40%"}

Finished.

![Annotation 2020-08-07 011350]({{ site.url }}/img/Post3/Annotation 2020-08-07 011350.png){:height="40%" width="40%"}

Now that I have the thing built, I want to start making the thing move. I used an Arduino Mega 2560 and a Ramps 1.4 shield with A9488 Drivers and uploaded a simple Step+Direction control sketch.

![ezgif-4-581c98fc16cb]({{ site.url }}/img/Post3/ezgif-4-581c98fc16cb.gif){:height="40%" width="40%"}

Ok, that was easy enough. Now how about making it move predictably? I then went onto the web to search for ways that I could coordinate stepper movement effectively, and found much more than I was expecting.

<div align="center"><iframe width="90%" height="315" src="https://www.youtube.com/embed/fHAO7SW-SZI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

This video by iforce2d had absolutely everything I was looking for and more. By the end, he had introduced a sketch that would allow you to prepare stepper movements for multiple steppers and execute them, complete with stepper start-time end-time coordination, linear speed ramping, *and even interrupts*. This massively simplifies everything. And this is where that got us:

<div align="center"><iframe width="90%" height="315" src="https://www.youtube.com/embed/8E2R9iQnwQs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

Next, I needed to figure out how to give angle inputs, and I also wanted to move out of the Arduino IDE interface, since preparing movements within the sketch currently consists of editing the motor ID and step# parameter manually:

![Annotation 2020-08-07 134854.png]({{ site.url }}/img/Post3/Annotation 2020-08-07 134854.png){:height="40%" width="40%"}

So I decided to use Python, since it would allow me to send the Arduino data over serial, and also so I could learn and use TKinter for Python for my home-brewed interface.
<br>
In learning about serial data communication, I had to create my own command protocol that my Python code could send, which the Arduino could then receive and interpret. My protocol needed to be able to assign a Motor ID as well as step count for that particular motor, and I also needed a protocol for executing the runAndWait() function. So I ended up with the following command structure:

![CommandStructure]({{ site.url }}/img/Post3/Annotation 2020-08-07 172642.png)

To control the parameters for my prepareMovement() method in the Arduino sketch, my Command prefix would consist of MTR0, MTR1, ... to MTR5 to pass in the Motor ID, and the Data suffix would pass in the desired step count. A full command would look something like #MTR2500\\n to prepare movement on motor 2 for 500 steps, or #MTR51780\\n to prepare movement on motor 5 for 1780 steps. For the runAndWait() method, a simple #EXEC\\n command without anything in the data field would suffice.

### The Kinematics

Forward and inverse kinematics, are the mathematical processes of converting between the joint angle space (theta1, theta2, theta3, ...) and the cartesian coordinate space (x,y,z,p,r,y) relative to the grounded base frame origin, or vice versa.

![FKIK]({{ site.url }}/img/Post3/02_forward_and_inverse_kinematics.jpg){:height="45%" width="45%"}

This allows us to determine a robot's kinematic chain, such as a robot manipulator or animation character's skeleton, in a given position and orientation relative to the start of the chain, and is necessary for pretty much all things involving robotic linkages.

![snek]({{ site.url }}/img/Post3/teslasnake.gif)

My journey through Forward Kinematics is laid out in one of my previous posts and can be found [here](https://uynitsuj.github.io/articles/2020-03/forward-kinematics-denavit-hartenberg-convention-on-a-6r-robotic-arm-example), so I won't go into much detail for it here. In short, the Forward Kinematics process is pretty simple, consisting of determining the full kinematic chain as a product of several 4x4 SE(3) transformation matricies while using the joint angle space as input values. During this time I also gained some substantial experience working with matplotlib's mplot3d module for 3-dimensional plots:

![Annotation 2020-05-17 173422]({{ site.url }}/img/Annotation 2020-05-17 173422.png)

The Inverse Kinematics process is much more involved, as it is the inverse of the above process. The IK model must produce the joint angle space with only the cartesian coordinate space transform matrix that defines the end effector position plus its offset relative to the grounded base frame origin. One of the reasons why this is more complicated is because its joint space solutions are not necessarily unique. For every unique cartesian coordinate space x, y, z, pitch, roll, or yaw input, the result could consist of multiple joint space solutions. In fact, there may be up to 8 as shown here:

![Annotation 2020-08-07 190630]({{ site.url }}/img/Post3/Annotation 2020-08-07 190630.png)

At the end of the day, the goal of IK is to be able to determine what arm joint theta1, theta2, theta3, etc. are based on the final end effector position and orientation. The math here is your average trigonometry, but keeping track of the relevant reference frame definitions becomes very difficult to manage. I would be lying if I told you that I solved it all myself. I would have never completed this endeavor in reasonable time with my current skillset were it not for the brave adventurers who have pioneered this path before I had. Some of the resources I used are cited below[^1][^2][^3]. However, going through and parsing the pertinent literature was very involved and time consuming, taking me roughly 2 weeks in total.

<br>

The next step is about as involved as parsing the literature: translating the useful information to python code to verify my IK model, as well as using the IK definition to run my visualization pipeline. I would frequently end up in what were seemingly dead ends, and there were also points where I knew I was close but couldn't pinpoint what was causing issues:

![Annotation 2020-08-07 195530]({{ site.url }}/img/Post3/Annotation 2020-08-07 195530.png)

Symmetrical, however not a very beautiful sight to behold in the context of my work. Eventually, I would come to find a couple of stray negatives, undotted i's and uncrossed t's scattered around my implementation, and I eventually got there.

![Annotation 2020-05-29 214041]({{ site.url }}/img/Post3/Annotation 2020-05-29 214041.png)

It's not easy to see, but all of the 8 possible configurations converge onto one end-effector position!

### And it All Comes Together

Now that we have our very rudimentary motion planner implemented, a user interface, and our FK and IK models verified, it's time to stick it all together with some scotch tape and bubblegum.

<div align="center"><iframe width="90%" height="315" src="https://www.youtube.com/embed/CedyWQmqiJ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

A postmortem discussion: there are several areas that I could improve upon in future iterations. First off, you might've noticed that my interface was lacking a homing procedure button. This particular robot is completely open-loop, relying only on the accuracy (or lack thereof) of the steppers. The stepper gearboxes were also not back-driveable, so going entirely open-loop was less of a risk. For what I set out to do I think I did a pretty good job. Granting that, I would consider the current state of arm performance to be unsatisfactory. 
<br>
In the future, closed loop control and improving arm structure rigidity is definitely top priority.


[^1]:[M.E. 530.646 UR5 Inverse Kinematics - Ryan Keating](uynitsuj.github.io/pdf/ur5ik-170410122303.pdf)
[^2]:[Inverse Kinematics Chapter 4](https://thydzik.com/academic/robotics-315/chap4.pdf)
[^3]:[Inverse Kinematics of a 7R 6-DOF Robot with Nonspherical Wrist Based on Transformation into the 6R Robot](https://www.hindawi.com/journals/mpe/2017/2074137/)
