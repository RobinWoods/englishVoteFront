<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<template>
  <header>
    <router-link to="/vote">Vote</router-link>
    <router-link to="/">Home</router-link>
  </header>

  <div>
    <router-view></router-view>
  </div>
  <footer>

  </footer>
</template>

<style scoped>

</style>
