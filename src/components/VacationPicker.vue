<template>
  <div class="container d-flex flex-column">
    <h1 class="ps-4">Vacation Picker</h1>
    <div class="d-flex justify-content-between m-4">
    <div class="w-50 me-2">
      <div class="alert alert-warning text-center">
        <h2>{{selectedCountry.name}}</h2> 
        <h3>Capital: {{selectedCountry.capital}}</h3>
          <span v-if="isOnsale" class="badge bg-success">Sale!</span>
          <span v-if="isExpensive" class="badge bg-danger">(expensive)</span>
          <li class="list-group-item">
            <span 
              class="float-right badge text-bg-info rounded-pill"
              v-if="selectedCountry.rating !== 0"  
            >Rating: {{ selectedCountry.rating }}</span>
          </li>
          <li class="list-group-item" v-if="selectedCountry.favorite">
            <span class="badge text-bg-success">Favorite</span>
          </li>
      </div>
      <button @click="prevCountry()" type="button" class="btn btn-secondary mt-1 me-1">&#8249;&#8249; Back</button>
      <button @click="nextCountry()" type="button" class="btn btn-danger mt-1 me-1">Next &#8250;&#8250;</button>
      <!-- <button @click="showDetails = !showDetails" type="button" class="btn btn-danger mt-1 me-1">
        <span v-if="showDetails">Hide details</span>
        <span v-if="!showDetails">Show details</span>
      </button> -->
      <h2 class="mt-5">Other countries:</h2>
      <input 
        v-model="newCountry"
        @keyup.enter="addCountry()"
        class="form-control-lg me-2" 
        placeholder="New country... "
      >
      <button
        @click="addCountry()"
        class="btn btn-info"
      >
        Add country
      </button>
      <ul class="list-group mt-3">
        <li 
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="(country, index) in newCountries"
          :key="index"
        >
          {{country}}
          <button 
            @click="removeCountry(index)"
            type="button" 
            class="btn btn-primary"
          >
            Verwijder
          </button>
        </li>
      </ul>
    </div>
    <CollapsibleSection>
    <!-- v-if="showDetails" in countryDetails below -->
    <CountryDetail 
      
      :country="selectedCountry"
      :expensive="isExpensive"
      :sale="isOnsale"
      @rating="onRating($event)"
      @favorite="onFavorite()"
    />
    </CollapsibleSection>
    </div>
  </div>
</template>

<script>
import countryData from '@/data/countryData';
import CountryDetail from '@/components/CountryDetail.vue';
import CollapsibleSection from '@/components/shared/CollapsibleSection.vue'

export default {
  name: "VacationPicker",
  components: {
    CountryDetail,
    CollapsibleSection,
    },  
  data() {
    return {
      countryData,
      selectedCountryIndex: 0,
      // showDetails: true,
      newCountry: '',
      newCountries: [],
    }
  },
  methods: {
    selectCountry(index){
      this.selectedCountryIndex = index;
    },
    prevCountry() {
      this.selectedCountryIndex--;
      if (this.selectedCountryIndex < 0) {
        this.selectedCountryIndex = this.countryData.countries.length - 1;
      }
    },
    nextCountry() {
      this.selectedCountryIndex++;
      if (this.selectedCountryIndex > this.countryData.countries.length - 1) {
        this.selectedCountryIndex = 0;
      }
    },
    addCountry() {
      this.newCountries.push(this.newCountry);
      this.newCountry = '';
    },    
    removeCountry(index) {
      this.newCountries.splice(index, 1);
    },
    onRating(rating) {
      this.countryData.countries[this.selectedCountryIndex].rating += rating;
    },
    onFavorite() {
         this.countryData.countries[this.selectedCountryIndex].favorite = !this.countryData.countries[this.selectedCountryIndex].favorite

      // console.log(favorite)
    },
  },
   computed: {
    selectedCountry() {
      console.log('selectedCountry aangeroepen');
      return {
        ...this.countryData.countries[this.selectedCountryIndex]
      }
    },
    isExpensive() {
      return this.countryData.countries[this.selectedCountryIndex].cost > 3000;
    },
    isOnsale() {
      return this.countryData.countries[this.selectedCountryIndex].cost < 1000;
    }
   }
}
</script>