<script>
export default {
  name: "Video",
  props: ["videoId"],
  data(){
    return{
      player: null
    }
  },
  methods:{
    initYoutube(){
      const _ = this;
      console.log("initYoutube");
      this.player = new YT.Player("player", {
        width: 600,
        height: 400,
        videoId: this.videoId,
        events: {
          onReady: _.onPlayerReady,
          onStateChange: _.onPlayerStateChange
        }
      });
    },
    onPlayerReady(event){
      event.target.playVideo();
    },
    onPlayerStateChange(){
      player.stopVideo();
    }
  },
  created() {

  }

}
</script>

<template>

</template>

<style scoped>

</style>