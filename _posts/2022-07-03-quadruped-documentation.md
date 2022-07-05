---
layout: post
title:  "Quadruped Documentation [Live Post]"
excerpt: "More effort into documenting my engineering process"
categories: [projects]
image: IMG_5705.jpg 
---
### July 3rd, 2022
Picking up the Quadruped project again in the middle of my internship at Medtronic. Left this project last year at [a python script with inverse kinematics fully implemented](https://youtube.com/shorts/zvvzg43DtZo?feature=share). It was able to provide a 3D visualization of linkages with joystick or keyboard pose control, and simultaneously generate joint angles, which are then sent to the teensy4.0 microcontroller for servo angle control. In short, I can make the Quadruped wiggle its rear pretty good. But the python control program was executed on my laptop sending joint angle data over serial to the teensy4.0, meaning the robot was tethered to my laptop by a USB cable. The next step is untethered operation which involves actually utilizing the onboard Raspberry Pi computer to replace the function my laptop served. I also have not gotten the Quadruped walking yet, which is the plan now that I have more experience and education under my belt. This writing is also an attempt at increasing effort to document my process. Most of this will likely be stream of consciousness-esque simply due to me not wanting to spend an excessive amount of time documenting intricacies or too many implementation details. 

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


In chronological order (probably). First problem on my plate is that the Raspberry Pi is not connecting to Wifi. Wifi configuration is probably a lot simpler on an RPi with the GUI boot image, however I opted for the headless image for compute resource concerns and also just to gain more experience working with a headless RPi and directly in the terminal. The RPi is also detecting an undervoltage event on power-on, which I suspect may cause network connection issues. 
First, I moved the RPi from the Quadruped breakout board to an external power supply. Undervolting issue goes away, throttle warning flag goes away, but this did not solve Wifi connection issue. 

In the middle of trying to solve the Wifi issue, I managed to get SSH working with the PuTTY terminal emulator, which is a tool I actually very recently learned about during my internship at Medtronic. SSH capability will allow me to access and modify RPi files from my laptop over an ethernet connection network, circumventing the need to hook the RPi up to an dedicated display and keyboard setup.

Managed to get Wifi working! Turns out I had minor typos while modifying one of the wireless network config files. On a RPi with a GUI, this truly would've been as simple as selecting the correct network and entering the password. Interface monitor now shows transmitted and received packets for wlan0. I can also now successfully ping raspberrypi.local from my laptop wirelessly.

### July 4th, 2022
Happy Independence Day!

The cause of the undervolting issue is a bit tricky to isolate. Booting the RPi when connected to the Quadruped 5v source throws the undervolt warning. When I apply digital multimeter probes to the 5v source with the RPi removed, the measurement reads 4.97v. Not great considering the RPi voltage requirements are pretty strict, but confusing since the RPi should be okay with inputs ranging from 4.9v to 5.25v. One thought is that the input resistance of the RPi and output resistance of the supply is somehow dropping the 5v source much lower. Will have to find a way to measure voltage value with RPi connected to Quadruped supply. 

Nudging the supply a bit closer to 5.25v to achieve a safer margin could also help but is tricky in my situation since I’m using a COTS (commercial off the shelf) 6-20v to 5v converter circuit. It doesn’t come with a potentiometer or any similar control mechanism so I don’t have much control over the output voltage. Another thought is that the RPi is unhappy with the max current the converter circuit is capable of supplying, which is advertised as 1.5A, whereas the RPi 4 spec says it would like a 5v 3A capable input. Unfortunately I missed that requirement the first time around when searching for a RPi power regulator.

This issue brings up a desire to redo my PCB but this time with custom power regulation circuitry for both the RPi and teensy MCU. This will be very time consuming but I’m eager to go down this path in the future mainly for more circuit design/CAD experience in Altium. Other additions to the PCB could include more robust PCB to cable connectors (right now they’re simply loose headers like the ones on breadboard jumper cables), integrated mount for the IMU, and future research could yield fruit for current sensing circuitry which might allow for foot contact event detection, which will be massively important if I wish to do any complex gait/motion planning.

Just ran a Quadruped power-on with the RPi feeding from the onboard power supply. Undervolt detected warning appeared again. Multimeter reads 4.92v at the lowest throughout the entire bootup. It is possible the voltage drops much lower momentarily but the multimeter measurement rate is not fast enough to catch these transient drops. I don’t have an oscilloscope to determine whether this is the case, so for the short term, my best course of action is likely to purchase an alternate voltage regulator circuit, with higher amperage, and a better safety margin (target 5.25v or 5.5v instead of 5v so any drops from internal resistances or a degrading power supply can be compensated). 

Just purchased a 3.0-40V to 1.5-35V Switching Buck Converter with 3A max. Arrives July 6th. Comes with a potentiometer so I can adjust the output voltage to the upper 5.25v limit.

The good news is that the undervoltage issue doesn’t seem to possess extremely high severity at the moment. Wifi connection is stable and benchmark runs with no noticeable performance hit. Meaning I should be able to continue work while I wait for the power regulator replacement.

For fully untethered operation, a lot needs to happen. I will have to modify the existing code a bit and remove the 3D visualization and also verify that the RPi to MCU serial link is established correctly.

Because this is such a large milestone with lots of things going into it, I think another roadmap for this specific goal is warranted:

* Hardware & Software // Pair PS4 controller to RPi via BT and verify input event detection
* Software // Modify controller code for onboard RPi mounted version
  * Remove 3D visualization code
  * Rewrite serial link code to support RPi to teensy4.0 MCU communication link
  * Verify RPi to MCU communication
* Software // Find out how to run python code on power-on/boot
* Hardware & Software // Untethered operation with joystick pose control!

I think I’ll get around to generating a software & hardware architecture report after I’ve completed this milestone.

Got PS4 Joystick paired with the RPi pretty quickly. I’ll go into more detail about how I did this since it might be useful for future reference. 

* Run command **bluetoothctl** on RPi command line to enter bluetooth control mode.
* Turn on the Bluetooth, if not already on, by running **power on**.
* Enter device discovery mode with **scan on** command.
* My PS4 controller showed up as “Wireless Controller” with a MAC address.
* Enter **pair \[MAC Address\]** to pair between devices.
* Finally, connect to your device with **connect \[MAC Address\]**.

If you’d like to view the input event stream to verify the connection:
* Navigate to root directory, then to /dev/input/
* Within this directory should be a js0 joystick device or something with a similar name.
* You will need to download an event decoder package, so make sure the RPi is connected to the internet.
* Run command **sudo apt-get update** and then **sudo apt-get install joystick**.
* Run **sudo jstest \[Joystick Device\]**.
* The stream should immediately begin populating the terminal. Moving joystick tabs or pressing buttons should cause the stream to update with new values.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fIgTX0zC1i0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Just rebooted and did not achieve a undervoltage warning. Leads me to believe that the issue does lie in some transient behavior upon boot-up. Power supply circuit will be replaced anyway because the replacement seems more robust in all aspects. 

It appears the PS4 controller does not automatically reconnect if I power cycle the RPi, like my laptop usually would. It would be annoying to have to access the RPi and SSH to connect the device every time I wanted to control it. Adding another step on the roadmap to find out if I can change this boot-up behavior. 

Turns out I can rectify this by simply running a trust [MAC Address] command in the bluetooth control mode… 
