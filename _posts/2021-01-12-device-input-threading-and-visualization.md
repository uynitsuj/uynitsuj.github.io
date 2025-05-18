---
layout: post
title:  "A quick post about my next project"
excerpt: "Quick updates"
categories: [project]
image: gallery/QIKstress.gif
---

Recently, I've found some precious time in between courses to make progress towards my next project: a Quadrupedal Robot. This project is highly inspired by the work of Boston Dynamics on Spot, MIT on MiniCheetah (who I have the pleasure of working with at UM), and last but not least, my good friend Adham Elarabawy's work on Open Quadruped with Maurice Rahme. Go check out [their work](https://github.com/adham-elarabawy/open-quadruped)! At the time of writing, Adham is at Berkeley and Maurice at Boston Dynamics, and they will both go on to do many more impressive things, I'm sure.

<br>

There are some high level and low level goals, short term and long term goals, and perhaps even longer term goals reaching far into the future (this is a fun albeit expensive hobby to maintain).

<br>

Some high level goals for this first iteration include:
* BOM cost of <$800
* Easily machinable/manufacturable custom components
* Easily sourceable commercial-off-the-shelf components

<br>

I'm starting out small scale with some 20KG RC car hobby servos for rudimentary pose acquisition and gait generation. The most obvious downsides would have to be the pitiful resolution and accuracy that comes with hobbyist servo motors, and implementing velocity control or even force control for more complex motion planning is non-trivial. Though, currently, I'm pretty happy with the scope of this project. In the future, this project can also serve as a platform for other explorations involving CV, SLAM, motion planning, sensor fusion with kalman filters, etc. On the hardware side, I might become interested in developing custom brushless motor technology. I have a decent idea of where I want to take this project in the immediate future. But who knows where this project will take me?

<br>

The first step was to solve for the inverse kinematics and also to visually verify it in a custom visualization pipeline. The former has been done for a while now, actually since before winter break.

<br>

And I recently got around the the latter. I have been looking around for python visualization modules for quite some time, since I was getting tired of how slow matplotlib is for 3D visualizations. It's made to look presentable for research paper graphics, but it's not necessarily built with real-time performance in mind. I've finally found one that I'm pretty happy with: [pyqtgraph](http://www.pyqtgraph.org/). It appears to be an impressively robust 2d and 3d visualization module that uses OpenGL for fast object rendering, and is built with a choice of either Qt or PySide as a GUI backend.

<br>

Next I needed to develop a user input scheme for both the final robot and the visualization. On this front I had quite a few options. I steered away from the keyboard or any kind of binary-state input since I wanted a little bit more ganularity. For this, I opted for a PS4 controller. Going down this path led me to the discovery of a whole world involving the /dev/input directory. The /dev/input directory in Linux is a must-know for pretty much anything involving device I/O. The directory can contain device files for various input devices such as mice, keyboards, joysticks and so on. If you "open" a device file, you'll receive streams of binary data, which correspond to events on the device, such as button presses or thumbstick state changes.

<br>

After decoding this data stream for a PS4 controller, you have the ability to create callbacks to run a block of code after a specified event, allowing you to map PS4 controls to robot controls.

<br>

While I was developing my visualization, I realized that I had a problem. I had two loops that I wanted to run: 1) the pyqtgraph loop which updates the visualization state, 2) the PS4 loop that reads the PS4 input data stream and updates robot state variables. This is the problem that introduced me to the wonders of threaded programs.

<br>

Here's where I am at currently:
<div align="center"><iframe style="aspect-ratio: 16 / 9; max-width:80%;height:400px"  src="https://www.youtube.com/embed/fkbPEBkFw38" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
<br>
<div align="center"><iframe style="aspect-ratio: 16 / 9; max-width:80%;height:400px"  src="https://www.youtube.com/embed/RiKDt2fboVg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
<br>
<div align="center"><iframe style="aspect-ratio: 16 / 9; max-width:80%;height:400px"  src="https://www.youtube.com/embed/Qadp65k-Nd0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
<br>
<div align="center">
  <img src="{{ site.url }}/img/gallery/QIKstress.gif" alt="IK" width="800px">
</div>
