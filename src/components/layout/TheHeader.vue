<template>
  <header>
    <a class="title" href="/">Vue Earthquakes Map</a>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style lang="scss" scoped>
header {
  box-sizing: border-box;
  background-color: $primary;
  top: 0;
  left: 0;
  width: 100vw;
  margin: 0;
  position: fixed;
  padding: 1rem;

  .title {
    align-self: center;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 1rem;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
