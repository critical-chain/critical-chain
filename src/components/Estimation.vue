<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <router-link to="/" tag="button"><i>arrow_back</i></router-link>
      <q-toolbar-title :padding="1">
        {{estimation.title}}
      </q-toolbar-title>
    </div>

    <div class="layout-view">
      <div class="blankslate" v-if="estimation.items.length == 0">
        <h3>This is a blank slate</h3>
        <p>Use it to provide information when no dynamic content exists.</p>
      </div>

      <div v-else>
        <div class="list highlight estimation-items">
          <estimation-item :item="item" v-for="item in estimation.items"/>
        </div>
      </div>

        <div class="input-group float-right">
          <input class="form-control input-lg" type="text" placeholder="New item title" autofocus v-focus.lazy="true"
                 v-model="newEstimationItemTitle" @keyup.enter="addEstimationItem(newEstimationItemTitle)">
          <button class="btn btn-primary"
                  @click="addEstimationItem(newEstimationItemTitle)"
                  :disabled="addDisabled"
                  title="Add item">⊕</button>
        </div>
    </div>
  </q-layout>
</template>

<script>
import EstimationItem from './EstimationItem'
import { focus } from 'vue-focus'

export default {
  props: ['id'],
  data: () => {
    return { newEstimationItemTitle: '' }
  },
  components: {
    EstimationItem
  },
  directives: { focus },
  computed: {
    estimation () {
      return this.$store.getters.getEstimation(this.id)
    },
    addDisabled () {
      return ((typeof this.newEstimationTitle !== 'string') || (this.newEstimationTitle.length === 0))
    }
  },
  methods: {
    addEstimationItem (title) {
      if ((typeof title === 'string') && (title.length > 0)) {
        this.$store.dispatch('ADD_ESTIMATION_ITEM', {estimationId: this.id, title})
        this.newEstimationItemTitle = ''
      }
    }
  }
}
</script>

