---
layout: page
title: The Suspects
---

{% for key in site.data.suspects %}

{% assign suspect = key[1] %}

{% include suspect.html suspect=suspect %}

{% endfor %}
