---
layout: suspect
suspect_name: The Chauffeur
img: assets/img/the-chauffeur.png
---

{% assign suspect = data.suspects | where: "name", page.suspect_name %}

{{suspect.name}}

{{ suspect.motive }}
