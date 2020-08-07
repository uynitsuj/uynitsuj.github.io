---
layout: post
title:  "What an Incoming UMich EECS Freshman is Doing to Stay Sharp During Quarantine"
excerpt: From developing a 3d-printed 6DoF arm from scratch to making a personal portfolio website to showcase my projects, I’ve been busy.
categories: [project]
image: robots/ezgif-4-f28f910a4123.gif
---

![6DoF]({{ site.url }}/img/robots/ezgif-4-f28f910a4123.gif){:height="25%" width="25%"}

When the first news of 2019-nCoV broke, I was cautiously optimistic that the virus would have a more difficult time transmitting between humans. However, within weeks of following the news, many research groups had produced their own R0 estimates, which fell alarmingly somewhere between 1.4 and 4. This is when I realized that we were in it for the long haul. I then realized the privilege I had (which I’m extremely grateful for) and decided it was time to take advantage of an unprecedented amount of free time.

The content of this post will be primarily technical, but beyond that, I spent my quarantine time doing many other things. I also went running, mountain biking, and surfing, all things that I can enjoy while complying with social-distancing guidelines. For the first couple of weeks of quarantine, I was getting quite chunky from having more frequent access to the refrigerator at home. I read through a couple of papers on fasting, and have healthily lost about 19 pounds since the beginning of quarantine conducting 3:4 fasts. I’m satisfied with my current physical fitness. Now, for the good stuff:

First, I’ll give a brief context for my technical proficiency going into quarantine. I had an internship with a local robotics startups and two research internships with UCSD over the duration of high school. I was simultaneously the Head of Mechanical Build and Design for my robotics team in my latter 2 years of high school, where I would build my repertoire for managing and designing robotics systems with SolidWorks CAD software. I would consider myself a pretty motivated student with a good amount of engineering experience and a pretty solid academic foundation (Multivariable calculus, Linear Algebra).

At heart, I’m much more of a mechanical engineering person than I am a computer science or an electrical engineering one, and I've always joked that this could be attributed to my inclination to short-term gratification (perhaps I'd be one to fail the Stanford marshmallo test). But as an aspiring roboticist, I realized I could not just stop at mechanical engineering and let that be that, which is what motivated me to dive head-first into EECS over this summer and also pursue it as my undergraduate degree at UMichigan. Also, ever since finding my passion for robotics on my middle school FTC team, I had told myself that I should eventually be able build my own robot arm from scratch. So what better time than now to give it my first go?

### My 3d-Printed 6DoF Arm Journey

Homemade robot arms aren't all that they're chalked up to be. At least not the ones I make anyway.

My first design iteration did not have many things going for it to say the absolute least.

![Annotation 2020-04-20 140716]({{ site.url }}/img/Post3/Annotation 2020-04-20 140716.jpg)

Perhaps too overly ambitious, I had taken quite heavy inspiration from the folks over at Haddington Dynamics with their robot Dexter:

<div align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/EgVPiBiKNjs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

I had taken particular liking to their design philosophy of weight distribution, positioning all of the heavy powered implements such as stepper motors and gearboxes closer to the base, and using timing belts to transmit that power to the rest of the joints and end-effectors. If there was one thing I could take away from all of my time in competitive robotics, it would be: *keep end effectors as light as humanly possible*, with F=MA and inertial moments and the whole sha-bang. The thing that's supposed to move the most nimbly shouldn't be bogged down by so much mass. So this power transmission method seemed like a no-brainer.

It didn't take long for me to realize that I had downplayed too severely many of the the most obvious downsides that came with opting for such a transmission method.

*Firstly:*  
I had opted to use NEMA17 stepper motors. Besides the fact that the Haddington Dynamics guys did too, I decided to use NEMA17s because my past robotics experience doesn't include very many stepper motors, but rather DC brushed and brushless motors. The NEMA17s aren't the most powerful, spec'd at an average of 0.5Nm for many of the different models and lengths that it came in. Now this meant that I would require a gearbox to increase the torque produced by the motors. For this, the Dexter guys had used the mechanical engineering marvel that is the harmonic flex-spline gearbox, which are mind-numbingly expensive to buy any number of.


[get the PDF](/pdf/ImprovedElevatedRoboticSystemAndMethod.pdf)
