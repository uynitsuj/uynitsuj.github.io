---
layout: post
title:  "A quick post about my next project"
excerpt: "Quick updates"
categories: [projects]
image: gallery/QIKstress.gif
---

Recently, I've found some precious time in between studying for 17 credit-hours of courses to make progress towards my next project: a Quadrupedal Robot. This project is, of course, highly inspired by the work of Boston Dynamics on Spot, MIT on MiniCheetah (who I have the pleasure of working with at UM), and last but not least, my good friend Adham Elarabawy's work on Open Quadruped with Maurice Rahme. Go check out [his work](https://www.adham-e.dev/project/openquadruped)! Adham is currently at Berkeley and Maurice at Boston Dynamics, and they will both go on to do much more impressive things, I'm sure.

There are some goals that I have for this project, as any good designer should have. These include both high level and low level goals, short term and long term goals, and perhaps even longer term goals reaching decades into the future.

Some high level goals for this first iteration include:
* BOM cost of <$800
* Easily machinable/manufacturable custom components
* Easily sourceable commercial-off-the-shelf components

I'm starting out small scale with some 20KG RC car hobby servos for rudimentary pose acquisition and gait generation. The most obvious downsides would have to be the pitiful resolution and accuracy that comes with hobbyist servo motors, and implementing velocity control or even force control for more complex motion planning is non-trivial. Though, currently, I'm pretty happy with the scope of this project as it would allow me to become better acquainted to items such as ROS and gazebo. In the future, this project can also serve as a platform for other explorations involving CV, SLAM, motion planning, and variants of extended kalman filters, and on the hardware side, perhaps I might become interested in implementing custom brushless motor technology. I have a pretty good idea of where I want to take this project in the immediate future. But who knows where this project will take me later down the line?

What progress have I made? The first step on my list was to solve for the inverse kinematics and also to verify it in a custom visualization pipeline. The former has been done for a while now, actually since before winter break.

And I recently got around the the latter. I have been looking around for python visualization modules for quite some time now, since I was getting tired of how slow matplotlib is for 3D visualizations. It's made to look presentable for research paper graphics, but it's not necessarily built with real-time performance in mind. I've finally found one that I'm pretty happy with: [pyqtgraph](http://www.pyqtgraph.org/). It appears to be an impressively robust 2d and 3d visualization module that uses OpenGL, and is built with your choice of either Qt or PySide as a backend.

One of the things that I wanted for my visualization was to be able to provide user input. On this front I had quite a few options. Though I steered away from the keyboard or any kind of binary-state input since I wanted a little bit more ganularity for high-speed input. For this, I opted for a PS4 controller. Going down this path led me to the discovery of a whole wide world involving /dev/input. The /dev/input directory is one of those things on Linux where once you know your way around it, you'll be pretty unstoppable with device I/O. The directory holds the device files for various input devices such as mice, keyboards, joysticks and so on. For my PS4 joystick, if you open the device file and attempt to read it, you'll receive streams of binary data, which correspond to events on the device, such as pressing down a button or pushing the joystick up on a PlayStation controller.

Once you decode this stream, you have the ability to do just about anything with the device inputs. This gives you the ability to create callbacks to run a block of code after a specified event.

I started putting together my visualization, but then realized that I had a problem. I had two loops that I wanted to run: 1) the pyqtgraph Qt5 backend loop which constantly updates and refreshes the visualization window, 2) the device input stream that's constantly reading the binary data stream. This is the problem that introduced me to the wonders of python threading and callbacks.

Here's where I am at currently:
<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/fkbPEBkFw38" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
<br>
<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/RiKDt2fboVg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
<br>
<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/Qadp65k-Nd0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
<br>
<div align="center">
  <img src="{{ site.url }}/img/gallery/QIKstress.gif" alt="IK" width="800px">
</div>
