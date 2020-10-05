<template>
  <l-map :zoom="zoom" :center="center" class="map">
    <l-tile-layer :url="url" :attribution="attribution" />
    <l-geo-json
      :geojson="geojson"
      :options="options"
      :options-style="styleFunction"
    />
  </l-map>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  props: {
    geojson: {
      type: [Object, null]
    }
  },
  data() {
    return {
      zoom: 3,
      center: [39.466667, -0.375],
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
  }
}
</script>

<style lang="scss" scoped>
.map {
  height: 100%;
  width: 100%;
}
</style>
