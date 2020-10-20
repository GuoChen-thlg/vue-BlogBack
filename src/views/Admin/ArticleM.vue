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
			<el-table-column
				label="发布时间"
				sortable
				prop="meta.firstDate.value"
				:formatter="dateFormat"
			>
			</el-table-column>
			<el-table-column
				label="最后更新时间"
				sortable
				prop="meta.lastDate.value"
				:formatter="dateFormat"
			>
			</el-table-column>
			<el-table-column label="状态" width="140" v-slot="{ row }" prop="desc">
				<el-switch
					style="display: block"
					v-model="row.meta.is_open"
					active-color="#13ce66"
					inactive-color="#ff4949"
					active-text="公开"
					inactive-text="私密"
					@change="switch_open($event, row.id)"
				>
				</el-switch>
			</el-table-column>
			<el-table-column label="设为精选" width="80" prop="desc">
				<template v-slot="{ row }">
					<el-switch
						style="display: block"
						v-model="row.meta.choiceness"
						active-color="#13ce66"
						inactive-color="#ff4949"
						@change="sele($event, row.id)"
					/>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" prop="desc">
				<template v-slot="{ row }">
					<el-button-group>
						<el-button
							type="primary"
							title="编辑"
							size="mini"
							icon="el-icon-edit"
							@click="compile(row.title)"
						></el-button>
						<el-button
							type="danger"
							title="删除"
							size="mini"
							icon="el-icon-delete"
							@click="deletePost(row.id)"
						></el-button>
					</el-button-group>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	import { getPostList, updateArrtPost, deletePost } from '@/api'
	export default {
		name: 'ArticleM',
		data() {
			return {
				tableData: [],
				value: true
			}
		}, methods: {
			sele($event, id) {
				updateArrtPost({ arrt: 'choiceness', value: $event, id }).then(res => {
					res.code == 200 ? this.$message({
						message: res.info,
						type: 'success'
					}) : this.$message({
						message: res.info,
						type: 'error'
					});
				})
			},
			deletePost(id) {
				this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deletePost({ id }).then(res => {
						console.log(res)
					})
					this.updatePostList()
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			compile(postName) {
				this.$router.push({ name: 'ArticleEdit', query: { postName } })
			},
			switch_open($event, id) {
				updateArrtPost({ arrt: 'is_open', value: $event, id }).then(res => {
					res.code == 200 ? this.$message({
						message: res.info,
						type: 'success'
					}) : this.$message({
						message: res.info,
						type: 'error'
					});
				})
			},
			dateFormat(row, column, cellValue, index) {
				if (cellValue != null) {
					const dateMat = new Date(cellValue);
					const year = dateMat.getFullYear();
					const month = dateMat.getMonth() + 1;
					const day = dateMat.getDate();
					const hh = dateMat.getHours();
					const mm = dateMat.getMinutes();
					const ss = dateMat.getSeconds();
					const timeFormat = year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss;
					return timeFormat;
				}

			}
			, updatePostList() {
				getPostList().then(res => {
					if (res.code == 200) {
						this.tableData = res.data.postList
					}
				})
			}
		},
		mounted() {
			this.updatePostList()
		},
	}
</script>

<style>
</style>