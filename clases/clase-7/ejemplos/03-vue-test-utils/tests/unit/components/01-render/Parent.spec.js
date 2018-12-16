import { shallowMount, mount } from '@vue/test-utils'
import Parent from '@/components/01-render/Parent'

describe('Parent Render', () => {
  it('render with shallow', () => {
    const wrapper = shallowMount(Parent)
    expect(wrapper.html()).toBe('<div><child-stub></child-stub></div>')
  })

  it('render with mount', () => {
    const wrapper = mount(Parent)
    expect(wrapper.html()).toBe('<div><div>Child component</div></div>')
  })
})