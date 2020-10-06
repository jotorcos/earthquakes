<template>
  <footer>
    <span
      >💻 with 💜&amp; <a href="//vuejs.org" target="_blank">Vue.js</a> in
      Valencia</span
    >
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style lang="scss" scoped>
footer {
  box-sizing: border-box;
  background-color: $secondary;
  bottom: 0;
  left: 0;
  padding: 1rem;
  position: fixed;
  width: 100vw;

  a {
    text-decoration: none;
    color: $purple;
  }
}
</style>
