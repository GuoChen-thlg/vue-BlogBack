<template>
	<!-- 文章编辑模块 -->
	<section class="article-edit">
		<el-col :span="24">
			<el-form
				ref="form"
				:rules="rules"
				status-icon
				:model="post"
				label-position="right"
			>
				<el-col :span="12">
					<el-form-item label="标题" prop="title">
						<el-col :span="18">
							<el-input v-model.trim="post.title" autocomplete="off">
							</el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="封面">
						<el-upload
							:disabled="true"
							action="#"
							:drag="true"
							:limit="1"
							accept="image/png, image/jpeg"
							:on-success="success"
							:on-error="error"
						>
							<template>
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">
									将文件拖到此处，或<em>点击上传</em>
								</div>
							</template>
						</el-upload>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="分类" prop="category">
						<el-col :span="10">
							<el-select multiple v-model="post.category" placeholder="请选择">
								<el-option
									v-for="item in category"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								>
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="10">
							<el-input
								v-model.trim="post.newcategory"
								placeholder="分类"
								@keyup.enter.native="addcategory()"
								autocomplete="off"
							>
							</el-input>
						</el-col>
					</el-form-item>
					<el-form-item label="标签" prop="tags">
						<el-col :span="10">
							<el-select multiple v-model="post.tags" placeholder="请选择">
								<el-option
									v-for="item in tags"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								>
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="10">
							<el-input
								v-model.trim="post.newtags"
								placeholder="标签"
								@keyup.enter.native="addtag"
							>
							</el-input>
						</el-col>
					</el-form-item>
				</el-col>
			</el-form>
		</el-col>
		<MarkdownEditor @onSave="save" :initText="post.conent" />
	</section>
</template>

<script>
	import MarkdownEditor from '@/components/markdown.vue'
	import { addPost, getPost, getTagsList, getCategoryList, updatePost } from '@/api'
	export default {
		name: 'ArticleEdit',
		data() {
			const validatorTitle = (rule, value, callback) => {
				if (!value) {
					callback(new Error('请填写博客标题'));
				} else {
					callback()
				}

			}
			const validatorCategory = (rule, value, callback) => {
				if (value.length < 1 && this.post.newcategory.length < 1) {
					callback(new Error('请选择博客分类或填写博客分类'));
				} else {
					callback()
				}
			}
			const validatorTsge = (rule, value, callback) => {
				if (value.length < 1 && this.post.newtags.length < 1) {
					callback(new Error('请选择博客标签或填写博客标签'));
				} else {
					callback()
				}
			}
			return {
				post: {
					id: '',
					title: '',
					category: [],
					tags: [],
					newcategory: '',
					newtags: '',
					conent: '',
				},
				rules: {
					title: [
						{ validator: validatorTitle, trigger: 'blur' }],
					category: [
						{ validator: validatorCategory, trigger: 'blur' }
					],
					tags: [
						{ validator: validatorTsge, trigger: 'blur' }
					]
				},
				category: [],
				tags: [],
				capacity: ''

			}
		},
		mounted() {
			this.capacity = this.$route.meta.capacity
			this.setTag()
			this.setClassify()
			if (this.capacity === 'add') {
				/**
				 * 
				 */
			} else if (this.capacity === 'edit') {
				let postName = this.$route.query.postName
				if (postName) {
					getPost({ title: postName }).then(res => {
						if (res.code == 200) {
							const post = res.data.post
							this.post.conent = post.conent
							this.post.title = post.title
							this.post.category = post.meta.classify.value.map(o => o.value)
							this.post.tags = post.meta.label.value.map(o => o.value)
							this.post.id = post.id
						}
					})
				}
			}
		},
		methods: {
			submit(callback) {
				this.$refs['form'].validate((valid) => {
					if (valid) {
						callback()
					} else {
						return false;
					}
				})
			},
			save(md) {
				this.submit(() => {
					let post = {
						id: this.post.id,
						title: this.post.title,
						category: Array.from(new Set([...this.post.category, ...this.post.newcategory.split(' ')])).filter(o => o !== ''),
						tags: Array.from(new Set([...this.post.tags, ...this.post.newtags.split(' ')])).filter(o => o !== ''),
						...md
					}
					if (this.capacity == 'add') {
						/**
						 * 文章发表
						 */
						addPost(post).then(res => {
							if (res.code == 200) {
								this.post.id = ''
								this.post.title = ''
								this.post.category = []
								this.post.tags = []
								this.post.newcategory = ''
								this.post.newtags = ''
								this.post.conent=''
								this.$message.success('添加成功')
							} else {
								if (res.sqlMessage.search('post.title') > 0) {
									this.$message.error('文章名已存在')
								} else {
									this.$message.error('添加失败')
								}
							}
						})
					}
					if (this.capacity == 'edit') {
						/**
						 * 修改帖子
						 */
						updatePost(post).then(res => {
							if (res.code == 200) {
								this.$message.success('更新成功')
								setTimeout(()=>{
									this.$router.push({name:'ArticleM'})
								},1000)
							} else {
								if (res.sqlMessage.search('post.title') > 0) {
									this.$message.error('文章名已存在')
								} else {
									this.$message.error('更新失败')
								}
							}
						})
					}
				})
			},
			addcategory() {
				let category = Array.from(new Set([...this.post.category, ...this.post.newcategory.split(' ')])).filter(o => o !== '')
				this.post.category = category
				this.post.newcategory = ''
			},
			addtag() {
				let tags = Array.from(new Set([...this.post.tags, ...this.post.newtags.split(' ')])).filter(o => o !== '')
				this.post.tags = tags
				this.post.newtags = ''
			},
			setTag() {
				getTagsList().then(res => {
					if (res.code == 200) {
						this.tags = res.data.tags
					}
				})
			},
			setClassify() {
				getCategoryList().then(res => {
					if (res.code == 200) {
						this.category = res.data.categoryList
					}
				})
			},
			success(response, file, fileList) {
				console.log(response, file, fileList);
			},
			error(err, file, fileList) {
				console.log(err)
				console.log(file)
				console.log(fileList)
			}
		},
		components: {
			MarkdownEditor
		}
	}
</script>

<style lang='scss'>
	.article-edit {
		.el-form-item__error {
			left: 40px;
		}
	}
</style>