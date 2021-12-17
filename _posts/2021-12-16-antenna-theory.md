---
layout: post
title:  "Some Antenna Theory"
excerpt: "Learning cool new stuff"
categories: [projects]
image: IMG_0671.jpg
---

The Michigan Mars Rover team is a student design team on campus that designs a rover that is subsequently entered into a design 
competition every year called the University Rover Challenge. The competition requirements and guidelines allow for the rover to be 
controlled via wireless communication systems between a base of operations and the rover as long as it adheres to all applicable FCC regulations. 
Currently, the Michigan Mars Rover team operates at the 900MHz UHF carrier band. The rover communication system commonly has to deal with non line of 
sight and long distance conditions of up to 1-2km away. In the most recent competition (2019), the team dealt with some issues relating to loss of 
line-of-sight between the base station antenna and the rover due to a hill obstruction, and also loss of signal strength and packet loss at longer 
distances of ~1.5km out. As the head of the communications team, it is my responsibility to rectify these issues and ensure the highest communications 
system performance and mitigate the possibility of loss of signal. For this post, I will go over some of the theory behind the testing and verification 
methods used by our team to ensure optimal performance.


In antenna theory, an isotropic radiator is a theoretical, lossless antenna which radiates power uniformly in all directions (spherically). The power 
radiated from the isotropic antenna will have a uniform power per unit area no matter where you measure it from. The isotropic antenna is therefore the 
reference for all antennas. The unit dBi (decibels-isotropic) is commonly used to characterize antenna gain and describes a ratio between the realized antenna gain in 
a certain direction compared to an isotropic radiator as reference. Whenever you hear "decibels" you should think of a ratio, and when you think of a ratio, you should be able to reference two numbers. On real antennas, the radiation pattern is not isotropic, but rather has lobes where 
power is concentrated or even amplified (>0dBi), and other directions where the transmitted signal radiates very little (<0dBi), either due to intrinsic 
antenna conductor geometry or hardware such as metal backing panels or dishes to reflect the signal and concentrate the power in another direction. HFSS 
(high frequency simulation software) is a tool used by our team to analyze the 3D representation of this radiation pattern by simulating conductor geometry 
and giving the materials the appropriate properties (permittivities, permeabilities, and conductivities). In any antenna product specification sheet, 
you will commonly find radiation pattern information in the form of a polar radiation pattern plot.

![Annotation1]({{ site.url }}/img/Screenshot 2021-12-16 232737.png)


The example above is the radiation pattern plot taken from the product specification sheet of a 3dBi whip antenna used on the rover, which are commonly monopole antennas. The geometry of the monopole antenna causes it to radiate equal radio power in all azimuthal directions perpendicular to the antenna's axis (left picture), but causes “lobes” in the vertical plane where no power radiates from the top and bottom of the whip antenna (right picture). This causes a 3D representation of the radiation pattern to look something like a “donut” shown below:

![Annotation2]({{ site.url }}/img/Screenshot 2021-12-16 232813.png)


The Friis transmission equation is commonly used by the MRover communications team to compute expected received power at the rover antenna. The Friis equation is given by 

![Annotation3]({{ site.url }}/img/Screenshot 2021-12-16 232827.png)

Where $P_T$ is transmit power (Watts), $G_T$ is transmitting antenna gain (dBi), $G_R$ is the receiving antenna gain (dBi), and R is the distance between the antennas. 
You may recognize that the term in the denominator characterizes the spherical inverse square law appropriately applied to the directional power radiated by an antenna. 
An example of the friis equation being used on our team comes from a recent equipment test. The test was performed with a horizontally polarized 13dBi base 
station antenna and a vertically polarized 5dBi rover antenna at a distance of 200m with a transmit power of 0dBm (or 0.001W of transmitted power). 
The expected power received by the rover antenna at that distance is calculated to be 67.6 nW or -61.70 dBm. During actual testing, we observed signal 
strength to be strongest when the polarization of the rover antenna agreed with the polarization of the base station (when the rover antenna was held in 
the horizontal plane and pointing tangent to the spherical wavefront), giving us an average of -62.6 dBm, which is quite close to the expected. Signal 
strength was accordingly the weakest when the rover antenna was upright, giving an average of -79 dBm. From this test we’ve verified the extremely important 
assumption that antenna polarization and radiation pattern have a non-trivial effect on communications system performance. We also look to do further 
testing with a vertically polarized base station antenna in order to leverage the omnidirectional radiation pattern given by an upright rover antenna,  
decreasing the real estate required for the on-rover communications system.
