<template>
  <div id="app" class="container">
    <div class="columns">
      <div class="three-fourths column centered">
        <div class="blankslate">
          <h3>This is a blank slate</h3>
          <p>Use it to provide information when no dynamic content exists.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
