import { shallowMount } from  '@vue/test-utils'
import Emmitter from '@/components/06-events/Emitter'

describe('Emitter', () => {
  it('emits an event with two arguments', () => {
    const wrapper = shallowMount(Emmitter)

    wrapper.vm.emitEvent()

    expect(wrapper.emitted().myEvent[0][0]).toBe("name")
  })
})