<template>
  <div>
    <div class="blankslate" v-if="empty">
      <h3>This is a blank slate</h3>
      <p>Use it to provide information when no dynamic content exists.</p>
    </div>

    <nav class="menu" v-else>
      <a class="menu-item" v-for="estimation in estimations">{{estimation.title}}</a>
    </nav>

    <div class="clearfix row">
      <button class="btn btn-outline float-right" v-on:click="addEstimation({title: 'foo'})">Add an item</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        estimations: 'listEstimations'
      }),
      empty() {
        return this.estimations.length == 0
      }
    },
    methods: {
      ...mapMutations({addEstimation: 'ADD_ESTIMATION'})
    }
  }
</script>

<style>
  .row {
    margin-top: 15px;
  }
</style>
