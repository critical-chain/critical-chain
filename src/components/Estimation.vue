<template>
  <div>
    <router-link to="/">← Back</router-link>
    <h1>{{estimation.title}}</h1>
    <div class="blankslate" v-if="empty">
      <h3>This is a blank slate</h3>
      <p>Use it to provide information when no dynamic content exists.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['id'],
  computed: {
    estimation() {
      return this.$store.getters.getEstimation(this.id)
    },
    empty() {
      return true
    }
  }
}
</script>
