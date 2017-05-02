import Vue from 'vue'
import VueRouter from 'vue-router'

import Pickups from 'pages/Pickups'
import api from 'services/api'

const sandbox = sinon.sandbox.create()

const router = new VueRouter({
  routes: [
    {
      path: '/pickups/:id',
      name: 'pickup'
    }
  ]
})

describe('pages/Pickups.vue', () => {
  let vm

  afterEach(() => sandbox.restore())

  describe('with pickups', () => {
    beforeEach(() => {
      sandbox.stub(api, 'getNextPickupList').resolves([
        {
          id: 1,
          at: Date.now(),
          store: {
            name: 'storeName1',
            streetNumber: 5,
            street: 'street1',
            zip: 'zip1',
            city: 'city1'
          }
        },
        {
          id: 2,
          at: Date.now(),
          store: {
            name: 'storeName2',
            streetNumber: 6,
            street: 'street2',
            zip: 'zip2',
            city: 'city2'
          }
        }
      ])
      vm = new Vue({ ...Pickups, router }).$mount()
    })

    it('calls api and sets the pickups data', () => {
      expect(api.getNextPickupList).to.have.been.called
      expect(vm.pickups.length).to.equal(0)
      return Vue.nextTick().then(() => {
        expect(vm.pickups.length).to.equal(2)
      })
    })

    it('renders a list of pickups', () => {
      return Vue.nextTick().then(() => {
        expect(vm.pickups.length).to.equal(2)
        expect(vm.$el.querySelectorAll('.item').length).to.equal(0)
        return Vue.nextTick().then(() => {
          expect(vm.$el.querySelectorAll('.item').length).to.equal(2)
        })
      })
    })
  })

  describe('without pickups', () => {
    beforeEach(() => {
      sandbox.stub(api, 'getNextPickupList').resolves([])
      vm = new Vue({ ...Pickups, router }).$mount()
    })

    it('shows a message if there are no pickups', () => {
      return Vue.nextTick().then(() => {
        expect(vm.isLoading).to.be.true
        return Vue.nextTick().then(() => {
          expect(vm.isLoading).to.be.false
          expect(vm.$el.textContent).to.contain('Du hast keine pickups')
        })
      })
    })
  })
})
