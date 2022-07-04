---
layout: post
title:  "Quadruped Documentation [Live Post]"
excerpt: "More effort into documenting my process"
categories: [projects]
image: IMG_5705.jpg 
---
### July 3rd, 2022
Picking up the Quadruped project again in the middle of my internship at Medtronic. Left this project last year at a python script with inverse kinematics fully implemented. It was able to provide a 3D visualization of linkages with joystick or keyboard pose control, and simultaneously generate joint angles, which are then sent to the teensy4.0 microcontroller for servo angle control. In short, I can make the Quadruped wiggle its rear pretty good. But the python control program was run on my laptop sending joint angle data over serial to the teensy4.0, meaning the robot was tethered to my laptop by a USB cable. The next step involves actually utilizing the onboard Raspberry Pi computer to replace the function my laptop served. I also have not gotten the Quadruped walking yet, which is the plan now that I have more experience and education under my belt. This writing is also an attempt at increasing effort to document my process. I apologize if the writing is grammatically or aesthetically unsatisfying, but most of this will likely be stream of consciousness-esque simply due to me not wanting to spend an excessive amount of time documenting intricacies or too many implementation details. 

Current roadmap consists of:


Hardware // Find out how to SSH a headless RPi over ethernet and connect to Wifi

Hardware // Rectify RPi undervolting issue

Hardware & Software // Untethered operation with joystick pose control

Software // Rewrite python visualization+controller code in C++

Software // Change power-on servo initialization behavior

Software // Basic gait generation & walking

Hardware // Research current sense circuit for contact detection

Software // Physics Simulation - ROS & Gazebo

Software // Complex gait generation & walking


In chronological order (probably). First problem on my plate is that the Raspberry Pi is not connecting to Wifi. Wifi configuration is probably a lot simpler on an RPi with the GUI boot image, however I opted for the headless image for compute resource concerns. The RPi is also detecting an undervoltage event on power-on, which I suspect may cause network connection issues. 
First, I moved the RPi from the Quadruped breakout board to an external power supply. Undervolting issue goes away, get_throttle warning flag goes away, but this did not solve Wifi connection issue. 

In the middle of trying to solve the Wifi issue, I managed to get SSH working with the PuTTY terminal emulator, which is a tool I actually very recently learned about during my internship at Medtronic. SSH capability will allow me to access and modify RPi files from my laptop over an ethernet connection network, circumventing the need to hook the RPi up to an dedicated display and keyboard setup.

Managed to get Wifi working! Turns out I had minor typos while setting up one of my wireless network config files. Interface monitor now shows transmitted and received packets for wlan0. I can also now successfully ping raspberrypi.local from my laptop wirelessly.

### July 4th, 2022
Happy Independence Day

The cause of the undervolting issue is a bit tricky to isolate. Booting the RPi when connected to the Quadruped 5v source throws the undervolt warning. When I apply digital multimeter probes to the 5v source, the measurement reads 4.97v. Not great considering the RPi voltage requirements are pretty strict, but confusing since the RPi should be okay with inputs ranging from 4.7v to 5.25v. One thought is that the input resistance of the RPi is somehow dropping the 5v source much lower. Will have to find a way to measure voltage value with RPi connected to Quadruped supply. 

Nudging the supply a bit closer to 5.25v to achieve a safer margin could also help but is tricky in my situation since I’m using a COTS (commercial off the shelf) 6-20v to 5v converter circuit. It doesn’t come with a potentiometer or any similar control mechanism so I don’t have much control over the output voltage. Another thought is that the RPi is unhappy with the max current the converter circuit is capable of supplying, which is advertised as 1.5A, whereas the RPi 4 spec says it would like a 5v 3A capable input. Perhaps I can double up the converter circuit and put two in parallel as a quick fix/test. 

This issue brings up a desire to redo my PCB but this time with custom power regulation circuitry for both the RPi and teensy MCU. This will be very time consuming but I’m very eager to go down this path mainly for more circuit design/CAD experience in Altium. Other additions to the PCB could include more robust and locking actuator connectors (right now they’re simply loose headers like the ones on breadboard jumper cables), integrated mount for the IMU, and future research could yield fruit for current sensing circuitry which might allow for foot contact event detection, which will be massively important if I wish to do any complex gait/motion planning.
