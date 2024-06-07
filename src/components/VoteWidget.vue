<script>
export default {
  name: "VoteWidget",
  props:["video", "actor"]
}
</script>

<template>
  <div class="voteWidget" v-if="!video">
    <h2>{{actor.actorFirstName}} {{actor.actorLastName}}</h2>
  </div>
  <div class="voteWidget" v-if="!actor">
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



</style>