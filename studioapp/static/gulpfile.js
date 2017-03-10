var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    auto        = require('gulp-autoprefixer');

//SASS
gulp.task('sass', function(){
    return gulp.src('app/sass/default.+(scss|sass)') //
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});
//css
gulp.task('css-libs', ['sass'], function(){
    return gulp.src('app/css/default.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});
//autoprefixer
gulp.task('auto', function () {
    return gulp.src('app/app.css')
        .pipe(auto({
            browsers: ['last 8 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'));
});
gulp.task('watch', ['css-libs', 'sass', 'auto'], function(){
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', browserSync.reload);
    // gulp.watch('app/js/**/*.js', browserSync.reload);
});
