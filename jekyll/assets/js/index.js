const DISCOVERED_CLUES_KEY = "discovered-clues";
const STATE_KEY = "state";
const discovered_clues = loadDiscoveredClues();

let state = loadState();

console.log("hello world");
console.log(discovered_clues);

function resetGame() {
  discovered_clues.length = 0;
  localStorage.removeItem(DISCOVERED_CLUES_KEY);
  localStorage.removeItem(STATE_KEY);
  window.location.reload();
}

function loadDiscoveredClues() {
  return JSON.parse(localStorage.getItem(DISCOVERED_CLUES_KEY)) || [];
}
function newState() {
  return {
    solved: false,
  };
}

function loadState() {
  return JSON.parse(localStorage.getItem(STATE_KEY)) || newState();
}

function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function refreshDiscoveredClues() {
  const fresh = loadDiscoveredClues();
  discovered_clues.length = 0;
  discovered_clues.push(...fresh);
}

function discoverClue(clue) {
  if (discovered_clues.includes(clue)) {
    return;
  }

  discovered_clues.push(clue);
  localStorage.setItem(DISCOVERED_CLUES_KEY, JSON.stringify(discovered_clues));

  if (discovered_clues.length === CLUES.length) {
    // solution found
    state.solved = true;
    saveState();
  }
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
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    // No clues, leave the placeholder empty.
    if (discovered_clues.length <= 0) {
      this.shadowRoot.innerHTML = `<p>You haven't found any clues yet. Keep looking!</p>`;
      return;
    }

    const clueElements = discovered_clues
      .map((id) => {
        console.log("clue", id);
        return getClue(id);
      })
      .filter((clue) => clue && clue !== undefined)
      .toSorted((a, b) => {
        return a.time.localeCompare(b.time);
      })
      .map((clue) => {
        return `
        <div class="clue">
          <a href="${clue.url}">
            <span>${clue.id}</span>
            <span>${clue.time}</span>
          </a>
          <p>
            ${clue.motive}
          </p>
        </div>
      `;
      });

    this.shadowRoot.innerHTML = `
      <style>
        .clue {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 1rem;
          max-width: 24rem;
          margin-bottom: 1rem;
        }

        .solution {
          border: 1px solid #cec;
          border-radius: 8px;
          background-color: #6c6;
          display: none;
          padding: 1rem;
          max-width: 24rem;
          margin-bottom: 1rem;
        }

        .solution.solved {
          display: block;
        }
      </style>

      <div class="solution">
        <p>Congratulations! You've discovered all the clues. Are you ready to <a href="${GAME_DATA.solution.url}">reveal the mystery?</a></p>
      </div>
      <div class="clue-list">
      ${clueElements.join("")}
      </div>
    `;

    if (state.solved) {
      this.shadowRoot.querySelector(".solution").classList.add("solved");
    }
  }
}
customElements.define("mm-clueboard", ClueBoard);

class ResetBoardButton extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
    }
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    const displayStyle = discovered_clues.length <= 0 ? "none" : "block";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: ${displayStyle};
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

    this.shadowRoot.querySelector("button")?.addEventListener("click", () => {
      resetGame();
    });
  }
}
customElements.define("mm-reset-board-button", ResetBoardButton);

function updateUI() {
  refreshDiscoveredClues();
  document
    .querySelectorAll("mm-clueboard")
    .forEach((board) => board.render?.());
  document
    .querySelectorAll("mm-reset-board-button")
    .forEach((btn) => btn.render?.());
}

// When navigating back/forward, browsers restore the page from bfcache (Back/Forward Cache).
// In this state, scripts are not re-executed, so we listen to `pageshow` with `event.persisted`.
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    updateUI();
  }
});

// Sync if clues are updated across tabs or windows
window.addEventListener("storage", (event) => {
  console.log("storage event", event);
  if ([DISCOVERED_CLUES_KEY, STATE_KEY].includes(event.key)) {
    updateUI();
  }
});
