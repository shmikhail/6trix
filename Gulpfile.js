/*=============================
=            BASE             =
=============================*/

var gulp 		 	= require('gulp'),
    browserSync 	= require('browser-sync'),
    del          	= require('del'),
    autoprefixer 	= require('gulp-autoprefixer'),
    cache        	= require('gulp-cache'),
	concat 		 	= require('gulp-concat'),
    csscomb      	= require('gulp-csscomb'),
    cssnano      	= require('gulp-cssnano'),
	gulpFilter 	 	= require('gulp-filter'),
	ftp 			= require('gulp-ftp'),
	gulpif 		 	= require('gulp-if'),
	imagemin 	 	= require('gulp-imagemin'),
    livereload 		= require('gulp-livereload'),	
	newer 		 	= require('gulp-newer'),
	plumber 	 	= require('gulp-plumber'),
    rename       	= require('gulp-rename'),
	rimraf 		 	= require('gulp-rimraf'),
	sass 		 	= require('gulp-sass'),
	sftp 			= require('gulp-sftp'),
    uglify       	= require('gulp-uglifyjs'),
    util			= require('gulp-util'),
    spritesmith  	= require('gulp.spritesmith'),
    pngquant     	= require('imagemin-pngquant'),
	mainBowerFiles 	= require('main-bower-files'),
	neat 			= require('node-neat').includePaths,
	runSequence 	= require('run-sequence'),
	args 			= require('yargs').argv,
	fs 				= require('fs');


var allTasks 		= ['sass', 'icons', 'fonts', 'images', 'html', 'wp', 'js'];



// Для GulpIf

	// Распарсить файл 'config.json'
var config = JSON.parse(fs.readFileSync('config.json'));

	// Для устаревших вариантов минификации в тасках images, js, sripts (рекомендуется заменить)
var min = args.min || false;

	// Проверка передачи аргумента "upload" в консоли(терминале).
	// Если аргумент передан (gulp --to upload), то Upload = 1, Loc = 0.
	// Если аргумент не передан (gulp), то Upload = 0, Loc = 1.
var upload = (args.to == "upload") ? true : false;
var loc = (args.to == "upload") ? false : true;




// Path variables:

	// Определение основных корневых директорий проекта
var base = {
	src:	'app/',	
	dist:	'dist/',
	temp:	'temp/',
	bower: 	'bower_components'
}

	// Если (gulp --to {developer-name}), то заменить директорию dist на то, что указано в 'config.json'
if( args.to in config.developers ) {
	base.dist = config.developers[args.to];
}

	// Определение директорий в src (app/)
var srcPaths = {
	html: 	base.src + 'html/**/*',
	wp:		base.src + 'wp-theme/**/*',
	js: 	base.src + 'js/**/*.js',
	sass:	base.src + 'sass/**/*.+(scss|sass|less)',
	images: base.src + 'images/**/*.+(jpg|png|svg)',
	fonts:  base.src + 'fonts/**/*'
}

	// Определение директорий в dist (dist/)
var distPaths = {
	css:	base.dist + 'css',
	fonts: 	base.dist + 'fonts',
	html:	base.dist,
	images: base.dist + 'images',
	js:		base.dist + 'js'
}




// Tasks:

	// Два варианта таска для browser-sync. Первый для локальных серверов, второй для удаленных (не настроен)
gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: base.dist //папка, которая будет сервером
    },
    notify: false //отключаем уведомления
  });
});
// gulp.task('browser-sync', function(){
//   browserSync({
// 	proxy: 		'https://6trix.com/', 	// проксирование вашего удаленного сервера
// 	logPrefix: 	'6trix.com', 			// префикс для лога bs, маловажная настройка 
//     host:      	'6trix.com', 			// можно использовать ip сервера
//     open: 		'external', 			// указываем, что наш url внешний 
//     port: 		8080,
//     notify: 	true, 					//отключаем уведомления
//     ghost:    	true
//   });
// });



	// Таск 'watch' с проверкой - передается ли (--to upload).
		// Если (gulp --to upload), идет работа с livereload (необходима установка расширения в браузере)
		// Если (gulp), идет работа локально с browser-sync
gulp.task('watch', ['sass', 'icons', 'fonts', 'images', 'html', 'wp', 'js'], function() {
	if (upload) {
		livereload.listen();
	}
	gulp.watch(srcPaths.sass, ['sass']);
	gulp.watch(srcPaths.js, ['js']);
	gulp.watch(srcPaths.html, ['html'] );
	gulp.watch(srcPaths.wp, ['wp'] );
	gulp.watch(srcPaths.fonts, ['fonts'] );
	gulp.watch(srcPaths.fonts, ['icons'] );
	gulp.watch(srcPaths.images, ['images'] );
}); 



	// Таск 'build'
gulp.task('build', ['clean', 'sass', 'icons', 'fonts', 'images', 'html', 'wp', 'js'], function(cb) {
	runSequence('sass', 'icons', 'fonts', 'images', 'html', 'wp', 'js')							
})



	// Таск дефолт
gulp.task('default', ['watch'], function(cb) {	
	if( upload ) {
		runSequence('clean', 'sass', 'icons', 'fonts', 'images', 'html', 'wp', 'js')
	}
	else {
		runSequence('browser-sync', ['sass', 'icons', 'fonts', 'images', 'html', 'wp', 'js'])
	}	
});
/*=====  End of BASE  ======*/





/*=============================
=            TOOLS            =
=============================*/

// Таск 'upload'. С "потоком" livereload
	// Можно заменять ftp на sftp и наоборот
if( args.to in config ) {
	gulp.task('upload', function(){
		return gulp.src(base.dist + '**/*')
			.pipe(ftp({
			host: config.upload.host,
			user: config.upload.log,
			pass: config.upload.pass,
			remotePath: config.upload.dest
		}))

		.pipe(livereload());
	});
}



// Таск очистки
gulp.task('clean', function(cb) {
	return del.sync([base.dist, base.temp])	
});



gulp.task('clear', function(){
	return cache.clearAll()  
});

/*=====  End of TOOLS  ======*/





/*====================================
=            STYLES TASKS            =
====================================*/

// С двумя вариантами обработки sass. Первый с учетом neat-bourbon
// С вариантом минификации и формирования файла min.css
gulp.task('sass', function() {
	return gulp.src(srcPaths.sass) 
		.pipe(newer(distPaths.css))

		// Первый вариант обработки sass - с учетом neat-bourbon (если тот установлен)
	    .pipe(sass.sync({
	    	includePaths: [].concat(neat),
	    	outputStyle: 'expanded'
	    }))

	    // Второй вариант обработки sass. Обычный
        // .pipe(sass())

        // Автопрефиксер и mycsscomb
        .pipe(autoprefixer([
            'last 15 versions', '> 1%', 'ie 8', 'ie 7'
          ], {cascade: true}))
        .pipe(csscomb('mycsscomb.json'))

        // Дист css
	    .pipe(gulp.dest(distPaths.css))

	    // Делаем минифицированную копию диста css с префиксом, дистим ее.
		.pipe(cssnano())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest(distPaths.css))

		// Если передается аргумент (--to upload), заливаем на сервер
		// Можно заменять ftp на sftp и наоборот
	    .pipe(gulpif(upload, ftp({
			host: config.upload.host,
			user: config.upload.log,
			pass: config.upload.pass,
			remotePath: config.upload.dest + 'css'
		})))

	    // Если передается аргумент (--to upload), работаем с livereload
	    // Иначе работаем с browsersync
	    .pipe(gulpif(loc, browserSync.reload({
	    	stream: true
    	})))
	    .pipe(gulpif(upload, livereload()))    
});



gulp.task('images', function() {
	return gulp.src(srcPaths.images)
		// .pipe(newer(distPaths.images))

		// Сжатие изображений
  //       .pipe(cache(imagemin({
		// progressive: true,
		// optimizationLevel: 5,        	
  //         svgoPlugins: [{removeViewBox: false}],
  //         une: [pngquant()]
  //       })))	

        // Дист изображений	
		.pipe(gulp.dest(distPaths.images))

		// Если передается аргумент (--to upload), заливаем на сервер
		// Можно заменять ftp на sftp и наоборот
		.pipe(gulpif(upload, ftp({
			host: config.upload.host,
			user: config.upload.log,
			pass: config.upload.pass,
			remotePath: config.upload.dest + 'images'
		})))	

	    // Если передается аргумент (--to upload), работаем с livereload
	    // Иначе работаем с browsersync
	    .pipe(gulpif(loc, browserSync.reload({
	    	stream: true
    	})))
	    .pipe(gulpif(upload, livereload()))      	    
});



// В bower.json для установки bower install по дефолту прописана установка font-awesome
	// Таск по умолчанию ищет иконки в соответствующей директории "bower_components"
gulp.task('icons', function() {
	return gulp.src(base.bower + '/font-awesome/fonts/**.*')

		// Дист иконок
		.pipe(gulp.dest(distPaths.fonts + '/fa'))	

		// Если передается аргумент (--to upload), заливаем на сервер
		// Можно заменять ftp на sftp и наоборот
		.pipe(gulpif(upload, ftp({
			host: config.upload.host,
			user: config.upload.log,
			pass: config.upload.pass,
			remotePath: config.upload.dest + 'fonts'
		})))

	    // Если передается аргумент (--to upload), работаем с livereload
	    // Иначе работаем с browsersync
	    .pipe(gulpif(loc, browserSync.reload({
	    	stream: true
    	})))
	    .pipe(gulpif(upload, livereload()))         
});



gulp.task('fonts', function() {
	return gulp.src(srcPaths.fonts)

		// Дист шрифтов
		.pipe(gulp.dest(distPaths.fonts))

		// Если передается аргумент (--to upload), заливаем на сервер
		// Можно заменять ftp на sftp и наоборот
        .pipe(gulpif(upload, ftp({
            host: config.upload.host,
            user: config.upload.log,
            pass: config.upload.pass,
            remotePath: config.upload.dest + 'fonts'
        })))

	    // Если передается аргумент (--to upload), работаем с livereload
	    // Иначе работаем с browsersync
	    .pipe(gulpif(loc, browserSync.reload({
	    	stream: true
    	})))
	    .pipe(gulpif(upload, livereload()))      	    
});

/*=====  End of STYLES TASKS  ======*/





/*==================================
=            HTML TASKS            =
==================================*/

gulp.task('html', function() {
	return gulp.src(srcPaths.html)
		.pipe(newer(distPaths.html))

		// Дист html
		.pipe(gulp.dest(distPaths.html))

		// Если передается аргумент (--to upload), заливаем на сервер
		// Можно заменять ftp на sftp и наоборот
		.pipe(gulpif(upload, ftp({
			host: config.upload.host,
			user: config.upload.log,
			pass: config.upload.pass,
			remotePath: config.upload.dest + 'html'
		})))

	    // Если передается аргумент (--to upload), работаем с livereload
	    // Иначе работаем с browsersync
	    .pipe(gulpif(loc, browserSync.reload({
	    	stream: true
    	})))
	    .pipe(gulpif(upload, livereload()))     	    
});

gulp.task('wp', function() {
	return gulp.src(srcPaths.wp)
		.pipe(newer(distPaths.html))

		// Дист php
		.pipe(gulp.dest(distPaths.html))

		// Если передается аргумент (--to upload), заливаем на сервер
		// Можно заменять ftp на sftp и наоборот
		.pipe(gulpif(upload, ftp({
			host: config.upload.host,
			user: config.upload.log,
			pass: config.upload.pass,
			remotePath: config.upload.dest
		})))

	    // Если передается аргумент (--to upload), работаем с livereload
	    // Иначе работаем с browsersync
	    .pipe(gulpif(loc, browserSync.reload({
	    	stream: true
    	})))
	    .pipe(gulpif(upload, livereload()))      	    
});

/*=====  End of HTML TASKS  ======*/





/*=====================================
=            SCRIPTS TASKS            =
=====================================*/

// Таск дожидается выполнения тасков bower и scripts
// Для изменений берутся файлы из "temp"
gulp.task('js', ['bower', 'scripts'],  function() {
	return gulp.src(base.temp + '*.js')

		// Таск собирает plugin.js из js-файлов в директории temp
		.pipe(concat('plugins.js'))
		
		.pipe(gulpif(min, uglify()))

		// Дист plugin.js (и main.js?)
		.pipe(gulp.dest(distPaths.js))

		// Если передается аргумент (--to upload), заливаем на сервер
		// Можно заменять ftp на sftp и наоборот
		.pipe(gulpif(upload, ftp({
			host: config.upload.host,
			user: config.upload.log,
			pass: config.upload.pass,
			remotePath: config.upload.dest + 'js'
		})))

	    // Если передается аргумент (--to upload), работаем с livereload
	    // Иначе работаем с browsersync
	    .pipe(gulpif(loc, browserSync.reload({
	    	stream: true
    	})))
	    .pipe(gulpif(upload, livereload()))      	    
});  



// Таск берет файлы bower
gulp.task('bower', function() {
	return gulp.src(mainBowerFiles())

		// В папке bower-components собираются js-файлы
		.pipe(gulpFilter('*.js'))

		// Дист в директорию temp, откуда они будут взяты таском js
		.pipe(gulp.dest(base.temp));
});



gulp.task('scripts', function() {
	return gulp.src(srcPaths.js)
		.pipe(newer(distPaths.js))

		// Дист основных js-файлов, не ялвяющихся плагинами (bower)
		.pipe(gulpif(min, uglify()))
		.pipe(gulp.dest(distPaths.js))

		// Если передается аргумент (--to upload), заливаем на сервер
		// Можно заменять ftp на sftp и наоборот
		.pipe(gulpif(upload, ftp({
			host: config.upload.host,
			user: config.upload.log,
			pass: config.upload.pass,
			remotePath: config.upload.dest + 'js'
		})))
});

/*=====  End of SCRIPTS TASKS  ======*/








