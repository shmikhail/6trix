<?php
/**
 * Template Name: Contact
 */

get_header(); ?>

	<div class="wrapper">
	    <div data-id="b-contacts" class="block block_viewport block_contacts">
	        <div class="container">
	            <section class="contacts">
	                <div class="headline gradient orange">
	                    <span class="headline__cloud"></span>
	                    <h1>Связаться с&nbsp;нами</h1>
	                </div>
	                <ul class="contacts-list">
	                    <!-- <li class="contacts-list__item contacts-list__item_adress"><a href="https://goo.gl/H2s7d2" target="_blank">Ленинский проспект, дом 34, офис 201</a></li> -->
	                    <!-- <li class="contacts-list__item contacts-list__item_phone"><a href="tel:+7 812 386-50-68">+7 812 386-50-68</a></li> -->
	                    <li class="contacts-list__item contacts-list__item_email"><a href="mailto:info@6trix.com">info@6trix.com</a></li>
	                    <!-- <li class="contacts-list__item contacts-list__item_skype"><a href="skype:skype?call">@skype</a></li> -->
	                </ul>
	                <div class="contacts-form">
	                    <h2>Давайте начнем работать&nbsp;вместе</h2>
<!-- 	                    <form action="">
	                        <div class="contact-form__item contact-form__item_half">
	                            <label for="name">Ваше имя <span>*</span></label>
	                            <input type="text" id="name" placeholder="Введите имя">
	                        </div>

	                        <div class="contact-form__item contact-form__item_half">
	                            <label for="emal">Ваш emal <span>*</span></label>
	                            <input type="email" id="email" placeholder="Введите email">
	                        </div>

	                        <div class="contact-form__item contact-form__item_full">
	                            <label for="message">Сообщение <span>*</span></label>
	                            <textarea id="message" placeholder="Введите текст сообщения"></textarea>
	                        </div>

	                        <div class="contact-form__item contact-form__item_check">
	                            <input type="checkbox" id="terms" checked>
	                            <label for="terms"><a href="">Условия и положения</a></label>
	                        </div>

	                        <div class="contact-form__item contact-form__item_button">
	                            <button class="btn" type="submit">Отправить</button>
	                        </div>
	                    </form> -->
	                    <?php do_shortcode('[contact-form-7 id="45" title="Форма обратной связи"]'); ?>
	                </div>
	            </section>
	        </div>
	    </div>
	</div>

<?php get_footer(); ?>
