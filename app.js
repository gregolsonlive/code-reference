$(document).ready(function () {
	/* Font size handling */
	var originalSize = $('div').css('font-size');

	// Increase Font Size
	$(".increase-font").click(function () {
		var currentSize = $('.content, .content h3, .content h4').css('font-size');
		var currentSize = parseFloat(currentSize) * 1.2;
		$('.content, .content h3, .content h4').css('font-size', currentSize);
		return false;
	});

	// Decrease Font Size
	$(".decrease-font").click(function () {
		var currentFontSize = $('.content, .content h3, .content h4').css('font-size');
		var currentSize = $('.content, .content h3, .content h4').css('font-size');
		var currentSize = parseFloat(currentSize) * 0.8;
		$('.content, .content h3, .content h4').css('font-size', currentSize);
		return false;
	});

	/* Custom JS */

	/* Alert bar hide on scroll */
	var position = $(window).scrollTop();
	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		if (scroll > position) {
			$('.alert-bar').addClass('ab-hide');
		} else {
			if (scroll === 0) {
				$('.alert-bar').removeClass('ab-hide');
			}
		}
		position = scroll;
	});

	/* Mouse sense buttons */
	$(function() {  
		$('[class^="btn-ms"]')
		  .on('mouseenter', function(e) {
			var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top: relY, left: relX});
		  })
		  .on('mouseout', function(e) {
			var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top: relY, left: relX});
		  });
	  }); 

	/* Progress/Feedback Footer */
	var progressPath = document.querySelector('.progress-wrap path');
	var pathLength = progressPath.getTotalLength();
	progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
	progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
	progressPath.style.strokeDashoffset = pathLength;
	progressPath.getBoundingClientRect();
	progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
	var updateProgress = function () {
		var scroll = $(window).scrollTop();
		var height = $(document).height() - $(window).height();
		var progress = pathLength - (scroll * pathLength / height);
		progressPath.style.strokeDashoffset = progress;
	}
	updateProgress();
	$(window).scroll(updateProgress);
	var offset = 50;
	var duration = 550;
	jQuery(window).on('scroll', function () {
		if (jQuery(this).scrollTop() > offset) {
			jQuery('.progress-wrap').addClass('active-progress');
		} else {
			jQuery('.progress-wrap').removeClass('active-progress');
		}
	});

	jQuery('.progress-wrap').on('click', function (event) {
		event.preventDefault();
		jQuery('html, body').animate({ scrollTop: 0 }, duration);
		return false;
	});

	/* Tabs filter */
	$('.tabs-filter a').on('click', function(event) {
		// Prevent the default action
		event.preventDefault();
	
		var targetSection = $(this).attr('href');
	
		// Calculate the position to scroll to, accounting for fixed elements like a navbar
		var positionToScroll = $(targetSection).offset().top - $('.navbar-default').outerHeight() - 60;
	
		// Animate the scroll to the target section
		$('html, body').animate({
			scrollTop: positionToScroll
		}, 550);
	});

	/* Create sticky filter  */
	function applyFilterStyling(filterSelector) {
		$(window).on('scroll', function () {
			const navHeight = $('.navbar-default').height();
			$(filterSelector).css('top', navHeight + 'px');
		});
	}

	applyFilterStyling('.article-grid-filter');
	applyFilterStyling('.tabs-filter');
});
