/**
 * Created by Jaylon on 2016/3/2.
 */
var gulp = require('gulp');
var  browserSync = require('browser-sync').create();
var  sourcemaps = require('gulp-sourcemaps');
//rsass = require('gulp-ruby-sass'),
var  sass = require('gulp-sass');
var  autoprefixer = require('gulp-autoprefixer');
var  minifycss = require('gulp-minify-css');
var  jshint = require('gulp-jshint');
var  uglify = require('gulp-uglify');
var  imagemin = require('gulp-imagemin');
var  rename = require('gulp-rename');
var  clean = require('gulp-clean');
var  concat = require('gulp-concat');
var  notify = require('gulp-notify');
var  cache = require('gulp-cache');
var jade = require('gulp-jade');
var coffee = require('gulp-coffee');

//file
var scssSrc = ["**/*.scss"];
var scssDist = "dist/css";

var jadeSrc = ["**/*.jade"];
var jadeDist = "dist/html";

var coffeeSrc = ["**/*.coffee"];
var coffeeDist = "dist/js";





// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

	browserSync.init({

		//proxy: '127.0.0.1',
		//notify: false,
		//ghostMode: {
		//	clicks: false,
		//	location: true,
		//	forms: false,
		//	scroll: true
		//}
	});
	gulp.watch(coffeeSrc, ['coffee']);
	gulp.watch(jadeSrc, ['jade']);
	gulp.watch(scssSrc, ['sass']);
	gulp.watch(jadeDist+"/*").on('change', browserSync.reload);
	gulp.watch(['**/*.js', '!node_modules/**/*']).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src(scssSrc)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest(scssDist))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(scssDist))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(sourcemaps.write('.', {addComment: false}))
		.pipe(gulp.dest(scssDist))
		.pipe(notify({
			message: 'Styles task complete'
		}))
		.pipe(browserSync.stream());
});
//jade complie
gulp.task('jade', function() {
	var YOUR_LOCALS = {};

	gulp.src(jadeSrc)
		.pipe(jade({
			locals: YOUR_LOCALS
		}))
		.pipe(gulp.dest(jadeDist));
});

//coffee
gulp.task('coffee', function() {
	gulp.src(coffeeSrc)
		.pipe(coffee({bare: true}).on('error', gutil.log))
		.pipe(gulp.dest(coffeeDist));
});


gulp.task('default', ['serve']);