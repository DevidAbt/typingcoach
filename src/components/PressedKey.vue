<template>
  <div id="pressed-key">
      {{ this.character }}
  </div>
</template>

<script>

export default {
    name: 'PressedKey',
    props: ['character'],
}
</script>

<style scoped>
#pressed-key {
    font: 45px Arial bold;
    color: white;
    border: 1px solid white;
    width: 54px;
    height: 54px;
    text-align: center;
}
</style>