<template>
  <div 
    id="letter-container"
        >
      <Letter 
        v-bind:key="character.id" 
        v-for="character in characters"
        v-bind:character="character" 
        />
  </div>
</template>

<script>
import Letter from "./Letter";

export default {
    name: 'LetterContainer',
    components: {
        Letter
    },
    props: ['characters']
}
</script>

<style scoped>
#letter-container {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;
    border: 3px solid rgb(71, 71, 71);
    width: 1000px;
    height: 400px;
}
</style>