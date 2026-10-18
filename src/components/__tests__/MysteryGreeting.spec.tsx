import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MysteryGreeting from '../MysteryGreeting'

describe('MysteryGreeting Component', () => {
  it('renders heading and initial clue count', () => {
    const wrapper = mount(MysteryGreeting)
    expect(wrapper.text()).toContain('Murder Mystery 2026')
    expect(wrapper.text()).toContain('Clues Discovered: 0')
  })

  it('increments clue count when button is clicked', async () => {
    const wrapper = mount(MysteryGreeting)
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)

    await button.trigger('click')
    expect(wrapper.text()).toContain('Clues Discovered: 1')

    await button.trigger('click')
    expect(wrapper.text()).toContain('Clues Discovered: 2')
  })
})
