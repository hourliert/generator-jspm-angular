var gulp = require('gulp'),
		path = require('path'),
		jspm = require('jspm'),
		rename = require('gulp-rename'),
		uglify = require('gulp-uglify'),
		htmlreplace = require('gulp-html-replace'),
		ngAnnotate = require('gulp-ng-annotate'),
		bs = require('browser-sync').create(),
    bump = require('gulp-bump'),
    tagVersion = require('gulp-tag-version'),
    git = require('gulp-git'),
    tsd = require('gulp-tsd'),
    del = require('del'),
    runSequence = require('run-sequence'),
    tslint = require('gulp-tslint'),
    typedoc = require("gulp-typedoc");


var PATHS = {
  app: './app',
  dist: './dist',
  doc: './doc',
  typings: './typings'
};

gulp.task('default', function (cb) {
  runSequence(
    'clean',
    'build',
    cb
  );
});

/**
 * Cleaning
 */
gulp.task('clean', function () {
  return del([
    PATHS.dist,
    PATHS.doc,
    PATHS.typings
  ]);
});

/**
 * Linting
 */
gulp.task('tslint', ['tsd'], function () {
  return gulp.src(PATHS.app + '/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      emitError: false
    }));
});

gulp.task('tslint:watch', ['tslint'], function () {
  gulp.watch(PATHS.app + '/**/*.ts', ['tslint']);
});

/**
 * Doc
 */
gulp.task("typedoc", ['tsd'], function () {
  return gulp.src(PATHS.app + '/**/*.ts')
    .pipe(typedoc({
      module: "commonjs",
      target: "es5",
      includeDeclarations: true,
      out: PATHS.doc,
      name: "Jspm Angular Typescript",
      ignoreCompilerErrors: true
    }));
});

/**
 * Serving
 */
gulp.task('reload', function (cb) {
  bs.reload();
  cb();
});

gulp.task('serve', ['tslint'], function () {
  bs.init({
    port: process.env.PORT || 3000,
    open: true,
    server: {
      baseDir: '.'
    },
  });
  
  gulp.watch(PATHS.app + '/**/*.ts', [
    'tslint',
    'reload'
  ]);
});

gulp.task('serve:dist', ['build'], function () {
  bs.init({
    port: process.env.PORT || 3000,
    open: true,
    server: {
      baseDir: PATHS.dist
    },
  });
  
  gulp.watch(PATHS.app + '/**/*.ts', ['_serve:dist:helper']);
});

gulp.task('_serve:dist:helper', function (cb) {
  runSequence(
    'build',
    'reload',
    cb
  );
});


/**
 * Building
 */
gulp.task('build', ['clean', 'tslint'], function () {
  var dist = path.join(PATHS.dist, 'app.js');
  // Use JSPM to bundle our app
  return jspm.bundleSFX(path.join(PATHS.app, 'main'), dist, {})
    .then(function () {
      // Also create a fully annotated minified copy
      return gulp.src(dist)
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(PATHS.dist))
    })
    .then(function () {
      // Inject minified script into index
      return gulp.src('./index.html')
        .pipe(htmlreplace({
          'js': 'app.min.js'
        }))
        .pipe(gulp.dest(PATHS.dist));
    });
});

/**
 * Misc
 */
gulp.task('tsd', function (callback) {
  tsd({
    command: 'reinstall',
    config: './tsd.json'
  }, callback);
});

/**
 * Bumping version
 */
function inc(importance) {
  return gulp.src(['./package.json'])
    .pipe(bump({ type: importance }))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('Bumps for new ' + importance + ' release.'))
    .pipe(tagVersion());
}

gulp.task('patch', function () { return inc('patch'); });
gulp.task('feature', function () { return inc('minor'); });
gulp.task('release', function () { return inc('major'); });



