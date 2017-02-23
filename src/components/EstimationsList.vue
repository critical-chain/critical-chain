<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
        CriticalChain Estimator
      </q-toolbar-title>
    </div>

    <div class="layout-view">
      <div class="layout-padding">
        <div class="row justify-center">
          <div class="width-4of5 gt-md-width-3of5">
            <div class="card">
              <div class="blankslate" v-if="empty">
                <h3>This is a blank slate</h3>
                <p>Use it to provide information when no dynamic content exists.</p>
              </div>

              <div class="list highlight item-delimiter" v-else>
                <div class="item" v-for="estimation in estimations">
                  <router-link :to="{ name: 'estimation', params: {id: estimation.id}}" tag="div" class="item-content">
                    {{estimation.title}}
                  </router-link>
                  <i class="item-secondary" @click="deleteEstimation(estimation)">delete</i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="reverse-row">
          <div class="width-1of5 gt-md"></div>
          <div class="row no-wrap">
            <div class="stacked-label self-stretch">
              <input autofocus v-focus.lazy="true"
                     v-model="newEstimationTitle" @keyup.enter="addEstimation(newEstimationTitle)">
              <label>New estimation title</label>
            </div>
            <div>
              <button class="primary circular"
                      @click="addEstimation(newEstimationTitle)"
                      :disabled="addDisabled"
                      title="Add estimation">
                <i>add</i>
              </button>
            </div>
          </div>
        </div>
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
      },
      deleteEstimation (estimation) {
        this.$store.dispatch('DELETE_ESTIMATION', estimation)
      }
    }
  }
</script>

