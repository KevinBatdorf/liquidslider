var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var log = require('gulplog');
var babelify = require('babelify');

gulp.task('browserify', function () 
{    
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: ['./src/js/jquery.liquidslider.npm.demo.js'], // Source name
    debug: true,
    paths: ['./node_modules']
  });

  return b
    .transform(babelify, {
	  	"global": true
		,"presets": [
            "@babel/env"
          ]
        ,"plugins" : [
            "@babel/plugin-transform-arrow-functions"
          ]
		,sourceMaps:true
	})
  	.bundle()  	
    .pipe(source('jquery.liquidslider.npm.demo.min.js'))// Resulting filename
    .pipe(buffer())
    
    .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    
    .pipe(uglify())
    .on('error', log.error)
    .pipe(sourcemaps.write('./js/'))
    .pipe(gulp.dest('./js/'));
});