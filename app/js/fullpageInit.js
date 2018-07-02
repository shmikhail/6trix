function fullPageFun() {
    if ( windowW >= 1920 ) {
        $('#fullpage').fullpage({
            //Навигация
            menu: '#menu',
            // lockAnchors: false,
            // anchors:['firstPage', 'secondPage'],
            navigation: false,
            navigationPosition: 'right',
            navigationTooltips: ['firstSlide', 'secondSlide'],
            showActiveTooltip: false,
            slidesNavigation: false,
            slidesNavPosition: 'bottom',

            //Скроллинг
            css3: true,
            scrollingSpeed: 700,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 1000,
            scrollBar: true,
            easing: 'easeInOutCubic',
            easingcss3: 'ease',
            loopBottom: false,
            loopTop: false,
            loopHorizontal: true,
            continuousVertical: false,
            continuousHorizontal: false,
            scrollHorizontally: false,
            interlockedSlides: false,
            dragAndMove: false,
            offsetSections: false,
            resetSliders: false,
            fadingEffect: false,
            normalScrollElements: '#element1, .element2',
            scrollOverflow: false,
            scrollOverflowReset: false,
            scrollOverflowOptions: null,
            touchSensitivity: 15,
            normalScrollElementTouchThreshold: 5,
            bigSectionsDestination: null,

            //Доступ
            keyboardScrolling: true,
            animateAnchor: true,
            recordHistory: true,

            //Дизайн
            controlArrows: true,
            verticalCentered: false,
            fixedElements: '#header, .footer',
            responsiveWidth: 0,
            responsiveHeight: 0,
            responsiveSlides: false,
            parallax: false,
            parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},

            //Настроить селекторы
            sectionSelector: '.block_viewport',
            slideSelector: '.slide',

            lazyLoading: true,

            //события
            onLeave: function(index, nextIndex, direction){},
            afterLoad: function(anchorLink, index){},
            afterRender: function(){},
            afterResize: function(){},
            afterResponsive: function(isResponsive){},
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
            onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
        });    
    } 
}

fullPageFun();