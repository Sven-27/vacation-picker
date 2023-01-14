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
    <h2>Selected:</h2>
    <ul class="list-group">
      <li class="list-group-item">{{ selectedCountry.id }}</li>
      <li class="list-group-item">{{ selectedCountry.name }}</li>
      <li class="list-group-item">{{ selectedCountry.capital }}</li>
      <li class="list-group-item">{{ selectedCountry.details }}</li>
      <li class="list-group-item" v-if="isExpensive">
        <span class="badge rounded-pill text-bg-danger">Expensive!</span>
      </li>
      <li class="list-group-item">
        <img :src="getImgUrl(selectedCountry.img)"
         :alt="selectedCountry.img"
         class="img-fluid" /> 
      </li>
    </ul> 
    <h2>Other countries:</h2>
    <input 
      v-model="newCountry"
      @keyup.enter="addCountry(newCountry)"
      class="form-control-lg" 
      placeholder="New country... "
    >
    <button
      @click="addCountry(newCountry)"
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
      newCountries: []
    }
  },
  methods: {
    selectCountry(index){
      this.selectedCountryIndex = index;
    },
    addCountry() {
      this.newCountries.push(this.newCountry);
      this.newCountry = '';
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