var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();

gulp.task("watch", function (cb) {
  gulp.watch("/scss/**/*.scss", gulp.series("sass"));
  cb();
});

gulp.task("serve", function (cb) {
  browserSync.init({
    server: "./"
  });
  gulp.watch("/scss/**/*.scss", gulp.series("sass"));
  gulp.watch("/*.html").on("change", browserSync.reload);
  gulp.watch("/js/*.js").on("change", browserSync.reload);
  cb();
});

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function () {
  return gulp
    .src("/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer()
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("/css"))
    .pipe(browserSync.stream());
});

gulp.task("default", gulp.series("serve"));
