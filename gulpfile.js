// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();

// SASS-SCSS Task
function scssTask() {
  return src('app/scss/*.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist/css', { sourcemaps: '.' }))
    .pipe(browserSync.stream());
}

// JavaScript Task
function jsTask() {
  return src('app/js/*.js', { sourcemaps: true }).pipe(dest('dist/js', { sourcemaps: '.' }));
}

// Image Task
function imgTask() {
  return src(['app/images/**/*.{gif,jpg,png,svg}']).pipe(dest('dist/images'));
}

// Browsersync
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', browserSyncReload);
  watch(['app/scss/**/*.scss', 'app/js/**/*.js', 'app/images/**/*.{gif,jpg,png,svg}'], series(scssTask, jsTask, imgTask, browserSyncReload));
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, imgTask, browserSyncServe, watchTask);

// Build Gulp Task
exports.build = series(scssTask, jsTask, imgTask);
