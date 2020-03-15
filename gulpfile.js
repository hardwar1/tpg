let gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel');
const gulpStylelint = require('gulp-stylelint');
const fileinclude = require('gulp-file-include');

gulp.task('clean', async function () {
  del.sync('dist')
});

gulp.task('scss', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('lintScss', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});


gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function () {
  return gulp.src('app/js/libs.min.js')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', function () {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/magnific-popup/dist/magnific-popup.css',
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('main-js', function () {
  return gulp.src('app/js/js-source/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
});



gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task('export', function () {
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));
  let buildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));
  let buildJs = gulp.src('app/js/*.js')
    .pipe(gulp.dest('dist/js'));
  let buildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));
  let buildImages = gulp.src('app/images/**/*.*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('lintScss'));
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/js/libs.min.js', gulp.parallel('script'));
  gulp.watch('app/js/js-source/**/*.js', gulp.parallel('main-js'));
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('main-js', 'css', 'scss', 'js', 'browser-sync', 'watch'));


