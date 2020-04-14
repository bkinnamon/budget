import { mount } from '@vue/test-utils'
import DefaultLayout from '~/layouts/default.vue'

describe('layouts/default.vue', () => {
  test('renders a .header element', () => {
    const wrapper = mount(DefaultLayout)
    expect(wrapper.find('.header')).toExist()
  })
})
