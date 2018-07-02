<?php
/**
 * Template Name: Example
 */

get_header(); ?>
    <?php $query = new WP_Query( array( 'post_type' => 'service', 'orderby' => 'menu_order', 'posts_per_page' => 3 ) ); ?>
        <?php if ( $query->have_posts() ) : ?>
        <?php while ( $query->have_posts() ) : $query->the_post();?>
        <div class="b-preview-box-container"> 
            <a href="<?php the_permalink(); ?>" class="b-preview-box">
                <?php if ( has_post_thumbnail()) { // check if the post has a Post Thumbnail assigned to it.
                    the_post_thumbnail('box-image', array('class' => 'b-preview-box_flooring'));
                } ?>
                <div class="b-preview-box__header">
                    <h3 class="b-preview-box__descript"><?php the_title(); ?></h3>
                </div>
            </a>
        </div>
        <?php endwhile; ?>
        <?php endif; ?>
        <?php wp_reset_query(); ?>
        
        <?php if ( have_posts() ) : ?>
        <?php while ( have_posts() ) : the_post(); ?>
        <?php $color = get_post_meta($post->ID, 'background_color', true); ?>
        <section class="c-container"<?php if (!empty($color)) echo " style=\"background-color: " . $color ."\""; ?>>
            <div class="b-left-side">
                <div class="b-image-container">
                    <?php if ( has_post_thumbnail()) { // check if the post has a Post Thumbnail assigned to it.
                        the_post_thumbnail('left-side-image', array('class' => 'b-image-container__image'));
                    } ?>
                </div>
            </div>
            <div class="b-right-side">
                <div class="b-scroll-section">
                    <div class="b-scroll-section__padding">
                        <div class="b-scroll-section__scroll-pane">
                            <div class="b-scroll-section__vertical-align">
                                <article class="b-individual-article">
                                    <h1 class="b-title">Beauty is for everyone</h1>
                                    <?php the_content(); ?>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <?php endwhile; ?>
    <?php endif; ?>
<?php get_footer(); ?>