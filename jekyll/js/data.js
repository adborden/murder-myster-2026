---
---
const CLUES = [
  {%- assign clues = site.pages | where_exp: "page", "page.clue_id" | sort: 'time' %}
  {%- for clue in clues %}
    {
      "id": {{ clue.clue_id | jsonify }},
      "time": {{ clue.time | jsonify }},
      "motive": {{clue.snippet | markdownify | strip_html | jsonify }},
      "url": {{ clue.url | jsonify }}
    }{% unless forloop.last %},{% endunless %}
  {%- endfor %}
]

const GAME_DATA = {
  "solution": {
    "url": "{% link solution.md %}"
  }
};
