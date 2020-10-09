import { request as axios } from '../util/request'
/**
 * @description 得到站点初始化信息
 * 
 * @returns 
 */
export function siteInit() {
	return axios({
		flag: 'siteInit',
		url: '/api/site/init',
		method: 'GET',
	})
}
