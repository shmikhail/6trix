<?php
/**
 * The template for displaying Archive pages.
 */

get_header(); ?>

	<div class="b-page b-blog">

		<?php get_template_part( '_sidebar' ); ?>

		<section class="b-blog-content">
			<h2 class="b-blog-page-heading">
				<?php
					if ( is_day() ) :
						printf( __( 'Daily Archives: %s', 'twentythirteen' ), get_the_date() );
					elseif ( is_month() ) :
						printf( __( 'Monthly Archives: %s', 'twentythirteen' ), get_the_date( _x( 'F Y', 'monthly archives date format', 'twentythirteen' ) ) );
					elseif ( is_year() ) :
						printf( __( 'Yearly Archives: %s', 'twentythirteen' ), get_the_date( _x( 'Y', 'yearly archives date format', 'twentythirteen' ) ) );
					else :
						_e( 'Archives', 'twentythirteen' );
					endif;
				?>
			</h2>
			<?php if ( have_posts() ) : ?>
				<?php while ( have_posts() ) : the_post(); ?>

					<?php get_template_part( '_post-list', get_post_format() ); ?>

				<?php endwhile; ?>
				<?php else : ?>

					<?php get_template_part( '_post-list', 'none' ); ?>

			<?php endif; ?>
		</section>
	</div>

<?php get_sidebar(); ?>
<?php get_footer(); ?>