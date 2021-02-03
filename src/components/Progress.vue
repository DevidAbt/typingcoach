<template>
    <div id="progress" >
        {{ getProgressString }}
    </div>
</template>

<script>
export default {
    name: 'Progress',
    computed: {
        getProgressString() {
            let correct = this.$store.getters.correctCharacters;
            let keyPresses = this.$store.getters.getKeyPresses;

            if (keyPresses === 0) {
                return `${correct}/${keyPresses} 0%`;
            }
            else {
                return `${correct}/${keyPresses} ${Math.round(100*correct/keyPresses)}%`;
            }
        }
    }
}
</script>

<style scoped>
#progress {
    font: 30px Arial bold;
    color: white;
    border: 1px solid white;
    width: 200px;
    height: 54px;
    text-align: center;
    padding-top: 2%;
    margin: auto;
}
</style>