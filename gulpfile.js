var gulp             = require("gulp"),
	sass             = require("gulp-sass"),
	sourcemaps       = require("gulp-sourcemaps"),
	browserSync      = require("browser-sync").create(),
	watch            = require("gulp-watch"),
	minifyCSS        = require("gulp-clean-css"),
	rename           = require("gulp-rename"),
	concatJS         = require("gulp-concat"),
	minifyJS         = require("gulp-uglify"),
	deleteLines      = require("gulp-delete-lines"),
	insertLines      = require("gulp-insert-lines"),
	plumber          = require("gulp-plumber"),

	// js files
	scripts          = {
		jquery: "vendor/jquery/dist/jquery.js",
		bootstrap: "vendor/bootstrap-sass/assets/javascripts/bootstrap.js",
		main: "dev/js/main.js"
	};

/**
 * dev taks
 * @command gulp
 */
gulp.task("sass", function() {
	gulp.src("dev/sass/main.sass")
	    .pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("dev/css"))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task("browserSync", function() {
	browserSync.init({
		server: {
			baseDir: "./"
		},
		browser: "google-chrome",
		notify: false
	});
});

gulp.task("default", ["browserSync", "sass"], function() {
	gulp.watch("dev/sass/**/*.+(scss|sass)", ["sass"]);
	gulp.watch("index.html", browserSync.reload);
	gulp.watch("dev/js/**/*.js", browserSync.reload);
});

/**
 * production tasks
 * @command gulp production
 */
gulp.task("css", function() {
	return gulp.src("dev/css/main.css")
		.pipe(minifyCSS())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest("dist/css"))
});

gulp.task("js", function() {
	return gulp.src([
			scripts.jquery,
			scripts.bootstrap,
			scripts.main
		])
		.pipe(concatJS("main.js"))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(minifyJS().on("error", function() {
			console.log(err);
		}))
		.pipe(gulp.dest("dist/js"))
});

gulp.task("html", function() {
	return gulp.src("index.html")
		.pipe(deleteLines({
			"filters": [
				/<link\s+rel=/i
			]
		}))
		.pipe(insertLines({
			"before": /<\/head>$/,
			"lineBefore": '        <link rel="stylesheet" type="text/css" href="dist/css/main.min.css">',
		}))
		.pipe(deleteLines({
			"filters": [
				/<script\s+src=/i
			]
		}))
		.pipe(insertLines({
			"before": /<\/body>$/,
			"lineBefore": '        <script src="dist/js/main.min.js"></script>'
		}))
		.pipe(rename({
			suffix: "-production"
		}))
		.pipe(gulp.dest("./"))
});

gulp.task("production", ["css","js", "html"]);