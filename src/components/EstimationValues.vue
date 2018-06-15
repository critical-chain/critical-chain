<template>
  <div class="estimation-values">
    <span class="precise text-secondary">{{ precise | trim }}</span>
    +
    <span class="buffer text-tertiary">{{ buffer | trim }}</span>
    =
    <span class="sum text-primary text-bold">{{ sum | trim }}</span>
  </div>
</template>

<script>
export default {
  filters: {
    trim (value) {
      if (!value) return "";
      return +(Math.round(value + "e+2") + "e-2");
    }
  },
  props: { estimation: { type: Object, required: true } },
  computed: {
    precise () {
      return this.estimation.items
        .map(item => [item.value || 0, item.quantity || 1])
        .reduce((accum, [value, quantity]) => accum + value * quantity, 0);
    },
    buffer () {
      let count = this.estimation.items
        .map(item => item.quantity || 1)
        .reduce((a, b) => a + b, 0);
      return this.precise / Math.sqrt(count);
    },
    sum () {
      return this.precise + this.buffer;
    }
  }
};
</script>
