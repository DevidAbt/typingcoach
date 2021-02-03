<template>
  <Header/>
  <router-view/>
</template>

<script>
import M from 'materialize-css'
import Header from './components/Header'

export default {
  name: 'app',
  mounted() {
    M.AutoInit();
  },
  components: {
    Header
  }
}
</script>

<style>
:root {
  background-color: #1a1a1a;
}
</style>