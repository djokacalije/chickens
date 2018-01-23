var gulp =  require('gulp');
var watch =  require('gulp-watch');
var sass =  require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function(){
    return gulp.src('./style/style.scss')
      .pipe(sass())
      .pipe(autoprefixer({
        browsers:['last 2 versions'],
        cascade:false
      }))
      .on('error', function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit('end');
      })
      .pipe(gulp.dest('style/css/'))
  });


  gulp.task('watch', function() {

    browserSync.init({
      notify: false,
      server: {
        baseDir: "./"
      }
    });
  
    watch('./index.html', function() {
      browserSync.reload();
    });
  
    watch('./style/**/*.scss', function() {
      gulp.start('cssInject');
    });

    watch('./js/*js',function(){
      browserSync.reload();
    })
  
  });
  
  gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./style/css/style.css')
      .pipe(browserSync.stream());
  });
  