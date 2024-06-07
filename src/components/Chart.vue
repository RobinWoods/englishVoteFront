<script>
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: "Chart",
  components: {
    Doughnut
  },
  props: ['apiData', 'apiLabel'],
  data(){
    return{
      data: {
        labels: this.apiLabel,
        datasets: [{
          backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', "#FFB591", '#F32940', '#FF5733'],
          data: this.apiData
        }]
      },
      options: {
        responsive: true
      }
    }
  }
}
</script>

<template>
  <Doughnut :data="data" :options="options" />
</template>

<style >

</style>