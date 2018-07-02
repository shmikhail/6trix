<?php
/**
 * The Header for our theme.
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7 no-js" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8 no-js" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html class="no-js" <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta content='format-detection'>
    <meta content='true' name='HandheldFriendly'>
    <meta content='width' name='MobileOptimized'>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
    <title><?php wp_title( '|', true, 'right' ); ?></title>
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">


    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/favicon.ico' rel='icon' type='image/x-icon'>

    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/favicon-16x16.png' rel='shortcut icon' sizes='16x16' type='image/png'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/favicon-32x32.png' rel='shortcut icon' sizes='32x32' type='image/png'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/favicon-96x96.png' rel='shortcut icon' sizes='96x96' type='image/png'>

    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/android-icon-36x36.png' rel='icon' sizes='16x16' type='image/png'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/android-icon-36x36.png' rel='icon' sizes='36x36' type='image/png'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/android-icon-48x48.png' rel='icon' sizes='48x48' type='image/png'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/android-icon-72x72.png' rel='icon' sizes='72x72' type='image/png'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/android-icon-96x96.png' rel='icon' sizes='96x96' type='image/png'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/android-icon-144x144.png' rel='icon' sizes='144x144' type='image/png'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/android-icon-192x192.png' rel='icon' sizes='192x192' type='image/png'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/manifest.json' rel='manifest'>

    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/apple-touch-icon.png' rel='apple-touch-icon'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/apple-touch-icon-precomposed.png' rel='apple-touch-icon-precomposed'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/apple-touch-icon-57x57.png' rel='apple-touch-icon' sizes='57x57'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/apple-touch-icon-60x60.png' rel='apple-touch-icon' sizes='60x60'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/apple-touch-icon-72x72.png' rel='apple-touch-icon' sizes='72x72'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/apple-touch-icon-76x76.png' rel='apple-touch-icon' sizes='76x76'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/apple-touch-icon-114x114.png' rel='apple-touch-icon' sizes='114x114'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/apple-touch-icon-120x120.png' rel='apple-touch-icon' sizes='120x120'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/apple-touch-icon-144x144.png' rel='apple-touch-icon' sizes='144x144'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/apple-touch-icon-152x152.png' rel='apple-touch-icon' sizes='152x152'>
    <link href='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/apple-touch-icon-180x180.png' rel='apple-touch-icon' sizes='180x180'>
    <meta content='6trix' name='apple-mobile-web-app-title'>
    <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style">

    <meta content='#ffffff' name='msapplication-TileColor'>
    <meta content='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/ms-icon-144x144.png' name='msapplication-TileImage'>    
    <meta content='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/ms-icon-70x70.png' name='msapplication-square70x70logo'>    
    <meta content='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/ms-icon-150x150.png' name='msapplication-square150x150logo'>    
    <meta content='<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/ms-icon-310x310.png' name='msapplication-square310x310logo'>
    <meta content="<?php echo get_stylesheet_directory_uri(); ?>/images/favicon/browserconfig.xml" name="msapplication-config">
    <meta content="6trix" name="application-name">   
    

    <!--[if lt IE 9]>
    <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
    <![endif]-->
    <?php wp_head(); ?>

    <style>
        .page-wrapper {
          margin-top: 100vh;
        }
        .page-wrapper.done {
          margin-top: 0;
        }
        #page-preloader {
          position: fixed;
          z-index: 1000000;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fff;
          opacity: 1;
          visibility: visible;
          transition: 0.3s eas-in-out;
        }
        #page-preloader .loader {
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -32px;
          margin-top: -32px;
          width: 64px;
          height: 64px;
          border: 8px solid #ddd;
          border-radius: 50%;
          border-top-color: #3b79f0;
          transition: 0.3s eas-in-out;
          animation: 2s preloader infinite;
        }
        #page-preloader .loader #load_perc {
          text-align: center;
          font: bold 24px/50px 'Akrobat', sans-serif;
          color: #3b79f0;
        }
        #page-preloader.done {
          opacity: 0;
          visibility: hidden;
          z-index: -1;
        }
        @keyframes preloader {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(720deg);
          }
        }     



    </style>
</head>

<body>
    <!--[if lt IE 7]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <!-- Add your site or application content here -->


    <div id="page-preloader">
        <div class="loader">
            <!-- <div id="load_perc">0%</div> -->
        </div>
    </div>

    <div class="page-wrapper">
        <header>
            <div class="container container_header">
                <div class="header-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="header-logo"><a href="<?php echo get_home_url(); ?>"></a></div>
                <div class="header-lang"></div>
                <div class="header-menu-wrapper">
                    <?php wp_nav_menu(
                        array( 'theme_location' => 'primary',
                            'container' => false
                        ) );
                    ?>
                </div>
            </div>
        </header>