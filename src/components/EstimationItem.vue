<template>
  <div class="item">
    <div class="item-content">{{item.title}}</div>
    <i class="item-secondary" @click="deleteItem">delete</i>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    methods: {
      deleteItem () {
        console.log(this.item)
      }
    }
  }
</script>
