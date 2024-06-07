<script>
import VoteWidget from "./VoteWidget.vue";
import axios from "axios";
import Selector from "@/components/Selector.vue";
export default {
  name: "Vote",
  data(){
    return {
      videos: [],
      actors: [],
      scriptSelected: null,
      actorSelected: null,
      videoSelected: null,
      returnData: null
    }
  },
  components:{
    Selector,
    VoteWidget
  },
  methods:{
    sendPoll(dataToSend, route){
      const apiUrl= `/${route}`;
      axios.post(apiUrl, {
        videoId: dataToSend,
        actorLastName: dataToSend,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials : "include",
        mode: 'cors'
      })
          .then(response => {
            this.returnData = response.data
          })
          .catch(error => {
            console.log(error);
          });
    },
    selectVideo(videoId){
      this.videoSelected = videoId;
    },
    selectScript(scriptId){
      this.scriptSelected = scriptId;
    },
    selectActor(actorId){
      this.actorSelected = actorId;
    },
  },
  created() {
    const apiVideoUrl= "/video";
    axios.get(apiVideoUrl)
        .then(response => {
          this.videos = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    const apiActorUrl= "/actor";
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
    {{returnData}}

    <div id="videoVote">
      <h2>Video Vote</h2>
      <Selector  :videos="videos" @selected="selectVideo($event)"/>
      <button @click="sendPoll(videoSelected, 'video')">Submit</button>
    </div>

    <div id="scriptVote">
      <h2>Script Vote</h2>
      <Selector  :videos="videos" @selected="selectScript($event)"/>
      <button @click="sendPoll(scriptSelected, 'script')">Submit</button>
    </div>

    <div id="actorVote">
      <h2>Actor Vote</h2>
      <Selector  :actors="actors" @selected="selectActor($event)"/>
      <button @click="sendPoll(actorSelected, 'actor')">Submit</button>
    </div>

  </div>
</template>

<style scoped>

</style>