const style = {
	namespaced: true,
	state: {
		head: {
			back_color: '#fff',
			active_back_color: '#e6e3e3',
			color: '#000',
			active_color: '#000',
		},
		sidebar: {
			back_color: '#ffffff',
			active_back_color: '',
			color: '#303133',
			active_color: '#409EFF',
		},
	},

	getters: {
		getSidebar(state) {
			return state.sidebar
		},
		getHead(state) {
			return state.head
		},
	},
	mutations: {
		sethead_back_color(state, color) {
			state.head.back_color = color
		},
		sethead_active_back_color(state, color) {
			state.head.active_back_color = color
		},
		sethead_color(state, color) {
			state.head.color = color
		},
		sethead_active_color(state, color) {
			state.head.active_color = color
		},
		setsidebar_back_color(state, color) {
			state.sidebar.back_color = color
		},
		setsidebar_active_back_color(state, color) {
			state.sidebar.active_back_color = color
		},
		setsidebar_color(state, color) {
			state.sidebar.color = color
		},
		setsidebar_active_color(state, color) {
			state.sidebar.active_color = color
		},
	},
	actions: {},
}
export default style
