import Status from '../../enums/status'


const state = {
    characters: [],
    current: 0,
    keyPresses: 0
};

const getters = {
    allCharacters: state => state.characters,
    currnetCharacter: state => state.current,
    getKeyPresses: state => state.keyPresses
};

const actions = {
    loadCharacters({ commit }) {
        let str = "Egyszer volt, hol nem volt, volt egyszer egy aranyos, kedves kislány, mindenki szerette, aki csak ismerte, de legjobban mégis a nagymamája. Azt se tudta mi jót adjon neki, mivel keresse kis unokája kedvét. Egyszer egy szép, piros bársonykabátot vett neki ajándékba, ami úgy tetszett a kislánynak, hogy mindig csak ezt hordta. El is nevezték róla Piroskának.";
        let characters = [];
        for (let i = 0; i < str.length && i < 20*8; i++) {
            characters.push({
                id: i, 
                char: str[i],
                status: Status.UNTOUCHED
            });
        }
        characters[0].status = Status.NEXT;
        
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

            if (state.current+1 < state.characters.length) {
                context.dispatch('updateStatus', { 
                    id: state.current+1, 
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

        context.dispatch('updateKeypresses');
    },
    updateStatus({ commit }, { id, newStatus }) {
        commit('setStatus', { id, newStatus });
    },
    updateProgress({ commit }) {
        commit('incrementCurrent');
    },
    updateKeypresses({ commit }) {
        commit('incrementKeypresses');
    }
};

const mutations = {
    setCharacters: (state, characters) => (state.characters = characters),
    setStatus: (state, {id, newStatus}) => (state.characters[id].status = newStatus),
    incrementCurrent: (state) => (state.current++),
    incrementKeypresses: (state) => (state.keyPresses++)
};


export default {
    state,
    getters,
    actions,
    mutations
};