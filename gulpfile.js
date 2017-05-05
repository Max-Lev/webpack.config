const gulp = require('gulp');
var uglify = require('gulp-uglify');
var path = require('path');
gulp.task('compress', function (cb) {
  return gulp.src('dist/main.js')
    .pipe(uglify());
});

var minify = require('gulp-minify');

gulp.task('minify', function () {
  gulp.src('dist/*.js')
    .pipe(minify({
      ext: {
        src: '.js',
        min: '.js'
      },
      //   exclude: ['tasks'],
      //   ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist'))
});
