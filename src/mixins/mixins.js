//gedeelde functionaliteit
export default {
  methods: {
    getImgUrl(img) {
      console.log('getImgUrl() wordt aangeroepen vanuit mixins.js');
      return require('@/assets/countries/' + img )
    }
  }
}