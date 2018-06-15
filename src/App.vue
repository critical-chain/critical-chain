<template>
  <div id="q-app">
    <router-view v-if="loaded"/>
    <spinner v-else/>
  </div>
</template>

<script>
import EstimationsList from "./components/EstimationsList";

export default {
  name: "App",
  components: {
    EstimationsList
  },
  computed: {
    loaded () {
      return this.$store.state.loaded;
    }
  }
};
</script>

<style>
</style>
