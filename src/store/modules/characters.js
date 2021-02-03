import Status from '../../enums/status'


const state = {
    // text: "Egyszer volt, hol nem volt, volt egyszer egy aranyos, kedves kislány, mindenki szerette, aki csak ismerte, de legjobban mégis a nagymamája. Azt se tudta mi jót adjon neki, mivel keresse kis unokája kedvét. Egyszer egy szép, piros bársonykabátot vett neki ajándékba, ami úgy tetszett a kislánynak, hogy mindig csak ezt hordta. El is nevezték róla Piroskának.",
    text: "Egyszer volt, hol nem volt, volt egyszer egy aranyos, kedves kislány, mindenki szerette, aki csak ismerte, de legjobban mégis a nagymamája. Azt se tudta mi jót adjon neki, mivel keresse kis unokája kedvét.",
    // text: "Egyszer volt, hol nem volt, volt egyszer egy aranyos, kedves kislány, mindenki szerette",
    // text: "al fél sakk lék lakk dél sas kas félj kélj éljfal faljlakk dél ék kék séf sék késs adj dal dala dada kaska kakas és a dada dala kél a fajdkakaska fél éljék kékké késés alj fék kék sasfélék késél dajka akad adjad a dajka dala kékké él salakja ajka dala adjasas kas sakk lék fal fél dél él kél ék kék falj adjad dadadala faj kakas kaska a1lakja kajak salak ajakkal kés él séf lék dél kél kajakja alakja salakkal ék fék",
    // text: "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100",
    characters: [],        // array of the text with placeholders
    currentCharacters: [], // array of currently displayed character
    currentPosition: 0,    // the position of the next character to be pressed in the currentCharacter array
    nextBatchPosition: 0,  // the position of the character in the characters array, that hasn't been loaded yet
    correct: 0,            // number of correct keypresses 
    keyPresses: 0          // number of keypresses
};

const getters = {
    allCharacters: state => state.currentCharacters,
    currentCharacter: state => state.currentPosition,
    correctCharacters: state => state.correct,
    getKeyPresses: state => state.keyPresses
};

const actions = {
    loadCharacters({ commit }) {
        if (state.characters.length !== 0) {
            return
        }

        let characters = []

        for (let i = 0; i < state.text.length; i++) {

            // if (characters.length < 7*20-1) { //DEBUG
            //     characters.push({
            //         id: i, 
            //         char: state.text[i],
            //         status: Status.CORRECT
            //     });
            // }
            // else { //DEBUG

            characters.push({
                char: state.text[i],
                status: Status.UNTOUCHED
            });

            // } // DEBUG
        }


        const regex = /[a-zA-ZöüóőúéáűíÖÜÓŐÚÉÁŰÍ]/
        for (let i = 20; i < characters.length; i += 20) {
            if (characters[i-1].char.match(regex) && characters[i].char.match(regex)) {
                console.log(characters[i-1].char + characters[i].char);
                let startIndex = i - 2;
                while (characters[startIndex].char === ' ') {
                    startIndex--;
                    if (startIndex % 20 === 0) {
                        break; //TODO skip
                    }
                }

                console.log(i-startIndex);

                for (let j = 0; j < i - startIndex; j++) {
                    characters.splice(startIndex, 0, {
                        char: '',
                        status: Status.PLACEHOLDER
                    });
                }
            }
        }

        for (let i = state.text.length; i < 8 * 20
             || characters.length % 20 != 0; i++) {
            characters.push({
                char: '',
                status: Status.PLACEHOLDER
            });
        }

        for (let i = 0; i < characters.length; i++) {
            characters[i].id = i;
        }

        characters[0].status = Status.NEXT;

        let currentCharacters = characters.slice(0, 8 * 20);

        commit('setCurrentCharacters', currentCharacters);
        commit('setNextBatchPosition', 8 * 20);
        commit('setCharacters', characters);
    },
    updateCurrentCharacters({ commit }) {
        console.log(state.characters.length);
        console.log(state.nextBatchPosition);
        let rowsToShift = (state.characters.length - state.nextBatchPosition) / 20
        rowsToShift = rowsToShift > 6 ? 6 : rowsToShift;
        console.log('rowsToShift');
        console.log(rowsToShift);

        let currentCharacters = state.currentCharacters;
        currentCharacters = currentCharacters.slice(rowsToShift * 20, currentCharacters.length);

        for (let i = state.nextBatchPosition; currentCharacters.length < 8 * 20; i++) {
            currentCharacters.push({
                id: i,
                char: state.characters[i].char,
                status: Status.UNTOUCHED
            })
        }
        commit('setCurrentPosition', state.currentPosition - rowsToShift * 20 );
        commit('setNextBatchPosition', state.nextBatchPosition + rowsToShift * 20);
        commit('setCurrentCharacters', currentCharacters);
    },
    keyPressed(context, key) {
        if (state.currentCharacters[state.currentPosition].char === key) {
            if (state.currentCharacters[state.currentPosition].status === Status.NEXT) {
                context.dispatch('updateStatus', { 
                    id: state.currentPosition, 
                    newStatus: Status.CORRECT 
                });
            }
            else {
                context.dispatch('updateStatus', { 
                    id: state.currentPosition, 
                    newStatus: Status.CORRECTED 
                });
            }

            if (state.currentPosition + 1 < state.currentCharacters.length) {
                context.dispatch('updateStatus', { 
                    id: state.currentPosition + 1, 
                    newStatus: Status.NEXT 
                });
            }

            context.dispatch('updateProgress');
        }
        else {
            context.dispatch('updateStatus', { 
                id: state.currentPosition, 
                newStatus: Status.MISSED 
            });
        }
        context.commit('incrementKeypresses');
    },
    updateStatus({ commit }, { id, newStatus }) {
        commit('setStatus', { id, newStatus });
    },
    updateProgress({ dispatch, commit }) {
        commit('incrementProgress');
        if (this.state.currentPosition === 7 * 20) {
            dispatch('updateCurrentCharacters');
        }
    },
    updateKeypresses({ commit }) {
        commit('incrementKeypresses');
    }
};

const mutations = {
    setCharacters: (state, characters) => (state.characters = characters),
    setCurrentCharacters: (state, currentCharacters) => (state.currentCharacters = currentCharacters),
    setStatus: (state, {id, newStatus}) => (state.currentCharacters[id].status = newStatus),
    incrementProgress: (state) => {
        state.currentPosition++;
        state.correct++;
    },
    setCurrentPosition: (state, currentPosition) => (state.currentPosition = currentPosition),
    setNextBatchPosition: (state, nextBatchPosition) => (state.nextBatchPosition = nextBatchPosition),
    incrementKeypresses: (state) => (state.keyPresses++)
};


export default {
    state,
    getters,
    actions,
    mutations
};