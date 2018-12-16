import { shallowMount } from '@vue/test-utils'
import Bilingual from '@/components/07-global-mocks/Bilingual'

describe('Bilingual', () => {
  it('renders successfully', () => {
    const wrapper = shallowMount(Bilingual)

    expect(wrapper.html()).toBe('<div class="hello">helloWorld</div>')
  })
})