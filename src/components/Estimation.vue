<template>
  <div>
    <router-link to="/">← Back</router-link>

    <div class="blankslate" v-if="estimation.items.length == 0">
      <h1>{{estimation.title}}</h1>
      <h3>This is a blank slate</h3>
      <p>Use it to provide information when no dynamic content exists.</p>
    </div>

    <nav class="menu estimation-items" v-else>
      <span class="menu-heading">{{estimation.title}}</span>
      <estimation-item :item="item" v-for="item in estimation.items"/>
    </nav>

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

