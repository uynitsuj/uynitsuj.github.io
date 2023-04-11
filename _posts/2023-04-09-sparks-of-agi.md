---
layout: post
title:  "Sparks of Artificial General Intelligence"
excerpt: "Highlighting a recent publication and the current state of a GPT implementation of machine intelligence"
categories: [post]
image: Post8/SOAGI.png
---
> Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Marie Curie
<br>
<br>

It has become increasingly evident to me that I am living in the century when humanity is entrusted with the immense responsibility of developing artificial general intelligence systems that exceed human abilities.
<br>
<div align="center">-   -   -</div>
This is the single most important thing our species will have done with our time on this planet.
<br>
<div align="center">-   -   -</div>
The most impactful scientific discoveries, inventions, medical breakthroughs, and our current political systems have come into the world through the birth canal of the human brain. We Homo Sapiens have thus far been the sole architects of our own future.

<br>

A little under three weeks ago, the team at Microsoft Research responsible for investigating OpenAI’s GPT-4 for the development of Bing Chat published their findings in a paper titled _Sparks of Artificial General Intelligence: Early experiments with GPT-4_ ([Bubeck et al., 2023](https://arxiv.org/pdf/2303.12712.pdf)).

<br>

The first author, Sébastien Bubeck, gave a talk of the same name at CSAIL MIT on the same day the paper was published (22nd of March). If you have 50 minutes to spare, I highly recommend viewing the recording as an abridged version of the paper's findings.

<br>
<div align="center"><iframe style="height:380px;width:80%" src="https://www.youtube.com/embed/qbIk7-JPB2c" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

<br>
<div align="center">*   *   *</div>
<br>

The next section of this post will be dedicated to exploring and discussing findings from Sébastien's paper that I feel are worth highlighting. 


#### TL;DR
In this paper, Bubeck et al. investigate an early version of GPT-4, a large language model developed by OpenAI, which they contend belongs to a new cohort of models exhibiting more general intelligence than previous AI models. The authors demonstrate GPT-4's ability to solve novel and difficult tasks across various fields, such as mathematics, coding, vision, medicine, law, and psychology, without special prompting. Its performance is notably close to human-level and surpasses prior models.

<br>

The authors argue that GPT-4 could be considered an early, yet incomplete, version of artificial general intelligence (AGI) due to its breadth and depth of capabilities. They focus on identifying its limitations and discussing the challenges in developing deeper and more comprehensive AGI systems. This may require a paradigm shift beyond designing next-word prediction models, and exerting explicit effort towards the implementation of multi-modal AGI. The paper concludes with reflections on societal impacts and future research directions.

<br>

> while GPT-4 is at or beyond human-level for many tasks, overall its patterns of intelligence are decidedly not human-like. However, GPT-4 is almost certainly only a first step towards a series of increasingly generally intelligent systems

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Bubeck et al., 2023

<br>

#### Consensus on Intelligence
In order to have any meaningful argument about whether something exhibits intelligence, the definition for intelligence must be agreed upon. To this end, the authors appealed to 52 psychologists who signed behind a definition published in a 1994 editorial about the science of intelligence ([Gottfredson, 1994](https://www1.udel.edu/educ/gottfredson/reprints/1997mainstream.pdf)). They assert that intelligence is a very general mental capability that, among other things, involves the ability to _reason, plan, solve problems, think abstractly, comprehend complex ideas, learn quickly and learn from experience._

#### 

<br>
<div align="center">*   *   *</div>
<br>
The rest of this post will be dedicated to discussing other recent developments in the field of AI that I feel are worth highlighting.

#### OpenAI Plugins
OpenAI has begun moving to augment the functionality of GPT-4 by exploring its impressive ability to leverage novel tools with minimal training via ChatGPT [Plugins](https://platform.openai.com/docs/plugins/introduction). 

<br>

<img src="/img/Post8/GPTPluginSearch.jpeg" alt= GPTSearch style="max-width:85%;height:auto">
<div align="center">ChatGPT plugin for querying the internet</div>

<br>

Upon the launch of ChatGPT, I immediately wondered why it wasn't meaningfully connected to the internet but was instead locked to a static snapshot of its content. GPT’s primary function is as a next-token prediction LLM, so it makes intuitive sense to train on static snapshots, but I was wondering why it didn’t have the capability to query the internet to search for content to augment its response formulation. As I suspected, OpenAI later clarified that this decision was made primarily to address safety concerns.

<br>

> Threat actors may also benefit from combining GPT-4 with internet browsing and open-source tools

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— GPT-4 Technical Report, p52

<br>

It makes a lot of sense to release internet search functionality through Plugins in a controlled manner. The [GPT-4 Technical Report](https://cdn.openai.com/papers/gpt-4.pdf) has several sections dedicated to discussing the safety implications of LLMs and harm mitigation methods that they have implemented. They have in essence “fenced” the model to minimize the chance for bad-faith actors to use ChatGPT for harm, or to proliferate information that could promote harm (i.e. weapon-making techniques).

<br>


One of my primary concerns for the LLMs of the current day is their occasional penchant for “hallucinating” or giving an outright wrong answer (many examples of this online). Some users won’t know any better and will treat its word as gospel, leading to the possibility of an increase in the spread of misinformation. 

<br>

GPT has also increasingly been used for the purposes of code generation. How long until we have people implementing a black-box algorithmic model that they know little about except for the natural language query used to generate it? It is the responsibility of the creators of current and future intelligence models to properly communicate such limitations. It is also the responsibility of the agents interacting with these intelligence models to perform due diligence in verifying and validating the response of these artificial intelligence agents. It may not be time yet to call these implementations AGI, but it is probably in our best interest to begin treating them as intelligences that have bouts of unintelligence.

<br>

I invite you to consider a dialogue generated by GPT-4 for reflection:

<br>

#### Prompt: 
Plato’s Gorgias is a critique of rhetoric and sophistic oratory, where he makes the point that not only is it not a proper form of art, but the use of rhetoric and oratory can often be harmful and malicious. Can you write a dialogue by Plato where instead he criticizes the use of autoregressive language models?

<br>

#### GPT-4:
Socrates: My friend, I am troubled by the recent rise of these so-called autoregressive
language models.

Aristotle: What do you mean, Socrates? 

Socrates: I mean that these models are being used to generate text that appears to be written by humans, but is in fact produced by machines.

Aristotle: And what is the problem with that?

Socrates: The problem is that these models are being used to deceive people, to manipulate
them, and to control them.

Aristotle: But surely there are some positive applications of these models as well?

Socrates: That may be, but I am still troubled by the potential for abuse. After all, a model that can generate text that is indistinguishable from that written by a human can be used to spread fake news, to impersonate others, and to create propaganda.

Aristotle: But isn’t that just a matter of how these models are used, not a problem with the
models themselves? 

Socrates: I disagree. I believe these models are inherently problematic. They are a form
of artifice, a way of creating the illusion of human thought and interaction. And as such,
they can be used to deceive and manipulate in ways that are difficult to detect.

Aristotle: But isn’t that the same argument you made against rhetoric and oratory?

Socrates: Yes, and I stand by that argument as well. I believe that any form of art or communication that is designed to deceive or manipulate is inherently dangerous.

Aristotle: I see. Thank you for sharing your thoughts, Socrates.

