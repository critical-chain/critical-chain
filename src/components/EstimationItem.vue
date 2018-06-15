<template>
  <div
    v-if="!item.isEditing"
    class="item"
    @click="startEditing">
    <div class="item-content has-secondary">{{ item.title }}</div>
    <div class="item-secondary stamp value-stamp">{{ valueStamp }}</div>
  </div>
  <div
    v-else
    class="item">
    <i class="item-primary">edit</i>
    <div class="item-content row no-wrap gutter">
      <input
        v-model="edit.title"
        class="full-width"
        @keyup.enter="finishEditing"
        @keyup.esc="cancelEditing"
        @blur="conditionalCancel">
      <input
        v-model.number="edit.quantity"
        type="number"
        min="1"
        class="item-secondary quantity-input"
        @keyup.enter="finishEditing"
        @keyup.esc="cancelEditing"
        @blur="conditionalCancel">
      <input
        v-focus.lazy="true"
        v-model.number="edit.value"
        type="number"
        class="item-secondary value-input"
        @keyup.enter="finishEditing"
        @keyup.esc="cancelEditing"
        @focus="selectAllInValue"
        @blur="conditionalCancel">
      <button
        class="primary small item-secondary"
        @click="deleteItem">
        <i>delete</i>
      </button>
    </div>
  </div>
</template>

<script>
import { focus } from "vue-focus";

export default {
  directives: { focus },
  props: { item: { type: Object, required: true } },
  data () {
    return {
      edit: {
        title: this.item.title || "",
        value: this.item.value || 0,
        quantity: this.item.quantity || 1
      }
    };
  },
  computed: {
    valueStamp () {
      // TODO: Make this a separate directive, with proper visual dimming
      let paddedValue = this.item.value;
      if (Number.isInteger(paddedValue)) {
        paddedValue = paddedValue + "   ";
      }
      if (!this.item.quantity || this.item.quantity === 1) {
        return "" + paddedValue;
      } else {
        return this.item.quantity + "×" + paddedValue;
      }
    }
  },
  methods: {
    deleteItem () {
      this.$store.dispatch("DELETE_ESTIMATION_ITEM", this.item);
    },
    startEditing () {
      this.$store.dispatch("START_ITEM_EDITING", this.item);
    },
    finishEditing () {
      this.$store.dispatch("UPDATE_ESTIMATION_ITEM", {
        item: this.item,
        newData: {
          title: this.edit.title,
          value: this.edit.value,
          quantity: this.edit.quantity
        }
      });
    },
    cancelEditing () {
      this.$store.dispatch("STOP_ITEM_EDITING", this.item);
      this.edit = {
        title: this.item.title || "",
        value: this.item.value || 0,
        quantity: this.item.quantity || 1
      };
    },
    conditionalCancel () {
      setTimeout(() => {
        if (!this.$el.contains(document.activeElement)) {
          this.$store.dispatch("STOP_ITEM_EDITING", this.item);
        }
      }, 100);
    },
    selectAllInValue () {
      this.$el.getElementsByClassName("value-input")[0].select();
    }
  }
};
</script>

<style>
.value-input {
  max-width: 4em;
  margin-left: 0.5em;
  margin-right: 0.5em;
}
.value-stamp {
  font-family: monospace;
  color: black;
  width: 8em !important;
}
</style>
