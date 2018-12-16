import { shallowMount, mount } from '@vue/test-utils'
import Parent from '@/components/01-render/Parent'

describe('Parent Render', () => {
  it('render with shallow', () => {
    const shallowWrapper = shallowMount(Parent)
    expect(shallowWrapper.html()).toBe('<div><child-stub></child-stub></div>')
  })

  it('render with mount', () => {
    const mountWrapper = mount(Parent)
    expect(mountWrapper.html()).toBe('<div><div>Child component</div></div>')
  })
})