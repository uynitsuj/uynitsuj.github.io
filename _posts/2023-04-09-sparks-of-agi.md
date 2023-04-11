---
layout: post
title:  "Sparks of Artificial General Intelligence"
excerpt: "Investigating the current state of a GPT implementation of machine intelligence"
categories: [post]
image: Post8/SOAGI.png
---
> Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.

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

The next section of this post will be dedicated to exploring and discussing findings from Sébastien's paper that I feel are worth highlighting. You may take it as a bite-sized alternative to reading the full 155 page publication, with omitted content.


### TL;DR
In this paper, Bubeck et al. investigate an early version of GPT-4, a large language model developed by OpenAI, which they contend belongs to a new cohort of models exhibiting more general intelligence than previous AI models. The authors demonstrate GPT-4's ability to solve novel and difficult tasks across various disciplines, such as mathematics, coding, vision, music, medicine, law, and psychology. Its performance is close to human level and surpasses prior models.

<br>

The authors argue that GPT-4 could be considered an early, yet incomplete, version of artificial general intelligence (AGI) due to its breadth and depth of capabilities. They focus on identifying its limitations and discussing the challenges in developing deeper and more comprehensive AGI systems. This may require a paradigm shift beyond designing next-word prediction models and exerting explicit effort towards the implementation of multi-modal AGI. The paper concludes with reflections on societal impacts and future research directions.

<br>

> While GPT-4 is at or beyond human-level for many tasks, overall its patterns of intelligence are decidedly not human-like. However, GPT-4 is almost certainly only a first step towards a series of increasingly generally intelligent systems.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Bubeck et al., 2023

<br>

### An Intelligent Consensus on Intelligence
In order to have any meaningful argument about whether something exhibits intelligence, the definition of intelligence must be agreed upon. To this end, the authors appealed to 52 psychologists who signed behind a definition published in a 1994 editorial about the science of intelligence ([Gottfredson, 1994](https://www1.udel.edu/educ/gottfredson/reprints/1997mainstream.pdf)). They assert that intelligence is a very general mental capability that, among other things, involves the ability to _reason, plan, solve problems, think abstractly, comprehend complex ideas, learn quickly, and learn from experience._

### Investigative Approach
The standard approach in evaluating a machine learning model is to test the system against a set of standard benchmark datasets. This approach is designed to separate true learning from mere memorization of training data.

<br>

For GPT-4 however, the authors identify two primary reasons why this methodology is not suitable: 
1. The authors lack access to GPT-4's full training data, which means they must assume it has potentially seen every existing benchmark or similar data, and 
2. GPT-4's intelligence is characterized by its generality and ability to understand and connect any topic, performing tasks beyond the scope of narrow AI systems. Traditional benchmarks struggle to evaluate the intelligence metric adequately. 

<br>

A point worth noting is that the authors highlight another paper that does propose a benchmark to evaluate general intelligence ([Chollet, 2019](https://arxiv.org/pdf/1911.01547.pdf)), however, the benchmark is largely visual in nature and thus would be better suited for the multi-modal version of GPT-4, which the authors did not have access to.

<br>

For these reasons, the authors do not test GPT-4 on a quantitative benchmark or propose a new testing framework for general intelligence. Instead, they take an approach closer to traditional psychology, testing GPT-4 with novel and difficult tasks to probe its deep and flexible understanding of concepts, skills, and domains.

<br>

>We acknowledge that this approach is somewhat subjective and informal, and that it may not satisfy the rigorous standards of scientific evaluation. However, we believe that it is a useful and necessary first step to appreciate the remarkable capabilities and challenges of GPT-4, and that such a first step opens up new opportunities for developing more formal and comprehensive methods for testing and analyzing AI systems with more general intelligence.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Bubeck et al., 2023

### The Unicorn
The unicorn generation example is brought up in both Bubeck’s talk and the paper, but it is definitely worth highlighting.

<br>

One task the authors gave GPT-4 was to “draw a unicorn.” You might be wondering: how does a language model that can only generate text draw? There are a lot of parts to that question, but technically speaking, it draws using TiKZ, a language for creating graphics in [LaTeX](https://en.wikipedia.org/wiki/LaTeX). Of course, GPT-4 can only provide textual information and cannot render the actual image. To see the output, you need to compile the TiKZ code using a LaTeX compiler.

<br>

<img src="/img/Post8/unicorn.png" alt=unicorn style="max-width:65%;height:auto">
<div align="center">GPT-4 generates a unicorn in TiKZ</div>

<br>

> When I see that, I am personally shocked, because it really understands the concept of a unicorn. It knows what are the key elements. It was able to draw this very abstract unicorn.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Sébastien Bubeck ([23:16](https://youtu.be/qbIk7-JPB2c?t=1396))

<br>

I was personally quite shocked as well. To me this meant that GPT-4 was able to develop an internal concept of a unicorn merely from the textual descriptions present in its training data. Moreover, it is capable of reconstructing this representation using a text-based graphics generation tool. It is important to re-emphasize here that the authors did *not* have access to the multi-modal version of GPT-4 that was developed and trained with image input in mind. GPT-4’s ability to reconcile the spatial relationships among abstract notions like "head," "tail," and "body" is genuinely remarkable.

<br>


Interestingly, the authors had the privilege of investigating GPT-4 at the same time it was being developed, fine-tuned, and upgraded by OpenAI. They queried GPT-4 two more times, at roughly equal time intervals over the span of a month while the system was being refined, with the prompt “Draw a unicorn in TikZ”. We can see a clear evolution in the sophistication of GPT-4’s drawings.

<br>

<img src="/img/Post8/unicornovertime.png" alt=unicornovertime style="max-width:85%;height:auto">
<div align="center">Improved unicorns in TiKZ</div>

<br>

<br>

For what it’s worth, I asked GPT-4 to generate a unicorn in TiKZ myself, and this is the result:

<br>

<img src="/img/Post8/unicorn2.png" alt=unicorn2 style="max-width:75%;height:auto">
<div align="center">GPT-4 generates another unicorn in TiKZ</div>

<br>

A very interesting insight that I can offer is that in the generated TiKZ code, GPT-4 provided documentation, sectioning and labeling the graphical objects used to generate the head, body, tail, the eye and the horn. 

<br>

Why does it appear to be *worse* than their result? Unfortunately, (or fortunately, depending on the viewpoint) the public facing version of GPT-4 was “dumbed down” and tuned further, mainly for reasons of safety.

<br>

> [There exist] two versions of the model: an early version fine-tuned for instruction following (“GPT-4-early”); and a version fine-tuned for increased helpfulness and harmlessness that reflects the further mitigations outlined in this system card (“GPT-4-launch”)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— GPT-4 Technical Report, p42

<br>

I was unable to find a more convincing line from the technical report to support that claim, so the only additional thing I can do is to appeal to Bubeck’s talk where he states as much.

<br>

> Eventually, it started to degrade. Once they started to train for more safety, the unicorn started to degrade. So tonight if you go home and you ask GPT-4 and ChatGPT to draw a unicorn in TiKZ, you’re going to get something that doesn’t look great.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Sébastien Bubeck ([26:24](https://youtu.be/qbIk7-JPB2c?t=1584))

<br>

Here are some more amazing examples of GPT-4 demonstrating “visual comprehension” and image generation.

<br>

<img src="/img/Post8/vision1.png" alt=vision1 style="max-width:65%;height:auto">
<div align="center">SVGs generated by GPT-4 for the classes automobile, truck, cat, dog</div>

<br>

<img src="/img/Post8/vision2.png" alt=vision2 style="max-width:65%;height:auto">
<div align="center">A reasonable-looking stick figure composed of the letters of O, H and Y</div>

<br>

<img src="/img/Post8/vision3.png" alt=vision3 style="max-width:65%;height:auto">
<div align="center">Demonstration that GPT-4 can usually preserve identity of both the object and the letter and combine them creatively
</div>

<br>

### Fast-Tracked CS Degree from an Internet Snapshot
GPT-4 is able to code at a very high level, both in terms of writing code from instructions and understanding existing code. The model can write and understand code across a wide range of tasks and languages, reason about code execution, simulate instructions, and explain the results using natural language. GPT-4 performs well with focused programs that rely on public libraries, which favorably compares to the average software engineer’s ability.

<br>

However, the authors acknowledge GPT-4's limitations, such as producing syntactically invalid or semantically incorrect code, misunderstanding or not following instructions, and generating code that doesn't match the intended functionality or style.

<br>

To measure GPT-4's coding skills, the authors use the HumanEval dataset and a custom benchmark based on LeetCode problems. GPT-4 outperforms other language models, including previous iterations of GPT and models specifically trained on code. While the model's accuracy is impressive, the authors acknowledge the possibility that GPT-4 may have seen and memorized some or all of HumanEval during pre-training.

<br>

To address this concern, the authors evaluated GPT-4 using a benchmark of 100 LeetCode problems posted *after* GPT-4's pretraining period. The model performs well, achieving pass rates that are comparable to or better than human performance. 

<br>

<img src="/img/Post8/leetcode.png" alt=leetcode style="max-width:75%;height:auto">
<div align="center">Zero-shot pass@1 and pass@5 accuracies (%) on novel LeetCode.</div>

<br>

GPT-4 can also successfully extract data from LaTeX code and generate accurate visualizations. GPT-4 also responds accurately to user requests to manipulate the data representations accordingly. This highlights GPT-4's proficiency in data visualization tasks, further solidifying its potential for academic and research applications.

<br>

<img src="/img/Post8/latex.png" alt=latex style="max-width:75%;height:auto">
<div align="center">GPT-4 visualizes data from a LaTeX table.</div>

<br>

GPT-4 will also write code for deep learning applications. Doing so usually requires non-trivial knowledge and understanding of mathematics, statistics, and familiarity with frameworks and libraries such as PyTorch, TensorFlow, Keras, etc.

<br>

<img src="/img/Post8/dl.png" alt=latex style="max-width:75%;height:auto">
<div align="center">GPT-4 vs ChatGPT at implementing a customized Pytorch optimizer module. The authors highlight the astuteness of GPT-4 vs the mistake by ChatGPT at ‘applying momentum’.</div>

<br>

The previous examples have shown that GPT-4 can write code from instructions, even when the instructions are vague, incomplete, or require domain knowledge. The authors also demonstrate GPT-4's ability to understand and reason about existing code, even when it is complex, obscure, or poorly documented. In an example, GPT-4 was asked to predict and explain the output of a C program. GPT-4 accurately accounts for the impact of compiler alignment rules on the output, illustrating its deep understanding of code execution. 

<br>

In another example, GPT-4 demonstrates its ability to execute non-trivial Python code by simulating the code execution in natural language rather than running it on a Python interpreter. This task requires an exceptional understanding of the code, the capacity to reason about its execution, and the ability to communicate results clearly. GPT-4 manages to track multiple variables, handle recursion, and provide detailed explanations of intermediate steps.

<br>

<img src="/img/Post8/pythonexec.png" alt=pythonexec style="max-width:75%;height:auto">
<div align="center">GPT-4 executes Python code.</div>

<br>


### GPT-4 Enters the Stone Age
Some of GPT-4’s primary weaknesses include a lack of up-to-date world knowledge, difficulty with symbolic operations such as math, and an inability to execute code in actual compilers. GPT-4 relies on outdated information to answer a question and struggles to perform accurate operations for other questions, similar to the shortcomings observed in ChatGPT.

<br>

<img src="/img/Post8/dt.png" alt=dt style="max-width:75%;height:auto">
<div align="center">Current world knowledge and symbolic manipulation remain difficult tasks for pure language models.</div>

<br>

The authors highlight that GPT-4 can rectify this issue, demonstrating its truly impressive ability to leverage external tools, such as search engines or APIs, with minimal instruction. By pausing generation to call the appropriate functions and utilizing their output effectively, GPT-4 can solve complex tasks that require multiple tools in combination. 

<br>

<img src="/img/Post8/tools.png" alt=tools style="max-width:75%;height:auto">
<div align="center">Examples of GPT-4 using various tools to answer questions.</div>

<br>

The authors also showcase GPT-4’s ability to manage a user's calendar and email by combining multiple tools and APIs. The model retrieves calendar information, coordinates with others via email, books dinner, and messages the user with details. 

<br>

<img src="/img/Post8/calendar.png" alt=calendar style="max-width:75%;height:auto">
<div align="center">Email and calendar execution.</div>

<br>

#### Shortcomings
GPT-4 showcases remarkable abilities in reasoning, content generation, and problem-solving. However, its architecture, based on the next-word prediction paradigm, has notable flaws. One such limitation is the absence of an "inner dialogue" or "scratchpad" for performing multi-step computations or storing intermediate results. 

For example, consider the following question to which the model gives a wrong answer:

<br>

<img src="/img/Post8/scratchpad.png" alt=scratchpad style="max-width:85%;height:auto">

<br>

The authors restructure the prompt, and instead ask the model to list the prime numbers in this range and then write what the count is. Here it gives the correct answer:

<br>

<img src="/img/Post8/scratchpad2.png" alt=scratchpad2 style="max-width:85%;height:auto">

<br>

Unlike humans, who can use a scratchpad to work through problems step by step, the model must generate an answer in a single pass of the feedforward architecture, making it difficult to implement complex procedures like a "for loop." Although some of these issues can be addressed by instructing the model to solve questions step by step, this approach may not always be sufficient.

<br>
<div align="center">*   *   *</div>
<br>

The rest of this post will be dedicated to discussing other recent developments in the field of AI that I feel are worth highlighting.

### OpenAI Plugins
This is somewhat of a direct follow up to my *GPT-4 Enters the Stone Age* section. OpenAI has begun moving to augment the functionality of GPT-4 by exploring its impressive ability to leverage novel tools with minimal training via ChatGPT [Plugins](https://platform.openai.com/docs/plugins/introduction). 

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


Personally, my primary concern for the LLMs of the current day is their occasional penchant for “hallucinating” or giving an outright wrong answer. Having observed ChatGPT’s widespread usage, I have grown concerned that some users won’t know any better and will treat its word as gospel, leading to the possibility of an increase in the spread of misinformation. 

<br>

With respect to code generation, which has become a very popular use case. How long until we have people implementing a black-box algorithmic model that they know little about except for the natural language query used to generate it? 

<br>

It is the responsibility of the creators of current and future intelligence models to properly communicate such limitations, which I feel they are doing somewhat adequately, but could be better. It is also the responsibility of the agents interacting with these intelligence models to perform due diligence in verifying and validating the response of these artificial intelligence agents. It may not be time yet to call these implementations AGI, but it is probably in our best interest to begin treating them as intelligences that have bouts of unintelligence.

<br>

https://openai.com/blog/planning-for-agi-and-beyond

<br>

In closing, I invite you to consider a dialogue generated by GPT-4 for reflection:

<br>

#### Prompt: 
Plato’s Gorgias is a critique of rhetoric and sophistic oratory, where he makes the point that not only is it not a proper form of art, but the use of rhetoric and oratory can often be harmful and malicious. Can you write a dialogue by Plato where instead he criticizes the use of autoregressive language models?

<br>

#### GPT-4:
**Socrates:** My friend, I am troubled by the recent rise of these so-called autoregressive
language models.
<br>

**Aristotle:** What do you mean, Socrates? 
<br>

**Socrates:** I mean that these models are being used to generate text that appears to be written by humans, but is in fact produced by machines.
<br>

**Aristotle:** And what is the problem with that?
<br>

**Socrates:** The problem is that these models are being used to deceive people, to manipulate
them, and to control them.
<br>

**Aristotle:** But surely there are some positive applications of these models as well?
<br>

**Socrates:** That may be, but I am still troubled by the potential for abuse. After all, a model that can generate text that is indistinguishable from that written by a human can be used to spread fake news, to impersonate others, and to create propaganda.
<br>

**Aristotle:** But isn’t that just a matter of how these models are used, not a problem with the
models themselves? 
<br>

**Socrates:** I disagree. I believe these models are inherently problematic. They are a form
of artifice, a way of creating the illusion of human thought and interaction. And as such,
they can be used to deceive and manipulate in ways that are difficult to detect.
<br>

**Aristotle:** But isn’t that the same argument you made against rhetoric and oratory?
<br>

**Socrates:** Yes, and I stand by that argument as well. I believe that any form of art or communication that is designed to deceive or manipulate is inherently dangerous.
<br>

**Aristotle:** I see. Thank you for sharing your thoughts, Socrates.


<br>











