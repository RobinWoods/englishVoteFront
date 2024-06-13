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
  <div class="contents">
    <div id="videoVote" class="resultWidget">
      <h2>VIDEO</h2>
      <div class="selected">
          <Selector :videos="videos" @selected="selectVideo($event)" :cookie="votes.videoVoted" />
      </div>
      <button @click="sendPoll(videoSelected, 'video')" v-if="!votes.videoVoted">Submit</button>
      <h2 v-if="votes.videoVoted">You have already voted for a video</h2>
    </div>

    <div id="scriptVote" class="resultWidget">
      <h2>SCRIPT</h2>
      <div class="selected">
        <Selector :videos="videos" @selected="selectScript($event)" :cookie="votes.scriptVoted"/>
      </div>
      <button @click="sendPoll(scriptSelected, 'script')" v-if="!votes.scriptVoted">Submit</button>
      <h2 v-if="votes.scriptVoted">You have already voted for a script</h2>
    </div>

    <div id="actorVote" class="resultWidget">
      <h2>ACTOR</h2>
      <div class="selected">
          <Selector :actors="actors" @selected="selectActor($event)" :cookie="votes.actorVoted"/>
      </div>
      <button @click="sendPoll(actorSelected, 'actor')" v-if="!votes.actorVoted">Submit</button>
      <h2 v-if="votes.actorVoted">You have already voted for an actor</h2>
    </div>

  </div>
</template>

<style scoped>
.contents {
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-top: 7em;
}

.resultWidget{
  display: flex;
  flex-direction: column;
  margin: 0.5em;
  padding: 2em;
  border-radius: 10px;

}

.selected {
  display: flex;
  flex-direction: row;
  gap: 1em;
  flex-wrap: wrap;
}

button {
  background-color: white;
  border: none;
  color: #181716;
  margin: 4em auto 0;
  width: 23.47vw;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;

  transition-duration: 0.3s;
  border-radius: 12px;
  box-shadow:  0 0 15px 4px rgba(243, 240, 239, 0.7);
}

button:hover {
  background-color: #FFEDD6;
  box-shadow:  0 0 15px 4px rgba(255, 237, 214, 0.7);
}

</style>