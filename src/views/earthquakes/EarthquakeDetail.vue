<template>
  <div>
    <div v-if="loading" class="loader">
      <Loader :loading="loading"></Loader>
    </div>
    <div v-else class="my-container">
      <ul>
        <li><span class="label">Id: </span>{{ earthquakeProperties.id }}</li>
        <li>
          <span class="label">Location: </span>{{ earthquakeProperties.place }}
        </li>
        <li>
          <span class="label">Title: </span>{{ earthquakeProperties.title }}
        </li>
        <li>
          <span class="label">Time: </span>{{ earthquakeProperties.time }}
        </li>
        <li>
          <span class="label">Date: </span>{{ earthquakeProperties.date }}
        </li>
        <li>
          <span class="label">Type: </span>{{ earthquakeProperties.type }}
        </li>
        <li>
          <span class="label">Magnitud: </span>{{ earthquakeProperties.mag }}
          {{ earthquakeProperties.magType }}
        </li>
        <li>
          <span class="label">Status: </span>{{ earthquakeProperties.status }}
        </li>
        <li>
          <span class="label">Url: </span
          ><a :href="earthquakeProperties.url" target="_blank">{{
            earthquakeProperties.url
          }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'

export default {
  name: 'EarthquakeDetail',
  components: {
    Loader
  },
  data() {
    return {
      earthquakeProperties: {},
      loading: false
    }
  },
  async created() {
    this.loading = true
    const response = await fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventid=${this.$route.params.id}`
    )
    const data = await response.json()
    this.earthquakeProperties = {
      ...data.properties,
      id: data.id,
      date: new Date(data.properties.time)
    }

    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.my-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  margin: 15px 15px;

  li {
    line-height: 30px;

    .label {
      font-weight: bold;
    }

    a {
      cursor: pointer;
      word-break: break-all;
    }
  }
}

.loader {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
