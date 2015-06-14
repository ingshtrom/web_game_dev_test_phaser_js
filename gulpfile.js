/* global process: false, require: true */
'use strict';

var args,
    options,
    gulp = require('gulp'),
    del = require('del'),
    minimist = require('minimist'),
    // gutil = require('gulp-util'),
    typescript = require('gulp-typescript');

// options for CLI args
options = {
    string: ['env'],
    default: {
        env: process.env.NODE_ENV || 'production'
    }
};

// build minimist obj for consuming CLI args
args = minimist(process.argv, options);

gulp.task('default', ['clean', 'build']);

// CLEANING TASKS

gulp.task('clean', function(cb) {
    del('dist/**/*', cb);
});

// BUILDING TASKS

gulp.task('build', ['build.ts', 'build.lib.js', 'build.html', 'build.assets']);

gulp.task('build.ts', ['clean'], function() {
    return gulp.src('src/**/*.ts')
    .pipe(typescript({
        out: 'app.js'
    }))
    .js.pipe(gulp.dest('dist'));
});

gulp.task('build.lib.js', ['clean'], function () {
    return gulp.src('lib/**/*.js')
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('build.html', ['clean'], function() {
    return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('build.assets', ['clean'], function() {
    return gulp.src('assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});