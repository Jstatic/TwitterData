'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var del = require('del');

var paths = {
    scripts: 'app/**/*.js',
    images: 'app/img/**.*'
};

gulp.task('browserify', function () {
    var b = browserify('app/main.js');
    b.transform(babelify, {presets: ["es2015", "react"]});
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/static'));
});

gulp.task('cleanfiles', function() {
    return del('public/static/img/**.*');
});
gulp.task('copyfiles', ['cleanfiles'], function() {
    return gulp.src(paths.images)
    .pipe(gulp.dest('static/img'));
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['browserify']);
    gulp.watch(paths.images, ['copyfiles']);
});

gulp.task('default', ['watch', 'copyfiles', 'browserify']);