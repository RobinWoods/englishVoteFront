<script>
import VoteWidget from "@/components/VoteWidget.vue";
export default {
  name: "Selector",
  components:{
    VoteWidget
  },
  data(){
    return{
      selectedOption: null,
      test : 'test'
    }
  },
  props:["videos", "actors", "cookie"],
  methods:{
    selectOption(option){
      if(!this.cookie) {
        this.selectedOption = this.selectedOption === option ? null : option
        this.$emit('selected', option);
      }
    },
  },
}
</script>

<template>
  <VoteWidget
      v-if="!actors"
      v-for="video in videos"
      @click="selectOption(video.videoId)"
      :video="video"
      :is-selected="selectedOption === video.videoId"
      :is-voted="parseInt(cookie) === video.videoId"
      class="option-wrapper"
  />
  <VoteWidget
      v-if="!videos"
      v-for="actor in actors"
      @click="selectOption(actor.actorId)"
      :actor="actor"
      :is-selected="selectedOption === actor.actorId"
      :is-voted="parseInt(cookie) === actor.actorId"
      class="option-wrapper"
  />
</template>


<style>


.option-wrapper {
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 10px;
}

</style>