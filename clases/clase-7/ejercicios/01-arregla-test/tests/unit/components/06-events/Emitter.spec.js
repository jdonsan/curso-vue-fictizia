import { shallowMount } from '@vue/test-utils'
import Emitter from '@/components/06-events/Emitter'

describe('Emitter', () => {
  it('emits an event with two arguments', () => {
    const wrapper = shallowMount(Emitter)

    wrapper.vm.emitEvent()

    expect(wrapper.emitted().myEvent[0]).toEqual(["name", "password"])
  })
})