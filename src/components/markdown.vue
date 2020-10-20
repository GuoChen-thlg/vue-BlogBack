<template>
	<div>
		<Markdown
			:value="initText"
			theme="oneDark"
			@on-save="save"
			:toolbars="{
				strong: true,
				italic: true,
				overline: true,
				h1: true,
				h2: true,
				h3: true,
				h4: true,
				h5: true,
				h6: true,
				hr: true,
				quote: true,
				ul: true,
				ol: true,
				code: true,
				link: true,
				image: true,
				table: true,
				checked: true,
				notChecked: true,
				preview: true,
				split: true,
				print: true,
				theme: true,
				fullscreen: true,
				exportmd: true,
				importmd: true,
				save: true,
				clear: true,
			}"
		/>
	</div>
</template>

<script>
	import Markdown from 'vue-meditor'
	export default {
		name: 'MarkdownEditor',
		props: {
			initText: {
				type: String,
				default:''
			}
		},
		methods: {
			save(md) {
				this.$emit('onSave', md)
			}
		},
		components: {
			Markdown
		}
	}
</script>

<style>
</style>