<template>
  <div id="app" class="container">
    <div class="columns">
      <div class="three-fourths column centered">
        <router-view v-if="loaded"></router-view>
        <h1 v-else>Loading, please wait</h1>
      </div>
    </div>
  </div>
</template>

<script>
import EstimationsList from './components/EstimationsList'

export default {
  name: 'app',
  components: {
    EstimationsList
  },
  computed: {
    loaded() {
      return this.$store.state.loaded
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
