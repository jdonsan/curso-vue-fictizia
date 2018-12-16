import { shallowMount } from '@vue/test-utils'
import NumberRenderer from '@/components/04-computed/NumberRenderer'

describe('NumberRenderer', () => {
  it('renders even numbers', () => {
    const wrapper = shallowMount(NumberRenderer, {
      propsData: {
        even: true
      }
    })
    expect(wrapper.text()).toBe('2, 4, 6, 8')
  })

  it('renders odd numbers', () => {
    const result = NumberRenderer.computed.numbers.call({ even: false })
    expect(result).toBe('1, 3, 5, 7, 9')
  })
})