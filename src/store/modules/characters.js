import Status from '../../enums/status'


const state = {
    // text: "Egyszer volt, hol nem volt, volt egyszer egy aranyos, kedves kislány, mindenki szerette, aki csak ismerte, de legjobban mégis a nagymamája. Azt se tudta mi jót adjon neki, mivel keresse kis unokája kedvét. Egyszer egy szép, piros bársonykabátot vett neki ajándékba, ami úgy tetszett a kislánynak, hogy mindig csak ezt hordta. El is nevezték róla Piroskának.",
    text: "Egyszer volt, hol nem volt, volt egyszer egy aranyos, kedves kislány, mindenki szerette",
    // text: "al fél sakk lék lakk dél sas kas félj kélj éljfal faljlakk dél ék kék séf sék késs adj dal dala dada kaska kakas és a dada dala kél a fajdkakaska fél éljék kékké késés alj fék kék sasfélék késél dajka akad adjad a dajka dala kékké él salakja ajka dala adjasas kas sakk lék fal fél dél él kél ék kék falj adjad dadadala faj kakas kaska a1lakja kajak salak ajakkal kés él séf lék dél kél kajakja alakja salakkal ék fék",
    // text: "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100",
    characters: [],
    current: 0,
    correct: 0,
    keyPresses: 0
};

const getters = {
    allCharacters: state => state.characters,
    currnetCharacter: state => state.current,
    correctCharacters: state => state.correct,
    getKeyPresses: state => state.keyPresses
};

const actions = {
    loadCharacters({ commit }) {
        if (state.characters.length !== 0) {
            return
        }

        let characters = state.characters;
        let str = state.text;

        for (let i = 0; characters.length < 8 * 20; i++) {
            if ( i < str.length ) {
                characters.push({
                    id: i, 
                    char: str[i],
                    status: Status.UNTOUCHED
                });
            }
            else {
                characters.push({
                    id: i,
                    char: ' ',
                    state: Status.PLACEHOLDER
                });
            }
        }

        characters[0].status = Status.NEXT;

        commit('setCharacters', characters);
    },
    updateCharacters({ commit }) {
        let characters = state.characters;
        let str = state.text;

        if (characters.length > 7 * 20) {
            characters = characters.slice(6 * 20, characters.length);
        }

        for (let i = state.correct + 20; 
            i < str.length && characters.length < 8 * 20; i++) {
            characters.push({
                id: i, 
                char: str[i],
                status: Status.UNTOUCHED
            });
        }

        commit('decrementCurrent', characters);
        commit('setCharacters', characters);
    },
    keyPressed(context, key) {
        if (state.characters[state.current].char === key) {
            if (state.characters[state.current].status === Status.NEXT) {
                context.dispatch('updateStatus', { 
                    id: state.current, 
                    newStatus: Status.CORRECT 
                });
            }
            else {
                context.dispatch('updateStatus', { 
                    id: state.current, 
                    newStatus: Status.CORRECTED 
                });
            }

            if (state.current + 1 < state.characters.length) {
                context.dispatch('updateStatus', { 
                    id: state.current + 1, 
                    newStatus: Status.NEXT 
                });
            }

            context.dispatch('updateProgress');
        }
        else {
            context.dispatch('updateStatus', { 
                id: state.current, 
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
        if (this.state.current + 1 === 7 * 20 + 1) {
            dispatch('updateCharacters');
        }
    },
    updateKeypresses({ commit }) {
        commit('incrementKeypresses');
    }
};

const mutations = {
    setCharacters: (state, characters) => (state.characters = characters),
    setStatus: (state, {id, newStatus}) => (state.characters[id].status = newStatus),
    incrementProgress: (state) => {
        state.current++;
        state.correct++;
    },
    decrementCurrent: (state) => (state.current -= 6 * 20),
    incrementKeypresses: (state) => (state.keyPresses++)
};


export default {
    state,
    getters,
    actions,
    mutations
};