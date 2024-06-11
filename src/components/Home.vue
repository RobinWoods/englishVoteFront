<script>
import axios from "axios";
import Result from "@/components/Result.vue";
import {state, socket} from "@/socket.js"
export default {
  name: "Home",
  components: {
    Result
  },
  data(){
    return {
      actors: [],
      videos: [],
      loading: true,
      socketMessage: 'test'
    }
  },
  methods:{
    getActors(){
      const actorApiUrl= "/actor";
      axios.get(actorApiUrl)
          .then(response => {
            this.actors = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    getVideos(){
      const videoApiUrl= "/video";
      axios.get(videoApiUrl)
          .then(response => {
            this.videos = response.data;
          })
          .catch(error => {
            console.error('Error fetching video data:', error);
          });
    }
  },
  created(){
    this.getVideos();
    this.getActors();
    this.loading = false;
  },
  computed: {
    connected() {
      return state.connected;
    },
  },
  mounted() {
    socket.on("actors", (message) => {
      if(message === 'actor vote added'){
        this.getActors();
      }
    });
    socket.on("videos", (message) => {
      this.socketMessage = message;
      if(message === 'video vote added'){
        this.getVideos();
      }
    });

  }

}
</script>

<template>

  <div class="contents">
    <Result v-if="!loading" :winners="actors" request="actor"/>
    <Result v-if="!loading" :winners="videos" request="video"/>
    <Result v-if="!loading" :winners="videos" request="script"/>
  </div>
</template>

<style scoped>
.contents {
  display: flex;
  flex-direction: column;
  gap: 2em;
  margin-top: 7em;
}

</style>