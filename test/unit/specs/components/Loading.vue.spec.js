import Vue from 'vue'

import Loading from 'components/Loading.vue'

describe('Loading.vue', () => {
  let vm

  beforeEach(() => {
    vm = new Vue(Loading).$mount()
  })

  it('includes a spinner element', () => {
    expect(vm.$el.querySelector('spinner')).to.be.ok
  })
})
