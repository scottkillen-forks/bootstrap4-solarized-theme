// Assigning modules to local variables
var gulp = require('gulp'),
    scss = require('gulp-scss'),
    scsslint = require('gulp-scss-lint'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    header = require('gulp-header'),
    rename = require("gulp-rename"),
    pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Bootstrap Solarized - Official Website (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author.name %>\n',
    ' * Licensed under <%= pkg.license %>\n',
    ' */\n',
    ''
].join('');

// scss task to compile the scss files and add the banner
gulp.task('scss', function() {
    return gulp
      .src('./scss/*.scss')
      .pipe(scss().on('error', scss.logError))
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulp.dest('dist/css'));
});

// Minify CSS
gulp.task('minify', gulp.series(gulp.parallel('scss')), function() {
    return gulp
      .src(['./dist/css/*.css','!./dist/css/*.min.css'])
      .pipe(rename({ suffix: '.min' }))
      .pipe(autoprefixer())
      .pipe(cssmin())
      .pipe(gulp.dest('dist/css'));
});

// Lint scss
gulp.task('lint', function () {
    return gulp
      .src('scss/**/*.s+(a|c)ss')
      .pipe(scsslint());
});

// Watch task monitors scss files
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['scss']);
    gulp.watch('dist/css/*.css', ['minify']);
});

// Default task
gulp.task('default', gulp.series(gulp.parallel('scss', 'minify')));
