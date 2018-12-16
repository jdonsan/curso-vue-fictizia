import { shallowMount } from '@vue/test-utils'
import NumberRenderer from '@/components/04-computed/NumberRenderer'

describe('NumberRenderer', () => {
  it('renders even numbers', () => {
    const wrapper = shallowMount(NumberRenderer, {
      propsData: {
        even: true
      }
    })

    expect(wrapper.html()).toBe('2, 4, 6, 8')
  })

  it('renders odd numbers', () => {
    const localThis = { even: false }
  
    expect(NumberRenderer.computed.numbers.call(localThis)).toBe('1, 2, 5, 9, 9')
  })
})