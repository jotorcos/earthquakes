<template>
  <div class="filters">
    <div class="filters-box">
      <Datepicker
        :disabled-dates="dateConfig.disabledDates"
        placeholder="From"
        v-model="dateStart"
      />

      <Datepicker
        :disabled-dates="dateConfig.disabledDates"
        placeholder="To"
        v-model="dateEnd"
      />

      <button :disabled="searchDisabled" @click="search()">
        <i class="search-icon material-icons">search</i>
      </button>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'Search',
  components: {
    Datepicker
  },
  props: {
    dateStartIni: {
      type: [Date, null]
    },
    dateEndIni: {
      type: [Date, null]
    },
    searchDisabled: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dateStart: null,
      dateEnd: null,
      dateConfig: {
        disabledDates: {
          from: new Date()
        }
      }
    }
  },
  created() {
    this.dateStart = this.dateStartIni
    this.dateEnd = this.dateEndIni
  },
  methods: {
    search() {
      this.$emit('search', { dateStart: this.dateStart, dateEnd: this.dateEnd })
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  position: absolute;
  z-index: 500;
  left: calc(50% - 163px);
  top: 30px;

  .filters-box {
    display: flex;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
    background-color: $white;
    border-radius: 50px;
    padding: 10px;

    button {
      height: 45px;
      width: 45px;
      border-radius: 50%;
      border: none;
      font-weight: bold;
      background-color: $primary;
      outline: none;
      cursor: pointer;

      &:focus {
        background-color: $secondary;
      }

      .search-icon {
        color: $white;
      }
    }
  }
}
</style>
