/**
 * gulp file
 */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    webpack = require('webpack'),
    mocha = require('gulp-mocha');

var webpackConfig = Object.create(require('./webpack.config.js'));


var Compiler = Object.create(webpackConfig);

gulp.task('webpack', function(callback){
  Compiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 9200,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('./ui/**/*.*', ['webpack']);
});


gulp.task('default', ['connect', 'watch']);

