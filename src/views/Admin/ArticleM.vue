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
					>
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
						></el-button>
					</el-button-group>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
import {getPostList} from '@/api'
	export default {
		name: 'ArticleM',
		data() {
			return {
				tableData: []
			}
		}
		, methods: {
			sele(value) {
				console.log(value);
			},
			compile(postName){
				this.$router.push({ name: 'ArticleEdit', query: { postName }})
			}
		},
		mounted(){
getPostList().then(res=>{
	if(res.code==200){
		this.tableData=res.data.postList
	}else{
		
	}
})
		}



	}
</script>

<style>
</style>