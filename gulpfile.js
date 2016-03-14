var gulp = require('gulp'),
gutil = require('gulp-util'),
connect = require('gulp-connect'),
browserify = require('browserify'),
source = require('vinyl-source-stream'),
concat = require('gulp-concat'),
clean = require('gulp-clean');

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    port: 4000
  })
});

gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  browserify('app/scripts/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
    // And put it in the dist folder
    .pipe(gulp.dest('dist/'));

  // Any other view files from app/views
  gulp.src('./app/views/**/*')
    // Will be put in the dist/views folder
    .pipe(gulp.dest('dist/views/'));
});

gulp.task('watch', function() {
  // Watch our scripts
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'browserify'
  ]);
  gulp.watch(['app/index.html', 'app/views/**/*.html'], [
    'views'
  ]);
});

gulp.task('build', ['browserify', 'views']);

gulp.task('default', ['build', 'connect', 'watch']);