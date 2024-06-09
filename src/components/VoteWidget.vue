<script>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'
export default {
  name: "VoteWidget",
  props:["video", "actor", "isSelected", "isVoted", "testCookie"],
  components:{
    LiteYouTubeEmbed
  },
  methods:{
    voteVideo() {
      this.$emit("click", this.video.videoId);
    },
    voteActor() {
      this.$emit("click", this.actor.actorId);
    },
  },
}
</script>

<template>

  <div class="voteWidget" v-if="!video" @click="voteActor" :class="{'selected' : isSelected , 'voted' : isVoted}">
    <h2>{{actor.actorFirstName}} {{actor.actorLastName}}</h2>
  </div>
  <div class="voteWidget" v-if="!actor" @click="voteVideo" :class="{'selected' : isSelected , 'voted' : isVoted}">
    <h1>{{video.videoName}}</h1>
    <h2>{{video.teamName}}</h2>
    <LiteYouTubeEmbed
        v-if="video.videoLink.startsWith('https://www.youtube.com/watch?v=')"
        :id="video.videoLink.slice(32)"
        title="video.videoName"
    />
    <LiteYouTubeEmbed
        v-if="!video.videoLink.startsWith('https://www.youtube.com/watch?v=')"
        id="dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
    />
    <h3 v-for="actor in video.actors">{{actor.actorFirstName}} {{actor.actorLastName}}</h3>
  </div>
</template>

<style scoped>

.voteWidget{
  border: 1px solid black;
  margin: 10px;
  padding: 10px;
  width: 200px;
  display: inline-block;
  text-align: center;
  border-radius: 5px;
}

/*.voteWidget:hover{
  border: 5px solid #397eeb;
}*/

.selected {
  border-color: white;
  background-color: #397eeb;
  color: white;
}

.voted{
  background-color: #fae059;
  color: black;
  border-color: white;
}

</style>