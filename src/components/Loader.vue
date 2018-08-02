<template>
  <div class="loader">
    <div class="loader__icon">
      <svg class="lds-gear" width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;">
        <g transform="translate(50 50)">
          <g transform="rotate(129.091)">
            <animateTransform attributeName="transform" type="rotate" values="0;360" keyTimes="0;1" dur="3.3s" repeatCount="indefinite"></animateTransform>
            <path d="M37.43995192304605 -6.5 L47.43995192304605 -6.5 L47.43995192304605 6.5 L37.43995192304605 6.5 A38 38 0 0 1 -13.09081083692417 35.67394948182593 L-13.09081083692417 35.67394948182593 L-18.09081083692417 44.33420351967032 L-29.34914108612187 37.834203519670325 L-24.349141086121872 29.173949481825936 A38 38 0 0 1 -24.349141086121893 -29.17394948182592 L-24.349141086121893 -29.17394948182592 L-29.349141086121897 -37.834203519670304 L-18.0908108369242 -44.334203519670304 L-13.090810836924195 -35.67394948182592 A38 38 0 0 1 37.43995192304605 -6.500000000000007 M0 -30A30 30 0 1 0 0 30 A30 30 0 1 0 0 -30"
              fill="#389798"></path>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
  // const parser = require('xml-js');

  export default {
    // some code here
  };
</script>

<style scoped>
.loader {
  position: fixed;
  background: rgba(255, 255, 255, 1);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  margin: 0;
  padding: 0;
}
.loader__icon {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  align-content: center;
}
</style>