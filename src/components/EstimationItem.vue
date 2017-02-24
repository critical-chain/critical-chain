<template>
  <div class="item" @click="startEditing" v-if="!item.isEditing">
    <div class="item-content">{{item.title}}</div>
    <i class="item-secondary" @click="deleteItem">delete</i>
  </div>
  <div class="item" v-else>
    <i class="item-primary">edit</i>
    <div class="item-content">
      <input class="full-width" v-model="edit.title" @keyup.enter="finishEditing" @keyup.esc="cancelEditing">
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return { edit: { title: this.item.title } }
    },
    methods: {
      deleteItem () {
        this.$store.dispatch('DELETE_ESTIMATION_ITEM', this.item)
      },
      startEditing () {
        this.$store.dispatch('START_ITEM_EDITING', this.item)
      },
      finishEditing () {
        this.$store.dispatch('UPDATE_ESTIMATION_ITEM', { item: this.item, newData: { title: this.edit.title } })
      },
      cancelEditing () {
        this.$store.dispatch('CANCEL_ITEM_EDITING', this.item)
      }
    }
  }
</script>
