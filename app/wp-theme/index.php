<?php
get_header(); ?>
	<section class="c-blog">
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
				<div class="b-post">
					<?php if ( has_post_thumbnail()) : the_post_thumbnail();?>
					<?php echo get_the_date("m/d/Y"); ?>
					<a href="<?php the_permalink(); ?>">
						<?php the_title(); ?>
					</a>
					<?php the_excerpt(); ?>
				 </div>
			<?php endwhile; ?>
		<?php endif; ?>
	</section>
<?php get_footer(); ?>