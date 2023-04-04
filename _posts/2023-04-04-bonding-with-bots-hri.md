---
layout: post
title:  "Bonding with Bots"
excerpt: "A review of recent advancements in intelligent Human-Robot Interaction"
categories: [article]
image: Post7/file51575.jpg

---
Preface: This piece was originally written as a final paper for a course on Human-Robot Interaction (HRI). The goal was to create an engaging and informative article on the subject. Since the content fit well enough with the overall theme of my website, I decided to adapt it into a post for this platform.

<br>
<div align="center">*   *   *</div>
<br>

In a galaxy far far away, Anakin Skywalker constructed C-3PO in the "Star Wars" universe as a droid specially designed to assist with etiquette, customs, and translation tasks[^1], setting a high bar for human-robot interaction. Inspired by this vision, researchers are working to develop sophisticated and intelligent robots capable of reaching similar heights in communication and interaction.

<br>

From factories to hospitals, our own houses to other planets within our system, robots are steadily making their way into every aspect of human life, showing no signs of slowing. According to Brian Scassellati, Ph.D., director of the Social Robotics Lab at Yale University, “Robots that engage with people are absolutely the future. There’s no question that’s where robotics is moving”[^2]. As we continue designing and integrating intelligent machines with human society, it is crucial to develop effective and safe communication methods that allow humans and robots to come together harmoniously.

<br>

This article explores recent advancements in the burgeoning field of human-robot interaction (HRI) and how researchers with this vision are laying the foundation for the ways we will exchange information with our intelligent metallic counterparts.

<br>

### Learning the Language of Humans
Effective human-robot collaboration relies on humans and robots understanding each other’s actions and intentions. To facilitate this understanding, researchers are developing robotic systems capable of both verbal and non-verbal communication, refining conversational skills, and developing capability to interpret gestures, posture, and other social cues.

<br>

Advances in natural language processing (NLP) enable robots to comprehend and process various forms of human language, including spoken and written communication. Recent high-profile developments in NLP such as ChatGPT, Microsoft Bing Chat, and Google Bard, have brought these advancements to the mainstream. To this end, researchers are relying heavily on deep learning and mimicking the human cognitive model to enhance a machine’s ability to understand nuances in human speech and natural language. The architecture underpinning today's popular chatbots was first introduced in a 2017 paper titled "Attention Is All You Need" by Vaswani and his team[^3], where they present a new approach to designing deep learning models with "attention mechanisms," drawing inspiration from the human cognitive model of selective attention. Just as our human minds can efficiently process complex situations by focusing our attention on essential information, attention mechanisms enable artificially intelligent systems to hone in on vital portions of input data while ignoring less relevant information. For instance, ChatGPT uses attention mechanisms to weigh the importance of different words or phrases within context, allowing the model to capture and encode information about complex patterns and relationships in language, leading to more coherent and contextually appropriate responses, ultimately improving the performance in text summarization and conversation generation tasks.

<br>

In addition to understanding human speech, mastering the subtle art of non-verbal conversation is essential for robots to collaborate effectively with humans. Non-verbal cues, such as gestures and body language, play a crucial role in our human communications. Andrea Bonarini's article, "Communication in Human-Robot Interaction," published in Current Robotics Reports 2020, highlights the diverse dimensions of human-robot communication, emphasizing that interactions are not confined to verbal language alone[^4]. Rather, interactions encompass all relevant aspects of communication, utilizing the full range of sensory channels, including hearing, sight, and touch. The report emphasizes the need for both human and robotic agents to process the signals detected along these multi-modal channels to make informed decisions on how to behave when interacting with one another.

<br>

For example, turn-taking is a vital component of dialogue, and conversational robots must recognize and understand how to react to indications of a shift in turn in real-time. Knowing when to speak and when to listen allows robots to communicate smoothly with humans, and heavily relies on non-verbal cues. Gabriel Skantze's article[^5] reviewing conversational turn-taking applied to HRI provides a comprehensive analysis of cues that facilitate turn-taking during verbal exchanges. These include verbal cues, prosody, breathing, gaze, and gestures. The verbal aspect of spoken language is paramount for regulating turn shifts. For example, the phrase “I would like to order a...” is not syntactically complete, and a listener would wait for the speaker to finish the sentence. Prosody refers to the stress and intonation patterns in speech that can convey turn-taking information. Breathing can also offer cues, as speakers typically pause to inhale before starting a new turn. Gaze and gestures also contribute essential information about turn-taking, with eye contact and body language signaling a speaker's intention to initiate or relinquish a turn. The article further explores prior work done to model turn-taking, including end-of-turn detection, handling user interruptions, generating turn-taking cues, and multi-party human-robot interactions.

<br>

Researchers from Germany’s Otto-von-Guericke University Magdeburg have implemented RoSA, a Robot System Assistant, for safe and intuitive human-machine interaction[^6]. The authors designed a new multi-modal system for human-machine interaction based on speech, facial, and gesture recognition, addressing the need to leverage multi-modal sensing channels in Bonarini’s article[^4]. Various modules were implemented to encode interaction information, with a notable example being the attention module, used to estimate the user’s intention to interact with the robot. Features used to estimate engagement and disengagement include gaze, head pose (Fig. 1), posture, speech, and distance. The study reports that their method achieves usability scores similar to an entirely human remote-controlled robot interaction, emphasizing speech and pointing gestures as essential interaction modalities. The authors emphasize the need for modular and iterative systems that can be improved through ongoing studies and regular evaluations. RoSA serves as a starting point for creating such a system, laying the foundation for the future development of natural and collaborative human-robot interactions.

<br>

![HeadPose]({{ site.url }}/img/Post7/headpose.png){:height="auto" max-width="460px"}
<div align="center">Figure 1. Head pose detection used in RoSA attention module</div>

<br>

By closely examining how humans communicate, researchers are able to design and implement robots that can more effectively understand and interact with their human counterparts. Pioneering work such as RoSA demonstrates the potential for creating seamless and intuitive interactions between humans and robots through the use of multi-modal sensing. 

<br>

### Robot Competence, Human Confidence, and Mutual Trust
Establishing trust is vital for effective collaboration between humans and robots. The Endsley model offers a structured approach to designing robotic systems with high situational awareness, enabling them to make competent and informed decisions while working alongside humans, thereby increasing human trust. The Endsley model consists of three components: perception, comprehension, and projection. The perception stage involves recognizing and processing relevant information from the environment. Robots must accurately perceive and interpret various elements such as objects, events, and the status of ongoing tasks. The comprehension stage requires understanding the meaning and implications of the perceived information. This involves integrating and analyzing data to develop a coherent understanding of the current situation and how it relates to the task at hand. The final stage, projection, involves anticipating future actions or events based on the current understanding of the situation. Projection allows robots to make informed decisions, adapt to changes, and act proactively. 

<br>

A special issue titled "Situation awareness in human-machine interactive systems" by Tom Ziemke and co-authored by Mica Endsley[^7], features six papers exploring how to improve both humans' and machines' abilities to understand their surroundings and work together more effectively. The papers in this collection address a range of issues related to situation awareness in human-machine interactive systems, including team and shared situation awareness, trust, transparency, timing, engagement, and ethics. The goal is to develop new approaches for improving the ability of both humans and machines to understand their surroundings and make informed decisions. This involves integrating information from different sources, selecting relevant data, making predictions about future events, assessing uncertainties, making decisions, and interacting with other agents.

<br>

Developing robotic systems with high situational awareness contributes to building trust between humans and robots, as they demonstrate a deeper understanding of the context and make more competent decisions, leading to more realistic expectations and well-calibrated trust and confidence between humans and their robotic partners.

<br>

### R2-D2 or T-800?
A common notion is that robots interacting with humans can and therefore should mimic human behavior and characteristics as closely as possible, with the aim of creating human-robot interactions that closely resemble human-human interactions. This idea stems from the belief that human-human interactions generally lead to more enjoyable relationships and efficient work dynamics. However, it is important to recognize that robots need not always be designed solely for work purposes, and their unique designs and capabilities may offer innovative ways to engage with humans.

<br>

An early example of a successful commercial social robot is the Sega Toys iDog[^8]. Released in 2005, the iDog is a robot dog  that reacts to input from an MP3 player by lighting up and "dancing" to the music's rhythm (Fig. 2). Its worldwide popularity can be partly attributed to humans' inherent tendency to anthropomorphize non-human entities, assigning human-like characteristics, emotions, and intentions to them, regardless of whether there existed any intentionality. 

<br>

![iDog]({{ site.url }}/img/Post7/idog.png){:height="auto" max-width="300px"}

<div align="center">Figure 2. Sega Toys iDog</div>

<br>

A research group at the University of Hertfordshire investigated deeper into the concept of intentionality in autonomous robots by exploring the impact of intrinsically motivated robot behavior on humans' social perceptions of robots[^9]. An example of intrinsically motivated behavior is when a child plays with a puppy purely for the enjoyment of the activity, without external incentives or extrinsic goals. The child's motivation to interact with the puppy stems from the inherent pleasure of the activity itself. A quantitative analysis of post-interaction questionnaires showed a significantly higher perception of the dimension "warmth" in intrinsically motivated robot behavior compared to baseline behavior. In human social cognition, warmth is considered a primary dimension for social attitude formation. In the paper, baseline behavior refers to reactive behavior that is not adaptive. This means that the robot responds to stimuli in its environment but does not change its behavior over time based on its experiences.

<br>

By incorporating the ideas of intentionality and intrinsic motivation into robot design, roboticists can create more engaging and enjoyable human-robot interactions that do not solely rely on mimicking human behavior. 

<br>

### Towards a Future
The future of human-robot collaboration is exciting to ponder, as advancements in processing and sensing technologies continue to elevate the intelligence of the machines around us. The field is continuously breaking new ground in understanding and enhancing communication between humans and robots. Researchers not only focus on verbal and non-verbal language comprehension but also explore the importance of trust, situational awareness, and intrinsic motivation to foster more effective and enjoyable interactions. As robots become an integral part of our daily lives, it is essential to continue investigating and refining these aspects of HRI. By learning from the complexities of human communication and embracing the unique capabilities of robots, we can work towards a future where humans and robots collaborate harmoniously and efficiently, making our lives better, safer, and more productive.

<br>

References 

[^1]:[Star Wars Character Encyclopedia: Updated and Expanded, 1st ed., DK Publishing, 2016, p. 36. ISBN: 978-5-0010-1452-2.](https://en.wikipedia.org/wiki/C-3PO)

[^2]:[K. Weir, “The dawn of social robots - Roboticists must dip heavily into psychological science,” Monitor on Psychology, vol. 49, no. 1, p. 50, Jan. 2018.](https://www.apa.org/monitor/2018/01/cover-social-robots)

[^3]:[A. Vaswani et al., “Attention Is All You Need,” arXiv:1706.03762 (cs.CL), Jun. 2017.](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf)

[^4]:[A. Bonarini, “Communication in Human-Robot Interaction,” Curr Robot Rep, vol. 1, pp. 279-285, Aug. 2020.](https://link.springer.com/article/10.1007/s43154-020-00026-1)

[^5]:[G. Skantze, “Turn-taking in Conversational Systems and Human-Robot Interaction: A Review,” Comput. Speech Lang., vol. 54, May 2021.](https://www.sciencedirect.com/science/article/pii/S088523082030111X)

[^6]:[D. Strazdas, J. Hintz, A. Khalifa, A. A. Abdelrahman, T. Hempel and A. Al-Hamadi, “Robot System Assistant (RoSA): Towards Intuitive Multi-Modal and Multi-Device Human-Robot Interaction,” Sensors, vol. 22, no. 3, p. 923, Jan. 2022.](https://www.mdpi.com/1424-8220/22/3/923)

[^7]:[T. Ziemke, K. E. Schaefer and M. Endsley, “Situation awareness in human-machine interactive systems,” Cognitive Systems Research, vol. 46, pp. 1-2, Dec. 2017.](https://www.sciencedirect.com/science/article/pii/S1389041717301870)

[^8]:[B. Christensen, “Sega’s idog – The Friendly Robot Puppy,” Live Science, Feb. 2005.](https://www.livescience.com/127-sega-idog-friendly-robot-puppy.html)

[^9]:[M. M. Scheunemann et al., “Human perception of intrinsically motivated autonomy in human-robot interaction,” Interaction Studies, vol. 30, no. 5, Feb. 2022](https://journals.sagepub.com/doi/full/10.1177/10597123211066153)
