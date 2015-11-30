'use strict';

var del = require('del');
var gulp = require('gulp');
var traceur = require('gulp-traceur');
var gls = require('gulp-live-server');

var port = 12345;

gulp.task('serve', function () {
  var server = gls.static('/', port);
  server.start();

  gulp.watch(['dist/**/*.js'], function (file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('copy', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function () {
  return gulp.src([
    traceur.RUNTIME_PATH,
    'src/**/*.js'
    ])
    .pipe(traceur({
      experimental: true,
      annotations: true,
      memberVariables: true,
      typeAssertions: true,
      typeAssertionModule: 'rtts_assert/rtts_assert',
      types: true,
      modules: 'instantiate' // Systemjs
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('default', ['copy', 'build']);
