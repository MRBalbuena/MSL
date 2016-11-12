jQuery(function ($) {

	$(function () {
		$('#main-slider.carousel').carousel({
			interval: 10000,
			pause: false
		});
	});

	//Ajax contact
	var form = $('.contact-form');
	form.submit(function () {
		$this = $(this);
		$.post($(this).attr('action'), function (data) {
			$this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
		}, 'json');
		return false;
	});

	//smooth scroll
	$('.navbar-nav > li').click(function (event) {
		event.preventDefault();
		var target = $(this).find('>a').prop('hash');
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 500);
	});

	//scrollspy
	$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh');
	});

	//PrettyPhoto
	$("a.preview").prettyPhoto({
		social_tools: false
	});

	$(function () {
		var x = 0;
		var down = true;
		var pos = '';
		var downGlobalID, upGlobalId;

		pos = $('#main-slider').css('background-position-y');
		if (pos === '0px') down = true;

		function moveUp(pos) {
			x += 0.3;			
			if (x > -1) {
				downGlobalID = requestAnimationFrame(moveDown);
				return;
			}
			$('#main-slider').css('background-position-y', x + 'px');
			upGlobalId = requestAnimationFrame(moveUp);
		}

		function moveDown(pos) {
			x -= 0.3;
			if (x < -(window.screen.height / 2)) {
				upGlobalId = requestAnimationFrame(moveUp);
				return;
			}
			$('#main-slider').css('background-position-y', x + 'px');
			downGlobalID = requestAnimationFrame(moveDown);
		}

		if (down) moveDown(pos);
	});
});
