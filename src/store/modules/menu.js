const menu = {
	namespaced: true,
	state: {
		route: [
			{
				label: '首页',
				path: '/home',
				isRoute: true,
				icon: 'fa-home',
			},
			{
				label: '博客管理',
				path: '',
				isRoute: false,
				icon: 'fa-sliders',
				child: [
					{
						label: '文章管理',
						path: '/admin/articleManage',
						isRoute: true,
						icon: '',
					},
					{
						label: '添加文章',
						path: '/admin/addarticle',
						isRoute: true,
						icon: '',
					},
					{
						label: '文章类别管理',
						path: '/admin/articleClassifyManage',
						isRoute: true,
						icon: '',
					},
				],
			},
			{
				label: '站点个性化',
				path: '/admin/siteM',
				isRoute: true,
				icon: 'fa-cog',
			},
		],
	},

	getters: {
		route(state) {
			return state.route
		},
	},
	mutations: {},
	actions: {},
}
export default menu
