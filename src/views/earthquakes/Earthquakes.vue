<template>
  <div>
    <div v-if="loading" class="loader">
      <Loader :loading="loading"></Loader>
    </div>
    <Search :search-disabled="loading" @search="onSearch"></Search>
    <Map ref="map" :geojson="geojson" />
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import Search from '@/components/search/Search'
import Map from '@/components/map/Map'

export default {
  name: 'Earthquakes',
  components: {
    Loader,
    Search,
    Map
  },
  data() {
    return {
      loading: false,
      geojson: null
    }
  },
  methods: {
    onSearch(filters) {
      this.fetchData(filters.dateStart, filters.dateEnd)
    },
    async fetchData(dateStart, dateEnd) {
      this.loading = true
      try {
        const response = await fetch(
          `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${dateStart.toISOString()}&endtime=${dateEnd.toISOString()}`
        )
        const data = await response.json()
        this.geojson = data
        this.loading = false
      } catch {
        this.$toast.error('Please, try again with a smaller date range.')
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 990;
}
</style>
