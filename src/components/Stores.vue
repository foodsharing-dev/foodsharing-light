<template>
  <div>
    <main-layout>

      <!-- MAIN -->
      <h6>Deine Betriebe</h6>
      <div class="card">
        <div class="list no-border">
          <router-link :to="'/store/' + store.id" tag="div" class="item two-lines item-link" v-for="store in stores" :key="store.id">
            <div class="item-primary">
              <i>store</i>
            </div>
            <div class="item-content">
              <div>{{ store.name }}</div>
              <div>
                {{ store.location.street }}, {{ store.location.zip }} {{ store.location.city }}
              </div>
            </div>
          </router-link>
          <hr class="inset">
        </div>
      </div>
      <!-- MAIN END -->

    </main-layout>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        stores: [
          {
            id: 1,
            name: 'Tomato Shop',
            location: {
              street: 'Tomatostreet 2',
              zip: '12345',
              city: 'Fruitcity'
            }
          },
          {
            id: 2,
            name: 'Chocolate Shop',
            location: {
              street: 'Brownstreet 2',
              zip: '12345',
              city: 'Fruitcity'
            }
          }
        ]
      }
    }
  }
</script>

<style lang="styl">
</style>
