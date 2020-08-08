---
layout: post
title:  "What an Incoming UMich EECS Freshman is Doing to Stay Sharp During Quarantine"
excerpt: From printing face shields for medical workers, developing a 3d-printed 6DoF arm from scratch, to making a personal portfolio website to showcase my projects, I’ve been busy.
categories: [project]
image: robots/ezgif-4-f28f910a4123.gif
---

When the first news of 2019-nCoV broke, I was cautiously optimistic that the virus would have a more difficult time transmitting between humans. However, within weeks, many research groups had produced their own R0 estimates, which fell alarmingly somewhere between 1.4 and 4. This is when I realized that we were in it for the long haul. I then realized the privilege I had (which I’m extremely grateful for) and decided it was time to take advantage of an unprecedented amount of free time.

The content of this post will be primarily technical, but beyond that, I spent my quarantine time doing many other things. I also went running, mountain biking, and surfing, all things that I can enjoy while complying with social-distancing guidelines. For the first couple of weeks of quarantine, I was getting quite chunky from having more frequent access to the refrigerator at home. I read through a couple of papers on fasting, and have healthily lost about 13 pounds since the beginning of quarantine by conducting 3:4 fasts. I’m satisfied with my current physical fitness.

With a contagious virus running rampant I also put my 3D-printer to good use to help take pressure off the nation's healthcare system by printing  284 face shields in total. (Disclaimer: these weren't requested by frontline workers, but rather to long-term care and other nursing facilities so that our front-line workers can get the higher quality PPE in higher quantity)

<div class="row" style="margin-left:12vw">
  <div class="column" style="float: left">
    <img src="{{ site.url }}/img/Post3/IMG_1096.JPG" alt="IMG_1096.JPG" width="300px">
  </div>
  <div class="column" style="float: left">
    <img src="{{ site.url }}/img/Post3/IMG_1094.JPG" alt="IMG_1094.JPG" width="300px">
  </div>
  <div class="column" style="float: left">
    <img src="{{ site.url }}/img/Post3/IMG_1095.JPG" alt="IMG_1095.JPG" width="300px">
  </div>
</div>

Now, for the good stuff:

First, I’ll give a brief context for my technical proficiency going into quarantine. I had an internship with a local robotics startups and two research internships with UCSD over the duration of high school. I was simultaneously the Head of Mechanical Build and Design for my robotics team in my latter 2 years of high school, where I would build my repertoire for managing and designing robotics systems with SolidWorks CAD software. I would consider myself a pretty motivated student with a good amount of engineering experience and a pretty solid academic foundation (Multivariable calculus, Linear Algebra).

At heart, I’m much more of a mechanical engineering person than I am a computer science or an electrical engineering one, and I've always joked that this could be attributed to my inclination to short-term gratification (perhaps I'd be one to fail the Stanford marshmallow test). But as an aspiring roboticist, I realized I could not just stop at mechanical engineering and let that be that, which is what motivated me to dive head-first into EECS over this summer and also pursue it as my undergraduate degree at UMichigan. Also, ever since finding my passion for robotics on my middle school FTC team, I had told myself that I should eventually be able build my own robot arm from scratch. So what better time than now to give it my first go?

### My 3D-Printed 6DoF Arm Journey

Homemade robot arms aren't all that they're chalked up to be. Not the ones that I make anyway.

My first design iteration did not have many things going for it to say the absolute least.

![Annotation 2020-04-20 140716]({{ site.url }}/img/Post3/Annotation 2020-04-20 140716.jpg)

Perhaps too overly ambitious, I had taken quite heavy inspiration from the folks over at Haddington Dynamics with their robot Dexter:

<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/EgVPiBiKNjs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

I had taken particular liking to their design philosophy of weight distribution, positioning all of the heavy powered implements such as stepper motors and gearboxes closer to the base, and using timing belts to transmit that power to the rest of the joints and end-effectors. If there was one thing I could take away from all of my time in competitive robotics, it would be: *keep end effectors as light as humanly possible*, with F=MA and inertial moments and the whole sha-bang. The thing that's supposed to move the most nimbly shouldn't be bogged down by so much mass. So this power transmission method seemed like a no-brainer.

It didn't take long for me to realize that I had downplayed too severely many of the the most obvious downsides that came with opting for such a transmission method.

*Firstly:*  
I had opted to use NEMA17 stepper motors. Besides the fact that the Haddington Dynamics guys did too, I decided to use NEMA17s because they were reasonably light, reasonably powerful, and my past robotics experience didn't include very many stepper motors, but rather DC brushed and brushless motors. So I wanted some of my own experience with them. Stepper motors can get quite powerful, but the NEMA17s aren't very strong, spec'd at an average of 0.5Nm stall-torque for even many of the better performing models and lengths that it came in. This meant that a gearbox was needed to increase the torque produced by the motors if my arm had any hope of lifting itself. For this, the Dexter guys had used the mechanical engineering marvel that is the harmonic flex-spline gearbox, featuring zero backlash, a surprising degree of back-driveability, and are also mind-numbingly expensive to buy any number of.

Which sadly left me to my own devices...

![Annotation 2020-03-30 151859]({{ site.url }}/img/Post3/Annotation 2020-03-30 151859.jpg)

I spent many days and late-nights trying to tune my 3D-printed planetary gearbox (you read that right... *never again*) to have minimal backlash while at the same time adding in clearance to minimize friction. Back-driveability was simply out of the question.

*Secondly:*  
I do not have the deepest of pockets, and this was also amidst the early stages of the pandemic, so I tried as best I could to not make a dent in the worldwide effort to mobilize and distribute medical equipment (half-joke). So trying to minimize sourced and fabricated parts such as structural square-tubing, bearings and belting was a priority. Unsurprisingly, sourcing >1000mm loop GT belts was quite the hassle. I don't have a home machine shop either, so trying to source pre-cut or even custom-length 1"x1" square tube was impossible. Many of the other structural things I wanted to do were also out of the question. The Dexter guys used a *MarkForged* industrial 3D-printer for the printed parts and even had carbon-fiber reinforced structural parts printed from it. I was sitting here with my meek and humble (but able) Prusa Mk3S 3D-printer.

For these reasons, along with many other concerns I had about how the design was progressing, I made the executive decision to scrap this iteration.

### Back to the Basics

While keeping the end-effector light is quite the noble effort, it is definitely more involved on the mechanical side. Doubtlessly, with enough time, budget and resources, I would be able to make an arm more similar to Dexter. But given that I was limited in these particular items, I determined that my best course of action was to reject modernity and return to tradition with the proven line of UR style arms from Universal Robots.

![Annotation 2020-08-06 223117]({{ site.url }}/img/Post3/Annotation 2020-08-06 223117.png)

This style of arm featured actuators situated *at* every joint within the arm, massively simplifying the design constraints.

While I had solved my latter issue mentioned above, the former was one I still had to contend with since I decided to use NEMA17s again. So I further iterated on my gearbox design, implementing finer teeth thereby allowing me to create larger reduction ratios and a more compact gearbox system. Now that the actuators were situated directly at the joints, the diameter of the joint bases also needed to be significantly larger to ensure that the increased radial and axial load could be addressed properly. To reconcile the larger load, a larger bearing would be needed. But I once again had issues sourcing thin-section bearings, so I tried my hand at creating my own completely 3D-printed gearbox with an integrated slewing bearing using printed cylindrical bearing beads (you'll find printing spheres to be quite difficult). This first iteration of the gearbox features a swept-cut side surface, which didn't make it onto the final iteration, the reason for which I will address later. This is one of my prouder creations.

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


After much time, I had finished the arm, complete with motor port covers featuring hexagonal patterns. Don't they add a whole lotta personality?

![IMG_1925]({{ site.url }}/img/Post3/IMG_1925.jpg){:height="40%" width="40%"}
<br>
![Annotation 2020-05-12 211349]({{ site.url }}/img/Post3/Annotation 2020-05-12 211349.jpg){:height="40%" width="40%"}

And now it's time to start assembly!

![IMG_1499]({{ site.url }}/img/Post3/IMG_1499.jpg){:height="40%" width="40%"}

Oops. The gearbox body's threads stripped out which led to the entire gearbox torquing itself out of the motor casing. It looks like the force was too much for the PETG plastic...

![IMG_1184]({{ site.url }}/img/Post3/IMG_1184.jpg){:height="40%" width="40%"}

Which leads us to the next iteration of the gearbox with nut inserts and wider distribution of fasteners. The side-swept cut sadly had to go. But that was for the better.

![IMG_1377]({{ site.url }}/img/Post3/IMG_1377.jpg){:height="30%" width="30%"}
<br>
![IMG_1380]({{ site.url }}/img/Post3/IMG_1380.jpg){:height="30%" width="30%"}

And bam - there she is.

![Annotation 2020-08-07 011350]({{ site.url }}/img/Post3/Annotation 2020-08-07 011350.png){:height="40%" width="40%"}

Now that I have the thing built, I want to start making the thing move. So I got myself an Arduino Mega 2560 and a Ramps 1.4 shield with A9488 Drivers and uploaded a simple Step+Direction control sketch.

![ezgif-4-581c98fc16cb]({{ site.url }}/img/Post3/ezgif-4-581c98fc16cb.gif){:height="40%" width="40%"}

Ok, that was easy enough. Now how about making it move predictably? I then went onto the web to search for ways that I could coordinate stepper movement effectively, and found much more than I was expecting.

<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/fHAO7SW-SZI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

This video by iforce2d had absolutely everything I was looking for and more. By the end, he had introduced a sketch that would allow you to prepare stepper movements for multiple steppers and execute them complete with stepper start-time end-time coordination, linear speed ramping, *and even interrupts*. This massively simplifies everything. And this is where that got us:

<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/8E2R9iQnwQs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

Next, I needed to figure out how to give angle inputs, and I also wanted to move out of the Arduino IDE interface, since preparing movements within the sketch currently consists of editing the motor ID and step# parameter manually:

![Annotation 2020-08-07 134854.png]({{ site.url }}/img/Post3/Annotation 2020-08-07 134854.png){:height="40%" width="40%"}

So I decided to use Python, since it would allow me to send the Arduino data over serial, and also so I could learn and use TKinter for Python for my home-brewed interface.

In learning about serial data communication, I had to create my own command protocol that my Python code could send which the Arduino could then receive and interpret. My protocol needed to be able to assign a Motor ID as well as step count for that particular motor, and I also needed a protocol for executing the runAndWait() function. So I ended up with the following command structure:

![CommandStructure]({{ site.url }}/img/Post3/Annotation 2020-08-07 172642.png)

To control the parameters for my prepareMovement() method in the Arduino sketch, my Command prefix would consist of MTR0, MTR1, ... to MTR6 to pass in the Motor ID, and the Data suffix would pass in the desired step count. A full command would look something like #MTR2500\\n to prepare movement on motor 2 for 500 steps, or #MTR51780\\n to prepare movement on motor 5 for 1780 steps. For the runAndWait() method, a simple #EXEC\\n without anything in the data field would suffice.



### The Kinematics Conspiracy
