var gulp = require('gulp');
var gp_concat = require('gulp-concat');
var gp_rename = require('gulp-rename');
var gp_uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var revReplace = require("gulp-rev-replace");
var del = require('del');

var opt = {
    distFolder: './dist',
    srcFolder: '.'
};

gulp.task('build', ['js-app', 'js-vendor', 'sass', 'vendor-css'], function () {});

gulp.task('default', ['clean', 'build'], function () {});

gulp.task('prod', ['clean', 'buildIndex'], function () {});



var app = ['./components/commun/constant/*.js',
    './components/commun/navigation/*.js',
    './components/commun/service/*.js',
    './components/commun/ng-draggable/*.js',
    './components/commun/select-complex/*.js',
    './components/commun/select-complex-mobile/*.js',
    './components/commun/expanded-search-bar/uisearch.js',
    './components/commun/expanded-search-bar/expanded-search-bar.js',
    './components/commun/*.js',
    './components/home/*.js',
    './components/cgus/*.js',
    './components/banque/service/*.js',
    './components/banque/ajout/*.js',
    './components/banque/ajout/bi/*.js',
    './components/banque/ajout/bk/*.js',
    './components/banque/admin/*.js',
    './components/banque/banque.js',
    './components/banque/banque-msg.js',
    './components/banque/admin/actions-utilisateurs/*.js',
    './components/banque/admin/*.js',
    './components/ventilation/consultation/consultation.js',
    './components/ventilation/consultation/ajout-compte.js',
    './components/ventilation/consultation/filtre-consultation.js',
    './components/ventilation/consultation/repartition-operation.js',
    './components/ventilation/consultation/consultation-navigation.js',
    './components/ventilation/consultation/consultation-mot-cle.js',
    './components/ventilation/consultation/consultation-mobile.js',
    './components/ventilation/depense-pro/depense-pro.js',
    './components/ventilation/depense-pro/filtre-depense-pro.js',
    './components/ventilation/depense-pro/depense-pro-service.js',
    './components/ventilation/ventilation.js',
    './components/ventilation/ventilation-msg.js',
    './components/ventilation/select-affectation/*.js',
    './components/export-comptable/*.js',
    './components/mots-cles/mots-cles.js',
    './components/mots-cles/mots-cles-popup.js',
    './components/parametre/*.js',
    './components/comparatif/*.js',
    './components/od/*.js',
    './cr.js'
];


gulp.task('js-app', function () {
    return gulp.src(app)
        .pipe(gp_concat('app.js'))
        .pipe(gulp.dest(opt.distFolder))
        .pipe(gp_rename('app.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest(opt.distFolder));
});


var vendor = ['./vendor/jquery/dist/jquery.min.js',
    './vendor/underscore/underscore-min.js',
    './vendor/modernizr/modernizr.js',
    './vendor/iscroll/build/iscroll.js',
    './vendor/classie/classie.js',
    './vendor/angular/angular.js',
    './vendor/angular-route/angular-route.min.js',
    './vendor/angular-resource/angular-resource.min.js',
    './vendor/angular-cookies/angular-cookies.min.js',
    './vendor/angular-foundation/mm-foundation-tpls.min.js',
    './vendor/angular-i18n/angular-locale_fr-fr.js',
    './vendor/angular-touch/angular-touch.min.js',
    './vendor/angular-utils-pagination/dirPagination.js',
    './vendor/angular-messages/angular-messages.min.js',
    './vendor/angular-filter/dist/angular-filter.min.js',
    './vendor/angular-touch/angular-touch.min.js',
    './vendor/moment/min/moment.min.js',
    './vendor/moment/locale/fr.js',
    './vendor/file-saver.js/FileSaver.js',
    './vendor/jquery-ui/jquery-ui.min.js',
    './vendor/jquery-ui/ui/minified/i18n/datepicker-fr.min.js',
    './vendor/pidcrypt/pidcrypt_util_c.js',
    './vendor/pidcrypt/pidcrypt_c.js',
    './vendor/pidcrypt/rsa_c.js',
    './vendor/pidcrypt/asn1_c.js',
    './vendor/pidcrypt/jsbn_c.js',
    './vendor/pidcrypt/rng_c.js',
    './vendor/pidcrypt/prng4_c.js',
    './vendor/pidcrypt/prng4_c.js',
    './vendor/jquery.scrollTo/jquery.scrollTo.min.js',
    './vendor/nanoscroller/bin/javascripts/jquery.nanoscroller.min.js',
    './vendor/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
    './vendor/StickyTableHeaders/js/jquery.stickytableheaders.min.js',
    './vendor/angular-svg-round-progressbar/build/roundProgress.min.js',
    './vendor/d3/d3.min.js',
    './vendor/angular-piwik/angular-piwik.js',
    './vendor/detectizr/dist/detectizr.min.js'
];

gulp.task('js-vendor', function () {
    return gulp.src(vendor)
        .pipe(gp_concat('vendor.js'))
        .pipe(gulp.dest(opt.distFolder))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest(opt.distFolder));
});

gulp.task('sass', function () {
    gulp.src('./stylesheets/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gp_rename('cr-app.min.css'))
        .pipe(gulp.dest(opt.distFolder));
});

gulp.task('vendor-css', function () {
    return gulp.src('./vendor/nanoscroller/bin/css/nanoscroller.css')
        .pipe(gp_concat('cr-vendor.css'))
        .pipe(minifyCss({
            compatibility: 'ie8'
        }))
        .pipe(gp_rename('cr-vendor.min.css'))
        .pipe(gulp.dest(opt.distFolder));
});


gulp.task('revision', ['build'], function () {
    return gulp.src(["dist/**/*.css", "dist/**/*.js"])
        .pipe(rev())
        .pipe(gulp.dest(opt.distFolder))
        .pipe(rev.manifest())
        .pipe(gulp.dest(opt.distFolder));
});

gulp.task('buildIndex', ['revision'], function () {
    var manifest = gulp.src(opt.distFolder + "/rev-manifest.json");

    return gulp.src(opt.srcFolder + "/index.html")
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest(opt.distFolder));
});

gulp.task('clean', function (callBack) {
    del.sync(opt.distFolder);
    // synchrone
    callBack();
});