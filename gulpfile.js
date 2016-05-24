"use strict;"

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var concat = require('gulp-concat');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');

var confi = {
	port: 5000,
	baseUrl: 'http://localhost',
	paths: {
		less: './src/less/*less',
		html: './src/*.html',
		js: './src/scripts/*.js',
		dist: './dist'
	}
};

gulp.task('open', ['connect'], function () {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.baseUrl + ':' + config.port + '/'}));
});

gulp.task('js', function(){
	return gulp.src(config.paths.js)
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('html', function(){
	return gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('less', function(){
	return gulp.src(config.paths.less)
		.pipe(less())
		.pipe(concat('bundle.css'))
		.pipe(cleanCss())
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());
});

gulp.task('connect', function(){
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.baseUrl,
		livereload: true
	})
});

gulp.task('watch', function () {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
	gulp.watch(config.paths.less, ['less']);
});

gulp.task('default', ['less', 'js', 'html', 'open', 'watch']);