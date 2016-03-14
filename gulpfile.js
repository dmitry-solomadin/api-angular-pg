var gulp = require('gulp'),
connect = require('gulp-connect'),
inject = require('gulp-inject'),
mainBowerFiles = require('gulp-main-bower-files'),
concat = require('gulp-concat'),
clean = require('gulp-clean');

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    port: 4000
  })
});

gulp.task('main-bower-files', function() {
  return gulp.src('./bower.json')
    .pipe(mainBowerFiles())
    .pipe(gulp.dest('dist/libs'));
});

// I think that this is not very efficient
gulp.task('copy-sources-dist', function() {
  var sources = gulp.src(['./app/scripts/**/*.js']);
  return sources.pipe(gulp.dest('dist/scripts/'));
});

gulp.task('inject-index', function () {
  var target = gulp.src('app/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./app/scripts/**/*.js', './app/styles/**/*.css'], {read: false});
  var libSources = gulp.src(['./dist/libs/**/*.js'], {read: false});

  return target.pipe(inject(sources, {ignorePath: 'app'}))
    .pipe(inject(libSources, {ignorePath: 'dist', starttag: '<!-- inject:lib:js -->'}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-views', function() {
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
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], ['build-scripts']);
  gulp.watch(['app/index.html', 'app/views/**/*.html'], ['build-views']);
});

gulp.task('build-scripts', ['copy-sources-dist', 'inject-index']);

gulp.task('build', ['main-bower-files', 'build-scripts', 'build-views']);

gulp.task('default', ['build', 'connect', 'watch']);