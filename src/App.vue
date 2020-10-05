<template>
  <div class="page-wrapper">
    <TheHeader></TheHeader>
    <router-view class="container"></router-view>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader'
import TheFooter from '@/components/layout/TheFooter'

export default {
  name: 'App',
  components: { TheHeader, TheFooter }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  box-sizing: border-box;
  color: #37474f;
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  margin: 0 auto;
  padding: 0;
  text-align: center;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

.container {
  height: calc(100vh - 112px);
  width: 100%;
  top: 54px;
  left: 0px;
  position: absolute;
}
</style>
