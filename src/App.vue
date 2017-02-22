<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view v-if="loaded"></router-view>
    <spinner v-else></spinner>
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
    loaded () {
      return this.$store.state.loaded
    }
  }
}
</script>

<style></style>
