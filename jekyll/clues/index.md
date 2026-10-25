---
layout: page
title: The Clues
---

{%- assign clues = site.pages | where_exp: "page", "page.clue_id" | sort: 'time' %}
{% for clue in clues %}

<div class="clue">

  <div><a href="{{clue.url }}">{{clue.clue_id }} {{ clue.time }}</a></div>

  <div>{{ clue.snippet }}</div>

</div>

{% endfor %}

<div>

<a href="{% link solution.md %}">Are you ready to reveal the solution?</a>

</div>

{% if jekyll.environment != "production" %}

### Debug tools

- [find a clue near the garden fountain]({% link clues/the-garden.md %})
- [find a clue near the food table]({% link clues/the-kitchen.md %})
- [find a clue in the drink table]({% link clues/the-hallway.md %})

{% endif %}
