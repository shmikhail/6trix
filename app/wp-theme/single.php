<?php
get_header(); ?>

    <div class="wrapper">
        <div data-id="b-news-single" class="block block_viewport block_news-single">
            <div class="container">

                <?php if ( have_posts() ) : ?>
                    <?php while ( have_posts() ) : the_post(); ?>  

                        <div class="news-single-thumbnail" style="background: url('<?php the_post_thumbnail_url('full'); ?>')"></div>
                        <article class="news-single-item">
                            <div class="news-single-headline">
                                <h1><?php the_title(); ?></h1>
                            </div>
                            <div class="news-single-content">
                                <p><?php the_content(); ?></p>
                            </div>
                        </article>

                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>

<?php get_footer(); ?>