var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var del = require('del');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var inject = require('gulp-inject');
var sass = require('gulp-sass');

var paths = {
	dev: {
		home: 'www/',
		all: 'www/**/*'
	},
	build: {
		home: 'build/', 
		all: 'build/**/*'
	},
	scss: {
		src: 'www/scss/**/*.scss',
		dest: 'www/scss/comp'
	},
	css: {
		src: 'www/css/**/*.css',
		dest: 'build/css/'
	},
	js: {
		src: 'www/js/**/*.js', 
		dest: 'build/js/'
	}
};

gulp.task('default', ['serve'])



gulp.task('reset', function(){
	del(paths.build.all);
});


gulp.task('scripts', function() {
	return gulp.src(paths.js.src)
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('main.min.js',  {newLine: ';'}))
	.pipe(gulp.dest(paths.js.dest))
	.pipe(uglify({mangle: false}))
	.pipe(gulp.dest(paths.js.dest))
});

gulp.task('styles', ['sass'], function() {
	return gulp.src(paths.css.src)
	.pipe(concat('styles.min.css'))
	.pipe(gulp.dest(paths.css.dest))
	.pipe(cleanCss({keepSpecialComments: 0}))
	.pipe(gulp.dest(paths.css.dest))
});

gulp.task('sass', function(){
	return gulp.src(paths.scss.src)
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('www/css/'))
});


gulp.task('copy:assets', function(){
	gulp.src('www/assets/**/*')
	.pipe(gulp.dest(paths.build.home + 'assets'));

});

gulp.task('copy:html', function(){
	gulp.src('www/templates/**/*')
	.pipe(gulp.dest(paths.build.home + 'templates'));

	gulp.src('www/index.html')
	.pipe(gulp.dest(paths.build.home));
});


gulp.task('copy:npm', function(){
	gulp.src('node_modules/angular/**/*')
	.pipe(gulp.dest(paths.build.home + 'node_modules/angular'));

	gulp.src('node_modules/angular-ui-router/**/*')
	.pipe(gulp.dest(paths.build.home + 'node_modules/angular-ui-router'));

	gulp.src('node_modules/angular-chart.js/**/*')
	.pipe(gulp.dest(paths.build.home + 'node_modules/angular-chart.js'));

	gulp.src('node_modules/chart.js/**/*')
	.pipe(gulp.dest(paths.build.home + 'node_modules/chart.js'));
});

gulp.task('copy:all', ['copy:html', 'copy:assets', 'copy:npm']);

gulp.task('build', ['copy:all', 'scripts', 'styles']);

gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: paths.build.home
		}
	});
	gulp.watch('www/**/*.html', ['copy:html']);
	gulp.watch('www/img/**/*', ['copy:assets']);
	gulp.watch('www/js/*.js', ['scripts']);
	gulp.watch('www/scss/*.scss', ['styles']);
	gulp.watch('build/**/*').on("change", reload);
});





