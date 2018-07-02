<?php get_header(); ?>

		<div class="wrapper">
            <div data-id="b-news" class="block block_viewport block_news">
                <div class="container">
                    <section class="news">
                        <div class="headline gradient cherry">
                            <span class="headline__cloud"></span>
                            <h1>Статьи 6trix</h1>
                        </div>
                        <div class="news-wrapper">

		                    <?php
		                        // $content = category_description();
		                    	// if ($loopcounter == 10) { echo do_shortcode('[content]'.$content.'[/content]'); }
		                        // $loopcounter = 0;
		                    
		                        $cat_name = get_query_var('category_name');

		                        $query = new WP_Query(array(
		                            'post_type' => 'post',
		                            'category_name'   => $cat_name,
		                            'posts_per_page' => -1,
		                            'order' => 'DESC'
		                        ) );
		                    ?>

		                    <?php if ($query->have_posts() ) : ?>
		                        <?php while ($query->have_posts() ) : $query->the_post(); ?>

		                            <?php   
		                                // $image = get_post_thumbnail_id( $query_id );
		                                // $url = wp_get_attachment_image_src($image);
		                            ?>

		                            <article class="news-item">
		                                <div class="news-thumbnail" style="background: url('<?php the_post_thumbnail_url(); ?>')"></div>
		                                <div class="news-description">
		                                    <h2><?php the_title(); ?></h2>
		                                    <?php the_content(); ?>
		                                    <a href="<?php the_permalink(); ?>" class="link-more">Подробнее</a>
		                                </div>
		                            </article> 

		                        <?php endwhile; ?>
		                    <?php endif; ?>
		                    <?php wp_reset_query(); ?>

                        </div>
                    </section>
                </div>
            </div>            
        </div>

<?php get_footer(); ?>