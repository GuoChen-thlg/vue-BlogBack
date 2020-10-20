<template>
	<el-container>
		<el-header
			class="clear"
			:style="{
				'--head_back_color': getHead['back_color'],
				'--head_active_back_color': getHead['active_back_color'],
				'--head_color': getHead['color'],
				'--head_active_color': getHead['active_color'],
			}"
		>
			<router-link to="/" tag="span" class="logo">管理后台</router-link>
			<span class="btn toggle" @click="toggle">
				<i class="fa fa-bars"></i>
			</span>
		</el-header>
		<div class="body">
			<!-- @open="handleOpen"
					@close="handleClose" -->
			<el-aside width="auto">
				<MenuList :collapse="menuCollapse" :modality="getSidebar" />
			</el-aside>
			<section>
				<el-main>
					<slot> 主要的 </slot>
				</el-main>
				<el-footer> 脚部 V:0.1.0</el-footer>
			</section>
		</div>
	</el-container>
</template>

<script>
	import { mapGetters } from 'vuex'
	import MenuList from '@/components/menulist.vue'
	export default {
		name: 'Admin-layout',
		props: {

		},
		data() {
			// console.log(this.$store);
			return {
				menuCollapse: false



			}
		},
		methods: {
			toggle() {
				this.menuCollapse = !this.menuCollapse
			}
		},
		computed: {
			...mapGetters('style', [
				'getSidebar',
				'getHead',
			])
		},
		components: {
			MenuList
		}
	}
</script>

<style lang='scss'>
	.el-container {
		width: 100vw;
		height: 100vh;
		.el-header {
			height: 60px;
			padding: 0;
			background-color: var(--head_back_color);
			.logo {
				float: left;
				display: block;
				height: 100%;
				width: 200px;
				cursor: pointer;
			}
			.btn.toggle {
				height: 100%;
				float: left;
				padding: 15px;
				color: var(--head_color);
				&:hover {
					background-color: var(--head_active_back_color);
					color: var(--head_active_color);
				}
			}
		}
		.body {
			display: flex;
			.el-aside {
				height: calc(100vh - 60px);
			}
			& > section {
				position: relative;
				flex-grow: 1;
				max-height: calc(100vh - 60px);
				overflow: auto;
				.el-main {
					max-width: 100vw;
					min-height: 90vh;
				}
				.el-footer {
					width: 100%;
					bottom: 0;
				}
			}
		}
	}
</style>