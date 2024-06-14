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
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                // Check if the data value is 1 and hide tooltip
                if (context.raw === 1 && context.dataset.backgroundColor[0] === '#d3d3d3') {
                  return null;
                }
                return context.raw;
              }
            }
          }
        }
      }
    }
  },
  computed: {
    data() {
      const totalVotes = this.apiData.reduce((a, b) => a + b, 0);
      if (totalVotes === 0) {
        return {
          datasets: [{
            backgroundColor: ['#d3d3d3'],
            data: [1],
          }],
        }
      } else {
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
}
</script>

<template>
  <Doughnut :data="data" :options="options" />
</template>

<style >

</style>