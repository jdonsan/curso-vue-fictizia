import { shallowMount, mount } from '@vue/test-utils'
import Child from '@/components/01-render/Child'

describe('Child Render', () => {
  it('render with shallow', () => {
    const shallowWrapper = shallowMount(Child)
    expect(shallowWrapper.html()).toBe('<div>Child component</div>')
  })

  it('render with mount', () => {
    const mountWrapper = mount(Child)
    expect(mountWrapper.html()).toBe('<div>Child component</div>')
  })
})