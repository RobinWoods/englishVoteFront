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
      returnData: null,
      votes: {
        videoVoted: localStorage.getItem('videoVoted'),
        scriptVoted: localStorage.getItem('scriptVoted'),
        actorVoted: localStorage.getItem('actorVoted')
      }
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
        actorId: dataToSend,
      })
          .then(response => {
            this.returnData = response.data
          })
          .catch(error => {
            console.log(error);
          });
      if(route === "video") {
        localStorage.setItem('videoVoted', dataToSend);
      }
      else if(route === "script") {
        localStorage.setItem('scriptVoted', dataToSend);
      }
      else if(route === "actor") {
        localStorage.setItem('actorVoted', dataToSend);
      }
      this.votes.videoVoted = localStorage.getItem('videoVoted');
      this.votes.scriptVoted = localStorage.getItem('scriptVoted');
      this.votes.actorVoted = localStorage.getItem('actorVoted');
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
    <div id="videoVote">
      <h2>Video Vote</h2>
      <Selector  :videos="videos" @selected="selectVideo($event)" :cookie="votes.videoVoted" />
      <button @click="sendPoll(videoSelected, 'video')" v-if="!votes.videoVoted">Submit</button>
      <h2 v-if="votes.videoVoted">You have already voted for a video</h2>
    </div>

    <div id="scriptVote">
      <h2>Script Vote</h2>
      <Selector  :videos="videos" @selected="selectScript($event)" :cookie="votes.scriptVoted"/>
      <button @click="sendPoll(scriptSelected, 'script')" v-if="!votes.scriptVoted">Submit</button>
      <h2 v-if="votes.scriptVoted">You have already voted for a script</h2>
    </div>

    <div id="actorVote">
      <h2>Actor Vote</h2>
      <Selector  :actors="actors" @selected="selectActor($event)" :cookie="votes.actorVoted"/>
      <button @click="sendPoll(actorSelected, 'actor')" v-if="!votes.actorVoted">Submit</button>
      <h2 v-if="votes.actorVoted">You have already voted for an actor</h2>
    </div>

  </div>
</template>

<style scoped>

</style>