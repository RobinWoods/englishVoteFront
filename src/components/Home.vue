<script>
import axios from "axios";
import Result from "@/components/Result.vue";
import Chart from "@/components/Chart.vue";
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
    const actorApiUrl= "http://localhost:3333/actor";
    axios.get(actorApiUrl)
        .then(response => {
          this.actors = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    const videoApiUrl= "http://localhost:3333/video";
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
  <div>
    <h1>Home Page</h1>
    <Result v-if="!loading" :winners="actors" request="actor"/>
    <Result v-if="!loading" :winners="videos" request="video"/>
    <Result v-if="!loading" :winners="videos" request="script"/>
  </div>
</template>

<style scoped>

</style>