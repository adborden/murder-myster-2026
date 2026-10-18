import { computed, defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { INITIAL_CLUES } from '../data/clues'
import type { Clue } from '../types/clue'

export default defineComponent({
  name: 'ClueView',
  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const clues = ref<Clue[]>([...INITIAL_CLUES])
    const filterOnlyDiscovered = ref(false)

    const activeClue = computed(() => {
      if (!props.id) return null
      return clues.value.find((c) => c.id === props.id) || null
    })

    const visibleClues = computed(() => {
      if (filterOnlyDiscovered.value) {
        return clues.value.filter((c) => c.discovered)
      }
      return clues.value
    })

    const discoveredCount = computed(
      () => clues.value.filter((c) => c.discovered).length
    )

    const toggleDiscovery = (clueId: string) => {
      const target = clues.value.find((c) => c.id === clueId)
      if (target) {
        target.discovered = !target.discovered
      }
    }

    return () => {
      if (props.id) {
        const clue = activeClue.value
        if (!clue) {
          return (
            <div style="padding: 2rem; max-width: 720px; margin: 0 auto; text-align: center;">
              <h2>Clue Not Found</h2>
              <p style="color: #64748b; margin: 1rem 0;">
                No evidence matches ID <code>{props.id}</code>.
              </p>
              <RouterLink
                to="/clues"
                style="color: #2563eb; text-decoration: underline;"
              >
                ← Back to Clue Board
              </RouterLink>
            </div>
          )
        }

        return (
          <div style="padding: 2rem; max-width: 720px; margin: 0 auto;">
            <div style="margin-bottom: 1.5rem;">
              <RouterLink
                to="/clues"
                style="color: #2563eb; text-decoration: none; font-weight: 500;"
              >
                ← Back to Clue Board
              </RouterLink>
            </div>

            <article
              style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 2rem; background: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);"
            >
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                <h2 style="margin: 0; font-size: 1.75rem; color: #0f172a;">
                  {clue.title}
                </h2>
                <span
                  style={`padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; ${
                    clue.discovered
                      ? 'background: #dcfce7; color: #15803d;'
                      : 'background: #fef3c7; color: #b45309;'
                  }`}
                >
                  {clue.discovered ? 'Discovered' : 'Hidden'}
                </span>
              </div>

              <div style="margin-bottom: 1rem; color: #64748b; font-size: 0.95rem;">
                <strong>Location:</strong> {clue.location} &bull;{' '}
                <strong>Importance:</strong>{' '}
                <span style="text-transform: capitalize;">{clue.importance}</span>
              </div>

              <p style="font-size: 1.1rem; line-height: 1.7; color: #334155; margin-bottom: 2rem;">
                {clue.description}
              </p>

              <button
                type="button"
                onClick={() => toggleDiscovery(clue.id)}
                style="padding: 0.6rem 1.2rem; border-radius: 6px; cursor: pointer; border: 1px solid #cbd5e1; background: #f8fafc; font-weight: 500;"
              >
                {clue.discovered ? 'Mark as Unexamined' : 'Mark as Examined'}
              </button>
            </article>
          </div>
        )
      }

      return (
        <div style="padding: 2rem; max-width: 900px; margin: 0 auto;">
          <header style="margin-bottom: 2rem; text-align: center;">
            <h1 style="font-size: 2.25rem; margin-bottom: 0.5rem; color: #0f172a;">
              🔍 Evidence Clue Board
            </h1>
            <p style="color: #64748b; font-size: 1.1rem; margin: 0 0 1.5rem 0;">
              Examine evidence and uncover the mystery.
            </p>

            <div style="display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
              <span style="padding: 0.5rem 1rem; background: #f1f5f9; border-radius: 8px; font-weight: 500;">
                Total Evidence: <strong>{clues.value.length}</strong>
              </span>
              <span style="padding: 0.5rem 1rem; background: #dcfce7; color: #15803d; border-radius: 8px; font-weight: 500;">
                Discovered: <strong>{discoveredCount.value}</strong>
              </span>
              <span style="padding: 0.5rem 1rem; background: #fef3c7; color: #b45309; border-radius: 8px; font-weight: 500;">
                Hidden: <strong>{clues.value.length - discoveredCount.value}</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                filterOnlyDiscovered.value = !filterOnlyDiscovered.value
              }}
              style="padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #ffffff; cursor: pointer;"
            >
              {filterOnlyDiscovered.value ? 'Show All Clues' : 'Show Only Discovered'}
            </button>
          </header>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
            {visibleClues.value.map((clue) => (
              <div
                key={clue.id}
                style="border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.5rem; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;"
              >
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
                    <h3 style="margin: 0; font-size: 1.25rem; color: #1e293b;">
                      {clue.title}
                    </h3>
                    <span
                      style={`font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.5rem; border-radius: 9999px; ${
                        clue.discovered
                          ? 'background: #dcfce7; color: #15803d;'
                          : 'background: #fef3c7; color: #b45309;'
                      }`}
                    >
                      {clue.discovered ? 'Discovered' : 'Hidden'}
                    </span>
                  </div>
                  <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem;">
                    📍 {clue.location}
                  </p>
                  <p style="font-size: 0.95rem; color: #475569; line-height: 1.5;">
                    {clue.discovered
                      ? clue.description
                      : 'Evidence remains undiscovered. Visit the crime scene to inspect.'}
                  </p>
                </div>

                <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                  <RouterLink
                    to={`/clues/${clue.id}`}
                    style="color: #2563eb; font-weight: 600; text-decoration: none;"
                  >
                    Examine Clue →
                  </RouterLink>
                  <button
                    type="button"
                    onClick={() => toggleDiscovery(clue.id)}
                    style="padding: 0.3rem 0.6rem; font-size: 0.8rem; border-radius: 4px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer;"
                  >
                    {clue.discovered ? 'Hide' : 'Discover'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  },
})
