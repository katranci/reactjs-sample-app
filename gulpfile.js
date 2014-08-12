var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');


gulp.task('default', ['build-js', 'build-css']);

gulp.task('build-js', function() {
  return gulp.src('./components/**/*.jsx')
      .pipe(react())
      .pipe(concat('components.js'))
      .pipe(gulp.dest('./js/'))
});

gulp.task('build-css', function() {
  return gulp.src('./components/**/*.css')
      .pipe(concat('components.css'))
      .pipe(gulp.dest('./css/'))
});