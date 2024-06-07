<script>
import VoteWidget from "./VoteWidget.vue";
import axios from "axios";
export default {
  name: "Vote",
  data(){
    return {
      videos: [],
      actors: []
    }
  },
  components:{
    VoteWidget
  },
  methods:{
    sendPoll(videoId){
      const apiUrl= "http://localhost:3333/poll";
      axios.post(apiUrl, {
        videoId: videoId
      })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
  created() {
    const apiVideoUrl= "http://localhost:3333/video";
    axios.get(apiVideoUrl)
        .then(response => {
          this.videos = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    const apiActorUrl= "http://localhost:3333/actor";
    axios.get(apiActorUrl)
        .then(response => {
          this.actors = response.data;
        })
        .catch(error => {
          console.log(error);
        });
  }
}
</script>

<template>
  <div>
    <h1>Vote Page</h1>

    <div id="videoVote">
      <h2>Video Vote</h2>
      <VoteWidget v-for="video in videos" :video="video"/>
    </div>

    <div id="scriptVote">
      <h2>Script Vote</h2>
      <VoteWidget v-for="video in videos" :video="video"/>
    </div>

    <div id="actorVote">
      <h2>Actor Vote</h2>
      <VoteWidget v-for="actor in actors" :actor="actor"/>
    </div>

  </div>
</template>

<style scoped>

</style>