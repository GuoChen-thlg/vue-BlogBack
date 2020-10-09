import Vue from 'vue'
import Vuex from 'vuex'
import style from './modules/style'
import menu from './modules/menu'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		style,
		menu,
	},
})
