<template>
  <div v-if="loading">
    <div class="loader">
      <Loader :loading="loading"></Loader>
    </div>
  </div>
  <div v-else>
    <div class="filters">
      <div class="filters-box">
        <Datepicker placeholder="From" v-model="dateStart" />

        <Datepicker placeholder="To" v-model="dateEnd" />

        <button @click="search()">
          <i class="search-icon material-icons">search</i>
        </button>
      </div>
    </div>
    <l-map :zoom="zoom" :center="center" class="map">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-geo-json
        :geojson="geojson"
        :options="options"
        :options-style="styleFunction"
      />
    </l-map>
  </div>
</template>

<script>
import Loader from '@/components/ui/Loader'
import Datepicker from 'vuejs-datepicker'
import L from 'leaflet'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'

export default {
  name: 'Map',
  components: {
    Loader,
    Datepicker,
    LMap,
    LTileLayer,
    LGeoJson
  },
  data() {
    return {
      loading: false,
      dateStart: null,
      dateEnd: null,
      zoom: 3,
      center: [39.466667, -0.375],
      geojson: null,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(39.466667, -0.375),
      iconSize: 26,
      popupAnchor: [0, -38]
    }
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, {
            icon: L.icon({
              iconUrl: '/earthquake.ico',
              iconSize: this.customIconSize,
              iconAnchor: this.customIconAnchor,
              popupAnchor: this.popupAnchor
            })
          })
        }
      }
    },
    customIconSize() {
      return [this.iconSize, this.iconSize]
    },
    customIconAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.3]
    },
    styleFunction() {
      return () => {
        return {
          weight: 2,
          color: '#ECEFF1',
          opacity: 1,
          fillOpacity: 1
        }
      }
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        layer.bindPopup(
          `<div class="popup"><div><span class="label">Id: </span>
            ${feature.id}
            </div><div><span class="label">Location: </span>
            ${feature.properties.place}
            </div><div class="detail"><a href="/earthquakes/${feature.id}">See detail</a></div></div>`,
          { permanent: false, sticky: false }
        )
      }
    }
  },
  methods: {
    async fetchData() {
      this.loading = true
      const response = await fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${this.dateStart.toISOString()}&endtime=${this.dateEnd.toISOString()}`
      )
      const data = await response.json()
      this.geojson = data
      this.loading = false
    },
    search() {
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  height: 100%;
  width: 100%;
}

.loader {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.filters {
  position: absolute;
  z-index: 500;
  left: 50%;
  top: 30px;

  .filters-box {
    position: relative;
    left: -50%;
    display: flex;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
    background-color: white;
    border-radius: 50px;
    padding: 10px;

    button {
      height: 45px;
      width: 45px;
      border-radius: 50%;
      border: none;
      font-weight: bold;
      background-color: $secondary;
    }
  }
}
</style>
