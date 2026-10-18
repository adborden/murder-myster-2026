import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import MysteryGreeting from '../components/MysteryGreeting'

export default defineComponent({
  name: 'HomeView',
  setup() {
    return () => (
      <div style="max-width: 800px; margin: 0 auto; padding: 2rem 1rem; text-align: center;">
        <MysteryGreeting />

        <div style="margin-top: 2rem; padding: 2rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h3 style="font-size: 1.5rem; margin-bottom: 0.75rem; color: #1e293b;">
            The Manor Mystery Awaits
          </h3>
          <p style="color: #64748b; line-height: 1.6; max-width: 560px; margin: 0 auto 1.5rem auto;">
            A crime occurred at the manor during the annual gala. Examine physical evidence, decrypt hidden messages, and track clues before the suspect escapes.
          </p>
          <RouterLink
            to="/clues"
            style="display: inline-block; padding: 0.75rem 1.5rem; background: #2563eb; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;"
          >
            Open Evidence Board &rarr;
          </RouterLink>
        </div>
      </div>
    )
  },
})
