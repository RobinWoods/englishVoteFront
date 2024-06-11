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
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  computed: {
    data() {
      return {
        labels: this.apiLabel,
        datasets: [{
          backgroundColor: ['#FFE082', '#9FA8DA', '#FFAB91'].concat(new Array(this.apiData.length - 3).fill("#FFF6EB")),
          data: this.apiData
        }]
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