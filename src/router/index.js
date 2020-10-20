import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/admin',
	},
	{
		path: '/admin',
		name: 'Admin',
		component: Admin,
		meta: {
			title: '后台管理',
			activityLoss: false,
		},
		children: [
			{
				path: 'articleManage',
				name: 'ArticleM',
				component: () => import('@/views/Admin/ArticleM.vue'),
				meta: {
					title: '文章管理',
				},
			},
			{
				path: 'addarticle',
				name: 'AddArticle',
				component: () => import('@/views/Admin/ArticleEdit.vue'),
				meta: {
					title: '添加文章',
					capacity: 'add',
				},
			},
			{
				path: 'articleEdit',
				name: 'ArticleEdit',
				component: () => import('@/views/Admin/ArticleEdit.vue'),
				meta: {
					title: '文章编辑',
					capacity: 'edit',
				},
			},
			{
				path: 'articleClassifyManage',
				name: 'ArticleClassifyM',
				component: () => import('@/views/Admin/ArticleClassifyM.vue'),
				meta: {
					title: '文章类别管理',
				},
			},
			{
				path: 'siteM',
				name: 'SiteM',
				component: () => import('@/views/Admin/SiteM.vue'),
				meta: {
					title: '站点个性化',
				},
			},
		],
	},
	{
		path: '/home',
		name: 'Home',
		component: ()=>import('@/views/Home.vue'),
		meta: {
			title: '首页',
			activityLoss: false,
		},
	}
]

const router = new VueRouter({
	routes,
})

export default router
