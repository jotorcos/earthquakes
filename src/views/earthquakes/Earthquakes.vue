<template>
  <div>
    <div v-if="loading" class="loader">
      <Loader :loading="loading"></Loader>
    </div>
    <Search
      :date-start-ini="dateStart"
      :date-end-ini="dateEnd"
      :search-disabled="loading"
      @search="onSearch"
    ></Search>
    <Map v-if="!loading" :geojson="earthquakes" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
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
  computed: {
    ...mapState(['earthquakes', 'dateStart', 'dateEnd'])
  },
  methods: {
    ...mapMutations({
      setDateStart: 'SET_DATE_START',
      setDateEnd: 'SET_DATE_END'
    }),
    ...mapActions(['fetchEarthquakesByDate']),
    onSearch(filters) {
      this.setDateStart(filters.dateStart)
      this.setDateEnd(filters.dateEnd)
      this.fetchData(this.dateStart, this.dateEnd)
    },
    async fetchData(dateStart, dateEnd) {
      this.loading = true
      try {
        await this.fetchEarthquakesByDate({ dateStart, dateEnd })
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
