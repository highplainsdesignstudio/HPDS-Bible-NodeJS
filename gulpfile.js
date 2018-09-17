var gulp = require('gulp');

gulp.task('build-dev', function() {

    gulp.src(['!BibleApp/dist/BibleApp/index.html', 'BibleApp/dist/BibleApp/**.*'])
        .pipe(gulp.dest('public'));

    gulp.src('BibleApp/dist/BibleApp/index.html')
        .pipe(gulp.dest('views'));
});