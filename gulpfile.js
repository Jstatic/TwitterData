'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var del = require('del');

var paths = {
    scripts: 'app/**/*.js',
    images: 'app/img/**.*'
};

gulp.task('browserify', function () {
    var b = browserify({
        entries: 'app/main.js'
    });
    b.transform(reactify);
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('static'));
});

gulp.task('cleanfiles', function() {
    return del('static/img/**.*');
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