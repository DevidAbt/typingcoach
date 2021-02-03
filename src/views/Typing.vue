<template>
  <div id="typing">
    <div class="row">
      <div class="col s12">
        <LetterContainer 
          v-bind:characters="allCharacters"/>
      </div>
    </div>
    <div class="row">
      <div class="col s6">
        <PressedKey v-bind:character="pressedCharacter"/>
      </div>
      <div class="col s6">
        <Progress/>
      </div>
    </div>
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
      if ($event.key.match(/^[ a-zA-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ0-9\-.,]$/)) {
        this.pressedCharacter = $event.key;
        this.keyPressed($event.key);
      }
    }
  },
  unmounted() {
    window.removeEventListener('keydown', this.keydown)
  }
}
</script>

<style>
#typing {
  margin: auto;
  margin-top: 50px;
  width: 1000px;
}
</style>
