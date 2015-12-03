var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var livereload = require('gulp-livereload');


function bundle(bundler) {
    return bundler
        .bundle()
        .on('error', function (e) {
            gutil.log(e);
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'))
        .on('change', livereload.changed);

}

gulp.task('watch', function () {
    var watcher = watchify(browserify('./app.js'));
    bundle(watcher);
    watcher.on('update', function () {
        bundle(watcher);
    });

    livereload.listen({
        https: true
    });
    watcher.on('log', gutil.log);
});


gulp.task('js', function () {
    return bundle(browserify('./app.js'));
});