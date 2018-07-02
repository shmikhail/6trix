<?php
/**
 * Template Name: Demo
 */

get_header(); ?>


		<div class="page container page_demo">

			<?php @include ('blocks/left-slider.php'); ?>

			<div class="main demo-game">
				<div class="iframe-wrapper">
					<iframe src="" frameborder="0"></iframe>
				</div>

				<a href="" class="green-btn">играть на деньги</a>

				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vestibulum odio augue, id sollicitudin mauris blandit id. Nam tristique neque augue, quis eleifend massa blandit id. Fusce rhoncus pulvinar dui et suscipit. Maecenas sollicitudin cursus massa at porttitor. Sed pulvinar mollis ipsum, consectetur sodales nunc bibendum non. Duis orci nunc, mattis pulvinar faucibus sit amet, iaculis sit amet nisl. Donec sed nibh sit amet urna tincidunt convallis at id arcu. Sed porta non nunc sit amet lacinia. Duis ac ornare mauris. Quisque pretium lobortis quam. Vivamus dignissim quam eu erat tempor semper. Praesent cursus convallis tincidunt.</p>
			</div>
		</div>

<?php get_footer(); ?>