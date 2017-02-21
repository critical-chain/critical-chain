<template>
  <a class="menu-item">
    <div class="flex-table">
      <div class="flex-table-item flex-table-item-primary">{{item.title}}</div>
      <div class="flex-table-item" @click="deleteItem">x</div>
    </div>
  </a>
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
