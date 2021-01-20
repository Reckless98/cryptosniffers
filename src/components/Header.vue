<template>
  <div class="nav-bar">
      <h1>Header</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<style scoped>
.nav-bar {
  width: 100%;
  height: 100px;
  background-color: black;
  margin: 0;
  padding: 10px;
  display: flex;
  flex-direction: row;
}

.nav-bar h1 {
  margin: 0;
  padding: 0;
}
</style>