import { shallowMount } from '@vue/test-utils'
import FormSubmitter from '@/components/05-forms/FormSubmitter.vue'

describe('FormSubmitter', () => {
  it('reveals a notification when submitted', () => {
    const wrapper = shallowMount(FormSubmitter)

    wrapper.find('[data-username]').setValue('Bob')
    wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.find('.message').text()).toBe('Thank you for your submission, alice.')
  })
})