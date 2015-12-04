var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var browserSync = require('browser-sync').create();
var url = require('url');
var proxyMiddleware = require('http-proxy-middleware');
var sass = require('gulp-sass');


function bundle(bundler) {
    return bundler
        .bundle()
        .on('error', function (e) {
            gutil.log(e);
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());

}

var proxy = proxyMiddleware(['/fonts/**', '/images/**', '/rest/**', '/angular/**/*.html'], {
    target: 'http://10.10.40.13:8081/cr/',
    port: 3002,
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        // add custom header to request
        proxyReq.setHeader('CAS-User', '---------');
    }

});

gulp.task('watch', function () {

    var watcher = watchify(browserify('./app.js'));

    bundle(watcher);

    watcher.on('update', function () {
        bundle(watcher);
    });
    watcher.on('log', gutil.log);

    gulp.watch('./stylesheets/**/*.scss', ['sass']);
    gulp.watch("components/**/*.html").on('change', browserSync.reload);

    browserSync.init({
        server: {
            baseDir: ".",
            middleware: [proxy]
        },
        open: true

    });
});

gulp.task('sass', function () {
    gulp.src('./stylesheets/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});


gulp.task('js', function () {
    return bundle(browserify('./app.js'));
});
