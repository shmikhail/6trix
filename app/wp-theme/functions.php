<?php

/**
 * Theme Init
 */
function setup() {

	// Switches default core markup for search form, comment form, and comments
	// to output valid HTML5.
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list' ) );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menu( 'primary', 'Main Menu' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menu( 'secondary', 'Top Menu' );

	/*
	 * This theme uses a custom image size for featured images, displayed on
	 * "standard" posts and pages.
	 */
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 640, 480, true );


    /**
     * Custom image sizes
     */

    add_image_size( 'example-image', 325, 325, true );
    add_image_size( 'full', 0, 0, false);

    add_filter( 'wp_session_expiration', function() { return 60*60*24; } );

    if (function_exists('acf_add_options_page')) {
        acf_add_options_page();
    }
}
add_action( 'after_setup_theme', 'setup' );



/**
 * Enqueues scripts and styles for front end.
 */
function scripts_styles() {
    wp_deregister_style( 'contact-form-7' );
    wp_deregister_script( 'jquery' );

    wp_enqueue_script( 'plugins', get_template_directory_uri() . '/js/plugins.js', array(), '', true);

    wp_enqueue_script( 'iphonehack', get_template_directory_uri() . '/js/js-hackiphone.js', array(), '', true);

    wp_enqueue_script( 'wow-preloader', get_template_directory_uri() . '/js/wow-preloader.js', array(), '', true);

    wp_enqueue_script( 'wow-js', get_template_directory_uri() . '/js/wow.min.js', array(), '', true);

    // wp_enqueue_script( 'fullpage-js', get_template_directory_uri() . '/js/jquery.fullPage.js', array(), '', true );

    // wp_enqueue_script( 'fullpage-init', get_template_directory_uri() . '/js/fullageInit.js', array(), '', true );

    wp_enqueue_script( 'minified-js', get_template_directory_uri() . '/js/main.js', array(), '', true);

	// Loads our main stylesheet.
	// wp_enqueue_style( 'styles', get_template_directory_uri() . '/css/style.css', array(), '');

    // wp_enqueue_style( 'wow-css', get_template_directory_uri() . '/resources/animate.min.css', array(), '');

    // wp_enqueue_style( 'fullpage-css', get_template_directory_uri() . '/resources/jquery.fullPage.css', array(), '');
    add_action( 'get_footer', 'styles_footer' );
}
add_action( 'wp_enqueue_scripts', 'scripts_styles' );


function styles_footer() {
    // wp_enqueue_style( 'contact-form', home_url() . '/wp-content/plugins/contact-form-7/includes/css/styles.css', array(), '');

    wp_enqueue_style( 'styles', get_template_directory_uri() . '/css/style.min.css', array(), '');

    wp_enqueue_style( 'wow-css', get_template_directory_uri() . '/resources/animate.min.css', array(), '');
}




add_filter( 'nav_menu_css_class' , 'special_nav_class', 10, 2 );
function special_nav_class($classes, $item){
    if( is_front_page() && $item->title == "О нас" ){
        $classes[] = "about-link-anchor";
    } else if ( is_front_page() && $item->title == "Продукты" ){
        $classes[] = "productions-link-anchor";
    } 
    return $classes;
}



// custom excerpt
function new_excerpt_more( $more ) {
	return '...';
}
add_filter('excerpt_more', 'new_excerpt_more');

function _excerpt_length( $length ) {
    return 20;
}
add_filter( 'excerpt_length', '_excerpt_length', 999 );

/**
 * Menu Walker
 */
class _walker_nav_menu extends Walker_Nav_Menu {
	var $current_menu_count = null;

	// add classes to ul sub-menus
	function start_lvl( &$output, $depth, $args ) {
	    // depth dependent classes
	    $indent = ( $depth > 0  ? str_repeat( "\t", $depth ) : '' ); // code indent
	    $display_depth = ( $depth + 1); // because it counts the first submenu as 0
	    $classes = array(
	        'b-sub-menu'
	        );
	    $class_names = implode( ' ', $classes );

	    // build html
	    //

	    $output .= "\n" . $indent . '<div class="b-sub-menu-wrapper"><ul class="' . $class_names . '">' . "\n";
	}

	function end_lvl(&$output, $depth=0, $args=array()) {
		// build html
	    	$output .= "</ul></div>\n";

    }
}

/**
 * Replace cf7 form submit with button
 */
function _wpcf7_submit_button() {
    if(function_exists('wpcf7_remove_shortcode')) {
        wpcf7_remove_shortcode('submit');
        remove_action( 'admin_init', 'wpcf7_add_tag_generator_submit', 55 );
        $fowl_cf7_module = TEMPLATEPATH . '/cf7/submit-button.php';
        require_once $fowl_cf7_module;
        wpcf7_add_shortcode( 'submit', 'fowl_wpcf7_submit_shortcode_handler' );
    }
}

add_action('init','_wpcf7_submit_button');

/**
 * Filters wp_title to print a neat <title> tag based on what is being viewed.
 *
 * @param string $title Default title text for current view.
 * @param string $sep Optional separator.
 * @return string The filtered title.
 */
function _wp_title( $title, $sep ) {
    if ( is_feed() ) {
        return $title;
    }

    global $page, $paged;

    // Add the blog name
    $title .= get_bloginfo( 'name', 'display' );

    // Add the blog description for the home/front page.
    $site_description = get_bloginfo( 'description', 'display' );
    if ( $site_description && ( is_home() || is_front_page() ) ) {
        $title .= " $sep $site_description";
    }

    // Add a page number if necessary:
    if ( ( $paged >= 2 || $page >= 2 ) && ! is_404() ) {
        $title .= " $sep " . sprintf( __( 'Page %s', '_s' ), max( $paged, $page ) );
    }

    return $title;
}
add_filter( 'wp_title', '_wp_title', 10, 2 );


add_action('wp_head','add_ajaxurl');
function add_ajaxurl() {
  ?>
  <script type="text/javascript">
    var ajaxUrl = '<?php echo admin_url('admin-ajax.php'); ?>',
        baseUrl = '<?php echo esc_url( home_url( '/' ) ); ?>';
  </script>
  <?php
}

/**
 * Helper function is_blog()
 */
function is_blog () {
	global  $post;
	$posttype = get_post_type($post );
	return ( ((is_archive()) || (is_author()) || (is_category()) || (is_home()) || (is_single()) || (is_tag())) && ( $posttype == 'post')  ) ? true : false ;
}

function custom_acf_admin_head() {
    ?>
    <style type="text/css">
        tr.acf-row > td { border-bottom: 3px solid #000 !important; }
    </style>

    <script type="text/javascript">
    (function($){
    })(jQuery);
    </script>
<?php
}
add_action('acf/input/admin_head', 'custom_acf_admin_head');

add_shortcode('button', function ($atts, $content = "") {

    if ($atts['icon']) {
        $icon = "<img src=".$atts['icon']." />";
    }

    else {
        $icon = " ";
    }

     return "<a href=" . $atts['href'] . "> $icon  $content</a>";
});


add_filter( 'gform_submit_button', 'form_submit_button', 10, 2 );
function form_submit_button( $button, $form ) {
    return "<button class='b-button' id='gform_submit_button_{$form['id']}'><span>Submit</span></button>";
}

add_filter('gform_init_scripts_footer', '__return_true');

add_filter( 'gform_cdata_open', 'wrap_gform_cdata_open' );
function wrap_gform_cdata_open( $content = '' ) {
    $content = 'document.addEventListener( "DOMContentLoaded", function() { ';
    return $content;
}
add_filter( 'gform_cdata_close', 'wrap_gform_cdata_close' );
function wrap_gform_cdata_close( $content = '' ) {
    $content = ' }, false );';
    return $content;

}

add_action( 'wp_ajax_send_mail', 'do_ajax_send_mail' );
add_action( 'wp_ajax_nopriv_send_mail', 'do_ajax_send_mail' );

    function do_ajax_send_mail() {
        $diameter  = isset($_POST['data']['diameter']) ? $_POST['data']['diameter'] : null;
        $length   = isset($_POST['data']['length']) ? $_POST['data']['length'] : null;
        $tip  = isset($_POST['data']['tip']) ? $_POST['data']['tip'] : null;
        $wire  = isset($_POST['data']['wire']) ? $_POST['data']['wire'] : null;
        $email = isset($_POST['email']) ? $_POST['email'] : null;
        $admin_mail = get_option('admin_email');
        $headers = "From: {$admin_mail}" . "\r\n";


        $message = "Email: $email \nDiameter: $diameter \nLength: $length \nTip: $tip \nSafety Wire: $wire";

        $send_to = $admin_mail;
        $subject = "Message from " . $email;
        echo wp_mail($send_to,$subject,$message);

    }