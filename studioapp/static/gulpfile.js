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
    return gulp.src('/sass/default.+(scss|sass)') //
        .pipe(sass())
        .pipe(gulp.dest('/css'))
        .pipe(browserSync.reload({stream: true}))
});
//css
gulp.task('css-libs', ['sass'], function(){
    return gulp.src('/css/default.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('/css'));
});
//autoprefixer
gulp.task('auto', function () {
    return gulp.src('/app.css')
        .pipe(auto({
            browsers: ['last 8 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('/css'));
});
gulp.task('watch', ['css-libs', 'sass', 'auto'], function(){
    gulp.watch('/sass/**/*.scss', ['sass']);
    gulp.watch('/**/*.html', browserSync.reload);
    // gulp.watch('app/js/**/*.js', browserSync.reload);
});
