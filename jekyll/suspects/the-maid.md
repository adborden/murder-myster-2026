---
layout: suspect
suspect_name: The Maid
img: assets/img/the-maid.png
---

{% assign suspect = data.suspects | where: "name", page.suspect_name %}

{{suspect.name}}

{{ suspect.motive }}
