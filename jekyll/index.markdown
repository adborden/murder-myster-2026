---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: base
title: The Murder
---

There's been a murder! Look for clues to help solve the case.

At 9 p.m., the maid enters Mr Blackwood’s study to pick up the glass from Mr
Blackwood’s night cap. When she finds the tray is not waiting outside the study
as usual, she knocks. No answer. She knocks again. Still no answer. She opens
the door to find Mr Blackwood dead on the floor and the drink spilled on the
rug. It was a shame, as the rug really tied the room together.

## The Suspects

{% for key in site.data.suspects %}
{% assign suspect = key[1] %}

### {{ suspect.name }}

{{ suspect.motive }}

{% endfor %}
