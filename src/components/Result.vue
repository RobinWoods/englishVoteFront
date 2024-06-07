<script>
import Chart from "@/components/Chart.vue";
export default {
  name: "Result",
  props: ['winners', 'request'],
  components:{
    Chart
  },
  data(){
    return {
      loading: true
    }
  },
  watch:{
    winners(){
      this.loading = false
    }
  },
  methods:{
    getScriptWinners(winners){
      winners.sort((a,b) => {
        return b.scriptVote - a.scriptVote
      })
      return winners
    },
    getVideoWinners(winners){
      winners.sort((a,b) => {
        return b.videoVote - a.videoVote
      })
      return winners
    },
    getActorWinners(winners) {
      winners.sort((a, b) => {
        return b.actorVote - a.actorVote
      })
      return winners
    }
  }
}
</script>

<template>
  <div class="resultWidget">
    <h2>{{request}}</h2>
    <ul v-if="request === 'script'">
      <li v-for="winner in getScriptWinners(winners).slice(0,3)" >
        {{ winner.videoName }} | {{(winner.teamName)}} : {{winner.scriptVote}} votes
      </li>
      <Chart v-if="!loading" class="voteChart" :api-data="winners.map(winner => winner.scriptVote)" :api-label="winners.map(winner => winner.videoName)"/>
    </ul>
    <ul v-if="request ==='video'">
      <li v-for="winner in getVideoWinners(winners).slice(0,3)" :key="winner.videoVote">
        {{winner.videoName}} | {{(winner.teamName)}} : {{winner.videoVote}} votes
      </li>
      <Chart v-if="!loading" class="voteChart" :api-data="winners.map(winner => winner.videoVote)" :api-label="winners.map(winner => winner.videoName)"/>
    </ul>
    <ul v-if="request ==='actor'">
      <li v-for="winner in getActorWinners(winners).slice(0,3)">
        {{winner.actorFirstName}} {{(winner.actorLastName)}} : {{winner.actorVote}} votes
      </li>
      <Chart v-if="!loading" class="voteChart" :api-data="winners.map(winner => winner.actorVote)" :api-label="winners.map(winner => winner.actorFirstName + ' '+ winner.actorLastName )"/>
    </ul>
  </div>
</template>

<style scoped>
.resultWidget{
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
  width: 200px;
  display: inline-block;
  text-align: center;
  border-radius: 5px;
}

</style>