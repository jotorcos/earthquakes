<template>
  <div>
    <div v-if="loading" class="loader">
      <Loader :loading="loading"></Loader>
    </div>
    <div v-else class="my-container">
      <ul>
        <li v-if="earthquakeProperties.title">
          <span class="label">Title: </span>{{ earthquakeProperties.title }}
        </li>
        <li><span class="label">Id: </span>{{ earthquakeProperties.id }}</li>
        <li v-if="earthquakeProperties.code">
          <span class="label">Code: </span>{{ earthquakeProperties.code }}
        </li>
        <li v-if="earthquakeProperties.place">
          <span class="label">Location: </span>{{ earthquakeProperties.place }}
        </li>
        <li v-if="earthquakeProperties.date">
          <span class="label">Date: </span>{{ earthquakeProperties.date }}
        </li>
        <li v-if="earthquakeProperties.date">
          <span class="label">Type: </span>{{ earthquakeProperties.type }}
        </li>
        <li v-if="earthquakeProperties.date">
          <span class="label"
            >Horizontal distance from epicenter to the nearest station: </span
          >{{ earthquakeProperties.dmin }} degrees
        </li>
        <li v-if="earthquakeProperties.date">
          <span class="label">The total number of felt reports submitted: </span
          >{{ earthquakeProperties.felt }}
        </li>
        <li v-if="earthquakeProperties.gap">
          <span class="label"
            >The largest azimuthal gap between azimuthally adjacent stations: </span
          >{{ earthquakeProperties.gap }} degrees
        </li>
        <li v-if="earthquakeProperties.cdi">
          <span class="label">Intensity: </span>{{ earthquakeProperties.cdi }}
        </li>
        <li v-if="earthquakeProperties.mag">
          <span class="label">Magnitud: </span>{{ earthquakeProperties.mag }}
        </li>
        <li v-if="earthquakeProperties.magType">
          <span class="label">Magnitud Type: </span>
          {{ earthquakeProperties.magType }}
        </li>
        <li v-if="earthquakeProperties.depth">
          <span class="label">Depth: </span>{{ earthquakeProperties.depth }}
        </li>
        <li v-if="earthquakeProperties.status">
          <span class="label">Status: </span>{{ earthquakeProperties.status }}
        </li>
        <li v-if="earthquakeProperties.url">
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
import API from '@/api'

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
    const earthquakeData = await API.fetchEarthquakeById(this.$route.params.id)
    this.earthquakeProperties = {
      ...earthquakeData.properties,
      id: earthquakeData.id,
      date: new Date(earthquakeData.properties.time)
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
  padding-bottom: 50px;

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
