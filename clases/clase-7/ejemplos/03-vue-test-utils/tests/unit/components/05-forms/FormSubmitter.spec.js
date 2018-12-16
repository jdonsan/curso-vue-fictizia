import {shallowMount } from '@vue/test-utils'
import FormSubmitter from '@/components/05-forms/FormSubmitter'

describe('FormSubmitter', () => {
  it('reveals a notification when submitted', () => {
    const wrapper = shallowMount(FormSubmitter)

    wrapper.find('input[data-username]').setValue('Jose')
    wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.find('.message').text()).toBe('Thank you for your submission, Jose.')
  })
})