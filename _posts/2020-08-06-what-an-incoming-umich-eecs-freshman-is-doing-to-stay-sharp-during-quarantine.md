---
layout: post
title:  "What an Incoming UMich EECS Freshman is Doing to Stay Sharp During Quarantine"
excerpt: From developing a 3d-printed 6DoF arm from scratch to making a personal portfolio website to showcase my projects, I’ve been busy.
categories: [project]
image: robots/ezgif-4-f28f910a4123.gif
---

![6DoF]({{ site.url }}/img/robots/ezgif-4-f28f910a4123.gif){:height="25%" width="25%"}

When the first news of 2019-nCoV broke, I was cautiously optimistic that the virus would have a more difficult time transmitting between humans. However, within weeks, many research groups had produced their own R0 estimates, which fell alarmingly somewhere between 1.4 and 4. This is when I realized that we were in it for the long haul. I then realized the privilege I had (which I’m extremely grateful for) and decided it was time to take advantage of an unprecedented amount of free time.

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
I had opted to use NEMA17 stepper motors. Besides the fact that the Haddington Dynamics guys did too, I decided to use NEMA17s because they were reasonably light, and my past robotics experience didn't include very many stepper motors, but rather DC brushed and brushless motors. So I wanted some of my own experience with them. Stepper motors can get quite powerful, but the NEMA17s aren't very strong, spec'd at an average of 0.5Nm for even many of the better performing models and lengths that it came in. This meant that a gearbox was needed to increase the torque produced by the motors if my arm had any hope of lifting itself. For this, the Dexter guys had used the mechanical engineering marvel that is the harmonic flex-spline gearbox, which are mind-numbingly expensive to buy any number of.

Which sadly left me to my own devices...

![Annotation 2020-03-30 151859]({{ site.url }}/img/Post3/Annotation 2020-03-30 151859.jpg)

I spent many days and late-nights trying to tune my 3D-printed planetary gearbox (you read that right... *never again*) to have minimal backlash while at the same time adding in clearance on certain areas of the teeth face to minimize friction. Back-driveability was simply out of the question.

*Secondly:*
I do not have the deepest of pockets, and this was also amidst the early stages of the pandemic, so I tried as best I could to not make a dent in the worldwide effort to mobilize and distribute medical equipment (half-joke). So trying to minimize sourced and fabricated parts such as structural square-tubing, bearings and belting was a priority. Unsurprisingly, sourcing >1000mm loop GT belts was quite the hassle. I don't have a home machine shop either, so trying to source pre-cut or even custom-length 1"x1" square tube was impossible. Many of the other structural things I wanted to do were also out of the question. The Dexter guys used a *MarkForged* industrial 3D-printer for the printed parts and even had carbon-fiber reinforced structural parts printed from it. I was sitting here with my meek and humble (but able) Prusa Mk3S 3D-printer.

For these reasons, along with many other concerns I had about how the design was progressing, I made the executive decision to scrap this iteration.

### Back to the Basics

While keeping the end-effector light is quite the noble effort, it is definitely more involved on the mechanical side. Doubtlessly, with enough time, budget and resources, I would be able to make an arm more similar to Dexter. But given that I was limited in these particular items, I determined that my best course of action was to reject modernity and return to tradition with the proven line of UR style arms from Universal Robots.

![Annotation 2020-08-06 223117]({{ site.url }}/img/Post3/Annotation 2020-08-06 223117.png)

This style of arm featured actuators situated *at* every joint within the arm, massively simplifying the design constraints.

While I had solved my latter issue mentioned above, the former was one I still had to contend with since I decided to use NEMA17s again. So I further iterated on my gearbox design, implementing finer teeth thereby allowing me to create larger reduction ratios and a more compact gearbox system. Now that the actuators were situated directly at the joints, the diameter of the joint bases also needed to be significantly larger to ensure that the increased radial and axial load could be addressed properly. To reconcile the larger load, a larger bearing would be needed. But I once again had issues sourcing thin-section bearings, so I tried my hand at creating my own completely 3D-printed gearbox with an integrated slewing bearing using printed cylindrical bearing beads (you'll find printing spheres to be quite difficult). This is one of my prouder creations. This first iteration of the gearbox features a seductive swept-cut side surface, which didn't make it onto the final iteration the reason for which I will address later.

![Annotation 2020-04-25 231450]({{ site.url }}/img/Post3/Annotation 2020-04-25 231450.jpg) ![IMG_1006]({{ site.url }}/img/Post3/IMG_1006.jpg) ![IMG_1037]({{ site.url }}/img/Post3/IMG_1037.jpg) ![IMG_1039]({{ site.url }}/img/Post3/IMG_1039.jpg)

After much time, I had finished the arm, complete with motor port covers featuring hexagonal patterns. They add a whole lotta personality.

![IMG_1925]({{ site.url }}/img/Post3/IMG_1925.jpg){:height="40%" width="40%"} ![Annotation 2020-05-12 211349]({{ site.url }}/img/Post3/Annotation 2020-05-12 211349.jpg)

And now it was time to start assembly
