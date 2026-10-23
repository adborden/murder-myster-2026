---
layout: page
title: The Suspects
---

{% for key in site.data.suspects -%}
{% assign suspect = key[1] -%}

## {{ suspect.name }}

<div class="clue-img">
  {% responsive_image_block %}
  path: {{suspect.img}}
  {% endresponsive_image_block %}
</div>

{{suspect.motive}}
{% endfor %}
