'use strict';

var gulp = require('gulp');
var config = require("./example.config");

/**
 * Include Gulp plugins
 */
var $ = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});
var fs = require("fs");
var moduleImporter = require('sass-module-importer');
var browserSync = require('browser-sync').create();
var del = require('del');
var kss = require('kss');


/**
 * If config.js exists, load that config for overriding certain values below.
 */
function loadConfig() {
  if (fs.existsSync(__dirname + "/./config.js")) {
    config = {};
    config = require("./config");
  }

  return config;
}

loadConfig();

gulp.task('clean', function (cb) {
  del(cb);
});

/**
 * This task generates CSS from all SCSS.
 */
gulp.task('sass', function () {
  del('../css/*.css', {force: true});

  return gulp.src('../_components/**/*.scss')
      .pipe($.sourcemaps.init())
      .pipe($.sass({
        importer: moduleImporter(),
        importOnce: {
          index: false,
          css: false,
          bower: false
        },
        indentedSyntax: true,
        noCache: false,
        lineNumbers: false,
        sourceMap: true,
        outputStyle: "compressed"
      }))
      .on('error', function (error) {
        $.util.log(error);
        this.emit('end');
      })
      .pipe($.autoprefixer(config.autoprefixerOptions))
      // .pipe($.base64())
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('../css'));
      // .pipe($.notify({
      //   title: "SASS Compiled",
      //   message: "All SASS files have been recompiled to CSS.",
      //   onLast: true
      // }))
});

/**
 * This task minifies javascript.
 */
gulp.task('compress', function () {
  del('../js/*.js', {force: true});

  return gulp.src([
    '../_js-src/**/*.js',
    '../_components/**/*.js'
  ])
      .pipe($.sourcemaps.init())
      .pipe($.uglify())
      .on('error', function (error) {
        $.util.log(error);
        this.emit('end');
      })
      .pipe($.concat('scripts.js'))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('../js'));
      // .pipe($.notify({
      //   title: "JS Minified",
      //   message: "All JS files in the theme have been minified.",
      //   onLast: true
      // }))
});

/**
 * This task generate sprite from all SVG files and places them in the assets directory.
 */
gulp.task('svg', function () {
  del('../svg/*.svg', {force: true});

  return gulp.src('../_svg-src/**/*.svg')
      .pipe($.svgSprite({
        shape: {
          id: {
            separator: '__'
          },
          dest: '../svg/'
        },
        svg: {
          xmlDeclaration: false,
          doctypeDeclaration: false
        }
      }))
      .on('error', function (error) {
        $.util.log(error);
        this.emit('end');
      })
      .pipe(gulp.dest('../svg'));
      // .pipe($.notify({
      //   title: "Sprite Generated",
      //   message: "All SVG files have been optimized.",
      //   onLast: true
      // }))
});

/**
 * Defines a task that generate style guide.
 */
gulp.task('styleguide', function () {
  del('../styleguide/**/*', {force: true});

  return kss({
    source: '../_components',
    destination: '../styleguide',
    builder: 'builder/twig',
    'extend-drupal8': true,
    // The css and js paths are URLs, like '/misc/jquery.js'.
    // The following paths are relative to the generated style guide.
    css: [
      '../js/lib/magnific-popup/magnific-popup.css',
      '../js/lib/slick/slick.css',
      '../css/styles.css',
      '//fonts.googleapis.com/css?family=Montserrat:500|Open+Sans:400,400i,700'

    ],
    js: [
      '../../../../core/assets/vendor/jquery/jquery.min.js',
      '../../../../core/assets/vendor/jquery-once/jquery.once.min.js',
      '../../../../core/assets/vendor/domready/ready.min.js',
      '../../../../core/misc/drupalSettingsLoader.js',
      '../../../../core/misc/drupal.js',
      '../../../../core/misc/drupal.init.js',
      '../js/lib/modernizr.min.js',
      '../js/lib/magnific-popup/jquery.magnific-popup.js',
      '../js/lib/waypoints/jquery.waypoints.js',
      '../js/lib/slick/slick.js',
      '../js/lib/ofi.min.js',
      '../js/scripts.js'
    ]
  });
});

/**
 * Define a task to spawn Browser Sync.
 */
gulp.task('browser-sync', function () {
  browserSync.init({
    proxy: config.browserSync.hostname,
    port: config.browserSync.port,
    open: config.browserSync.openAutomatically,
    reloadDelay: config.browserSync.reloadDelay,
    injectChanges: config.browserSync.injectChanges,
    online: config.browserSync.online,
    ui: config.browserSync.ui
  })
});

/**
 * Defines the watcher task.
 */
gulp.task('watch', function () {
  // watch scss for changes
  gulp.watch(['../_components/**/*.scss'], ['sass', 'styleguide'])
      .on('change', browserSync.reload);

  // watch js for changes
  gulp.watch(['../{_js-src,_components}/**/*.js'], ['compress', 'styleguide'])
      .on('change', browserSync.reload);

  // watch svg for changes
  gulp.watch(['../{_svg-src,_components}/**/*.svg'], ['svg', 'styleguide'])
      .on('change', browserSync.reload);

  // watch components twig for changes
  gulp.watch(['../_components/**/*.twig'], ['styleguide'])
      .on('change', browserSync.reload);

  // If user has specified an override
  if (!config.twig.useCache) {
    gulp.watch(['../templates/**/*.twig'])
        .on('change', browserSync.reload);
  }
});

gulp.task('guide', ['styleguide']);
gulp.task('prod', ['sass', 'compress', 'svg']);
gulp.task('default', ['browser-sync', 'watch']);
