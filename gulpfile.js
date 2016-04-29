'use strict';

var del = require('del');
var gulp = require('gulp');
var traceur = require('gulp-traceur');
var gls = require('gulp-live-server');
var sass = require('gulp-sass');

var port = 12345;
var TRACEUR_OPTIONS = {
  experimental: true,
  annotations: true,
  memberVariables: true,
  typeAssertions: true,
  typeAssertionModule: 'rtts_assert/rtts_assert',
  types: true,
  modules: 'instantiate'
};
var SOURCE_DIR = 'src';
var BUILD_DIR = 'build';

// Serve
gulp.task('serve', function () {
  var server = gls.static('/', port);
  server.start();

  gulp.watch(BUILD_DIR + '/**/*.*', function (file) {
    server.notify.apply(server, [file]);
  });
});

// Watch
gulp.task('watch', function () {
  // Watch for sass files changes
  gulp.watch(SOURCE_DIR + '/**/*.scss', function(file) {
    gulp.src(file.path, { base: SOURCE_DIR})
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(BUILD_DIR));
  });

  // Watch for html files changes
  gulp.watch(SOURCE_DIR + '/**/*.html', function(file) {
    gulp.src(file.path, { base: SOURCE_DIR})
      .pipe(gulp.dest(BUILD_DIR));
  });

  // Watch for js files changes
  gulp.watch(SOURCE_DIR + '/**/*.js', function(file) {
      gulp.src(file.path, { base: SOURCE_DIR})
        .pipe(traceur(TRACEUR_OPTIONS))
        .pipe(gulp.dest(BUILD_DIR));
  });
});

// Transpile
gulp.task('transpile', function () {
  return gulp.src(SOURCE_DIR + '/**/*.js')
    .pipe(traceur(TRACEUR_OPTIONS))
    .pipe(gulp.dest(BUILD_DIR));
});

// Copy:html
gulp.task('copy:html', function () {
  return gulp.src(SOURCE_DIR + '/**/*.html')
    .pipe(gulp.dest(BUILD_DIR));
});

// Sass
gulp.task('sass', function () {
  gulp.src(SOURCE_DIR+'/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(BUILD_DIR));
});

// Clean
gulp.task('clean', function () {
  return del(BUILD_DIR);
});

// Build
gulp.task('build', ['copy:html', 'sass', 'transpile']);

// Default
gulp.task('default', ['build']);
