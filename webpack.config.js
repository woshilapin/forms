import path from 'path';

export default {
	"target": 'web',
	"context": path.resolve(__dirname, 'src/scripts/'),
	"entry": {
		"app": './index.js',
	},
	"output": {
		"path": path.resolve(__dirname, 'dist/scripts'),
		"filename": '[name].bundle.js',
	},
	"module": {
		"rules": [
			{
				"test": /\.js$/,
				"exclude": /node_modules/,
				"loader": 'babel-loader',
			},
		],
	},
	"devtool": "source-map",
};
