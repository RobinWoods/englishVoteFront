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
    <p class="videoTitle">{{video.videoName}}</p>
    <div class="video-container">
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
    </div>
    <p class="name" v-for="actor in video.actors">{{actor.actorFirstName}} {{actor.actorLastName}}</p>
  </div>
</template>

<style scoped>

.voteWidget{
  background: #FFEDD6;
  box-shadow:  0 0 15px 4px rgba(255, 237, 214, 0.7);
  display: flex;
  flex-direction: column;
  padding: 2em;
  width: 23.47vw;
  border-radius: 1em;

}

.voteWidget:hover{
 cursor: pointer;
}

.videoTitle{
  font-size: 1.2em;
  font-weight: 700;
  margin-bottom: 1em;
}

.selected {
  background-color: #FFE082FF;
  box-shadow:  0 0 15px 4px rgba(255, 224, 130, 0.7);
}

.voted{
  background-color: #FFE082FF;
  box-shadow:  0 0 15px 4px rgba(255, 224, 130, 0.7);
  color: black;
}

.video-container {
  border-radius: .5em;
  overflow: hidden;
}

.name {
  font-size: 1em;
  font-weight: 500;
  margin-top: 1em;
  margin-bottom: 0;
}

</style>