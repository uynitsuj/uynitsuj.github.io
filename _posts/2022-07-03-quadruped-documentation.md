---
layout: post
title:  "Quadruped Updates"
excerpt: "Long overdue untethered functionality"
categories: [project]
image: 1660686728056.jpeg
---
### July 3rd, 2022
Picking up the Quadruped project again in the middle of my internship at Medtronic. Left this project last year at [a python script with inverse kinematics fully implemented](https://youtube.com/shorts/zvvzg43DtZo?feature=share). It was able to provide a 3D visualization of linkages with joystick or keyboard pose control, and simultaneously generate joint angles, which are then sent to the teensy4.0 microcontroller for servo angle control. But the python control program was executed on my laptop sending joint angle data over serial to the teensy4.0, meaning the robot was tethered to my laptop by a USB cable. The next step is untethered operation which involves actually utilizing the onboard Raspberry Pi computer to replace the function my laptop served. This writing is also an attempt at increasing effort to document my process. 

<br>

Current roadmap consists of:

* Hardware // Find out how to SSH a headless RPi over ethernet and connect to Wifi
* Hardware // Rectify RPi undervolting issue
* Hardware & Software // Untethered operation with joystick pose control
* Software // Rewrite python visualization+controller code in C++
* Software // Change power-on servo initialization behavior
* Software // Basic gait generation & walking
* Hardware // Research current sense circuit for contact detection	
* Software // Physics Simulation - ROS & Gazebo
* Software // Complex gait generation & walking

<br>

First problem on my plate is that the Raspberry Pi is not connecting to Wifi. Wifi is maily needed for a connection to github so that I can develop code on my laptop, push it to my repository, and pull the finished code from the robot. Wifi configuration is probably a lot simpler on an RPi with the GUI image, however I opted for a headless image for compute resource concerns and also just to gain more experience working with a headless RPi and directly in the bash terminal. 

<br>

The RPi is also detecting an undervoltage event on power-on, which I'm concerned may cascade into other issues. 

<br>

First, I moved the RPi from the Quadruped breakout board to an external power supply. Undervolting issue goes away, throttle warning flag goes away, but this did not solve Wifi connection issue. 

<br>

In the middle of trying to recftify the Wifi issue, I managed to SSH (Secure Shell) into the RPi from my laptop. SSH capability allows me to access the RPi's terminal over a local network and modify RPi files, circumventing the need to connect the RPi to a dedicated display and keyboard setup.

<br>

Managed to get Wifi working. Turns out I mistyped while modifying one of the network config files. On a RPi with a GUI, this truly would've been as simple as selecting the correct network and entering a password. Wireless network monitor now shows transmitted and received packets for wlan0. I can also now successfully ping google.com.

### July 4th, 2022
Happy Independence Day!
<br>

The cause of the undervolting issue is a bit tricky to isolate. Booting the RPi when connected to the Quadruped 5v source throws the undervolt warning. When I apply digital multimeter probes to the output of my converter with the RPi removed, the measurement reads 4.97v. Confusing since the RPi should be okay with inputs ranging from 4.9v to 5.25v. One thought is that the input resistance of the RPi and output resistance of the supply is somehow dropping the source lower. I'll need to find a way to measure voltage with RPi connected to Quadruped supply. 

<br>

Nudging the supply a bit closer to 5.25v to achieve a safer margin could also help but is tricky in my situation since I’m using a COTS (commercial off the shelf) 6-20v to 5v converter circuit. It doesn’t come with a potentiometer or any similar output voltage control mechanism.

<br>

This issue brings up a desire to redo my PCB but this time with custom power regulation circuitry for both the RPi and teensy MCU. This will be very time consuming but I’m eager to go down this path in the future mainly for more circuit design/CAD experience. Other additions to the PCB could include more robust PCB to actuator cable connectors (right now they’re simply loose headers like the ones on breadboard jumper cables), integrated mount for the IMU, and future research could yield fruit for current sensing circuitry which might allow for foot contact event detection, which will be massively important if I wish to do any complex gait/motion planning. But in reality my future endeavors should focus on adding joint angle feedback with some magnetic encoders or something similar.

<br>

Just ran a Quadruped power-on with the RPi feeding from the onboard power supply. Undervolt detected warning appeared again. Multimeter reads 4.92v at the lowest throughout the entire bootup. It is possible the voltage drops much lower momentarily but the multimeter's sampling frequency is not fast enough to catch these transient drops, whereas the RPi detects it and immediately throws the undervolt flag. I don’t have an oscilloscope to determine whether this is the case, so for the short term, my best course of action is likely to purchase an alternate voltage regulator circuit, with higher maximum current, and capable of achieving a better safety margin (target 5.25v or 5.5v instead of 5v so any drops from internal resistances or a degrading power supply can be compensated). 

<br>

Just purchased a 3.0-40V to 1.5-35V Switching Buck Converter with 3A max. Comes with a potentiometer so I can adjust the output voltage to the upper 5.25v limit. This is a module that would be great to implement on a custom power distribution panel PCB.

<br>

The good news is that the undervoltage issue doesn’t appear to possess extremely high severity. Wifi connection is stable and a quick benchmark runs with no noticeable performance hit. Meaning I should be able to continue work while I wait for the power regulator replacement.

<br>

For fully untethered operation, a lot needs to happen. I will have to modify the existing code a bit and remove the 3D visualization and also verify that the RPi to MCU serial link is established correctly.

<br>

Because this is such a large milestone with lots of things going into it, I think another roadmap for this specific goal is warranted:

* Hardware & Software // Pair PS4 controller to RPi via BT and verify input event detection
* Software // Modify controller code for onboard RPi mounted version
  * Remove 3D visualization code
  * Rewrite serial link code to support RPi to teensy4.0 MCU communication link
  * Verify RPi to MCU communication
* Software // Find out how to run python code on power-on/boot
* Hardware & Software // Untethered operation with joystick pose control!

<br>

I think I’ll get around to generating a software & hardware architecture report after I’ve completed this milestone.

<br>

Got PS4 Joystick paired with the RPi pretty quickly. I’ll go into more detail about how I did this since it might be useful for future reference. 

* Run command **bluetoothctl** on RPi command line to enter bluetooth control mode.
* Turn on the Bluetooth, if not already on, by running **power on**.
* Enter device discovery mode with **scan on** command.
* My PS4 controller showed up as “Wireless Controller” with a MAC address.
* Enter **pair \[MAC Address\]** to pair between devices with the controller in pairing mode.
* Finally, connect to your device with **connect \[MAC Address\]**.
<br>
If you’d like to view the input event stream to verify the connection:
* Navigate to root directory, then to /dev/input/
* Within this directory should be a js0 joystick device or something with a similar name.
* You will need to download an event decoder package, so make sure the RPi is connected to the internet.
* Run command **sudo apt-get update** and then **sudo apt-get install joystick**.
* Run **sudo jstest \[Joystick Device\]**.
* The stream should immediately begin populating the terminal. Moving joystick tabs or pressing buttons should cause the stream to update with new values.

<div align="center"><iframe style="height:380px;width:80%" src="https://www.youtube.com/embed/fIgTX0zC1i0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

Just rebooted and did not achieve a undervoltage warning. Leads me to believe that the issue does lie in some transient behavior upon boot-up. Power supply circuit will be replaced anyway because the replacement seems more robust in all aspects. 

<br>

It appears the PS4 controller does not automatically reconnect if I power cycle the RPi, like it usually would on my laptop. It would be annoying to have to access the RPi and SSH to connect the joystick every time I wanted to control the Quadruped. The goal is to be able to power-on and control it with the joystick pretty much immediately. Adding another step on the roadmap to find out if I can change this boot-up behavior. 

<br>

Turns out I can rectify this by simply running a **trust \[MAC Address\]** command in the bluetooth control mode… 

### July 5th, 2022

Just found out about a 3A, Synchronous Step-Down Converter IC from work (RT8299ZQW) with good input and output ranges! I didn't know they made them this small! Seems like the perfect chip for my power regulation needs, and is bringing me closer to a PCB redesign. I'd need to learn more about PCB SMDs and how I could get a PCB reflow operation going at home...

### July 9th, 2022

Untethered operation achieved!

<div align="center"><iframe style="height:380px;width:80%" src="https://www.youtube.com/embed/M4QWi-B-I3s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

I'll probably have to go inactive for a while again since my internship work is picking up again and soon my fall semester will begin.