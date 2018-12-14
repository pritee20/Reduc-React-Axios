/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

var args = require('yargs').argv,
    path = require('path'),
    fs = require('fs'),
    del = require('del'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    gulpsync = $.sync(gulp),
    webpack = require('webpack'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// production mode (see build task)
// Example:
//    gulp --prod
var isProduction = true;

if (isProduction)
    log('Starting production build...');

// styles sourcemaps
var useSourceMaps = false;

// Switch to sass mode.
// Example:
//    gulp --usesass
var useSass = true; // args.usesass // ReactJS project defaults to SASS only

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;

// MAIN PATHS
var paths = {
    app: 'static/',
    dist: 'build/',
    markup: 'jade/',
    styles: 'sass/',
    scripts: 'jsx/',
    fonts : 'fonts/'
};

// if sass -> switch to sass folder
if (useSass) {
    log('Using SASS stylesheets...');
    paths.styles = 'sass/';
}

// VENDOR CONFIG
var vendor = {
    source: path.join(__dirname, './config/vendor.json'),
    dist: paths.dist + 'vendor',
    bundle: {
        js: 'vendor.bundle.js',
        css: 'vendor.bundle.css'
    }
};

// SOURCES CONFIG
var source = {
    // scripts: {
    //     app: [paths.app + paths.scripts + '**/*.{jsx,js}'],
    //     entry: [paths.app + paths.scripts + 'index.js']
    // },
    templates: {
        index: paths.app + 'index.html'
    },
    styles: {
        app: [paths.app + paths.styles + '*.*'],
        themes: [paths.app + paths.styles + 'themes/*', ignored_files],
        watch: [paths.app + paths.styles + '**/*', '!' + paths.app + paths.styles + 'themes/*']
    },
    images: [paths.app + 'img/**/*'],
    fonts: [
        paths.app + 'fonts/*.{ttf,woff,woff2,eof,svg}'
    ],
    serverAssets: [paths.app + 'server/**/*']
};

// BUILD TARGET CONFIG
var build = {
    scripts: paths.dist + 'js',
    styles: paths.dist + 'css',
    images: paths.dist + 'img',
    fonts: paths.dist + 'fonts',
    serverAssets: paths.dist + 'server'
};

// PLUGINS OPTIONS

var vendorUglifyOpts = {
    mangle: {
        except: ['$super'] // rickshaw requires this
    }
};

var cssnanoOpts = {
    safe: true,
    discardUnused: false,
    reduceIdents: false

};


// VENDOR BUILD
// copy file from bower folder into the app vendor folder
gulp.task('vendor', function() {
    log('Copying vendor assets..');

    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    var cssFilter = $.filter('**/*.css', {
        restore: true
    });
    var imgFilter = $.filter('**/*.{png,jpg}', {
        restore: true
    });
    var fontsFilter = $.filter('**/*.{ttf,woff,woff2,eof,svg}', {
        restore: true
    });

    var vendorSrc = JSON.parse(fs.readFileSync(vendor.source, 'utf8'));

    return gulp.src(vendorSrc, {
            base: 'bower_components'
        })
        .pipe($.expectFile(vendorSrc))
        .pipe(jsFilter)
        .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
        .pipe($.concat(vendor.bundle.js))
        .pipe(gulp.dest(build.scripts))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.concat(vendor.bundle.css))
        .pipe(gulp.dest(build.styles))
        .pipe(cssFilter.restore())
        .pipe(imgFilter)
        .pipe($.flatten())
        .pipe(gulp.dest(build.images))
        .pipe(imgFilter.restore())
        .pipe(fontsFilter)
        .pipe($.flatten())
        .pipe(gulp.dest(build.fonts));

});

// APP LESS
gulp.task('styles:app', function() {
    log('Building application styles..');
    return gulp.src(source.styles.app)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe(useSass ? $.sass() : $.less())
        .on("error", handleError)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

// APP RTL
gulp.task('styles:app:rtl', function() {
    log('Building application RTL styles..');
    return gulp.src(source.styles.app)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe(useSass ? $.sass() : $.less())
        .on("error", handleError)
        .pipe($.rtlcss())
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe($.rename(function(path) {
            path.basename += "-rtl";
            return path;
        }))
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

// LESS THEMES
gulp.task('styles:themes', function() {
    log('Building application theme styles..');
    return gulp.src(source.styles.themes)
        .pipe(useSass ? $.sass() : $.less())
        .on("error", handleError)
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts', function() {
    return gulp.src(source.fonts)
        .pipe($.flatten())
        .pipe(gulp.dest(build.fonts))
});

gulp.task('images', function() {
    return gulp.src(source.images)
        .pipe(gulp.dest(build.images))

});

gulp.task('server-assets', function() {
    return gulp.src(source.serverAssets)
        .pipe(gulp.dest(build.serverAssets))
});

gulp.task('templates:index', function() {
    return gulp.src(source.templates.index)
        .pipe(gulp.dest(paths.dist))
});

//---------------
// MAIN TASKS
//---------------

// build for production (no watch)
gulp.task('build', gulpsync.sync([
    'vendor',
    'assets'
]));

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function() {
    useSourceMaps = true;
});

// default (no minify)
gulp.task('default', gulpsync.sync([
    'vendor',
    'assets',
    'watch'
]));

gulp.task('assets', [
    'fonts',
    'images',
    'server-assets',
    'styles:app',
    'styles:app:rtl',
    'styles:themes',
    'templates:index'
]);

// Remove all files from dist folder
gulp.task('clean', function(done) {
    log('Clean dist folder..');
    del(paths.dist, {
        force: true // clean files outside current directory
    }, done);
});

/////////////////////

function done() {
    log('************');
    log('* All Done * You can start editing your code, BrowserSync will update your browser after any change..');
    log('************');
}

// Error handler
function handleError(err) {
    log(err.toString());
    this.emit('end');
}

// log to console using
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}




