<template>
  <grid-loader
    :loading="loading"
    :color="loaderColor"
    :size="loaderSize"
  ></grid-loader>
</template>

<script>
import GridLoader from 'vue-spinner/src/GridLoader.vue'

export default {
  name: 'Loader',
  components: {
    GridLoader
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loaderColor: '#1467b6',
      loaderSize: '40px'
    }
  }
}
</script>
