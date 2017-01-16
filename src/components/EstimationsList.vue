<template>
  <div>
    <div class="blankslate" v-if="empty">
      <h3>This is a blank slate</h3>
      <p>Use it to provide information when no dynamic content exists.</p>
    </div>

    <nav class="menu" v-else>
      <router-link :to="{ name: 'estimation', params: {id: estimation.id}}"
                   class="menu-item" v-for="estimation in estimations">
        {{estimation.title}}
      </router-link>
    </nav>

    <div class="clearfix row">
      <div class="input-group float-right">
        <input class="form-control input-lg" type="text" placeholder="New estimation title" autofocus
               v-model="newEstimationTitle" @keyup.enter="addEstimation(newEstimationTitle)">
        <button class="btn btn-primary"
                @click="addEstimation(newEstimationTitle)"
                :disabled="addDisabled"
                title="Add estimation">⊕</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data: () => {
      return { newEstimationTitle: '' }
    },
    computed: {
      ...mapGetters({
        estimations: 'listEstimations',
      }),
      empty() {
        return this.estimations.length == 0
      },
      addDisabled() {
        return ((typeof this.newEstimationTitle !== 'string') || (this.newEstimationTitle.length == 0))
      }
    },
    methods: {
      addEstimation(title) {
        if ((typeof title === 'string') && (title.length > 0)) {
          this.$store.dispatch('ADD_ESTIMATION', {title})
          this.newEstimationTitle = ''
        }
      }
    }
  }
</script>

<style>
  .row {
    margin-top: 15px;
  }
  .btn-primary {
    font-size: 140% !important;
  }
</style>
