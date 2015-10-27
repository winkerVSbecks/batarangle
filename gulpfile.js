'use strict';

var path = require('path');
var del = require('del');
var gulp = require('gulp');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var paths = {
  build: './build',
  libs: './frontend/libs',
  ts: './**/*.ts'
};

gulp.task('default', ['build']);

gulp.task('build', ['clean', 'compile', 'libs', 'config']);

gulp.task('clean', function (done) {

  del([paths.build], done);

});

gulp.task('lint', function() {
  return gulp.src(paths.ts)
    .pipe(tslint({
      configuration: 'tslint.json'
    }))
    .pipe(tslint.report('verbose'))
    .on('error', function handleError(err) {
      this.emit('end');
    });
});

gulp.task('compile', ['lint'], function(done) {
  var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
  });

  return tsProject.src()
    .pipe(ts(tsProject))
    .js
    .pipe(paths.build);
});

gulp.task('dev', ['build'], function() {

  gulp.watch([
    'frontend/batarangle.config.js'
  ], ['config']);

  gulp.watch(paths.ts, ['compile']);
});