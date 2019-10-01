---
title: Mangrove
description: A public space where people can freely share valuable insights with each other without a central authority.
---

# Overview
Why does the world need an open data set for reviews? Why even care about reviews? Why are the current free-of-charge, convenient solutions that Google, Yelp, Amazon and co offer, not good enough? In the following, we lay out our motivation for Mangrove. 

We then describe the envisioned solution, and lay out the project's breakdown into workstreams and tasks, to allow anyone interested to join the effort.

# Why reviews matter

We all benefit from leveraging the experiences of others for our own decision-making. We feel an intrinsic need to share with others information about things we used and experienced, and to make use of such information ourselves before we invest resources. 

In the past we relied mostly on our personal network to get recommendations or reviews for anything from restaurants, movies, travel destinations, to appliances or services. 

With the advent of the internet, it became possible to leverage a much larger group of people for this purpose. Forums and online communities sprung up where people from all over the world could share their opinions and experiences with millions of Internet users, influencing each others' decisions through online word-of-mouth.

The world is growing more complex, and so are the choices that we have to make each day. The number of services, products, media outlets, books, travel destinations, websites, apps, is growing, and it takes more effort to navigate the global range of offerings. We increasingly look up information online when we want to buy something or go somewhere, and we actively search for other people's opinions in order to form our own (research studies performed by [IMC](https://spiegel.medill.northwestern.edu/online-reviews/) or  [BrightLocal](https://www.brightlocal.com/research/local-consumer-review-survey/#methodology) have quantified this trend). 

In addition, the opinions of customers in the form of online reviews have become crucial for businesses. Reviews can impact businesses' reputation, their ranking in search results, and even their profitability, as consumers are willing to pay more for products for which reviews are available.

Companies such as Google, Yelp, FourSquare, TrustPilot, Facebook, TripAdvisor, have recognised this trend already years ago, and offered platforms with listings of businesses on which users could leave reviews as well as leverage other people's reviews for free. By now, these services boast hundreds of millions of consumer reviews on their websites and applications. The crowd-sourced data has become a well-guarded gold mine for these companies, based on which they predominately generate revenues from advertising, redirections, as well as from selling the personal data of their platform users.


# Why the current state is bad

The current model in which a small number of dominating platforms keep reviews proprietary and exploit reviewers' and users' data for profit, is not sustainable. We see a number of issues:
  * **Data partitioning**: reviews for the same item are split across several platforms, without aggregation
      * people searching for reviews have to look in several places 
      * people willing to write a review have to decide each time on which platform to leave their opinion
      * each platform attracts a limited demographic, leading to potential biases
  * **Reviewer exploitation**: users provide reviews freely, yet the data is owned and capitalized on by the platform, while users' privacy is invaded for market insight analysis - by consumer product marketeers, as well as by political campaigns
  
  * **Intransparency**: the data as well as the algorithms that compute the rating and determine which reviews are shown and which are deleted, are not open to the public
      * lack of control for the public over what happens with the data
      * possibility of censorship
      * possibility that reviews are lost forever if the platform gets closed down
  * **Barriers for innovation**: closed-source data disallows creators to create new and useful tools; high barriers for leveraging this rich information

We believe the ability of people to articulate and share freely their insights, assessments and opinions on anything that is public, is core to a free and evolved society. Large corporations are gaining power and are increasingly hard to control. Marketeers and even political campaigns are using insights from the vast amount of personal data to manipulate the choices people make. Individuals and communities need to have a way to share information and coordinate freely in order to be able to create a counter-balance. With this tool, open to all, people can help each other to navigate and shape the increasingly complex space of choices we all have today.

# What is Mangrove

Mangrove is a non-profit initiative to provide an infrastructure that will allow anyone to capture insights, assessments, opinions in form of reviews in an [open data set](https://en.wikipedia.org/wiki/Open_data). The provided tools will allow reading, writing, and aggregating reviews. Businesses will be able to integrate Mangrove in their websites. It should allow individuals, businesses, research groups, or government agencies to leverage this rich and valuable data freely. 

Its **main design principles** (see more below) include
* decentralization
* privacy
* upgradability
* reuse of existing standards
* usefulness
* reliability


# Implementation

## Building Mangrove openly

Following PlantingSpace's Broadleaf organisation structure, we break down what needs to get done in order to achieve the goal of this project, and we share it openly: check out the graph of the project's workstreams, as well as the specifications chapter below.

We see this open data set as a common good, and we invite everyone to contribute to its realisation. Please write us at joinin@planting.space if you would like to contribute and we will add you to the project.
 
<iframe width="500" height="500" src="https://www.mindomo.com/mindmap/mangrove-d9d68f19af134c09a321c90a2961b509" frameborder="0" allowfullscreen>Your browser does not support frames. <a href="https://www.mindomo.com/mindmap/mangrove-d9d68f19af134c09a321c90a2961b509" target="_blank">View</a> this map on its original site. It was created using <a href="https://www.mindomo.com" target="_blank">Mindomo</a>.</iframe>
   
  

## Ensuring reliability of reviews
Being an open data set that is maintained in a decentralized manner should not impact the reliability of the data negatively. There should not be a possibility for deletion and censorship of genuine reviews. Fraudulent reviews and irrelevant posts should not be taken into account when composing the rating. Furthermore, the data set should not be a place for hate speech. 

Mangrove's approach to avoid content that is damaging the reliability of reviews:
* Fraudulent reviews: a Mangrove filtering algorithm using probabilistic models will attempt to identify fraudulent reviews and devalue them, as well as flag them as probably fraudulent to the viewer
* Irrelevant posts: the filtering algorithm will attempt to identify posts that are not related to the item to be reviewed (e.g., ink toner advertisement instead of a restaurant review), and hide them from the viewer, as well as devalue any rating that might have been submitted with the post
* Hate speech: the terms of use will define what is considered to be "hate speech", and posts falling into this category will be deleted from the data set after careful and transparent consideration

Beyond this, we encourage any website that uses Mangrove to inform their customers about their own and Mangrove's review ethics. An example for such communication could be:
* "We encourage our customers to share with us and others their experiences with our products and services because we want to learn and constantly improve our offering."
* "We don't engage in illegal and/or unethical practices to falsify the true sentiment of our customers and condemn practices such review contests (soliciting reviews against some form of payment or discount), review gating (selectively encouraging to leave a review if satisfaction level is high), offering benefits for editing negative reviews, astroturfing, etc."


## Principles of the data format specification

### Upgradeability

It should be possible to upgrade the formats, thus each review includes a version number.

### Decentralisation

It should be possible to issue reviews and establish identity without a central authority. The core specification allows anyone to create a review by generating a secret key. Object identifier type specifications also favor any IDs which can be determined without a central authority.

### Privacy

Reviewers should be able to reveal as little information about themselves as they like. This is why the format does not require inclusion of any personally identifiable data.

### Standards reuse

Where possible and practical, existing standards should be leveraged. Mangrove leverages CBOR, FOAF vocabulary and public key cryptography standard based on FIDO2. 
For the overall claim framework [Decentralized Identifiers (DIDs)](https://w3c-ccg.github.io/did-spec/) were considered; however, that emerging standard significantly differs in original goals and specifies a number of components not necessary in Mangrove.

### Usefulness

Reviews should be as useful to readers as possible. They should also contain enough data to be meaningfully processed by filtering and recommendation algorithms.

#### Track record

To establish reliability of reviews it is useful to maintain a track record of a reviewer. To be able to do that and to preserve privacy, reviews contain a public key which can be used multiple times by the same reviewer.

A separate format could be also used to link additional public keys to the same identity.

#### Time relevance

Each review includes a time stamp to ensure that older reviews can be given less weight and that reviewers can cease to use a selected public key.

#### Clear object identification

Different objects can by identified by different identifiers, that is why multiple identifier types are allowed. Each identifier type aims to provide a way to obtain unambiguous id for the object being reviewed.

#### Meaningful content

Each review should contain at least some useful input about the object, that is why leaving either rating or opinion is mandatory for each review.

To make determination of review sentiment easier, a rating field is used. This field provides a numerical value for how likely the reviewer is to recommend the object. The range of values is kept at 100 to ensure a range of rating schemes: percentage rating (1-100), 1-5 stars (1, 25, 50, 75, 100), or thumbs up/down (1, 100).

#### Flexible additional information

It should be possible for the reviewer or the service they use to submit a review to leave additional data which may be useful to the readers or processing algorithms.
