$(document).ready(function () {

	//Globbal variables
    var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
    	$window = $(window),
        body = document.getElementsByTagName('body')[0],
        windowW = window.innerWidth,
        windowH = $(window).height(),
        scrollTop = 0;


    function globalEvents (argument) {
        $('.header-menu-wrapper li').has('ul').find('a').eq(0).on('click', function(e) {
            e.preventDefault();
            console.log('Если хочешь, чтоб ссылка заработала - зайди в main.js и выруби это');
        })

        $('.scroll-down, .about-link-anchor').on('click', function(e) {
            e.preventDefault();

            $('html, body').stop().animate({
                scrollTop: ($('.block_main').height() + 72)
            }, 800);
        })
        $('.productions-link-anchor').on('click', function(e) {
            e.preventDefault();

            $('html, body').stop().animate({
                scrollTop: ($('.block_main').height() + $('.block_about').height() + 72)
            }, 800);
        })        



        $('.header-btn').on('click', function() {
            $('header').toggleClass('open');
        })        
    };


    var Slider = (function(){

        function myslider(slider) {
            var slider = slider,
                sliderLayout = slider.find('.articles-slider'),
                slide = slider.find('li'),
                divider = (Math.floor(slider.width()/slide.width())*3), // Сколько отображается записей на странице
                count = slide.length,
                sliderPage = slider.find('.acrticles-slider-nav__counter'),
                rightArrow = slider.find('.articles-slder-nav__arrow_right'),
                leftArrow = slider.find('.articles-slder-nav__arrow_left'),
                isAnimate = false,
                methods,
                slidesWidth = 0;

            methods = {

                init2 : function() {
                    slider.currentSlide = 0; // Текущий слайд первый. Индекс 0 при загрузке страницы                    
                    methods.cloning(divider); // Запускаем клонирование с учётом "делителя"

                    deviceCur = (window.innerWidth < 768) ? 0 : 1; // Текущая ширина. 0 = мобильный девайс. 1 - НЕмобильный.
                    if ( deviceCur ) { // Если девайс НЕ мобильный, то
                        deviceCur = (window.innerWidth < 1366) ? 1 : 2; // Текущая ширина. 1 = планшет. 2 - десктоп.
                    }

                    // Ресайз
                    $(window).on('resize', function() {
                        setTimeout(function() { //Таймаут из-за того, что переходы идут типа 320 - 427 - 768, вместо 320 - 768.
                            newW = window.innerWidth; // Новая ширина

                            deviceNew = (newW < 768) ? 0 : 1; // Мобильное разрешение или нет.

                            if ( deviceNew ) { // Если не мобильное, то уточняем планшет или десктоп
                                deviceNew = (newW < 1366) ? 1 : 2; // планшетное разрешение или нет.
                            }

                            if ( deviceNew === deviceCur ) { // Если тип устройства не менялся, то return
                                return
                            }

                            if ( deviceNew && deviceCur ) {
                                // Запускаем анимацию перемотки на исходное состояние
                                sliderLayout.stop(true, false).animate({'margin-left': 0},500, function(){
                                    // Останавливаем "isAniamte", чтб можно было листать дальше
                                    isAnimate = false;       
                                });
                                return
                            }

                            // Если менялось, то нужно зафиксировать смену типа устройства
                            deviceCur = deviceNew; // Тип устройства фиксируется как текущий
                            divider = (Math.floor(slider.width()/slide.width())*3); // Пересчет количества отображаемых записей на странице

                            if ( !deviceCur ) {
                                return
                            }

                            // Если новый тип устройства - НЕмобильный, то нужно проверить не находится ли слайдер на "половине" от НЕмобильного
                            checkingOffset = slide.eq(divider).position().left; // Оффсет каждой новой страницы
                            checkingMargin = parseInt(sliderLayout.css('margin-left')); // Текущий отступ слайдера
                            check = -checkingMargin % checkingOffset; // Остаток от деления

                            if ( !check ) { // Если отступ делится без остатка на "ширину" НЕмобильной страницы, то слайдер НЕ на "половине"
                                return;
                            }

                            // В ином случае необходимо пересчитать индекс и перелистнуть на пол-страницы назад
                            slider.currentSlide = (Math.floor(-checkingMargin/checkingOffset)*divider); // Пересчитываем индекс
                            check = checkingMargin + check; // ШЗначение равное текущему отступу слайдера + половине страницы НЕмобильного


                            sliderPage.text((slider.currentSlide/divider)+1);
                            
                            if ( (count/slider.currentSlide) === 1 ) {
                                sliderPage.text('1');
                            }
                            // Запускаем анимацию
                            sliderLayout.stop(true, false).animate({'margin-left': check},500, function(){
                                // Останавливаем "isAniamte", чтб можно было листать дальше
                                isAnimate = false;       
                            });
                        }, 200);
                    });












                    if (isMobile) {
                        slider.on( "swipeleft", function(){
                            if ( windowW < 1025) {
                                if (isAnimate) return false;
                                slider.currentSlide = methods.slideRight(slider.currentSlide);                                
                            }
                        });
                        slider.on( "swiperight", function(){
                            if ( windowW < 1025) {
                                if (isAnimate) return false;
                                slider.currentSlide = methods.slideLeft(slider.currentSlide);                                
                            }
                        });
                    }

                    rightArrow.on('click', function(){  // Клик вправо
                       if (isAnimate) return false      // Если анимация уже идет, то не отрабатывает   
                        // Листаем вправо с номером текущего слайда/страницы
                        // и "возвращаем" оттуда индекс, который записываем новым номером текущего слайда/страницы
                       slider.currentSlide = methods.slideRight(slider.currentSlide);                     
                    });
                    
                    leftArrow.on('click', function(){   // Клик влево
                       if (isAnimate) return false      // Если анимация уже идет, то не отрабатывает
                        // Листаем влево с номером текущего слайда/страницы
                        // и "возвращаем" оттуда индекс, который записываем новым номером текущего слайда/страницы
                       slider.currentSlide = methods.slideLeft(slider.currentSlide);
                    });

                },

                cloning: function(divider) {  
                    for ( i=((divider-1)*2); i >= 0; i-- ) {
                        slide.eq(i).clone().insertAfter(slide.last()).addClass('clone');
                    }

                    slide = slider.find('li');
                },


                slideRight: function(index){
                    // Запускаем "isAnimate", чтоб нельзя было листать пока идет анимация
                    isAnimate = true;
                    // Если страница/слайд равна "максимальной", то присваиваем индекс = 0 и запускаем "changeSlide" 
                    if (index === (count)) {
                        index = 0;
                        methods.changeSlide(index);
                    }
                    // Прибавляем к индексу +1 и запускаем "goTo"
                    if (index < count ) {
                        index = (index+divider);
                        methods.goTo(index);
                    }
                    // "Сохраняем" индекс, этот номер (+1) получит текущий слайд
                    return index;
                },

                slideLeft: function(index){
                    // Запускаем "isAnimate", чтоб нельзя было листать пока идет анимация
                    isAnimate = true;
                    // Если страница/слайд равна "максимальной", то присваиваем индекс = 0 и запускаем "changeSlide" 
                    if (index === 0) {
                        index = count;
                        methods.changeSlide(index);
                    }
                    // Прибавляем к индексу +1 и запускаем "goTo"
                    if (index > 0) {
                        index = (index-divider);
                        methods.goTo(index);
                    }
                    // "Сохраняем" индекс, этот номер (+1) получит текущий слайд
                    return index;
                },

                goTo: function(index) {
                    // Записываем позицию текущего (+1!) слайда/страницы
                    var offsetLeft = slide.eq(index).position();  

                    console.log(index);
                    sliderPage.text((index/divider)+1);
                    
                    if ( (count/index) === 1 ) {
                        sliderPage.text('1');
                    }

                    // Анимируем пролистываение на ширину, равную 
                    // левому отступу "текущего" слайда/страницы от левого края контейнера слайдера.
                    sliderLayout.stop(true, false).animate({'margin-left': -offsetLeft.left},500, function(){
                        // Останавливаем "isAniamte", чтб можно было листать дальше
                        isAnimate = false;       
                    });
                },

                changeSlide: function(index) {
                    // Записываем позицию текущего (+1!) слайда/страницы
                    var offsetLeft = slide.eq(index).position();   

                    sliderPage.text('1');
                    // Резко меняем пролистываение на ширину, равную 
                    // левому отступу "текущего" слайда/страницы от левого края контейнера слайдера.
                    sliderLayout.stop(true, false).css('margin-left', -offsetLeft.left);
                },

                resizeSlider: function(divider) {   

                }
            };

            methods.init2();
        }

        function init() {
            var slider = $('.articles-slider-wrapper');
            if (slider.length > 0) {
                myslider(slider);
            }
        }

        return {
            init: init
        }

    })();

    function placeholders() {
        $('input,textarea').focus(function(){
            $(this).data('placeholder',$(this).attr('placeholder'))
            $(this).attr('placeholder','');
        });

        $('input,textarea').blur(function(){
            $(this).attr('placeholder',$(this).data('placeholder'));
        });        
    };
   

    function globalInit() {
		globalEvents();
        Slider.init();
        placeholders();
	};

	globalInit();
}); 



















































    // function ajax() {
    //     $('#callback_ajax').click(function(e){
    //         var user_tel = $('#user_tel').val();
    
    //         $.ajax({
    //             url: "/resources/action.php", 
    //             type: "post", 
    //             dataType: "json", 
    //             data: { 
    //                 "user_tel": user_tel
    //             },
                
    //             error:function(){
    //                 $('.messages').html('<span style="color: #b90000;">Ошибка</span>');
    //             },

    //             success: function(data){
    //                 if (data.er) {
    //                     console.log(data.er + '1');


    //                     $('.messages').html(data.result);

    //                     return;
    //                 }

    //                 else {
    //                     console.log(data.er + '2');


    //                     $('.messages').html(data.result);
    //                 }
    //             }
    //         });

    //         e.preventDefault();
    //     });              
    // } 









 
        // $('.btn').on( 'click', function(e) {
        //     e.preventDefault();

        //     $('html, body').animate({
        //         'scrollTop': $( 'footer' ).position().top
        //     }, 1000);
        // });




    // function fadeTo(parent, show, callback) {
    //     var target = (function () {
    //         var output;
    //         if(parent.children().length) {
    //             output = parent.find('.out');
    //         }
    //         else {
    //             output = parent;
    //         }
    //         return output;
            
    //     })();
        

    //     if(show) {
    //         target.each(function (i) {
    //             var that = $(this);
    //             setTimeout(function () {
    //                 that.addClass('in')
    //             }, 100 * i)
    //         });
    //         if(callback) {
    //            target.last().one('transitionend', callback);
    //         }
    //     }
    //     else {
    //         //hide
    //         $(target.get().reverse()).each(function (i) {
    //             var that = $(this);
    //             setTimeout(function () {
    //                 that.removeClass('in')
    //             }, 40 * i)
    //         });
    //         if(callback) {
    //             target.last().one('transitionend', callback);
    //         }
    //     }
            
    // }


    // var scrollToSection = (function() {


    //     function init() {
    //         $('.pane-scroller').on('click', function(e) {

    //             var elementOffset = $(this).closest('section').next().offset().top;

    //             scrollTo(elementOffset, 1000);
    //         });
    //     }
            

    //     function scrollTo(to, duration, callback) {
    //         var start = position(),
    //             change = to - start,
    //             currentTime = 0,
    //             increment = 20;
    //             duration = (typeof(duration) === 'undefined') ? 500 : duration;


    //         Math.easeInOutQuad = function (t, b, c, d) {
    //             t /= d/2;
    //             if (t < 1) {
    //                 return c/2*t*t + b;
    //             }
    //             t--;
    //             return -c/2 * (t*(t-2) - 1) + b;
    //         };

    //         function move(amount) {
    //             // difficult to detect the scrolling element, just move them all
    //             document.documentElement.scrollTop = amount;
    //             document.body.parentNode.scrollTop = amount;
    //             document.body.scrollTop = amount;
    //         }
    //         function position() {
    //             return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    //         }



    //         function animateScroll(){
    //             // increment the time
    //             currentTime += increment;
    //             // find the value with the quadratic in-out easing function
    //             var val = Math.easeInOutQuad(currentTime, start, change, duration);
    //             // move the document.body
    //             move(val);
    //             // do the animation unless its over
    //             if (currentTime < duration) {
    //                 requestAnimFrame(animateScroll);
    //             }
    //             else {
    //                 if (callback && typeof(callback) === 'function') {
    //                     // the animation is done so lets callback
    //                     callback();
    //                 }
    //             }
    //         }
    //         animateScroll();
    //     }

    //     return {
    //         init : init
    //     }

    // })();