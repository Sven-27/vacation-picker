<template>
  <div class="container">
    <h1>Choose your vacation destination</h1>
    <ul class="list-group">
      <li 
        class="list-group-item"
        v-for="(country, index) in countryData.countries"
        v-bind:key="country.id"
        @click="selectCountry(index)"
      >
        {{country.id}}
        {{ country.name }}
      </li>
    </ul>
    <h2>{{selectedCountry.name}}:</h2>
    <ul class="list-group">
      <li class="list-group-item">{{ selectedCountry.id }}</li>
      <li class="list-group-item">{{ selectedCountry.name }}</li>
      <li class="list-group-item">{{ selectedCountry.capital }}</li>
      <li class="list-group-item">{{ selectedCountry.details }}</li>
      <li class="list-group-item" v-show="isExpensive">
        <span class="badge rounded-pill text-bg-danger">Expensive!</span>
      </li>
      <li class="list-group-item">
        <img :src="getImgUrl(selectedCountry.img)"
         :alt="selectedCountry.img"
         class="img-fluid w-50" /> 
      </li>
    </ul> 
    <h2>Other countries:</h2>
    <input 
      v-model="newCountry"
      @keyup.enter="addCountry()"
      class="form-control-lg" 
      placeholder="New country... "
    >
    <button
      @click="addCountry()"
      class="btn btn-info"
    >
      Add country
    </button>
    <ul class="list-group">
      <li 
        class="list-group-item"
        v-for="(country, index) in newCountries"
        :key="index"
      >
        {{country}}
      </li>
    </ul>
    <p>{{ newCountry }}</p>
    <h2>Destinations cheaper than:</h2>
    <select class="form-control-lg" v-model="selectedCost" @change="filterCountries()">
      <option v-for="cost in costs" :key="cost" :value="cost">
        {{ cost }}
      </option>
    </select>
    <ul class="list-group">
      <li 
        class="list-group-item"
        v-for="(country, index) in filteredCountries"
        :key="index"
      >
        {{country.name}} (EUR: {{country.cost}})
      </li>
    </ul>
  </div>
</template>

<script>
import countryData from '@/data/countryData';
import mixins from '@/mixins/mixins';
export default {
  name: "VacationPicker",
  mixins: [mixins],
  data() {
    return {
      countryData,
      selectedCountryIndex: 0,
      newCountry: '',
      newCountries: [],
      selectedCost: 1000,
      costs: [1000, 2000, 3000, 4000, 5000],
      filteredCountries: [],
    }
  },
  methods: {
    selectCountry(index){
      this.selectedCountryIndex = index;
    },
    addCountry() {
      this.newCountries.push(this.newCountry);
      this.newCountry = '';
    },
    filterCountries() {
      this.filteredCountries = this.countryData.countries.filter(country => country.cost < this.selectedCost);
    }
  },
   computed: {
    selectedCountry() {
      console.log('selectedCountry aangeroepen');
      return {
        ...this.countryData.countries[this.selectedCountryIndex]
      }
    },
    isExpensive() {
      return this.countryData.countries[this.selectedCountryIndex].cost > 1000;
    }
   }
}
</script>