var gulp = require('gulp');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');
 
gulp.task('combine', function () {
  return gulp.src('./styles/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('minify', function () {
    return gulp.src('./css/*.css')
      .pipe(uglifycss({
        "uglyComments": true
      }))
      .pipe(gulp.dest('./css'));
  });

  gulp.task('run', gulp.series('combine', 'minify'));

  gulp.task('watch', function() {
      gulp.watch('./styles/*.css', gulp.series('combine', 'minify'))
  });

  gulp.task('default', gulp.series('run', 'watch'));