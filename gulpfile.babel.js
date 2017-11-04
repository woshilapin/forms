import gulp from 'gulp';
import gclean from 'gulp-clean';
import ghtmlmin from 'gulp-htmlmin';
import gpostcss from 'gulp-postcss';
import gsourcemaps from 'gulp-sourcemaps';
import gstylelint from 'gulp-stylelint';
import gwebpack from 'webpack-stream';

import webpack from 'webpack';
import postcssrc from 'postcss-load-config';

import htmlminConfig from './htmlmin.config.js';
import postcssConfig from './postcss.config.js';
import webpackConfig from './webpack.config.js';

const paths = {
	"clean": {
		"src": 'dist/',
		"dst": 'dist/',
	},
	"views": {
		"src": 'src/index.html',
		"dst": 'dist/',
	},
	"styles": {
		"src": 'src/styles/stylesheet.css',
		"dst": 'dist/styles/',
	},
	"scripts": {
		"src": 'src/scripts/index.js',
		"dst": 'dist/scripts/',
	},
};

export function clean() {
	return gulp.src(paths.clean.src)
		.pipe(gclean({force: true}))
		.pipe(gulp.dest(paths.clean.dst));
}
clean.description = 'Clean directory';

export function views() {
	return gulp.src(paths.views.src, {"since": gulp.lastRun(views)})
		.pipe(ghtmlmin(htmlminConfig))
		.pipe(gulp.dest(paths.views.dst));
};
views.description = 'Generate HTML';

export async function styles() {
	let config = Object.create(await postcssrc());
	return gulp.src(paths.styles.src, {"since": gulp.lastRun(styles)})
		.pipe(gsourcemaps.init())
		.pipe(gpostcss(config.plugins, config.options))
		.pipe(gsourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.dst));
};
styles.description = 'Generate CSS';

export function scripts() {
	return gulp.src(paths.scripts.src, {"since": gulp.lastRun(scripts)})
		.pipe(gwebpack(webpackConfig, webpack))
		.pipe(gulp.dest(paths.scripts.dst));
};
scripts.description = 'Generate Javascript';

export let build = gulp.series(
	clean,
	gulp.parallel(
		views,
		styles,
		scripts
	)
);
build.description = 'Build the whole project';

export let watch = gulp.series(
	build,
	function watch() {
		gulp.watch(paths.views.src, views);
		gulp.watch(paths.styles.src, styles);
		webpackConfig.watch = true;
		return scripts();
	}
);
watch.description = 'Activate watch mode';

export default build;
