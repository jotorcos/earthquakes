<template>
  <l-map
    ref="map"
    :zoom="zoom"
    :center="center"
    class="map"
    @ready="onMapReady()"
  >
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
        pointToLayer: this.pointToLayerFunction
      }
    },
    customIconSize() {
      return [this.iconSize, this.iconSize]
    },
    customIconAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.3]
    },
    customIconSizeAutomatic() {
      return [this.iconSize * 1.4, this.iconSize * 1.1]
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
            </div><div class="detail"><a href="/earthquakes/${feature.id}" onclick="event.preventDefault(); Vue.router.push('/earthquakes/${feature.id}')">See detail</a></div></div>`,
          { permanent: false, sticky: false }
        )
      }
    },
    pointToLayerFunction() {
      return (feature, latlng) => {
        if (feature.properties.status === 'reviewed') {
          return L.marker(latlng, {
            icon: L.icon({
              iconUrl: '/earthquake.ico',
              iconSize: this.customIconSize,
              iconAnchor: this.customIconAnchor,
              popupAnchor: this.popupAnchor
            })
          })
        } else if (feature.properties.status === 'automatic') {
          return L.marker(latlng, {
            icon: L.icon({
              iconUrl: '/earthquake-automatic.ico',
              iconSize: this.customIconSizeAutomatic,
              iconAnchor: this.customIconAnchor,
              popupAnchor: this.popupAnchor
            })
          })
        } else {
          return L.marker(latlng, {
            icon: L.icon({
              iconUrl: '/question-mark.ico',
              iconSize: this.customIconSize,
              iconAnchor: this.customIconAnchor,
              popupAnchor: this.popupAnchor
            })
          })
        }
      }
    }
  },
  methods: {
    onMapReady() {
      const map = this.$refs.map.mapObject
      const legend = L.control({ position: 'bottomright' })

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend')
        div.innerHTML = `
        <div class="legend">
            <div class="item">
                <img class="image-renewed" src="/earthquake.ico">
                Reviewed
            </div>
            <div class="item">
                <img class="image-automatic" src="/earthquake-automatic.ico">
                Automatic
            </div>
        </div>`

        return div
      }

      legend.addTo(map)
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
