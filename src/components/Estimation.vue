<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <router-link to="/" tag="button"><i>arrow_back</i></router-link>
      <q-toolbar-title :padding="1">
        {{estimation.title}}
      </q-toolbar-title>
    </div>

    <div class="layout-view">
      <div class="layout-padding">
        <div class="blankslate" v-if="estimation.items && estimation.items.length == 0">
          <h3>This is a blank slate</h3>
          <p>Use it to provide information when no dynamic content exists.</p>
        </div>

        <div v-else>
          <estimation-values :estimation="estimation"></estimation-values>
          <div class="list highlight estimation-items">
            <estimation-item :item="item" v-for="item in items"/>
          </div>
        </div>

        <div class="layout-padding">
          <div class="row no-wrap">
            <div class="stacked-label" style="max-width: 12em;">
              <input autofocus v-focus.lazy="true" v-focus="nothingIsEdited"
                     v-model="newEstimationItemTitle"
                     @keyup.enter="addEstimationItem(newEstimationItemTitle)">
              <label>New item title</label>
            </div>
            <button class="circular primary"
                    @click="addEstimationItem(newEstimationItemTitle)"
                    :disabled="addDisabled"
                    title="Add item">
              <i>add</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import EstimationItem from './EstimationItem'
import EstimationValues from './EstimationValues'
import { focus } from 'vue-focus'

export default {
  props: ['id'],
  data: () => {
    return { newEstimationItemTitle: '' }
  },
  components: {
    EstimationItem,
    EstimationValues
  },
  directives: { focus },
  computed: {
    estimation () {
      return this.$store.getters.getEstimation(this.id)
    },
    items () {
      return this.$store.getters.getEstimationItems(this.id).slice(0).sort((a, b) => a.position - b.position)
    },
    addDisabled () {
      return ((typeof this.newEstimationItemTitle !== 'string') || (this.newEstimationItemTitle.length === 0))
    },
    nothingIsEdited () {
      return !this.$store.getters.getEditedItem(this.id)
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
