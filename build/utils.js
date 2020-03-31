"use strict";

const path = require("path");

module.exports = {
	resolve(dir) {
		return path.join(__dirname, "..", dir);
	},
	assetsPath(_path) {
		const assetsSubDirectory = "static";
		return path.posix.join(assetsSubDirectory, _path);
	},
	createNotifierCallback() {
		const notifier = require('node-notifier')
		return (severity, errors) => {
			if (severity !== 'error') return
			console.log(severity, errors)
			const error = errors[0]
			const filename = error.file && error.file.split('!').pop()
			notifier.notify({
				title: packageConfig.name,
				message: severity + ': ' + error.name,
				subtitle: filename || '',
				icon: path.join(__dirname, '../static/img/weiyi.png')
			})
		}
	}
};
