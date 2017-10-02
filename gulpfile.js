var gulp = require('gulp')
var uglify = require('gulp-uglify')

gulp.task('default', function () {
  gulp.src('t.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})
