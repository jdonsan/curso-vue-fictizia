import { shallowMount } from '@vue/test-utils'
import Parent from '@/components/02-find/Parent'
import Child from '@/components/02-find/Child'

describe('Parent Find', () => {
  it('does not render a span', () => {
    const wrapper = shallowMount(Parent)
    expect(wrapper.find('span').isVisible()).toBe(false)
  })

  it('does render a span', () => {
    const wrapper = shallowMount(Parent, {
      data() {
        return { showSpan: true }
      }
    })
    expect(wrapper.find('span').isVisible()).toBe(true)
  })

  it('does not render a Child component', () => {
    const wrapper = shallowMount(Parent)
    expect(wrapper.find(Child).exists()).toBe(false)
    expect(wrapper.find({ name: 'Child' }).exists()).toBe(false)
  })

  it('renders a Child component', () => {
    const wrapper = shallowMount(Parent, {
      data() {
        return { showChild: true }
      }
    })
    expect(wrapper.find(Child).exists()).toBe(true)
  })
})
