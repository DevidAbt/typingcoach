<template>
  <LetterContainer 
    v-bind:characters="characters" 
    />
</template>

<script>
import LetterContainer from './components/LetterContainer'

export default {
  name: 'App',
  components: {
    LetterContainer
  },
  data() {
    let str = "Egyszer volt, hol nem volt, volt egyszer egy aranyos, kedves kislány, mindenki szerette, aki csak ismerte, de legjobban mégis a nagymamája. Azt se tudta mi jót adjon neki, mivel keresse kis unokája kedvét. Egyszer egy szép, piros bársonykabátot vett neki ajándékba, ami úgy tetszett a kislánynak, hogy mindig csak ezt hordta. El is nevezték róla Piroskának.";
    let characters = [];
    for (let i = 0; i < str.length && i < 20*8; i++) {
      characters.push({
        id: i, 
        char: str[i],
        status: 'untouched'
      });
    }
    characters[0].status = 'next';
    return {
      characters: characters
    }
  },
  created() {
    window.addEventListener('keydown', this.keydown)
  },
  methods: {
    keydown: function ($event) {
      if ($event.key.match(/^[ a-zA-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ\-.,]$/)) {
        for (let i = 0; i < this.characters.length; i++) {
          if (!this.characters[i].status.startsWith('correct')) {
            if (this.characters[i].char === $event.key) {
              if (this.characters[i].status === 'next') {
                this.characters[i].status = 'correct';
              }
              else {
                this.characters[i].status = 'corrected';
              }

              if (i+1 < this.characters.length) {
                this.characters[i+1].status = 'next';
              }
            }
            else {
              this.characters[i].status = 'missed';
            }
            break;
          }
        }
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
