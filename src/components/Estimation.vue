<template>
  <div>
    <router-link to="/">← Back</router-link>
    <h1>{{estimation.title}}</h1>

    <div class="blankslate" v-if="estimation.items.length == 0">
      <h3>This is a blank slate</h3>
      <p>Use it to provide information when no dynamic content exists.</p>
    </div>

    <table class="estimation-items" v-else>
      <tbody>
        <estimation-item :item="item" v-for="item in estimation.items"/>
      </tbody>
    </table>

    <div class="clearfix row">
      <div class="input-group float-right">
        <input class="form-control input-lg" type="text" placeholder="New item title" autofocus
               v-model="newEstimationItemTitle" @keyup.enter="addEstimationItem(newEstimationItemTitle)">
        <button class="btn btn-primary"
                @click="addEstimationItem(newEstimationItemTitle)"
                :disabled="addDisabled"
                title="Add item">⊕</button>
      </div>
    </div>
  </div>
</template>

<script>
import EstimationItem from './EstimationItem.vue'

export default {
  props: ['id'],
  data: () => {
    return { newEstimationItemTitle: '' }
  },
  components: {
    EstimationItem
  },
  computed: {
    estimation() {
      return this.$store.getters.getEstimation(this.id)
    },
    addDisabled() {
      return ((typeof this.newEstimationTitle !== 'string') || (this.newEstimationTitle.length == 0))
    }
  },
  methods: {
    addEstimationItem(title) {
      if ((typeof title === 'string') && (title.length > 0)) {
        this.$store.dispatch('ADD_ESTIMATION_ITEM', {estimationId: this.id, title})
        this.newEstimationItemTitle = ''
      }
    }
  }
}
</script>

<style>
  table.estimation-items {
    width: 100%;
    margin-top: 2em;
    background: lightcyan;
  }
</style>
