<template>
    <div id="progress" >
        <!-- {{ currnetCharacter }} / {{ getKeyPresses }} -->
        {{ getProgressString }}
    </div>
</template>

<script>
export default {
    name: 'Progress',
    computed: {
        getProgressString() {
            let current = this.$store.getters.currnetCharacter;
            let keyPresses = this.$store.getters.getKeyPresses;

            return `${current}/${keyPresses} ${Math.round(100*current/keyPresses)}%`;
        }
    },
    data() {
        // let presses = this.$store.getters.getKeyPresses;
        // console.log(presses);
        return {}
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
}
</style>