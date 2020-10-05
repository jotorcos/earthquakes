<template>
  <div v-if="loading">
    <div class="loader">
      <Loader :loading="loading"></Loader>
    </div>
  </div>
  <div v-else>
    <div>
      <input v-model="dateStart" />
      <input v-model="dateEnd" />
      <br />
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
import L from 'leaflet'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'

export default {
  name: 'Map',
  components: {
    Loader,
    LMap,
    LTileLayer,
    LGeoJson
  },
  data() {
    return {
      loading: false,
      dateStart: null,
      dateFinish: null,
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
  async created() {
    this.loading = true
    const response = await fetch(
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-10-01&endtime=2017-10-02'
    )
    const data = await response.json()
    this.geojson = data
    this.loading = false
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
</style>
