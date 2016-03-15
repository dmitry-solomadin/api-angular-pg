var gulp = require('gulp'),
connect = require('gulp-connect'),
inject = require('gulp-inject'),
mainBowerFiles = require('gulp-main-bower-files');

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    port: 4000
  })
});

gulp.task('copy-bower-libs', function() {
  return gulp.src('./bower.json')
    .pipe(mainBowerFiles())
    .pipe(gulp.dest('dist/libs'));
});

// I think that this is not very efficient
gulp.task('copy-scripts', function() {
  var sources = gulp.src(['./app/scripts/**/*.js']);
  return sources.pipe(gulp.dest('dist/scripts/'));
});

gulp.task('copy-styles', function() {
  var sources = gulp.src(['./app/styles/**/*.css']);
  return sources.pipe(gulp.dest('dist/styles/'));
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

gulp.task('copy-views', function() {
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
  // Watch scripts, styles & templates
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], ['copy-scripts', 'inject-index']);
  gulp.watch(['app/styles/*.css', 'app/styles/**/*.css'], ['copy-styles', 'inject-index']);
  gulp.watch(['app/index.html', 'app/views/**/*.html'], ['copy-views', 'inject-index']);
});

gulp.task('build', ['copy-bower-libs', 'copy-scripts', 'copy-styles', 'copy-views', 'inject-index']);

gulp.task('default', ['build', 'connect', 'watch']);