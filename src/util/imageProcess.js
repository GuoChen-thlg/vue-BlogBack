export default function urlToBase64(url) {
	return new Promise((resolve, reject) => {
		let image = new Image()
		image.onload = function() {
			let canvas = document.createElement('canvas')
			canvas.width = this.naturalWidth
			canvas.height = this.naturalHeight
			canvas.getContext('2d').drawImage(image, 0, 0)
			let result = canvas.toDataURL('image/png')
			resolve(result)
		}
		// CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
		image.setAttribute('crossOrigin', 'Anonymous')
		image.src = url
		// 图片加载失败的错误处理
		image.onerror = () => {
			reject(new Error('图片流异常'))
		}
	})
}
