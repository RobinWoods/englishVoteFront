<script>
import VoteWidget from "@/components/VoteWidget.vue";
import axios from "axios";
export default {
  name: "Selector",
  components:{
    VoteWidget
  },
  data(){
    return{
      selectedOption: null,
    }
  },
  props:["videos", "actors"],
  methods:{
    selectOption(option){
      this.selectedOption = option;
      this.$emit('selected', option);
    },
  }
}
</script>

<template>
  <VoteWidget
      v-if="!actors"
      v-for="video in videos"
      @click="selectOption(video.videoId)"
      :video="video"
      :is-selected="selectedOption === video.videoId"
      class="option-wrapper"
  />
  <VoteWidget
      v-if="!videos"
      v-for="actor in actors"
      @click="selectOption(actor.actorId)"
      :actor="actor"
      :is-selected="selectedOption === actor.actorId"
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