<template>
	<!-- :default-active="$route.path" -->
	<el-menu
		class="el-menu-vertical"
		mode="vertical"
		:router="true"
		:background-color="modality['back_color']"
		:text-color="modality['color']"
		:active-text-color="modality['active_color']"
		:collapse="collapse"
	>
		<template v-for="(item, index) in route">
			<el-menu-item
				v-if="!item['child']"
				:index="`${item['path']}`"
				:key="index"
			>
				<i class="el-icon-menu"></i>
				<span slot="title">{{item['label']}}</span>
			</el-menu-item>
			<el-submenu v-if="item['child']" :index="`${item['path']}`" :key="index">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span v-text="item['label']"></span>
				</template>
				<el-menu-item-group v-if="item['child']">
					<template v-for="(menu, i) in item['child']">
						<el-menu-item
							:key="i"
							:index="`${menu['path']}`"
							v-text="menu['label']"
						></el-menu-item>
					</template>
				</el-menu-item-group>
			</el-submenu>
		</template>
	</el-menu>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'MenuList',
		props: {
			modality: {
				type: Object
			},
			collapse: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			console.log(this.$route.path);
		},
		computed: {
			...mapState('menu', [
				'route'
			])
		}
	}
</script>

<style lang='scss'>
	.el-menu-vertical {
		width: 200px;
		height: 100%;
		overflow-x: hidden;
		&::-webkit-scrollbar {
			width: 6px;
			height: 6px;
		}
		& ::-webkit-scrollbar-track {
			border-radius: 3px;
			background: rgba($color: #fff, $alpha: 0.6);
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 3px;
			background: rgba($color: #000, $alpha: 0.7);
		}
	}
</style>