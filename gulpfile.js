var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require("gulp-notify");
var sass = require('gulp-sass');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
const del = require('del');

var tsProject = typescript.createProject('./tsconfig.json');
var tsconfig = require('./tsconfig.json');
console.log(tsconfig.files);
var config = {
  root: './build',
  watchFiles: [
    './*.js',
    './*.html'
  ],
  srcFiles: tsconfig.files
};

gulp.task('scripts', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(notify("Script: <%= file.relative %>!"));
});

gulp.task('build', function () {
  // del(['main/*.js', 'main/*.js.map']).then(paths => {
  //   console.log('Deleted files and folders:\n', paths.join('\n'));
  // });
  return gulp.src(config.srcFiles)
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.root));
    // .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  let watch = gulp.watch('src/main/**/*.ts', ['build']);
  
  // let watcher = gulp.watch('src/js/**/*.js', ['scripts']);
  // let watcher2 = gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error',  sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(notify("SASS: <%= file.relative %>!"));
});

gulp.task('default', ['scripts', 'sass']);