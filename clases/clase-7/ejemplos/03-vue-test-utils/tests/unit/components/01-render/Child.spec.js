import { shallowMount, mount } from '@vue/test-utils'
import Child from '@/components/01-render/Child'

describe('Child Render', () => {
  it('render with shallow', () => {
    const wrapper = shallowMount(Child)
    expect(wrapper.html()).toBe('<div>Child component</div>')
  })

  it('render with mount', () => {
    const wrapper = mount(Child)
    expect(wrapper.html()).toBe('<div>Child component</div>')
  })
})