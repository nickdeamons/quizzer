<template>
  <div class="timer">
    <span v-html="timeStamp" />
  </div>
</template>

<script>

import Timer from 'easytimer'

export default {

  data: function() {
    return {
      timeStamp: ''
    }
  },
  mounted: function() {
   const timer = new Timer();
   timer.start()
   timer.addEventListener('secondsUpdated', () => {
     this.timeStamp = timer.getTimeValues().toString()
   })
  }
}
</script>

