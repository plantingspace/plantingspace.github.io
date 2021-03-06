---
title: Mangrove
description: A public space where people can freely share valuable insights with each other without a central authority.
---

## About
Mangrove is a non-profit initiative to create an [open data set](https://en.wikipedia.org/wiki/Open_data) for reviews. It provides an infrastructure that will allow anyone to capture and share their insights gained from experiences without the need for a central authority. It enables individuals and organisations to leverage this rich and valuable data freely.

The provided tools will allow reading, writing, and aggregating reviews, as well as integrating them into websites via an API.

## Main features
* **The dataset is a [Free Cultural Work](https://freedomdefined.org/Definition), licensed under [Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/), thus not placing any restrictions on the type of use by anyone.** If you create content for all your fellow humans to benefit, why grant only one closed-source provider the rights to use it? You should be able to grant the whole world the rights to use it the way they want, as long as it is not misrepresented.

* **Reviewers' identities are created using public key cryptography, giving reviewers full control over their identity without administration by a central authority.** That means, you decide what to share with the public, and you are the only person holding the key to your identity. No need to trust a company storing your personal information and password.

* The aggregation of individual reviews into an overall rating can be done by anyone based on a large variety of algorithms; users can however also use **Mangrove's open aggregation algorithm** freely.

* Besides a rating and a text, **reviewers can add media files** such as photos or audio files to enrich their reviews.

* **To ensure a high reliability** of the reviews:
    * Businesses can invite their customers to leave reviews in the Mangrove database via an email link, allowing to mark those reviews as 'verified purchases'.
    * Reviewers can upload sanitized bills or receipts to improve their credibility
    * Reviews can receive comments, e.g., from a business replying to their customer's feedback, or ratings to indicate agreement or disagreement with the review.
    * The overall rating takes into account each reviewer's reliability score that is assigned based on a number of factors, such as previous reviews, or the ratings of those reviews by other reviewers. 


## FAQ

<details markdown="1">
<summary><b>Why should people care about reviews?</b>
</summary>

  We all benefit from leveraging the experiences of others for our own decision-making. We feel an intrinsic need to share with others information about things we used and experienced, and to make use of such information ourselves before we invest resources. 

In the past we relied mostly on our personal network to get recommendations or reviews for anything from restaurants, movies, travel destinations, to appliances or services. 

With the advent of the internet, it became possible to leverage a much larger group of people for this purpose. Forums and online communities sprung up where people from all over the world could share their opinions and experiences with millions of Internet users, influencing each others' decisions through online word-of-mouth.

The world is growing more complex, and so are the choices that we have to make each day. The number of services, products, media outlets, books, travel destinations, websites, apps, is growing, and it takes more effort to navigate the global range of offerings. We increasingly look up information online when we want to buy something or go somewhere, and we actively search for other people's opinions in order to form our own (research studies performed by [IMC](https://spiegel.medill.northwestern.edu/online-reviews/) or  [BrightLocal](https://www.brightlocal.com/research/local-consumer-review-survey/#methodology) have quantified this trend). 

In addition, the opinions of customers in the form of online reviews have become crucial for businesses. Reviews can impact businesses' reputation, their ranking in search results, and even their profitability, as consumers are willing to pay more for products for which reviews are available.

Companies such as Google, Yelp, FourSquare, TrustPilot, Facebook, TripAdvisor, have recognised this trend already years ago, and offered platforms with listings of businesses on which users could leave reviews as well as leverage other people's reviews for free. By now, these services boast hundreds of millions of consumer reviews on their websites and applications. The crowd-sourced data has become a well-guarded gold mine for these companies, based on which they predominately generate revenues from advertising, redirections, as well as from selling the personal data of their platform users.

</details>

<details markdown="1">
<summary><b>Why is the current state that we are in bad?</b>
</summary>

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

</details>

<details markdown="1">
<summary><b>Why does the world need an open data set for reviews?</b>
</summary>

  We believe the ability of people to articulate and share freely their insights, assessments and opinions on anything that is public, is core to a free and evolved society. Large corporations are gaining power and are increasingly hard to control. Marketeers, and even political campaigns, are using insights from the vast amount of personal data to manipulate the choices people make. Individuals and communities need to have a way to share information and coordinate freely in order to be able to create a counter-balance. With this tool, open to all, people can help each other to navigate and shape the increasingly complex space of choices we all have today.

</details>

<details markdown="1">
<summary><b>How can this setup ensure reliable reviews?</b>
</summary>

  Being an open data set that is maintained in a decentralized manner should not impact the reliability of the data negatively. There should not be a possibility for deletion and censorship of genuine reviews. Fraudulent reviews and irrelevant posts should not be taken into account when composing the rating. Furthermore, the data set should not be a place for hate speech. 

Mangrove's approach to avoid content that is damaging the reliability of reviews:
* Fraudulent reviews: a Mangrove filtering algorithm using probabilistic models will attempt to identify fraudulent reviews and devalue them, as well as flag them as probably fraudulent to the viewer
* Irrelevant posts: the filtering algorithm will attempt to identify posts that are not related to the item to be reviewed (e.g., ink toner advertisement instead of a restaurant review), and hide them from the viewer, as well as devalue any rating that might have been submitted with the post
* Hate speech: the terms of use will define what is considered to be "hate speech", and posts falling into this category will be deleted from the data set after careful and transparent consideration

Beyond this, we encourage any website that uses Mangrove to inform their customers about their own and Mangrove's review ethics. An example for such communication could be:
* "We encourage our customers to share with us and others their experiences with our products and services because we want to learn and constantly improve our offering."
* "We don't engage in illegal and/or unethical practices to falsify the true sentiment of our customers and condemn practices such review contests (soliciting reviews against some form of payment or discount), review gating (selectively encouraging to leave a review if satisfaction level is high), offering benefits for editing negative reviews, astroturfing, etc."

</details>

<details markdown="1">
<summary><b>How can I join this initiative?</b>
</summary>

  This project is organised as a [Broadleaf organisation](https://planting.space/broadleaf.html), which means that we broadcast tasks to a community of interested parties. If you are keen to join, please contact us at hello(at)planting.space.

</details>
