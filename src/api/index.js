import { request as axios } from '../util/request'
/**
 * @description 添加文章
 *
 * @returns
 */
export function addPost(data) {
	return axios({
		flag: 'addPost',
		url: '/api/addPost',
		method: 'POST',
		data,
	})
}
/**
 *更新
 * */ 
export function updatePost(data) {
	return axios({
		flag: 'updatePost',
		url: '/api/updatePost',
		method: 'POST',
		data,
	})
}
/**
 * 查询帖子
 */
export function getPost(params) {
	return axios({
		flag: 'getPost',
		url: '/api/queryPost',
		method: 'GET',
		params
	})
}
// 帖子列表
export function getPostList() {
	return axios({
		flag: 'getPostPist',
		url: '/api/postlist',
		method: 'GET',
	})
}
// 分类列表
export function getCategoryList() {
	return axios({
		flag: 'getCategoryList',
		url: '/api/categorylist',
		method: 'GET',
	})
}
/**
 * 标签列表
 */
export function getTagsList() {
	return axios({
		flag: 'getTagsList',
		url: '/api/tagslist',
		method: 'GET',
	})
}
/**
 * @description 得到配置数据
 *
 * @returns
 */
export function siteInit() {
	return axios({
		flag: 'siteInit',
		url: '/api/siteInit',
		method: 'GET',
	})
}
/**
 * @description 更新配置
 * 
 * @param {any} data 
 * @returns 
 */
export function upsite(data) {
	return axios({
		flag: 'upsite',
		url: '/api/upsite',
		method: 'POST',
		data,
	})
}
/**
 * @description 查询 ICON
 * 
 * @param {any} data 
 * @returns 
 */
export function queryIcon(data) {
	let app_id = 'M19DXW5X0Q'
	let api_key='c79b2e61519372a99fa5890db070064c'
	return axios({
		flag: 'queryIcon',
		url: `https://m19dxw5x0q-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.13.1&x-algolia-application-id=${app_id}&x-algolia-api-key=${api_key}`,
		method: 'POST',
		data: {
			requests: [
				{
					indexName: 'font_awesome',
					params: `query=${data||''}&page=2&facets=%5B%5D&tagFilters=`,
				},
			],
		},
	})
}
