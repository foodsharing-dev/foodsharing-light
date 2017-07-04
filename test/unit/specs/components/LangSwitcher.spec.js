import Vue from 'vue'

describe('components/LangSwitcher.vue', () => {
  let vm

  beforeEach(() => {
    vm = new Vue(require('components/LangSwitcher')).$mount()
  })

  // it('includes a q-select element', () => {
//    expect(vm.$el.nodeName).to.equal('Q-SELECT')
//  })

  it('has Deutsch and English language options', () => {
    expect(vm.langOptions).to.deep.equal([
      { value: 'de', label: 'DE' },
      { value: 'en', label: 'EN' }
    ])
  })

  it('is set to "de" by default', () => {
    expect(vm.locale).to.equal('de')
  })
})
