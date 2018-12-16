
import { shallowMount } from '@vue/test-utils'
import ParentWithManyChildren from '@/components/02-find/ParentWithManyChildren'
import Child from '@/components/02-find/Child'

describe('ParentWithManyChildren Find', () => {
  it('renders many children', () => {
    const wrapper = shallowMount(ParentWithManyChildren)
    expect(wrapper.findAll(Child).length).toBe(3)
  })
})