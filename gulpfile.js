var gulp = require('gulp');
var flatten = require('gulp-flatten');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var annotate = require('gulp-ng-annotate');
var minifyHtml = require('gulp-htmlmin');
var fs = require('fs');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var php2html = require("gulp-php2html");
 
gulp.task('move', function () {

    gulp.src(['./src/index.html'])
        .pipe(minifyHtml({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));

    gulp.src(['!./src/index.html', './src/**/*.html'])
        .pipe(minifyHtml({collapseWhitespace: true}))
        .pipe(flatten())
        .pipe(gulp.dest('./dist/templates'));

    gulp.src(['./src/**/*.ico', './src/**/*.jpg', './src/**/*.jpeg', './src/**/*.png', './src/**/*.gif', './src/**/*.svg'])
        .pipe(flatten())
        .pipe(gulp.dest('./dist/img'))

});

gulp.task('buildVendor', function () {

    var dependencies = JSON.parse(fs.readFileSync('./dependencies.json'));

    gulp.src(dependencies.scripts)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/js'));

    gulp.src(dependencies.styles)
        .pipe(sass({outputStyle: ''}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('fonts.css'))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".css"
        }))
        .pipe(gulp.dest('./dist/css'));

    gulp.src(dependencies.fonts)
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('scripts', function () {

    gulp.src(['./src/js/piskotki.js'])
        .pipe(annotate())
        .pipe(concat('piskotki.js'))
        .pipe(gulp.dest('./dist/js'));

});

gulp.task('sass', function () {

    gulp.src('./src/sass/style.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'));

});

gulp.task('php2html', function () {

    gulp.src("./src/*.php")
        .pipe(php2html())
        .pipe(gulp.dest("./dist"));

});

gulp.task('serve', function () {

    gulp.src('./dist')
        .pipe(webserver({
            port: 48080,
            livereload: true,
            open: 'http://localhost:48080/'
        }));

});

gulp.task('default', ['serve'], function () {

    gulp.start(['scripts', 'move', 'sass','buildVendor','php2html']);

    gulp.watch(['./src/**/*.js'], ['scripts']);
    gulp.watch(['./src/**/*.html'], ['move']);
    gulp.watch(['./src/**/*.php'], ['php2html']);
    gulp.watch(['./src/sass/**/*.sass'], ['sass']);

    gulp.watch(['./dependencies.json'], ['buildVendor']);

});