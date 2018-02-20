'use strict';

var gulp = require('gulp'),
    del = require('del'),
    scss = require('gulp-sass'),
    cache = require('gulp-cache'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    pngquant = require('imagemin-pngquant'), 
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

// gulp.task('js-lib', function(){
//     return gulp.src('app/js/libs.js')
//         .pipe(rename('libs.min.js'))
//         .pipe(gulp.dest('app/js'))
// });

gulp.task('js-lib', function(){
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/slick/dist/slick.min.js',
        'app/libs/js-custom-select/js/customSelect.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});
gulp.task('js', function(){
    return gulp.src('app/js/common.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('app/js'))
});
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('clean', function() {
    return del.sync('public'); // Удаляем папку dist перед сборкой
});
gulp.task('clear', function (callback) {
    return cache.clearAll();
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // С кешированием
        // .pipe(imagemin({ // Сжимаем изображения без кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))/**/)
        .pipe(gulp.dest('public/img')); // Выгружаем на продакшен
});

gulp.task('watch', ['browser-sync', 'scss', 'js', 'js-lib'], function() {
    gulp.watch('app/scss/**/*.scss', ['scss']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('build', ['clean', 'img', 'scss', 'js'], function(){
    var buildCss = gulp.src('app/css/**/*.*')
        .pipe(gulp.dest('public/css'));

    var buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('public/fonts'));

    var buildJs = gulp.src('app/js/**/*.min.js')
        .pipe(gulp.dest('public/js'));

    var buildHTML= gulp.src('app/*.html')
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['watch']);