---
layout: post
title:  "Exciting Developments in AI/Robotics Research"
excerpt: "Recent(ish) publications and developments worth highlighting"
categories: [post]
image: Post8/RT-1.png
---


## Do As I Can, Not As I Say: Grounding Language in Robotic Affordances
<b><a href="https://say-can.github.io/" target="_blank"><i
                    class="fa fa-fw fa-home"></i> Website</a> / <a href="https://arxiv.org/abs/2204.01691" target="_blank"><img
                    src="https://uynitsuj.github.io/images/arxiv.png" alt="A " style="
                            height: 1em;
                            margin: 0px;
                            vertical-align: middle;
                            display: inline;
                        " class="inline-image"> arXiv</a></b>
<br>
Researchers from Google introduce SayCan, a robot control framework that uses a large language model (LLM) to plan a sequence of robotic actions to achieve a user-specified goal. It works by [grounding](http://www.scholarpedia.org/article/Symbol_grounding_problem) language models in robotic [affordances](https://www.interaction-design.org/literature/topics/affordances) and leveraging [few-shot](https://www.techopedia.com/definition/34949/zero-shot-one-shot-few-shot-learning) prompting to break down a long-horizon task expressed in natural language into a sequence of low-level skills. Each of the robot’s skills has a textual description that the LLM can use to compute its probability of fulfilling a step (language score), as well as a value function that indicates how likely the skill is to succeed given the current state of the world (affordance score). SayCan then combines these two scores for each skill and ranks them to choose the next action.

<br>
<div align="center"><iframe style="aspect-ratio: 16 / 9; max-width:80%;height:400px"  src="https://www.youtube.com/embed/ysFav0b472w" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
<br>

## RT-1: Robotics Transformer
<b><a href="https://robotics-transformer.github.io/" target="_blank"><i
                    class="fa fa-fw fa-home"></i> Website</a> / <a href="https://arxiv.org/abs/2212.06817" target="_blank"><img
                    src="https://uynitsuj.github.io/images/arxiv.png" alt="A " style="
                            height: 1em;
                            margin: 0px;
                            vertical-align: middle;
                            display: inline;
                        " class="inline-image"> arXiv</a></b>
                        <br>
It should be no surprise that roboticists are researching ways to leverage the [Transformer models](https://blogs.nvidia.com/blog/2022/03/25/what-is-a-transformer-model/) for high-level robot control. Researchers at Google have developed a new model called RT-1 that uses the SayCan framework to enable long-horizon, mobile manipulation tasks. RT-1 takes a short sequence of images and a task description in natural language as input and outputs an action for the robot to execute at each time step. The images and text are processed via a pretrained convolutional neural network to extract visual features that are relevant to the requested task. This is followed by a module that computes a set of tokens, processes these tokens with a Transformer model, and generates a discretized action plan. In the website, they show an example video showing how ([PaLM](https://ai.googleblog.com/2022/04/pathways-language-model-palm-scaling-to.html))-SayCan-RT1 can be used to plan and execute ultra-long horizon tasks, with as many as 50 steps. The task "Bring me the rice chips from the drawer" is executed in an office kitchen that the robot has never seen before.

<br>
<div align="center"><iframe style="aspect-ratio: 16 / 9; max-width:80%;height:400px"  src="https://www.youtube.com/embed/UuKAp9a6wMs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
<br>

## NeRF: Neural Radiance Fields
<b><a href="https://www.matthewtancik.com/nerf" target="_blank"><i
                    class="fa fa-fw fa-home"></i> Website</a> / <a href="https://arxiv.org/abs/2003.08934" target="_blank"><img
                    src="https://uynitsuj.github.io/images/arxiv.png" alt="A " style="
                            height: 1em;
                            margin: 0px;
                            vertical-align: middle;
                            display: inline;
                        " class="inline-image"> arXiv</a></b>
                        <br>
Researchers from UC Berkeley, Google Research, and San Diego developed Neural Radiance Fields (NeRFs), a technique to generate 3D representations of an object or scene from sparse 2D images by using advanced machine learning. The term “neural radiance field” describes the different elements in the technique. It is “neural” in that it uses a [multilayer perceptron](https://www.youtube.com/watch?v=7YaqzpitBXw) to represent the image. “Radiance” refers to the fact that this neural network models the brightness and color of rays of light from different perspectives. NeRFs can generate novel views of complex 3D scenes based on a partial set of 2D images and are trained to use a rendering loss to reproduce input views of a scene.

<br>

<div align="center"><iframe style="aspect-ratio: 16 / 9; max-width:80%;height:400px"  src="https://www.youtube.com/embed/JuH79E8rdKc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<br>

## LERF: Language Embedded Radiance Fields
<b><a href="https://www.lerf.io/" target="_blank"><i
                    class="fa fa-fw fa-home"></i> Website</a> / <a href="https://arxiv.org/abs/2303.09553" target="_blank"><img
                    src="https://uynitsuj.github.io/images/arxiv.png" alt="A " style="
                            height: 1em;
                            margin: 0px;
                            vertical-align: middle;
                            display: inline;
                        " class="inline-image"> arXiv</a></b>
                        <br>
Following the breakthrough of NeRFs, researchers from UC Berkeley have developed a new technique called Language Embedded Radiance Fields (LERFs) that allows for open-ended language queries in 3D scenes. LERFs ground [word embeddings](https://neptune.ai/blog/word-embeddings-guide) from off-the-shelf models like OpenAI's [CLIP](https://openai.com/research/clip) to learn a dense language field. LERF can extract 3D relevancy maps for a broad range of natural language queries interactively in real-time. This provides exciting potential use cases in robotics, vision-language models, and semantic scene understanding.

<br>

<div align="center"><iframe style="aspect-ratio: 16 / 9; max-width:80%;height:400px"  src="https://www.youtube.com/embed/7Z2XqH40L08" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<br>

## DreamFusion: Text-to-3D using 2D Diffusion
<b><a href="https://dreamfusion3d.github.io/" target="_blank"><i
                    class="fa fa-fw fa-home"></i> Website</a> / <a href="https://arxiv.org/abs/2209.14988" target="_blank"><img
                    src="https://uynitsuj.github.io/images/arxiv.png" alt="A " style="
                            height: 1em;
                            margin: 0px;
                            vertical-align: middle;
                            display: inline;
                        " class="inline-image"> arXiv</a></b>
                        <br>
Diffusion has come a long way. Researchers from Google and UC Berkeley have developed a new method for turning natural language text prompts into 3D models using existing Diffusion technology designed for 2D images. They use a technique called "probability density distillation" to adapt a pre-trained 2D text-to-image model for creating 3D models. By optimizing a 3D model (a NeRF actually), they can generate 3D models that can be viewed from any angle and lit by various light sources. This approach does not require 3D training data or changes to the original 2D image model, showing the potential of using pre-trained 2D image models for 3D synthesis.

<br>

<div align="center"><iframe style="aspect-ratio: 16 / 9; max-width:80%;height:400px"  src="https://www.youtube.com/embed/zWD5ZR5GtJM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<br>


## Neural Volumetric Memory for Visual Locomotion Control
<b><a href="https://rchalyang.github.io/NVM/" target="_blank"><i
                    class="fa fa-fw fa-home"></i> Website</a> / <a href="https://arxiv.org/abs/2304.01201" target="_blank"><img
                    src="https://uynitsuj.github.io/images/arxiv.png" alt="A " style="
                            height: 1em;
                            margin: 0px;
                            vertical-align: middle;
                            display: inline;
                        " class="inline-image"> arXiv</a></b>
                        <br>
Researchers from UC San Diego, Institute of AI and Fundamental Interactions, and MIT CSAIL published a paper about a new approach to legged robot locomotion using a neural volumetric memory architecture (NVM). This approach accounts for the 3D geometry of the world and aggregates feature volumes from multiple camera views. This is done by applying 3D translations and rotations to the feature volumes from each camera view to bring them back to the ego-centric frame of the robot. This allows the system to create a more accurate and comprehensive representation of the environment. The representation stored in the neural volumetric memory was also shown to capture sufficient geometric information to reconstruct the scene. 

<br>

<div align="center"><iframe style="aspect-ratio: 16 / 9; max-width:80%;height:400px"  src="https://www.youtube.com/embed/vJdt610GSGk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<br>

## Generative Agents: Interactive Simulacra of Human Behavior
<b><a href="https://www.vice.com/en/article/z3mvj3/google-tells-ai-agents-to-behave-like-believable-humans-to-create-artificial-society" target="_blank"><i
                    class="fa-solid fa-newspaper"></i> Article</a> / <a href="https://arxiv.org/abs/2304.03442" target="_blank"><img
                    src="https://uynitsuj.github.io/images/arxiv.png" alt="A " style="
                            height: 1em;
                            margin: 0px;
                            vertical-align: middle;
                            display: inline;
                        " class="inline-image"> arXiv</a></b>
                        <br>
Researchers from Stanford and Google Research ran a small game world simulation with GPT planning and controlling the character's actions and lives.

<br>

<img src="/img/Post8/sim.png" alt= sim style="max-width:85%;height:auto">

<br>

This paper introduces generative agents, which are computational software agents that simulate believable human behavior. The architecture of generative agents extends an LLM to store a complete record of the agent’s experiences using natural language, synthesize those memories over time into higher-level reflections, and retrieve them dynamically to plan behaviors. The authors populate an interactive sandbox environment inspired by The Sims with generative agents, where end users can interact with a small town of twenty-five agents using natural language. In an evaluation, these generative agents produce believable individual and emergent social behaviors.

## Vicuna: An Open-Source Chatbot Impressing GPT-4 with 90% ChatGPT Quality
<b><a href="https://vicuna.lmsys.org/" target="_blank"><i
                    class="fa fa-fw fa-home"></i> Website</a></b>
                        <br>
A team with members from UC Berkeley, CMU, Stanford, and UC San Diego introduce Vicuna-13B, an open-source chatbot trained by fine-tuning [LLaMA](https://ai.facebook.com/blog/large-language-model-llama-meta-ai/) on user-shared conversations collected from [ShareGPT](https://sharegpt.com/). Preliminary evaluation shows that Vicuna-13B achieves high quality compared to other models and the cost of training is around $300. The code and training data are available for non-commercial use. After fine-tuning with 70K user-shared ChatGPT conversations, Vicuna becomes capable of generating more detailed and well-structured answers compared to [Alpaca](https://crfm.stanford.edu/2023/03/13/alpaca.html), with quality on par with ChatGPT.

<br>

## OpenAI's Sam Altman Blog Post on Planning for AGI and Beyond
<b><a href="https://openai.com/blog/planning-for-agi-and-beyond" target="_blank"><i
                    class="fa-solid fa-newspaper"></i> Post</a></b>
                        <br>
No point summarizing, just read.
