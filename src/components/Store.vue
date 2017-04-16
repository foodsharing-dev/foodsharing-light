<template>

  <main-layout>

    <!-- MAIN -->
    <h6>
      {{ store.name }}
    </h6>
    <div class="card">

      <!--
      <div class="card-media">
        <img :src="'statics/map.png'">
        <button class="primary circular"><i>place</i></button>
      </div>
      -->
      <div class="card-content list no-border highlight">
        <div class="item two-lines">
          <i class="item-primary">location_on</i>
          <div class="item-content">
            <div class="item-title">Adresse</div>
            <div>{{ store.location.street }}, {{ store.location.zip }} {{ store.location.city }}</div>
          </div>
        </div>
        <div class="item two-lines">
          <i class="item-primary">info</i>
          <div class="item-content">
            <div class="item-title">Besonderheiten</div>
            <div>{{ store.info }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="list-label">Verantwortliche foodsaver</div>
      <router-link tag="div"
                   :to="'/chat/' + m.id" class="item item-link"
                   v-for="m in store.responsible"
                   :key="m.id">
        <img class="item-primary" :src="'statics/boy-avatar.png'">
        <div class="item-content has-secondary">
          {{ m.name }}
        </div>
        <i class="item-secondary">
          chat_bubble
        </i>
      </router-link>
      <hr>
      <div class="list-label">Team</div>
      <router-link tag="div"
                   class="item item-link"
                   :to="'/chat/' + m.id"
                   v-for="m in store.members"
                   :key="m.id">
        <img class="item-primary" :src="'statics/linux-avatar.png'">
        <div class="item-content has-secondary">
          {{ m.name }}
        </div>
        <i class="item-secondary">
          chat_bubble
        </i>
      </router-link>
    </div>

    <!-- MAIN END -->


  </main-layout>
  </div></template>

<script>

  export default {
    data () {
      return {
        store: {
          id: 1,
          name: 'Coffee Shop',
          location: {
            street: 'Bananastreet 1',
            zip: '12345',
            city: 'Tomatocity'
          },
          fetchweight: '20-30kg',
          info: 'The store Boss has a big nose.',
          members: [
            {
              id: 1,
              name: 'Peter'
            },
            {
              id: 2,
              name: 'Gabi'
            }
          ],
          responsible: [
            {
              id: 1,
              name: 'Peter'
            }
          ]
        },

        stores: [
          {
            id: 1,
            name: 'Store 1'
          },
          {
            id: 2,
            name: 'Store 2'
          },
          {
            id: 3,
            name: 'Store 3'
          }
        ]
      }
    }
  }
</script>

<style lang="styl">
</style>
