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
</style>
<style lang="scss">




</style>
