<template>
  <div class="footer">
      <h1 class="logo">Copyright</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<style scoped>
.footer {
  width: 1070px;
  height: 160px;
  background-color: black;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  opacity: 0.9;
  align-self: flex-end;
}

.footer h1 i {
  margin: 0;
  padding: 0;
}
</style>