"use strict";
var gulp = require('gulp'),
concatCSS = require('gulp-concat-css'),
    minifyCSS = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    uncss = require('gulp-uncss'),
    rename = require('gulp-rename');

gulp.task('connect', function () {
    connect.server({
        root: 'app',
        livereload: true
    });
});

gulp.task('css', function () {
    return gulp.src('scss/style.css')
        .pipe(minifyCSS())
        .pipe(rename("bundle.min.css"))
        .pipe(gulp.dest('app/'))
        .pipe(sass().on('error', sass.logError))
        .pipe(connect.reload());

});
//html

gulp.task('html', function () {
    gulp.src('app/index.html')
        .pipe(connect.reload());

});

//watch
gulp.task('watch', function () {
    gulp.watch('css/*.css', ['css'])
    gulp.watch('app/index.html', ['html'])

});

gulp.task('default', ['connect', 'html' , 'css', 'watch']);



gulp.task('default', function () {
    return gulp.src('css/common.css')
        .pipe(uncss({
            html: ['app/index.html']
        }))
        .pipe(gulp.dest('app/css'));
});