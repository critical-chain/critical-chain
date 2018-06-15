<template>
  <q-layout>
    <div
      slot="header"
      class="toolbar">
      <router-link
        to="/"
        tag="button"><i>arrow_back</i></router-link>
      <q-toolbar-title :padding="1">
        {{ estimation.title }}
      </q-toolbar-title>
    </div>

    <div class="layout-view">
      <div class="layout-padding">
        <div
          v-if="estimation.items && estimation.items.length == 0"
          class="blankslate">
          <h3>This is a blank slate</h3>
          <p>Use it to provide information when no dynamic content exists.</p>
        </div>

        <div v-else>
          <h5>
            <estimation-values :estimation="estimation"/>
          </h5>
          <div class="list highlight estimation-items">
            <estimation-item
              v-for="item in items"
              :item="item"
              :key="item.id"/>
          </div>
        </div>

        <div class="layout-padding">
          <div class="row no-wrap">
            <div
              class="stacked-label"
              style="max-width: 12em;">
              <input
                v-focus.lazy="true"
                v-focus="nothingIsEdited"
                v-model="newEstimationItemTitle"
                autofocus
                @keyup.enter="addEstimationItem(newEstimationItemTitle)">
              <label>New item title</label>
            </div>
            <button
              :disabled="addDisabled"
              class="circular primary"
              title="Add item"
              @click="addEstimationItem(newEstimationItemTitle)">
              <i>add</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import EstimationItem from "./EstimationItem";
import EstimationValues from "./EstimationValues";
import { focus } from "vue-focus";

export default {
  components: {
    EstimationItem,
    EstimationValues
  },
  directives: { focus },
  props: { id: { type: String, required: true } },
  data: () => {
    return { newEstimationItemTitle: "" };
  },
  computed: {
    estimation () {
      return this.$store.getters.getEstimation(this.id);
    },
    items () {
      return this.$store.getters
        .getEstimationItems(this.id)
        .slice(0)
        .sort((a, b) => a.position - b.position);
    },
    addDisabled () {
      return (
        typeof this.newEstimationItemTitle !== "string" ||
        this.newEstimationItemTitle.length === 0
      );
    },
    nothingIsEdited () {
      return !this.$store.getters.getEditedItem(this.id);
    }
  },

  methods: {
    addEstimationItem (title) {
      if (typeof title === "string" && title.length > 0) {
        this.$store.dispatch("ADD_ESTIMATION_ITEM", {
          estimationId: this.id,
          title
        });
        this.newEstimationItemTitle = "";
      }
    }
  }
};
</script>
