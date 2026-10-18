const DISCOVERED_CLUES_KEY = "discovered-clues";
const discovered_clues = loadDiscoveredClues();

console.log("hello world");
console.log(discovered_clues);

function resetGame() {
  discovered_clues.length = 0;
  localStorage.removeItem(DISCOVERED_CLUES_KEY);
  window.location.reload();
}

function loadDiscoveredClues() {
  return JSON.parse(localStorage.getItem(DISCOVERED_CLUES_KEY)) || [];
}

function discoverClue(clue) {
  discovered_clues.push(clue);
  localStorage.setItem(DISCOVERED_CLUES_KEY, JSON.stringify(discovered_clues));
}

function getClue(id) {
  return CLUES.find((clue) => clue.id === id);
}

class Clue extends HTMLElement {
  connectedCallback() {
    // Avoid adding the markup more than once if the element is reconnected.
    if (this.shadowRoot) return;

    const clue = this.getAttribute("name");
    console.log("clue", clue);
    if (!clue) {
      return;
    }

    discoverClue(clue);
  }
}

customElements.define("mm-clue", Clue);

class ClueBoard extends HTMLElement {
  connectedCallback() {
    // Avoid adding the markup more than once if the element is reconnected.
    if (this.shadowRoot) return;

    // No clues, leave the placeholder empty.
    if (discovered_clues.length <= 0) {
      return;
    }

    const clueElements = discovered_clues.map((id) => {
      console.log("clue", id);
      const clue = getClue(id);
      return `
        <div class="clue">
          <a href="${clue.url}">
            <span>${id}</span>
            <span>${clue.time}</span>
          </a>
<p>
            ${clue.motive}
</p>
        </div>
      `;
    });

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        .clue {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 1rem;
          max-width: 24rem;
          margin-bottom: 1rem;
        }
      </style>

      <h3>Clues</h3>
      ${clueElements.join("")}
    `;
  }
}
customElements.define("mm-clueboard", ClueBoard);

class ResetBoardButton extends HTMLElement {
  connectedCallback() {
    // Avoid adding the markup more than once if the element is reconnected.
    if (this.shadowRoot) return;

    // No clues, hide the button.
    let displayStyle = "block";
    if (discovered_clues.length <= 0) {
      displayStyle = "none";
    }

    const name = this.getAttribute("name") || "there";
    const shadow = this.attachShadow({ mode: "open" });

    const clues = [];

    const clueElements = discovered_clues.map((clue) => {
      console.log("clue");
      return `
        <div>
          <span>${clue}</span>
        </div>
      `;
    });

    shadow.innerHTML = `
      <style>
        :host {
          display: "${displayStyle}";
          padding: 0.5rem;
          max-width: 24rem;
        }

        button {
          background-color: #faa;
          cursor: pointer;
        }
      </style>

      <button>Reset</button>
    `;

    shadow.querySelector("button").addEventListener("click", () => {
      resetGame();
    });
  }
}
customElements.define("mm-reset-board-button", ResetBoardButton);
