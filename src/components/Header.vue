<template>
  <div class="nav-bar">
      <h1 class="logo">LOGO</h1>
      <i class='fas fa-user-circle' style='font-size:36px'></i>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<style scoped>
.nav-bar {
  width: 1070px;
  height: 60px;
  background-color: black;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  opacity: 0.9;
}

.nav-bar h1 i {
  margin: 0;
  padding: 0;
}
</style>