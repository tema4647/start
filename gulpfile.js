var gulp = require('gulp'), // Подключаем Gulp

sass         = require('gulp-sass')(require('sass')), //Подключаем Sass пакет
browserSync  = require('browser-sync'), // Подключаем Browser Sync
autoprefixer = require('gulp-autoprefixer')// Подключаем библиотеку для автоматического добавления префиксов






gulp.task('sass', function() { // Создаем таск Sass
	return gulp.src('src/scss/**/*.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('src/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});
 
gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('scripts', function() {
	return gulp.src(['src/js/script.js', 'src/libs/**/*.js'])
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('code', function() {
	return gulp.src('src/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('src/scss/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами
	gulp.watch('src/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
	gulp.watch(['src/js/script.js', 'src/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
	
});




gulp.task('prebuild', async function() {

	var buildCss = gulp.src([ // Переносим css в продакшен
		'src/css/style.css'
		])
	.pipe(gulp.dest('dist/css'))

    var buildLibs = gulp.src([ // Переносим библиотеки в продакшен
		'src/libs/**/*'
		])
	.pipe(gulp.dest('dist/libs'))

    var buildImg = gulp.src([ // Переносим img в продакшен
		'src/img/**/*'
		])
	.pipe(gulp.dest('dist/img'))

	var buildFonts = gulp.src([ // Переносим шрифты в продакшен
	'src/fonts/**/*'
	]) 
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));
 
});
 

gulp.task('default', gulp.parallel('sass', 'browser-sync','scripts', 'watch'));
gulp.task('build', gulp.parallel('prebuild'));