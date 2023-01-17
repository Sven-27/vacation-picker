<template>
<div class="w-50 ms-2">
    <h2>{{country.name}}</h2>
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between">
        {{ country.id }}
        <span class="float-right">
          <button @click="setRating(-1)" type="button" class="btn btn-danger me-2">-1</button>
          <button @click="setRating(1)" type="button" class="btn btn-success">+1</button>
        </span>
      </li>
      <li class="list-group-item">{{ country.name }}</li>
      <li class="list-group-item">{{ country.capital }}</li>
      <li class="list-group-item">
        <img :src="getImgUrl(country.img)"
         :alt="country.img"
         class="img-fluid w-50" /> 
      </li>
      <li class="list-group-item">{{ country.details }}</li>
      <li class="list-group-item" v-show="expensive">
        <span class="badge rounded-pill text-bg-danger">Expensive!</span>
      </li>
      <li class="list-group-item" v-show="sale">
        <span class="badge rounded-pill text-bg-success">Sale!</span>
      </li>
    </ul> 
    </div>
</template>
<script>
import mixins from '@/mixins/mixins';
export default {
  name: "CountryDetail",
  emits: ['rating'],
  mixins: [mixins],
  props: {
    country: [],
    expensive: Boolean,
    sale: Boolean
  },
  methods: {
    setRating(value) {
      this.$emit('rating', value);
    }
  }
}
</script>