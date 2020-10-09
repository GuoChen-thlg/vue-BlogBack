<template>
	<!-- 站点管理 -->
	<section class="site-m">
		<div class="control-panel">
			<el-menu default-active="1-4-1">
				<el-menu-item index="0">
					<el-button type="primary" size="small">保存</el-button>
				</el-menu-item>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>风格设置</span>
					</template>
					<el-submenu index="1-1">
						<template slot="title">头部样式设置</template>
						<el-menu-item index="1-1-1">
							<span class="label inline" title="站点头部背景颜色"
								>背景颜色</span
							>
							<el-color-picker
								v-model="previewConfigData.head.back_color"
							></el-color-picker>
						</el-menu-item>
						<el-menu-item index="1-1-2">
							<span class="label inline" title="标题背景颜色"
								>激活背景颜色</span
							>
							<el-color-picker
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
								action=" "
								:multiple="false"
								list-type="picture-card"
								:auto-upload="false"
								:limit="1"
								accept="image/png, image/jpeg"
								:on-change="headImgChange"
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
						<template slot="title">背景动画</template>
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
								action=" "
								:multiple="false"
								list-type="picture-card"
								:auto-upload="false"
								:limit="1"
								accept="image/png, image/jpeg"
								:on-change="siteImgChange"
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
						<template slot="title">字体选择</template>
						<el-menu-item index="1-1">
							<el-color-picker
								v-model="previewConfigData.color1"
							></el-color-picker>
						</el-menu-item>
					</el-menu-item-group>
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
				:style="previewStyle.previewWindow"
				:src="`${previewURL}?pattern=preview&time=${time}`"
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
	export default {
		name: 'SiteM',
		data() {
			return {
				watchPattern: 'desktop',
				previewStyle: {},
				previewURL: 'http://10.10.10.131:8081/',
				time: '',
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
					}
				},

			}
		},
		methods: {
			/**
			 * 向子窗口发送配置数据
			 */
			loaded() {
				this.$refs['previewIframe'].contentWindow.postMessage({
					type: 'previewPatternData',
					data: this.previewConfigData
				}, '*')
			},
			headImgChange(file, fileList) {
				urlToBase64(file.url).then(res => {
					this.previewConfigData.head.back_img = res
				})
			},
			headImgRemove(file, fileList) {
				this.previewConfigData.head.back_img = ''
			},
			siteImgChange(file, fileList) {
				urlToBase64(file.url).then(res => {
					this.previewConfigData.site.back_img = res
				})
			},
			siteImgRemove(file, fileList) {
				this.previewConfigData.site.back_img = ''
			},
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
				const iframeWindow = this.$refs['previewIframe'].contentWindow

				let userAgentProp = { get: function () { return userAgent; } };
				try {
					Object.defineProperty(window.navigator, 'userAgent', userAgentProp)
				} catch (e) {
					iframeWindow.navigator = Object.create(navigator, {
						userAgent: userAgentProp
					})
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
					this.time = new Date().getTime().toString()
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