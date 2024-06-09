<script>
import axios from "axios";
import Result from "@/components/Result.vue";
export default {
  name: "Home",
  components: {
    Result
  },
  data(){
    return {
      actors: [],
      videos: [],
      loading: true
    }
  },
  method:{
  },
  created(){
    const actorApiUrl= "/actor";
    axios.get(actorApiUrl)
        .then(response => {
          this.actors = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    const videoApiUrl= "/video";
    axios.get(videoApiUrl)
        .then(response => {
          this.videos = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    this.loading = false;

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