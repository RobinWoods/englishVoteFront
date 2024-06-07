<script>
export default {
  name: "VoteWidget",
  props:["video", "actor", "isSelected"],
  methods:{
    voteVideo() {
      this.$emit("click", this.video.videoId);
    },
    voteActor() {
      this.$emit("click", this.actor.actorLastName);
    },
  }
}
</script>

<template>
  <div class="voteWidget" v-if="!video" @click="voteActor" :class="{'selected' : isSelected}">
    <h2>{{actor.actorFirstName}} {{actor.actorLastName}}</h2>
  </div>
  <div class="voteWidget" v-if="!actor" @click="voteVideo" :class="{'selected' : isSelected}">
    <h1>{{video.videoName}}</h1>
    <h2>{{video.teamName}}</h2>
    <h2>{{video.videoLink}}</h2>
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
.selected {
  border-color: white;
  background-color: #397eeb;
  color: white;
}

</style>