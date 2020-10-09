<template>
	<!-- 文章管理模块 -->
	<section>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column type="expand">
				<template v-slot="props">
					<el-form label-position="left" class="demo-table-expand">
						<el-col :span="12">
							<el-form-item label="分类：">
								<span>
									<template
										v-for="(classify, index) in props.row.meta.classify.value"
									>
										&nbsp;&nbsp;<el-tag type="success" :key="index">{{
											classify.value
										}}</el-tag>
									</template>
								</span>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="浏览量：">
								<span>{{ props.row.meta.heat.value }}</span>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="标签：">
								<span>
									<template
										v-for="(label, index) in props.row.meta.label.value"
									>
										&nbsp;&nbsp;<el-tag type="info" :key="index">{{
											label.value
										}}</el-tag>
									</template>
								</span>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="评论：">
								<span>{{ props.row.meta.comment.value }}</span>
							</el-form-item>
						</el-col>
                        <el-col :span="12">
						<el-form-item label="封面：">
							<span>{{ props.row.address }}</span>
						</el-form-item>
                        </el-col>
                        <el-col :span="12">
						<el-form-item label="简介：">
							<span>{{ props.row.digest }}</span>
						</el-form-item>
                        </el-col>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="标题" prop="title"> </el-table-column>
			<el-table-column label="发布时间" sortable prop="meta.firstDate.value">
			</el-table-column>
			<el-table-column label="状态"   width="120" prop="desc"> </el-table-column>
			<el-table-column label="设为精选" width="80" prop="desc">
				<template>
					<el-rate :max="1" @change="sele" />
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" prop="desc">
				<template v-slot="{ row }"
					>{{ row.id }}
					<el-button-group>
						<el-button
							type="primary"
							title="编辑"
							size="mini"
							icon="el-icon-edit"
						></el-button>
						<el-button
							type="danger"
							title="删除"
							size="mini"
							icon="el-icon-delete"
						></el-button>
					</el-button-group>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	export default {
		name: 'ArticleM',
		data() {
			return {
				tableData: [{
					title: '测试文章',
					meta: {
						firstDate: {
							'icon-class': 'fa fa-calendar-o',
							label: '发表于',
							value: '2020-09-22'
						},

						lastDate: {
							'icon-class': '',
							label: '',
							value: '2020-09-22'
						},
						classify: {
							'icon-class': 'fa fa-folder-o',
							label: '分类于',
							value: [{
								path: '/categories/Test',
								value: 'Test'
							},
							{
								path: '/categories/Demo',
								value: 'Demo'
							}
							]
						},
						label: {
							'icon-class': '',
							label: '标签',
							value: [{
								path: '/categories/Test',
								value: 'Test'
							},
							{
								path: '/sad/Demo',
								value: 'Demo'
							}
							]
						},
						'word-count': {
							'icon-class': 'fa fa-file-word-o',
							label: '字数统计:',
							value: '400'
						},
						duration: {
							'icon-class': 'fa fa-clock-o',
							label: '阅读时长 ≈',
							value: '2'
						},
						heat: {
							'icon-class': 'fa fa-thermometer',
							label: '热度',
							value: '400'
						},
						comment: {
							'icon-class': 'fa fa-comment-o',
							label: '评论',
							value: '400',
							path: ''
						},

					},
					path: '/post/test',
					digest: '<p>我们在使用后台传过来的数据的时候，有时候我们会得到树状结构的数据，虽然有时候，后端会处理掉，但，毕竟我们也可以在前端给它处理一下，一方面也锻炼一下脑子，天天写页面都没思考能力了。</p>'
				}]
			}
		}
		, methods: {
			sele(value) {
				console.log(value);
			}
		}



	}
</script>

<style>
</style>