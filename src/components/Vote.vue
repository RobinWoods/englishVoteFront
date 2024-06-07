<script>
import VoteWidget from "./VoteWidget.vue";
import axios from "axios";
export default {
  name: "Vote",
  data(){
    return {
      videos: [],
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
    const apiUrl= "http://localhost:3333/video";
    axios.get(apiUrl)
        .then(response => {
          this.videos = response.data;
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
    <VoteWidget v-for="video in videos" :video="video" />
  </div>
</template>

<style scoped>

</style>