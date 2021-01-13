import Vuex from 'vuex'
// import Vue from 'vue'
import characters from './modules/characters'

// Vue.use(Vuex);

// export default new Vuex.Store({
//     modules: {
//         characters
//     }
// });

export default Vuex.createStore(characters);