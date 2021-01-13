<template>
  <div 
    id="letter"
    v-bind:class="{ 
        correct: character.status === Status.CORRECT,
        missed: character.status === Status.MISSED,
        next: character.status === Status.NEXT,
        corrected: character.status === Status.CORRECTED,
    }"
    >
    {{character.char}}</div>
</template>

<script>
import Status from '../enums/status';

export default {
    name: 'Letter',
    props: ['character'],
    data() {
        return {
            Status
        };
    }
}
</script>

<style scoped>
#letter {
    border: 0.5px gray solid;
    display: inline-block;

    width: 48px;
    height: 48px;

    text-align: center;
    /* line-height: 250%; */
    font: 36px Arial bold;
    color: white;

    cursor: grabbing;
}
.correct {
    color: greenyellow !important;
    background-color: rgb(0, 231, 0, 0.2);
}
.missed {
    color: red !important;
    background-color: rgba(228, 0, 0, 0.2);
}
.next {
    background-color: rgba(0, 60, 255, 0.2);
}
.corrected {
    color: red !important;
    background-color: rgb(0, 231, 0, 0.2);
}
</style>