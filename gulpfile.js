var gulp = require('gulp');
var sass = require('gulp-sass');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var tsProject = typescript.createProject('./tsconfig.json');
var tsconfig = require('./tsconfig.json');

var config = {
  root: './build',
  srcFiles: tsconfig.files
};

gulp.task('scripts', function() {
  // return gulp.src('./src/js/**/*.js')
    // .pipe(concat('app.js'))
    // .pipe(gulp.dest('./public/js'))
    // .pipe(notify("Script: <%= file.relative %>!"));
});

gulp.task('build', function () {
  return gulp.src(config.srcFiles)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.root));
});

gulp.task('watch', function() {
  let watch = gulp.watch(config.srcFiles, ['build']);
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error',  sass.logError))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('default', ['scripts', 'sass']);