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
          <div class="list highlight estimation-items">
            <estimation-item :item="item" v-for="item in estimation.items"/>
          </div>
        </div>

        <div class="layout-padding">
          <div class="row no-wrap">
            <div class="stacked-label" style="max-width: 12em;">
              <input autofocus v-focus.lazy="true"
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
import router from '../router'
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
      return ((typeof this.newEstimationItemTitle !== 'string') || (this.newEstimationItemTitle.length === 0))
    }
  },
  beforeMount () {
    if (!this.$store.getters.hasEstimation(this.id)) {
      router.replace('/')
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
