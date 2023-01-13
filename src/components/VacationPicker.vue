<template>
  <div class="container">
    <h1>Choose your vacation destination</h1>
    <ul class="list-group">
      <li 
        class="list-group-item"
        v-for="country in countryData.countries"
        v-bind:key="country.id"
        v-bind:title="country.details"
      >
        {{country.id}}
        {{ country.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import countryData from '@/data/countryData'
export default {
  name: "VacationPicker",
  data() {
    return {
      countryData
    }
  },
}
</script>