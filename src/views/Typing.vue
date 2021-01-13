<template>
  <div id="typing">
    <LetterContainer 
      v-bind:characters="allCharacters" 
      />
    <PressedKey v-bind:character="pressedCharacter"/>
    <Progress/>
  </div>
</template>

<script>
import LetterContainer from '../components/LetterContainer'
import PressedKey from '../components/PressedKey'
import Progress from '../components/Progress'
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Typing',
  components: {
    LetterContainer,
    PressedKey,
    Progress
  },
  computed: mapGetters(['allCharacters']),
  created() {
    window.addEventListener('keydown', this.keydown);
    this.loadCharacters();
  },
  data() {
    return {
      pressedCharacter: ''
    };
  },
  methods: {
    ...mapActions(['loadCharacters', 'keyPressed', 'updateStatus', 'updateProgress']),
    keydown: function ($event) {
      if ($event.key.match(/^[ a-zA-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ\-.,]$/)) {
        this.pressedCharacter = $event.key;
        this.keyPressed($event.key);
      }
    }
  }
}
</script>

<style>
:root {
  background-color: #1a1a1a;
}
</style>
