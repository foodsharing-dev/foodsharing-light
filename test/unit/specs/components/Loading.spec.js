import Vue from 'vue'

const sandbox = sinon.sandbox.create()

describe('components/Loading.vue', () => {
  let Loading
  let vm
  let clock
  let originalIsLoading

  beforeEach(() => {
    clock = sandbox.useFakeTimers()
  })
  afterEach(() => sandbox.restore())

  beforeEach(() => {
    Loading = require('components/Loading')
    originalIsLoading = Loading.computed.isLoading
    // force to always be true (or we have to trick axios)
    Loading.computed.isLoading = () => true
    vm = new Vue(Loading).$mount()
  })

  afterEach(() => {
    // reset it
    Loading.computed.isLoading = originalIsLoading
  })

  it('does not show spinner initially', () => {
    expect(vm.$el.querySelector('spinner')).to.not.be.ok
  })

  it('shows spinner if show=true', done => {
    Object.assign(vm, { show: true })
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('spinner')).to.be.ok
      done()
    })
  })

  it('shows spinner after 500ms', done => {
    expect(vm.$el.querySelector('spinner')).to.not.be.ok
    clock.tick(600)
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('spinner')).to.be.ok
      done()
    })
  })
})
