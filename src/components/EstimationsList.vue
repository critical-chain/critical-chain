<template>
  <q-layout>
    <div class="layout-view">
      <div class="blankslate" v-if="empty">
        <h3>This is a blank slate</h3>
        <p>Use it to provide information when no dynamic content exists.</p>
      </div>

      <div class="list highlight item-delimiter" v-else>
        <div class="item" v-for="estimation in estimations">
          <router-link :to="{ name: 'estimation', params: {id: estimation.id}}" tag="div" class="item-content">
            {{estimation.title}}
          </router-link>
        </div>
      </div>

      <div class="row justify-end">
        <div class="stacked-label">
          <input autofocus v-focus.lazy="true"
                 v-model="newEstimationTitle" @keyup.enter="addEstimation(newEstimationTitle)">
          <label>New estimation title</label>
        </div>
        <button class="primary small circular"
                @click="addEstimation(newEstimationTitle)"
                :disabled="addDisabled"
                title="Add estimation">
          <i>add</i>
        </button>
      </div>
    </div>
  </q-layout>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {focus} from 'vue-focus'

  export default {
    data: () => {
      return {newEstimationTitle: ''}
    },
    directives: {focus},
    computed: {
      ...mapGetters({
        estimations: 'listEstimations'
      }),
      empty () {
        return this.estimations.length === 0
      },
      addDisabled () {
        return ((typeof this.newEstimationTitle !== 'string') || (this.newEstimationTitle.length === 0))
      }
    },
    methods: {
      addEstimation (title) {
        if ((typeof title === 'string') && (title.length > 0)) {
          this.$store.dispatch('ADD_ESTIMATION', {title})
          this.newEstimationTitle = ''
        }
      }
    }
  }
</script>

