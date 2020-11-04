<template>
	<div id="app">
		<router-view />
	</div>
</template>
<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.clear {
		// 清除浮动
		&::before,
		&::after {
			content: '';
			display: block;
			width: 0;
			height: 0;
			clear: both;
		}
	}
	.btn {
		display: block;
		cursor: pointer;
	}
	i[class^='fa-'] {
		margin-right: 5px;
		width: 24px;
		text-align: center;
		font-size: 18px;
		vertical-align: middle;
	}
</style>
<style lang="scss">
</style>
