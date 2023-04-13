---
layout: post
title:  "Exciting Things in AI/Robotics Research"
excerpt: "Recent publications and developments worth highlighting"
categories: [post]
image: Post8/RT-1.png
---
> Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Marie Curie
<br>
<br>

This post will be dedicated to recent developments in the fields of AI and intelligent robotics that I feel are worth highlighting. 

## Do As I Can, Not As I Say: Grounding Language in Robotic Affordances
(<a href="https://say-can.github.io/" target="_blank">Website</a>)<br>
(<a href="https://say-can.github.io/assets/palm_saycan.pdf" target="_blank">Paper</a>)<br>
<br>
Researchers from Google introduce SayCan, a robot control method that uses a large language model (LLM) to plan a sequence of robotic actions to achieve a user-specified goal. It works by grounding language models in robotic affordances and leveraging few-shot prompting to break down a long-horizon task expressed in natural language into a sequence of low-level skills. Each of the robot’s skills has a textual description that the LLM can use to compute its probability of fulfilling a step, as well as a value function that indicates how likely the skill is to succeed given the current state of the world. SayCan then combines these two probabilities to choose the next action.

<br>
<div align="center"><iframe style="height:380px;width:80%" src="https://www.youtube.com/embed/ysFav0b472w" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
<br>

## RT-1: Robotics Transformer
(<a href="https://robotics-transformer.github.io/" target="_blank">Website</a>)<br>
(<a href="https://arxiv.org/pdf/2212.06817.pdf" target="_blank">Paper</a>)<br>
<br>
It should be no surprise that roboticists are researching ways to leverage the Transformer models for high-level robot control. Researchers at Google have developed a new model called RT-1 that uses SayCan to enable long-horizon, mobile manipulation tasks. RT-1 takes a short sequence of images and a task description in natural language as input and outputs an action for the robot to execute at each time step. The images and text are processed via a pretrained convolutional neural network to extract visual features that are relevant to the requested task. This is followed by a module that computes a set of tokens, processes these tokens with a Transformer model, and generates a discretized action plan.

<br>
<div align="center"><iframe style="height:380px;width:80%" src="https://www.youtube.com/embed/UuKAp9a6wMs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
<br>

## NeRF: Neural Radiance Fields
(<a href="https://www.matthewtancik.com/nerf" target="_blank">Website</a>)<br>
(<a href="https://arxiv.org/pdf/2003.08934.pdf" target="_blank">Paper</a>)<br>
<br>
Researchers from UC Berkeley, Google Research, and San Diego developed Neural Radiance Fields (NeRFs), a technique to generate 3D representations of an object or scene from sparse 2D images by using advanced machine learning. The term “neural radiance field” describes the different elements in the technique. It is “neural” in that it uses a multilayer perceptron, an older neural network architecture, to represent the image. “Radiance” refers to the fact that this neural network models the brightness and color of rays of light from different perspectives. NeRFs can generate novel views of complex 3D scenes based on a partial set of 2D images and are trained to use a rendering loss to reproduce input views of a scene.

<br>

<div align="center"><iframe style="height:380px;width:80%" src="https://www.youtube.com/embed/JuH79E8rdKc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<br>

## LERF: Language Embedded Radiance Fields
(<a href="https://www.lerf.io/" target="_blank">Website</a>)<br>
(<a href="https://arxiv.org/pdf/2303.09553.pdf" target="_blank">Paper</a>)<br>
<br>
Following the breakthrough of NeRFs, researchers from UC Berkeley have developed a new technique called Language Embedded Radiance Fields (LERFs) that allows for open-ended language queries in 3D scenes. LERFs ground language embeddings from off-the-shelf models like CLIP into NeRF to learn a dense, multi-scale language field. LERF can extract 3D relevancy maps for a broad range of natural language queries interactively in real-time. This provides exciting potential use cases in robotics, vision-language models, semantic scene understanding, and interacting with 3D scenes.

<br>

<div align="center"><iframe style="height:380px;width:80%" src="https://www.youtube.com/embed/7Z2XqH40L08" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<br>

## Neural Volumetric Memory for Visual Locomotion Control
(<a href="https://rchalyang.github.io/NVM/" target="_blank">Website</a>)<br>
(<a href="https://arxiv.org/pdf/2304.01201.pdf" target="_blank">Paper</a>)<br>
<br>
Researchers from UC San Diego, Institute of AI and Fundamental Interactions, and MIT CSAIL published a paper about a new approach to legged robot locomotion using a neural volumetric memory architecture (NVM). This approach accounts for the 3D geometry of the world and aggregates feature volumes from multiple camera views. The NVM architecture in this paper does this by applying 3D translations and rotations to the feature volumes from each camera view to bring them back to the ego-centric frame of the robot. This allows the system to create a more accurate and comprehensive representation of the environment. The representation stored in the neural volumetric memory was also shown to capture sufficient geometric information to reconstruct the scene. 

<br>

<div align="center"><iframe style="height:380px;width:80%" src="https://www.youtube.com/embed/vJdt610GSGk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<br>

## Generative Agents: Interactive Simulacra of Human Behavior
(<a href="https://www.vice.com/en/article/z3mvj3/google-tells-ai-agents-to-behave-like-believable-humans-to-create-artificial-society" target="_blank">Article</a>)<br>
(<a href="https://arxiv.org/pdf/2304.03442.pdf" target="_blank">Paper</a>)<br>
<br>
Researchers from Stanford and Google Research ran a small game world simulation with GPT planning and controlling the character's actions and lives.

<br>

<img src="/img/Post8/sim.png" alt= sim style="max-width:85%;height:auto">

<br>

This paper introduces generative agents, which are computational software agents that simulate believable human behavior. The architecture of generative agents extends a large language model to store a complete record of the agent’s experiences using natural language, synthesize those memories over time into higher-level reflections, and retrieve them dynamically to plan behavior. The authors instantiate generative agents to populate an interactive sandbox environment inspired by The Sims, where end users can interact with a small town of twenty-five agents using natural language. In an evaluation, these generative agents produce believable individual and emergent social behaviors. By fusing large language models with computational, interactive agents, this work introduces architectural and interaction patterns for enabling believable simulations of human behavior

## Vicuna: An Open-Source Chatbot Impressing GPT-4 with 90% ChatGPT Quality
(<a href="https://vicuna.lmsys.org/" target="_blank">Website</a>)<br>
<br>

A team with members from UC Berkeley, CMU, Stanford, and UC San Diego introduce Vicuna-13B, an open-source chatbot trained by fine-tuning [LLaMA](https://ai.facebook.com/blog/large-language-model-llama-meta-ai/) on user-shared conversations collected from ShareGPT. Preliminary evaluation shows that Vicuna-13B achieves high quality compared to other models and the cost of training is around $300. The training and serving code, as well as an online demo, are available for non-commercial use. After fine-tuning with 70K user-shared ChatGPT conversations, Vicuna becomes capable of generating more detailed and well-structured answers compared to [Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html), with quality on par with ChatGPT.

<br>

## ChatGPT Plugins
(<a href="https://platform.openai.com/docs/plugins/introduction" target="_blank">Post</a>)<br>
<br>
This is somewhat of a direct follow-up to my *[GPT-4 Enters the Stone Age](https://uynitsuj.github.io/articles/2023-04/sparks-of-agi#gpt-4-enters-the-stone-age)* section from the Sparks of AGI post. OpenAI has begun moving to augment the functionality of GPT-4 by exploring its impressive ability to leverage novel tools with minimal training via ChatGPT Plugins. 

<br>

<img src="/img/Post8/GPTPluginSearch.jpeg" alt= GPTSearch style="max-width:85%;height:auto">
<div align="center">ChatGPT plugin for querying the internet</div>

<br>

Upon the launch of ChatGPT, I wondered why it wasn't meaningfully connected to the internet but was instead locked to a static snapshot of its content. GPT’s primary function is as a next-token prediction LLM, so it makes intuitive sense to train on a static “wall of text”, but my wondering came from why it didn’t have the capability to query the internet to search for content to augment its response formulation. As suspected, OpenAI later clarified that this decision was made primarily to address safety concerns.

<br>

> Threat actors may also benefit from combining GPT-4 with internet browsing and open-source tools.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— GPT-4 Technical Report, p52

<br>

It makes sense to release internet search functionality through Plugins in a controlled manner. The [GPT-4 Technical Report](https://cdn.openai.com/papers/gpt-4.pdf) has several sections dedicated to discussing the safety implications of LLMs and harm mitigation methods that they have implemented. They have in essence “fenced” the model to minimize the chance for bad-faith actors to use ChatGPT for harm, or to proliferate information that could promote harm (i.e. weapon-making techniques).

<br>

## Sam Altman’s Blog Post on Planning for AGI and Beyond
(<a href="https://openai.com/blog/planning-for-agi-and-beyond" target="_blank">Post</a>)<br>

<br>

No point summarizing, just read.