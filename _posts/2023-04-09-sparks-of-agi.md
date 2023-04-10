---
layout: post
title:  "Sparks of Artificial General Intelligence"
excerpt: "Highlighting a recent publication and the current state of a GPT implementation of machine intelligence"
categories: [post]
image: Post8/SOAGI.png
---
It has become increasingly evident to me that I am living in the century when humanity is entrusted with the immense responsibility of developing artificial general intelligence systems that exceed human abilities.
<br>
<div align="center">-   -   -</div>
This is the single most important thing our species will have done with our time on this planet.
<br>
<div align="center">-   -   -</div>
The most impactful scientific discoveries, inventions, medical breakthroughs, and our current political systems have come into the world through the birth canal of the human brain. We Homo Sapiens have thus far been the sole architects of our own future.

<br>

It is not inconceivable to me that we will soon exist in a reality where multi-modal artificially intelligent agents:

1. Assist doctors with medical diagnoses
2. Design mechanical parts end-to-end based on stress, strain, and load requirements.
3. Personalize education by tailoring lesson plans and tutoring sessions to individual learning styles and needs.
4. Enhance creative fields, such as art, music, and literature, by generating novel ideas, compositions, and styles.
5. Optimize supply chain and logistics management by predicting demand, minimizing transportation costs, and reducing waste.
6. Perhaps the scariest: Streamline scientific research by automating hypothesis generation, experiment design, and data analysis.
<br>

A little under three weeks ago, the team at Microsoft Research responsible for investigating OpenAI’s GPT-4 for the development of Bing Chat published their findings in a paper titled _Sparks of Artificial General Intelligence: Early experiments with GPT-4_ ([Bubeck et al., 2023](https://arxiv.org/pdf/2303.12712.pdf)).

<br>

The first author, Sébastien Bubeck, gave a talk of the same name at CSAIL MIT on the same evening the paper was published (22nd of March). If you have 50 minutes to spare, I highly recommend viewing the recording as an abridged version of the paper's findings.

<br>
<div align="center"><iframe style="height:380px;width:80%" src="https://www.youtube.com/embed/qbIk7-JPB2c" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
<br>

OpenAI has already begun moving to augment the functionality of GPT-4 by exploring its impressive ability to leverage novel tools with minimal training via ChatGPT [Plugins](https://platform.openai.com/docs/plugins/introduction). 

<br>

<img src="/img/Post8/GPTPluginSearch.jpeg" alt= GPTSearch style="max-width:85%;height:auto">
<div align="center">ChatGPT plugin for querying the internet</div>

<br>

Upon the launch of ChatGPT, I immediately wondered why it wasn't meaningfully connected to the internet but was instead locked to a static snapshot of its content. GPT’s primary function is as a next-token prediction LLM, so it makes intuitive sense to train on static snapshots, but I was wondering why it didn’t have the capability to query the internet to search for more content to augment its response formulation. As I suspected, OpenAI later clarified that this decision was made primarily to address safety concerns.

<br>

> Threat actors may also benefit from combining GPT-4 with internet browsing and open-source tools

— GPT-4 Technical Report, p52

<br>

It makes a lot of sense to release internet search functionality through Plugins in a controlled manner. The [GPT-4 Technical Report](https://cdn.openai.com/papers/gpt-4.pdf) has several sections dedicated to discussing the safety implications of LLMs and harm mitigation methods that they have implemented. They have in essence “fenced” the model to minimize the chance for bad-faith actors to use ChatGPT for harm, or to proliferate information that could promote harm (i.e. weapon-making techniques).

<br>

One of my primary concerns for the LLMs of the current day is their occasional penchant for “hallucinating” or giving an outright wrong answer (many examples of this online). Some users won’t know any better and will treat its word as gospel, leading to the possibility of an increase in the spread of misinformation. 

<br>

GPT has also increasingly been used for the purposes of code generation. How long until we have people implementing a black-box algorithmic model that they know little about except for the natural language query used to generate it? It is therefore the responsibility of the creators of current and future intelligence models to properly communicate such limitations. It is also the responsibility of the agents interacting with these intelligence models to perform due diligence in verifying and validating the response of these artificial agents. It may not be time yet to call these implementations AGI, but it is probably in our best interest to begin treating them as intelligences that have bouts of unintelligence.

<br>

It is reassuring to know that we haven’t created omnipotent beings just yet

<br>
