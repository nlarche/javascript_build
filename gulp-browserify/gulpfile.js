var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var browserSync = require('browser-sync').create();


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

gulp.task('watch', function () {
    var watcher = watchify(browserify('./app.js'));

    bundle(watcher);

    watcher.on('update', function () {
        bundle(watcher);
    });
    watcher.on('log', gutil.log);

    browserSync.init({
        injectChanges: true,
        files: "./components/**/**",
        proxy: {
            target: "http://10.10.40.13:8081/cr/",
            reqHeaders: function (config) {
                return {
                    "CAS-User": '----',

                };
            }
        },
        open: false

    });
});

gulp.task('sass', function () {
    gulp.src('./stylesheets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gp_rename('cr.css'))
        .pipe(gulp.dest(opt.distFolder));
});


gulp.task('js', function () {
    return bundle(browserify('./app.js'));
});