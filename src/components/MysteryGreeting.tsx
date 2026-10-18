import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MysteryGreeting',
  setup() {
    const cluesFound = ref(0)

    const discoverClue = () => {
      cluesFound.value += 1
    }

    return () => (
      <div style="margin: 2rem 0; padding: 1.5rem; border: 1px solid #3b82f6; border-radius: 8px; background: rgba(59, 130, 246, 0.05); text-align: center;">
        <h2 style="margin-bottom: 0.5rem; font-size: 1.5rem;">🕵️ Murder Mystery 2026</h2>
        <p style="margin-bottom: 1rem; color: #64748b;">
          Scaffolded with Vite + Vue 3 JSX &amp; TSX
        </p>
        <button
          type="button"
          onClick={discoverClue}
          style="padding: 0.5rem 1rem; font-size: 1rem; font-weight: 500; border-radius: 6px; cursor: pointer; background: #2563eb; color: #fff; border: none;"
        >
          Clues Discovered: {cluesFound.value}
        </button>
      </div>
    )
  },
})
