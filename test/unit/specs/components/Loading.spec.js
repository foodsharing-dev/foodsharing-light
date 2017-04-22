import Vue from 'vue'

describe('components/Loading.vue', () => {
  let vm

  beforeEach(() => {
    vm = new Vue(require('components/Loading')).$mount()
  })

  it('includes a spinner element', () => {
    expect(vm.$el.querySelector('spinner')).to.be.ok
  })
})
