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
      loading: true,
      scriptWinners: null,
      videoWinners: null,
    }
  },
  watch:{
    winners(){
      this.loading = false
      this.videoWinners = this.getVideoWinners(this.winners).slice(0,3);
      this.scriptWinners = this.getScriptWinners(this.winners).slice(0,3);
    }
  },
  methods:{
    getScriptWinners(winners){
      return [...winners].sort((a,b) => {
        return b.scriptVote - a.scriptVote
      })
    },
    getVideoWinners(winners){
      return [...winners].sort((a,b) => {
        return b.videoVote - a.videoVote
      })
    },
    getActorWinners(winners) {
      winners.sort((a, b) => {
        return b.actorVote - a.actorVote
      })
      return winners
    },
    getImageUrl(index) {
      if (index === 0) {
        return 'https://img.icons8.com/?size=100&id=OGctPlBguZ47&format=png&color=000000';
      } else if (index === 1) {
        return 'https://img.icons8.com/?size=100&id=TY9dxXEoX0z8&format=png&color=000000';
      } else if (index === 2) {
        return 'https://img.icons8.com/?size=100&id=rdDTvbVAsMBN&format=png&color=000000';
      }
    },
  },
}
</script>

<template>
  <div class="resultWidget">
    <div class="title">{{request.toUpperCase()}}</div>
    <div class="result">
      <div class="resultContent">
        <div>
          <div v-if="request ==='actor'" class="list">
            <div class="li" v-for="(winner, index) in getActorWinners(winners).slice(0,3)">
              <div class="name">
                <div class="team">{{winner.actorFirstName}} {{(winner.actorLastName)}}</div>
                <div class="vote">{{winner.actorVote}} votes</div>
              </div>
              <img :src="getImageUrl(index)" :alt="'Image for ' + winner.videoName" :class="['winner-image', 'winner-' + (index + 1)]" />
            </div>
          </div>
          <div v-if="request ==='video'" class="list">
            <div class="li"  v-for="(winner, index) in videoWinners" :key="winner.videoVote">
              <div class="name">
                <div class="team">{{ winner.videoName }}</div>
                <div class="vote"> {{winner.videoVote}} votes</div>
              </div>
              <img :src="getImageUrl(index)" :alt="'Image for ' + winner.videoName" :class="['winner-image', 'winner-' + (index + 1)]" />
            </div>
          </div>
          <div v-if="request === 'script'" class="list">
            <div class="li" v-for="(winner, index) in scriptWinners" >
              <div class="name">
                <div class="team">{{ winner.videoName }}</div>
                <div class="vote"> {{winner.scriptVote}} votes</div>
              </div>
              <img :src="getImageUrl(index)" :alt="'Image for ' + winner.videoName" :class="['winner-image', 'winner-' + (index + 1)]" />
            </div>
          </div>
        </div>

      </div>
      <div class="resultChart">
        <Chart v-if="!loading && request === 'script'" class="voteChart" :api-data="scriptWinners.map(winner => winner.scriptVote)" :api-label="scriptWinners.map(winner => winner.videoName)"/>
        <Chart v-if="!loading && request === 'video'" class="voteChart" :api-data="videoWinners.map(winner => winner.videoVote)" :api-label="videoWinners.map(winner => winner.videoName)"/>
        <Chart v-if="!loading && request === 'actor'" class="voteChart" :api-data="winners.map(winner => winner.actorVote)" :api-label="winners.map(winner => winner.actorFirstName + ' '+ winner.actorLastName )"/></div>
      </div>
    </div>

</template>

<style scoped>
.resultWidget{
  display: flex;
  flex-direction: column;
  margin: 0.5em;
  padding: 2em;
  border-radius: 10px;

}

.team {
  font-size: 1em;
  font-weight: 600;
}

.resultContent {
  flex: 1;
}

.resultChart {
  flex: 0.5;
}

.result {
  display: flex;
  align-items: center;
  gap: 2em;
}

.title {
  font-size: 1.5em;
  font-weight: 700;
  margin-bottom: 1em;
}

.li {
  background-color: #FFEDD6;
  box-shadow:  0 0 15px 4px rgba(255, 237, 214, 0.7);
  padding: 1.5em;
  border-radius: 1em;
  width: 20em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 2em;
  list-style-type: none;
}

.winner-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.vote {
  font-size: 0.8em;
}

.name {
  display: flex;
  flex-direction: column;
  gap: 0.1em;
}

@media (min-width: 425px) and (max-width: 760px) {
  .li {
    width: 20em;
  }
}

@media (max-width: 760px){
  .result{
    flex-direction: column;
  }

  .li {
    width: 20em;
  }

  .resultChart {
    width: 313px;
  }

  .title{
    margin: 0 auto 1em;
  }
}

@media (min-width: 760px) {
  .li {
    width: 35vw;
  }

  .resultChart {
    width: 50vw;
  }
}

@media (max-width: 425px) {
  .li {
    width: 75vw;
  }

  .resultChart {
    width: 80vw;
  }
}


</style>