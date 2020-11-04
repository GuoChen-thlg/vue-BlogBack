<template>
	<!-- 站点管理 -->
	<section class="site-m">
		<div class="control-panel">
			<el-menu default-active="2-2-0">
				<el-menu-item index="0">
					<el-button type="primary" size="small" @click="save">保存</el-button>
				</el-menu-item>
				<el-submenu index="1">
					<template slot="title">
						<i class="fa-street-view fa"></i>
						<span>风格设置</span>
					</template>
					<el-submenu index="1-1">
						<template slot="title">头部样式设置</template>
						<el-menu-item index="1-1-1">
							<span class="label inline" title="站点头部背景颜色">
								背景颜色
							</span>
							<el-color-picker
								show-alpha
								v-model="previewConfigData.head.back_color"
							></el-color-picker>
						</el-menu-item>
						<el-menu-item index="1-1-2">
							<span class="label inline" title="标题背景颜色">
								激活背景颜色
								</span>
							<el-color-picker
								show-alpha
								v-model="previewConfigData.head.active_back_color"
							></el-color-picker>
						</el-menu-item>
						<el-menu-item index="1-1-3">
							<span class="label inline">字体颜色</span>
							<el-color-picker
								v-model="previewConfigData.head.color"
							></el-color-picker>
						</el-menu-item>
						<el-menu-item index="1-1-4">
							<span class="label inline">激活字体颜色</span>
							<el-color-picker
								v-model="previewConfigData.head.active_color"
							></el-color-picker>
						</el-menu-item>
						<el-menu-item index="1-1-5">
							<span class="label inline">显示背景图片</span>
							<el-checkbox
								v-model="previewConfigData.head.isShow"
							></el-checkbox>
						</el-menu-item>
						<el-menu-item index="1-1-6" style="height: 150px">
							<span class="label inline">背景图片</span>
							<el-upload
								class="image-upload"
								action="http://localhost:3000/api/upload/siteHeadImg"
								:multiple="false"
								list-type="picture-card"
								:limit="1"
								accept="image/png, image/jpeg"
								:on-success="headImgSuccess"
								:before-remove="headImgRemove"
							>
								<i slot="default" class="el-icon-plus"></i>
							</el-upload>
						</el-menu-item>
					</el-submenu>
					<el-submenu index="1-2">
						<template slot="title">侧边栏样式设置</template>
						<el-menu-item index="1-2-1">
							<span class="label inline">背景颜色</span>
							<el-color-picker
								v-model="previewConfigData.sidebar.back_color"
							></el-color-picker>
						</el-menu-item>
						<el-menu-item index="1-2-2">
							<span class="label inline">激活背景颜色</span>
							<el-color-picker
								v-model="previewConfigData.sidebar.active_back_color"
							></el-color-picker>
						</el-menu-item>
						<el-menu-item index="1-2-3">
							<span class="label inline">主要字体颜色</span>
							<el-color-picker
								v-model="previewConfigData.sidebar.main_color"
							></el-color-picker>
						</el-menu-item>
						<el-menu-item index="1-2-4">
							<span class="label inline">激活主要字体颜色</span>
							<el-color-picker
								v-model="previewConfigData.sidebar.active_main_color"
							></el-color-picker>
						</el-menu-item>
						<el-menu-item index="1-2-5">
							<span class="label inline">次要字体颜色</span>
							<el-color-picker
								v-model="previewConfigData.sidebar.minor_color"
							></el-color-picker>
						</el-menu-item>
						<el-menu-item index="1-2-6">
							<span class="label inline">激活次要字体颜色</span>
							<el-color-picker
								v-model="previewConfigData.sidebar.active_minor_color"
							></el-color-picker>
						</el-menu-item>
					</el-submenu>
					<el-submenu index="1-3">
						<template slot="title">L2D widget</template>
						<el-menu-item index="1-3-1">
							<span class="label inline">显示</span>
							<el-checkbox
								v-model="previewConfigData.L2Dwidget.isRender"
							></el-checkbox>
						</el-menu-item>
						<el-menu-item
							index="1-3-2"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label">选择模板</span>
							<el-select
								v-model="previewConfigData.L2Dwidget.modelName"
								placeholder="请选择"
								style="width: 140px"
							>
								<el-option
									v-for="item in L2DwidgetModel"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								>
								</el-option>
							</el-select>
						</el-menu-item>
						<el-menu-item
							index="1-3-3"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label inline">标签模式</span>
							<el-checkbox
								v-model="previewConfigData.L2Dwidget.tagMode"
							></el-checkbox>
						</el-menu-item>
						<el-menu-item
							index="1-3-4"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label inline">调试</span>
							<el-checkbox
								v-model="previewConfigData.L2Dwidget.debug"
							></el-checkbox>
						</el-menu-item>
						<el-menu-item
							index="1-3-5"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label inline">日志</span>
							<el-checkbox
								v-model="previewConfigData.L2Dwidget.log"
							></el-checkbox>
						</el-menu-item>
						<el-menu-item
							index="1-3-6"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label">模型缩放</span>
							<el-input
								style="width: 140px"
								min="0"
								step="0.01"
								type="number"
								v-model.number="previewConfigData.L2Dwidget.model.scale"
								placeholder="请输入内容"
							></el-input>
						</el-menu-item>
						<el-menu-item
							index="1-3-7"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label">超级采样</span>
							<el-input
								style="width: 140px"
								type="number"
								v-model.number="previewConfigData.L2Dwidget.display.superSample"
								placeholder=""
							></el-input>
						</el-menu-item>
						<el-menu-item
							index="1-3-8"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label inline" style="width: 56px">位置</span>
							<el-select
								v-model="previewConfigData.L2Dwidget.display.position"
								placeholder="请选择"
								style="width: 140px"
							>
								<el-option key="1" label="left" value="left"></el-option>
								<el-option key="2" label="right" value="right"></el-option>
							</el-select>
						</el-menu-item>
						<el-menu-item
							index="1-3-9"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label inline" style="width: 56px">画布宽</span>
							<el-input
								style="width: 140px"
								type="number"
								v-model.number="previewConfigData.L2Dwidget.display.width"
								placeholder="请输入内容"
							></el-input>
						</el-menu-item>
						<el-menu-item
							index="1-3-10"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label inline" style="width: 56px">画布高</span>
							<el-input
								style="width: 140px"
								type="number"
								v-model.number="previewConfigData.L2Dwidget.display.height"
								placeholder="请输入内容"
							></el-input>
						</el-menu-item>
						<el-menu-item
							index="1-3-11"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label">水平偏移</span>
							<el-input
								style="width: 140px"
								type="number"
								v-model.number="previewConfigData.L2Dwidget.display.hOffset"
								placeholder="请输入内容"
							></el-input>
						</el-menu-item>
						<el-menu-item
							index="1-3-12"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label">垂直偏移</span>
							<el-input
								style="width: 140px"
								type="number"
								v-model.number="previewConfigData.L2Dwidget.display.vOffset"
								placeholder="请输入内容"
							></el-input>
						</el-menu-item>
						<el-menu-item
							index="1-3-13"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label inline" style="width: 56px">透明度</span>
							<el-input
								style="width: 140px"
								step="0.01"
								type="number"
								min="0"
								max="1"
								v-model.number="
									previewConfigData.L2Dwidget.react.opacityDefault
								"
								placeholder="透明度"
							></el-input>
						</el-menu-item>
						<el-menu-item
							index="1-3-14"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label">鼠标悬浮</span>
							<el-input
								style="width: 140px"
								step="0.01"
								type="number"
								min="0"
								max="1"
								v-model.number="
									previewConfigData.L2Dwidget.react.opacityOnHover
								"
								placeholder="透明度"
							></el-input>
						</el-menu-item>
						<el-menu-item
							index="1-3-15"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label inline">显示边界</span>
							<el-checkbox
								v-model="previewConfigData.L2Dwidget.dev.border"
							></el-checkbox>
						</el-menu-item>
						<el-menu-item
							index="1-3-16"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label inline">显示对话框</span>
							<el-checkbox
								v-model="previewConfigData.L2Dwidget.dialog.enable"
							></el-checkbox>
						</el-menu-item>
						<el-menu-item
							index="1-3-17"
							:disabled="!previewConfigData.L2Dwidget.isRender"
						>
							<span class="label inline">使用一言API</span>
							<el-checkbox
								v-model="previewConfigData.L2Dwidget.dialog.hitokoto"
							></el-checkbox>
						</el-menu-item>
						<el-menu-item-group>
							<template slot="title">移动端</template>
							<el-menu-item
								index="1-3-18"
								:disabled="!previewConfigData.L2Dwidget.isRender"
							>
								<span class="label inline">显示</span>
								<el-checkbox
									v-model="previewConfigData.L2Dwidget.mobile.show"
								></el-checkbox>
							</el-menu-item>
							<el-menu-item
								index="1-3-19"
								:disabled="!previewConfigData.L2Dwidget.isRender"
							>
								<span class="label inline">重力感应</span>
								<el-checkbox
									v-model="previewConfigData.L2Dwidget.mobile.motion"
								></el-checkbox>
							</el-menu-item>
							<el-menu-item
								index="1-3-20"
								:disabled="!previewConfigData.L2Dwidget.isRender"
							>
								<span class="label inline" style="width: 56px">缩放</span>
								<el-input
									style="width: 140px"
									min="0"
									step="0.01"
									type="number"
									v-model.number="previewConfigData.L2Dwidget.model.scale"
									placeholder="请输入内容"
								></el-input>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="1-4">
						<template slot="title">背景粒子</template>
						<el-menu-item index="1-4-1">
							<span class="label inline">显示</span>
							<el-checkbox
								v-model="previewConfigData.CanvasNest.isShow"
							></el-checkbox>
						</el-menu-item>

						<el-menu-item
							index="1-4-2"
							:disabled="!previewConfigData.CanvasNest.isShow"
						>
							<span class="label inline">颜色</span>
							<el-color-picker
								v-model="previewConfigData.CanvasNest.color"
								color-format="rgb"
							></el-color-picker>
						</el-menu-item>

						<el-menu-item
							index="1-4-3"
							:disabled="!previewConfigData.CanvasNest.isShow"
						>
							<span class="label inline" style="width: 56px">透明度</span>
							<el-input
								style="width: 140px"
								step="0.01"
								type="number"
								min="0"
								max="1"
								v-model.number="previewConfigData.CanvasNest.opacity"
								placeholder="透明度"
							></el-input>
						</el-menu-item>

						<el-menu-item
							index="1-4-4"
							:disabled="!previewConfigData.CanvasNest.isShow"
						>
							<span class="label inline" style="width: 56px">层叠值</span>
							<el-input
								style="width: 140px"
								type="number"
								v-model.number="previewConfigData.CanvasNest.zIndex"
								placeholder="层叠值"
							></el-input>
						</el-menu-item>
						<el-menu-item
							index="1-4-5"
							:disabled="!previewConfigData.CanvasNest.isShow"
						>
							<span class="label inline" style="width: 56px">数量</span>
							<el-input
								style="width: 140px"
								type="number"
								v-model.number="previewConfigData.CanvasNest.count"
								placeholder="数量"
							></el-input>
						</el-menu-item>
					</el-submenu>
					<el-menu-item-group>
						<template slot="title">站点背景设置</template>
						<el-menu-item index="1-5">
							<span class="label inline">颜色</span>
							<el-color-picker
								v-model="previewConfigData.site.back_color"
							></el-color-picker>
						</el-menu-item>
						<el-menu-item index="1-6">
							<span class="label inline">显示背景图片</span>
							<el-checkbox
								v-model="previewConfigData.site.isShow"
							></el-checkbox>
						</el-menu-item>
						<el-menu-item index="1-7" style="height: 150px">
							<span class="label inline">背景图片</span>
							<el-upload
								class="image-upload"
								action="http://localhost:3000/api/upload/siteBackImg"
								:multiple="false"
								list-type="picture-card"
								:limit="1"
								accept="image/png, image/jpeg"
								:on-success="siteImgSuccess"
								:before-remove="siteImgRemove"
							>
								<i slot="default" class="el-icon-plus"></i>
							</el-upload>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>站点设置</span>
					</template>
					<el-menu-item-group>
						<template slot="title">域名</template>
						<el-menu-item index="2-1-2" style="height: auto">
							<el-input
								type="text"
								v-model="previewConfigData.site.previewURL"
							></el-input>
						</el-menu-item>
					</el-menu-item-group>

					<el-submenu index="2-1">
						<template slot="title">站点作者</template>
						<el-menu-item-group>
							<template slot="title">作者名 | 站点名</template>
							<el-menu-item index="2-1-1">
								<el-input v-model="previewConfigData.author.name"></el-input>
							</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<template slot="title">副标题</template>
							<el-menu-item index="2-1-1">
								<el-input
									v-model="previewConfigData.author.subtitle"
								></el-input>
							</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<template slot="title">描述</template>
							<el-menu-item index="2-1-2" style="height: auto">
								<el-input
									type="textarea"
									:rows="2"
									v-model="previewConfigData.author.description"
								></el-input>
							</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<template slot="title">头像</template>
							<el-menu-item index="2-1-3" style="height: 100px">
								<el-upload
									class="image-upload"
									action="http://localhost:3000/api/upload/authorHeadImg"
									:multiple="false"
									list-type="picture-card"
									:limit="1"
									accept="image/png, image/jpeg"
									:on-success="authorImageSuccess"
									:before-remove="authorImgRemove"
								>
									<i slot="default" class="el-icon-plus"></i>
								</el-upload>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2-2">
						<template slot="title">友链</template>
						<template v-for="(item, index) in previewConfigData.blogrolllist">
							<el-submenu :key="index" :index="`2-2-${index}`">
								<template slot="title">{{ item.label }}</template>
								<el-menu-item :index="`2-2-${index}-1`" style="height: auto">
									<div>
										<span style="position: absolute; left: 20px">名称：</span
										><el-input
											v-model="previewConfigData.blogrolllist[index].label"
										></el-input>
									</div>
									<div>
										<span style="position: absolute; left: 20px">URL：</span
										><el-input
											v-model="previewConfigData.blogrolllist[index].path"
										></el-input>
									</div>
									<center @click="removeBlogrolllist(index)">删除</center>
								</el-menu-item>
							</el-submenu>
						</template>
						<el-menu-item index="2-2-*"
							><center @click="addblogroll">添加</center></el-menu-item
						>
					</el-submenu>
					<el-submenu index="2-3">
						<template slot="title">第三方链接</template>
						<template v-for="(item, index) in previewConfigData.links">
							<el-submenu :key="index" :index="`2-3-${index}`">
								<template slot="title">{{ item.label }}</template>
								<el-menu-item :index="`2-3-${index}-1`" style="height: auto">
									<div>
										<span style="position: absolute; left: 20px">Icon:</span>
										<el-select
											v-model="previewConfigData.links[index]['icon-class']"
											filterable
											remote
											reserve-keyword
											placeholder="(https://fontawesome.com/v4.7.0/icons/)请输入图标 Class"
											:remote-method="queryIconFun"
											:loading="loading"
										>
											<el-option
												v-for="(item, index) in iconList"
												:key="index"
												:label="item.name"
												:value="item.css_class"
											>
												<i :class="`fa ${item.css_class}`"></i> {{ item.name }}
											</el-option>
										</el-select>
									</div>
									<div>
										<span style="position: absolute; left: 20px">名称：</span
										><el-input
											v-model="previewConfigData.links[index].label"
										></el-input>
									</div>
									<div>
										<span style="position: absolute; left: 20px">URL：</span
										><el-input
											v-model="previewConfigData.links[index].path"
										></el-input>
									</div>
									<center @click="removelinks(index)">删除</center>
								</el-menu-item>
							</el-submenu>
						</template>
						<el-menu-item index="2-3-*">
							<center @click="addlinks">添加</center></el-menu-item
						>
					</el-submenu>
					<el-submenu index="2-4">
						<template slot="title">版权声明</template>
						<el-menu-item-group>
							<template slot="title">协议</template>
							<el-menu-item index="2-4-1">
								<el-input v-model="previewConfigData.license.title"></el-input>
							</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<template slot="title">链接</template>
							<el-menu-item index="2-4-2">
								<el-input v-model="previewConfigData.license.url"></el-input>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="fa-wrench fa"></i>
						<span>功能设置</span>
					</template>
					<el-submenu index="3-1">
						<template slot="title">
							<span>搜索</span>
						</template>
						<el-menu-item index="3-1-1">
							<span class="label inline">开启搜索</span>
							<el-checkbox v-model="previewConfigData.isSearch"></el-checkbox>
						</el-menu-item>
					</el-submenu>
				</el-submenu>
			</el-menu>
		</div>
		<div class="preview" :style="previewStyle.previewBox">
			<div class="mode-control">
				<span @click="mobile" :class="{ active: watchPattern == 'mobile' }"
					><i class="fa fa-mobile" aria-hidden="true"></i
				></span>
				<span @click="desktop" :class="{ active: watchPattern == 'desktop' }"
					><i class="fa fa-desktop" aria-hidden="true"></i
				></span>
				<span
					@click="fullScreen"
					:class="{ active: watchPattern == 'fullScreen' }"
					><i class="fa fa-arrows-h" aria-hidden="true"></i
				></span>
			</div>
			<iframe
				v-if="flag"
				:style="previewStyle.previewWindow"
				:src="`${previewConfigData.site.previewURL}/#/?pattern=preview`"
				frameborder="0"
				@load="loaded"
				ref="previewIframe"
			>
			</iframe>
		</div>
	</section>
</template>

<script>
	import urlToBase64 from '@/util/imageProcess.js'
	import { siteInit, upsite, queryIcon } from '@/api'
	export default {
		name: 'SiteM',
		data() {
			return {
				watchPattern: 'desktop',
				previewStyle: {},
				flag: true,
				loading: false,
				iconList: [],
				L2DwidgetModel: [
					{
						label: 'chitose',
						value: 'chitose'
					},
					{
						label: 'Epsilon2.1',
						value: 'Epsilon2.1'
					},
					{
						label: 'Gantzert_Felixander',
						value: 'Gantzert_Felixander'
					},
					{
						label: 'haru01',
						value: 'haru01'
					},
					{
						label: 'haru02',
						value: 'haru02'
					},
					{
						label: 'haruto',
						value: 'haruto'
					},
					{
						label: 'hibiki',
						value: 'hibiki'
					},
					{
						label: 'hijiki',
						value: 'hijiki'
					}, {
						label: 'izumi',
						value: 'izumi'
					},
					{
						label: 'koharu',
						value: 'koharu'
					},
					{
						label: 'miku',
						value: 'miku'
					},

					{
						label: 'ni-j',
						value: 'ni-j'
					},
					{
						label: 'nico',
						value: 'nico'
					},
					{
						label: 'nietzsche',
						value: 'nietzsche'
					},
					{
						label: 'nipsilon',
						value: 'nipsilon'
					}, {
						label: 'nito',
						value: 'nito'
					},
					{
						label: 'shizuku',
						value: 'shizuku'
					},
					{
						label: 'tororo',
						value: 'tororo'
					},
					{
						label: 'tsumiki',
						value: 'tsumiki'
					},
					{
						label: 'unitychan',
						value: 'unitychan'
					},
					{
						label: 'wanko',
						value: 'wanko'
					},
					{
						label: 'z16',
						value: 'z16'
					},
				],
				previewConfigData: {
					head: {
						back_color: '#fafafa',
						active_back_color: '#fafafa',
						isShow: true,
						back_img: '',
						color: '#555',
						active_color: '#555',
					},
					sidebar: {
						back_color: '#ffffff',
						active_back_color: '',
						main_color: '#303133',
						active_main_color: '#409EFF',
						minor_color: '',
						active_minor_color: '',
					},
					L2Dwidget: {
						isRender: true,
						modelName: 'koharu',
						pluginModelPath: '/live2d-widget-model-koharu/assets/', //模型文件相对与插件根目录路径 live2d-widget-model-nico/assets/
						tagMode: false, //标签模式
						debug: false, //调试, 是否在控制台输出日志
						model: {
							jsonPath: '/live2dw/live2d-widget-model-koharu/assets/koharu.model.json', //主文件路径 /live2dw/live2d-widget-model-nico/assets/nico.model.json
							scale: 1, //模型与canvas的缩放
						},
						display: {
							superSample: 2, // 超采样等级
							position: 'right',
							width: 150,
							height: 300,
							hOffset: -20, //canvas水平偏移
							vOffset: -40, //canvas垂直偏移
						},
						react: {
							//透明度条件
							opacityDefault: 1, //默认透明度
							opacityOnHover: 0.5, //鼠标移上透明度
						},
						dev: {
							border: false, //在canvas周围显示边界
						},
						mobile: {
							show: true, //是否在移动设备上显示
							scale: 0.5, //移动设备上的缩放
							motion: true, // 移动设备是否开启重力感应
						},
						log: true,
						dialog: {
							enable: false, //显示人物对话框
							hitokoto: false, //使用一言API
						},
					},
					CanvasNest: {
						isShow: true,
						color: 'rgb(0,0,255)',
						opacity: 0.7,
						zIndex: -1,
						count: 99,
					},
					site: {
						back_color: '#eeeeee',
						isShow: true,
						back_img: '',
						previewURL: ''
					},
					author: {},
					statistics: {},
					links: [],
					rewardQR: [],
					blogrolllist: [],
					license: {
						title: '',
						url: ''
					},
					isSearch: false,
				},

			}
		},
		mounted() {
			this.getConfig()
		},
		methods: {
			queryIconFun(className) {
				this.loading = true;
				queryIcon(className).then(res => {
					if (res && res.results) {
						this.iconList = res.results[0]['hits']
						console.log(this.iconList)
					}
					this.loading = false
				})
			},
			save() {
				upsite(this.previewConfigData).then(res => {
					if (res.code == 200) {
						this.$message.success('修改成功')
					} else {
						this.$message.error('修改失败')
					}
				})
			},
			getConfig() {
				siteInit().then(res => {
					if (res.code === 200) {
						let data = res.data
						this.previewConfigData = {
							head: {
								back_color: data.head.back_color,
								active_back_color: data.head.active_back_color,
								isShow: data.head.isShow,
								back_img: data.head.back_img,
								color: data.head.color,
								active_color: data.head.active_color,
							},
							sidebar: {
								back_color: data.sidebar.back_color,
								active_back_color: data.sidebar.active_back_color,
								main_color: data.sidebar.main_color,
								active_main_color: data.sidebar.active_main_color,
								minor_color: data.sidebar.minor_color,
								active_minor_color: data.sidebar.active_minor_color,
							},
							L2Dwidget: {
								isRender: data.L2Dwidget.isRender,
								modelName: data.L2Dwidget.modelName,
								pluginModelPath: '/live2d-widget-model-koharu/assets/', //模型文件相对与插件根目录路径 live2d-widget-model-nico/assets/
								tagMode: data.L2Dwidget.tagMode, //标签模式
								debug: data.L2Dwidget.debug, //调试, 是否在控制台输出日志
								model: {
									jsonPath:
										'/live2dw/live2d-widget-model-koharu/assets/koharu.model.json', //主文件路径 /live2dw/live2d-widget-model-nico/assets/nico.model.json
									scale: data.L2Dwidget.model.scale, //模型与canvas的缩放
								},
								display: {
									superSample: data.L2Dwidget.display.superSample, // 超采样等级
									position: data.L2Dwidget.display.position,
									width: data.L2Dwidget.display.width,
									height: data.L2Dwidget.display.height,
									hOffset: data.L2Dwidget.display.hOffset, //canvas水平偏移
									vOffset: data.L2Dwidget.display.vOffset, //canvas垂直偏移
								},
								react: {
									//透明度条件
									opacityDefault: data.L2Dwidget.react.opacityDefault, //默认透明度
									opacityOnHover: data.L2Dwidget.react.opacityOnHover, //鼠标移上透明度
								},
								dev: {
									border: data.L2Dwidget.dev.border, //在canvas周围显示边界
								},
								mobile: {
									show: data.L2Dwidget.mobile.show, //是否在移动设备上显示
									scale: data.L2Dwidget.mobile.scale, //移动设备上的缩放
									motion: data.L2Dwidget.mobile.motion, // 移动设备是否开启重力感应
								},
								log: data.L2Dwidget.log,
								dialog: {
									enable: data.L2Dwidget.dialog.enable, //显示人物对话框
									hitokoto: data.L2Dwidget.dialog.hitokoto, //使用一言API
								},
							},
							CanvasNest: {
								isShow: data.CanvasNest.isShow,
								color: data.CanvasNest.color1,
								color2: data.CanvasNest.color2,
								opacity: data.CanvasNest.opacity,
								zIndex: data.CanvasNest.zIndex,
								count: data.CanvasNest.count,
							},
							site: {
								back_color: data.site.back_color,
								isShow: data.site.isShow,
								back_img: data.site.back_img,
								copyrightYear: '2020',
								detailDate: '03/20/2020 00:00:00',
								previewURL: data.site.previewURL
							},
							author: { ...data.author },
							links: data.links,
							rewardQR: data.rewardQR,
							blogrolllist: data.blogrolllist,
							statistics: data.statistics,
							license: data.license,
							isSearch: data.isSearch
						}
					}
				})
			},
			addblogroll() { this.previewConfigData.blogrolllist.push({ path: 'https://github.com/GuoChen-thlg', label: '默认友链' }) },
			removeBlogrolllist(index) { this.previewConfigData.blogrolllist.splice(index, 1) },
			addlinks() { this.previewConfigData.links.push({ 'icon-class': 'fa-fw fa-github', path: 'https://github.com/GuoChen-thlg', label: '第三链' }) },
			removelinks(index) { this.previewConfigData.links.splice(index, 1) },
			/**
			 * 向子窗口发送配置数据
			 */
			loaded() {
				this.$refs['previewIframe'].contentWindow.postMessage({
					type: 'previewPatternData',
					data: this.previewConfigData
				}, '*')
			},
			authorImageSuccess(res, file) {
				if (res.code == 200) {
					this.previewConfigData.author.image = 'http://localhost:3000/image/authorHeadImg.jpg'
					this.$message.success('上传成功')
				} else {
					this.$message.error('上传失败')
				}
			},
			authorImgRemove() {
				this.previewConfigData.author.image = ''
			},
			headImgSuccess(res, file) {
				if (res.code == 200) {
					this.previewConfigData.head.back_img = 'http://localhost:3000/image/siteHeadImg.jpg'
					this.$message.success('上传成功')
				} else {
					this.$message.error('上传失败')
				}
			},
			headImgRemove() { this.previewConfigData.head.back_img = '' },
			siteImgSuccess(res, file) {
				if (res.code == 200) {
					this.previewConfigData.site.back_img = 'http://localhost:3000/image/siteBackImg.jpg'
					this.$message.success('上传成功')
				} else {
					this.$message.error('上传失败')
				}
			},
			siteImgRemove() { this.previewConfigData.site.back_img = '' },
			/**
			 * 移动端
			 */
			mobile() {
				this.active_pattern('mobile')
				this.previewStyle = {
					previewBox: {
						position: 'relative'
					},
					previewWindow: {
						width: '385px',
						height: '667px',
						position: 'absolute',
						left: '50%',
						transform: 'translateX(-50%)',
					}
				}
			},
			/**
			 * 桌面
			 */
			desktop() {
				this.previewStyle = {}
				this.active_pattern('desktop')
			},
			/**
			 * 全屏
			 */
			fullScreen() {
				this.active_pattern('fullScreen')
				this.previewStyle = {
					previewBox: {
						position: 'fixed',
						width: '100%',
						height: ' 100vh',
					},
					previewWindow: {}
				}
			},
			active_pattern(pattern) {
				this.watchPattern = pattern
			}
		},
		watch: {
			'previewConfigData': {
				handler: function () {
					this.flag = false
					setTimeout(() => { this.flag = true }, 1)
				},
				deep: true
			}
		}
	}
</script>

<style lang='scss'>
	.site-m {
		display: flex;
		.control-panel {
			width: 300px;
			min-height: 90vh;
			height: 80vh;
			overflow-y: auto;
			.el-button {
				float: right;
				margin: 12px;
			}
			.label {
				margin-right: 10px;
			}
			.label.inline {
				display: inline-block;
				width: 60%;
			}
			.image-upload {
				.el-upload-list--picture-card .el-upload-list__item,
				.el-upload--picture-card {
					width: 95px;
					height: 95px;
					line-height: 95px;
				}
			}
		}
		.preview {
			flex-grow: 1;
			background-color: #eef0f2;
			overflow-y: hidden;
			padding: 3px;
			min-height: 85vh;
			left: 0;
			top: 0;
			.mode-control {
				height: 30px;
				display: flex;
				justify-content: center;
				align-content: center;
				span {
					display: inline-block;
					cursor: pointer;
					padding: 0 10px;
					height: 100%;
					.fa-mobile {
						font-size: 32px;
					}
					.fa-desktop {
						padding-top: 3px;
						font-size: 23px;
					}
					.fa-arrows-h {
						font-size: 30px;
					}
				}
				.active {
					color: #409eff;
				}
			}
			iframe {
				width: 100%;
				height: calc(100% - 30px);
			}
		}
	}
</style>