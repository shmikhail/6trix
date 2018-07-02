document.body.onload = function() {
    setTimeout(function() {
        var preloader = $('#page-preloader'),
            pageWrapper = $('.page-wrapper');

        if ( !preloader.hasClass('done')) {
            preloader.addClass('done');
            pageWrapper.addClass('done');
            wowInitialization();
        }
    }, 200);
}

function wowPreloader() {
    // Common
    $('.headline').addClass('wow fadeInDown');
    $('.headline + p').addClass('wow fadeInRight');



    // Header
    // $('header').addClass('wow slideInDown');
    // $('header').attr('data-wow-duration', '2.4s');



    // Main
    $('.main-logo__trix').addClass('wow fadeIn');
    $('.main-logo__trix').attr('data-wow-delay', '0.1s');
    $('.main-logo__underground').addClass('wow fadeIn');
    $('.main-logo__underground').attr('data-wow-delay', '0.5s');

    $('.main-list__item, .main-list__item .main-description').addClass('wow');
    $('.main-list__item').attr('data-wow-duration', '1.1s');
    $('.main-list__item').eq(0).addClass('fadeIn').attr('data-wow-delay', '0.8s');
    $('.main-list__item').eq(0).find('.main-description').addClass('fadeIn').attr('data-wow-delay', '1.0s');
    $('.main-list__item').eq(3).addClass('fadeIn').attr('data-wow-delay', '1.1s');
    $('.main-list__item').eq(3).find('.main-description').addClass('fadeIn').attr('data-wow-delay', '1.3s');
    $('.main-list__item').eq(4).addClass('fadeIn').attr('data-wow-delay', '1.4s');
    $('.main-list__item').eq(4).find('.main-description').addClass('fadeIn').attr('data-wow-delay', '1.6s');
    $('.main-list__item').eq(1).addClass('fadeIn').attr('data-wow-delay', '1.7s');
    $('.main-list__item').eq(1).find('.main-description').addClass('fadeIn').attr('data-wow-delay', '1.9s');
    $('.main-list__item').eq(5).addClass('fadeIn').attr('data-wow-delay', '2.0s');
    $('.main-list__item').eq(5).find('.main-description').addClass('fadeIn').attr('data-wow-delay', '2.2s');
    $('.main-list__item').eq(2).addClass('fadeIn').attr('data-wow-delay', '2.3s');
    $('.main-list__item').eq(2).find('.main-description').addClass('fadeIn').attr('data-wow-delay', '2.5s');

    $('.main-btn-wrapper, .scroll-down').addClass('wow fadeInUp');
    $('.main-btn-wrapper').attr('data-wow-delay', '0.9s');
    $('.scroll-down').attr('data-wow-delay', '1.5s');



    // About
    var aboutItem = $('.about-content>*');

    for ( i=0; i < aboutItem.length; i++ ) {
        aboutItem.eq(i).addClass('wow fadeInUp');
        aboutItem.eq(i).attr('data-wow-delay', (i+2)+'00ms');
    }  

    $('.about-decor .clouds').addClass('wow fadeInLeft');
    $('.about-decor .people').addClass('wow fadeInRight');
    $('.about-decor .people').attr('data-wow-delay', '0.25s');



    // Products
    var ploItem = $('.products-list_first .products-list__item'),
        pluItem = $('.products-list_second .products-list__item');

    for ( i=0; i < ploItem.length; i++ ) {
        if ( i >= (pluItem.length+1) ) {
            ploItem.eq(i).addClass('wow fadeInLeft');
            ploItem.eq(i).attr('data-wow-delay', (i+pluItem.length)+'00ms');
        }
        else {
            ploItem.eq(i).addClass('wow fadeInLeft');
            ploItem.eq(i).attr('data-wow-delay', (i*2)+'00ms');            
        }
    }
    for ( i=0; i < pluItem.length; i++ ) {
        pluItem.eq(i).addClass('wow fadeInRight');
        pluItem.eq(i).attr('data-wow-delay', ((i+1)*2-1)+'00ms');
    }



    // Articles
    var artSliderItem = $('.article-slider__item');
    for ( i=0; i < 6; i++ ) {
        artSliderItem.eq(i).addClass('wow flipInX');
        artSliderItem.eq(i).attr('data-wow-delay', (i*2)+'00ms');
    }




    // Contacts 
    var contactsListItem = $('.contacts-list__item');
    for ( i=0; i < contactsListItem.length; i++ ) {
        contactsListItem.eq(i).addClass('wow fadeInRight');
        contactsListItem.eq(i).attr('data-wow-delay', ((i*3)+contactsListItem.length)+'00ms');
    }

    $('.contacts-form h2').addClass('wow fadeIn');
    $('.contacts-form h2').attr('data-wow-delay', '.5s');

    var contactsFormItem = $('.contact-form__item');
    contactsFormItem.addClass('wow');
    $('.contact-form__item_half').addClass('flipInX');
    $('.contact-form__item_full').addClass('flipInY');
    $('.contact-form__item_check, .contact-form__item_button').addClass('fadeInUp');
    for ( i=0; i < contactsFormItem.length; i++ ) {
        contactsFormItem.eq(i).attr('data-wow-delay', i+'50ms');
    }



    // Gears
    var gearsList = $('.gears-list');
    for ( l=0; l < gearsList.length; l++ ) {
        var gearsItem = gearsList.eq(l).find('.gears-list__item');

        for ( i=0; i < gearsItem.length; i++ ) {
            gearsItem.eq(i).addClass('wow flipInX');
            gearsItem.eq(i).attr('data-wow-delay', (i+l)+'50ms');
        }        
    }



    // News
    var newsItem = $('.news-item');
    for ( i=0; i < newsItem.length; i++ ) {
        newsItem.eq(i).addClass('wow flipInX');
        newsItem.eq(i).attr('data-wow-delay', i+'00ms');
    }    



    $('.wow').addClass('hiddenWow');

};

wowPreloader();

function wowInitialization() {
    new WOW().init();

    setTimeout(function() {
        $('.wow').removeClass('hiddenWow');
        $('header').addClass('slided');
    }, 100);
}






























































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