<script>
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import api from "js-cookie";

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: "Chart",
  methods: {api},
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
        }],
      }
    }
  }
}
</script>

<template>
  <h1 v-if="this.apiData.reduce((a, b) => a + b, 0) === 0">Waiting For Vote</h1>
  <Doughnut :data="data" :options="options" />
</template>

<style >

</style>