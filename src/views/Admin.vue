<template>
	<div class="admin">
		<AdminLayout>
			<router-view />
		</AdminLayout>
	</div>
</template>

<script>
	// @ is an alias to /src
	import AdminLayout from '@/components/admin-layout.vue'
	export default {
		name: 'Admin',
		methods: {
			
		},
		components: {
			AdminLayout,
		}
	}
</script>
