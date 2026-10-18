import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ClueView from '../ClueView'

describe('ClueView Component', () => {
  it('renders all clues on the evidence board by default', () => {
    const wrapper = mount(ClueView, {
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('Evidence Clue Board')
    expect(wrapper.text()).toContain('The Torn Letter')
    expect(wrapper.text()).toContain('The Silver Pocket Watch')
    expect(wrapper.text()).toContain('Total Evidence: 4')
  })

  it('renders single clue detail when id prop is provided', () => {
    const wrapper = mount(ClueView, {
      props: {
        id: '2',
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('The Silver Pocket Watch')
    expect(wrapper.text()).toContain('Stopped at exactly 11:42 PM')
    expect(wrapper.text()).toContain('Garden Path')
    expect(wrapper.text()).toContain('Mark as Unexamined')
  })

  it('displays not found message for unknown clue id', () => {
    const wrapper = mount(ClueView, {
      props: {
        id: 'non-existent',
      },
      global: {
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('Clue Not Found')
  })
})
