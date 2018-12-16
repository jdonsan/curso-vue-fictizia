import { shallowMount } from '@vue/test-utils'
import SubmitButton from '@/components/03-props/SubmitButton'

describe('SubmitButton.vue', () => {
  it('displays a non authorized message', () => {
    const msg = 'Hola!!'
    const wrapper = shallowMount(SubmitButton, {
      propsData: {
        msg
      }
    })
    expect(wrapper.find('span').text()).toBe('Not Authorized')
    expect(wrapper.find('button').text()).toBe(msg)
  })

  it('displays a admin privileges message', () => {
    const msg = 'Adios!!'
    const wrapper = shallowMount(SubmitButton, {
      propsData: {
        msg,
        isAdmin: true
      }
    })
    expect(wrapper.find('span').text()).toBe('Admin Privledges')
    expect(wrapper.find('button').text()).toBe(msg)
  })
})