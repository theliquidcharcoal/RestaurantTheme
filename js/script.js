/*jshint jquery:true */

$(document).ready(function($) {
	"use strict";

	/* global google: false */
	/*jshint -W018 */

	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

	var winDow = $(window);
		// Needed variables
		var $container=$('.iso-call');
		var $filter=$('.filter');

		try{
			$container.imagesLoaded( function(){
				$container.trigger('resize');
				$container.isotope({
					filter:'*',
					layoutMode:'masonry',
					animationOptions:{
						duration:750,
						easing:'linear'
					}
				});

				$('.triggerAnimation').waypoint(function() {
					var animation = $(this).attr('data-animate');
					$(this).css('opacity', '');
					$(this).addClass("animated " + animation);

				},
					{
						offset: '75%',
						triggerOnce: true
					}
				);
				setTimeout(Resize, 1500);
			});
		} catch(err) {
		}

		winDow.on('resize', function(){
			var selector = $filter.find('a.active').attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {
			}
			return false;
		});
		
		// Isotope Filter 
		$filter.find('a').on('click', function(){
			var selector = $(this).attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {

			}
			return false;
		});


	var filterItemA	= $('.filter li a');

		filterItemA.on('click', function(){
			var $this = $(this);
			if ( !$this.hasClass('active')) {
				filterItemA.removeClass('active');
				$this.addClass('active');
			}
		});

	winDow.on('load', function() {
		$('#container').addClass('active');
	});
	/*-------------------------------------------------*/
	/* =  Search animation
	/*-------------------------------------------------*/
	
	var searchToggle = $('.open-search'),
		inputAnime = $(".form-search"),
		body = $('body');

	searchToggle.on('click', function(event){
		event.preventDefault();

		if ( !inputAnime.hasClass('active') ) {
			inputAnime.addClass('active');
		} else {
			inputAnime.removeClass('active');			
		}
	});

	body.on('click', function(){
		inputAnime.removeClass('active');
	});

	var elemBinds = $('.open-search, .form-search');
	elemBinds.on('click', function(e) {
		e.stopPropagation();
	});

	/*-------------------------------------------------*/
	/* =  OWL carousell
	/*-------------------------------------------------*/
	try {
		var owlWrap = $('.owl-wrapper');

		if (owlWrap.length > 0) {

			if (jQuery().owlCarousel) {
				owlWrap.each(function(){

					var carousel= $(this).find('.owl-carousel'),
						dataNum = $(this).find('.owl-carousel').attr('data-num'),
						dataNum2,
						dataNum3;

					if ( dataNum == 1 ) {
						dataNum2 = 1;
						dataNum3 = 1;
					} else if ( dataNum == 2 ) {
						dataNum2 = 2;
						dataNum3 = dataNum - 1;
					} else {
						dataNum2 = dataNum - 1;
						dataNum3 = dataNum - 2;
					}

					carousel.owlCarousel({
						autoPlay: 10000,
						navigation : true,
						items : dataNum,
						itemsDesktop : [1199,dataNum2],
						itemsDesktopSmall : [979,dataNum3],
						itemsTablet : [768, dataNum3],
					});

				});
			}
		}

	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  news accord
	/*-------------------------------------------------*/

	var newsLink = $('a.title-link');

		newsLink.on('click', function(event){
			event.preventDefault();
			var HisParent = $(this).parents('.menu-post');
			console.log(HisParent);
			if( !HisParent.hasClass('active') ) {

				$('.menu-post .content-box').slideUp(300, function(){
					$('.menu-post').removeClass('active');
				});

				HisParent.find('.content-box').slideDown(300, function(){
					HisParent.addClass('active');
				});
			} else {
				$('.menu-post.active .content-box').slideUp(300, function(){
					HisParent.removeClass('active');
				});
			}

		});
	
	
	/* ---------------------------------------------------------------------- */
	/*	Contact Map
	/* ---------------------------------------------------------------------- */

	var fenway = [42.345573,-71.038326]; //Change a map coordinate here!
	var markerPosition = [42.345573,-71.038326]; //Change a map marker here!
	$('.map')
		.gmap3({
			center:fenway,
			zoom: 14,
			mapTypeId: "shadeOfGrey", // to select it directly
			scrollwheel: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, "shadeOfGrey"]
			}
		})
		.styledmaptype(
		"shadeOfGrey",
		[
			{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":60}]},
			{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":100}]},
			{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
			{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":90}]},
			{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":87},{"weight":1.2}]},
			{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f8f2e4"},{"lightness":0}]},
			{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#b4e3c7"},{"lightness":0}]},
			{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#d9ceac"},{"lightness":0}]},
			{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#d2c59d"},{"lightness":100},{"weight":0.2}]},
			{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":0}]},
			{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#efebe4"},{"lightness":0}]},
			{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":0}]},
			{"featureType":"water","elementType":"geometry","stylers":[{"color":"#bad8fb"},{"lightness":0}]}
		],
		{name: "Shades of Grey"});
		$('.map')
			.gmap3({
				center: fenway,
				zoom: 13,
				mapTypeId : google.maps.MapTypeId.ROADMAP
			})
			.marker({
				position: markerPosition,
				icon: 'images/marker.png'
		});

	/*-------------------------------------------------*/
	/* =  count increment
	/*-------------------------------------------------*/

	try {
		$('.statistic-post').appear(function() {
			$('.timer').countTo({
				speed: 4000,
				refreshInterval: 60,
				formatter: function (value, options) {
					return value.toFixed(options.decimals);
				}
			});
		});
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info !== 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('alert-success').removeClass('alert-danger').addClass('alert-success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('alert-success').removeClass('alert-danger').addClass('alert-danger').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

	/*-------------------------------------------------*/
	/* =  scroll between sections
	/*-------------------------------------------------*/

	$('.navigate-section > li > a[href*=#]').on('click', function(event) {
		event.preventDefault();
		var offset = 75;
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top - offset
		}, 500, 'linear');
	});

	/*-------------------------------------------------*/
	/* =  add active state in menu for active section
	/*-------------------------------------------------*/

	$('section').each(function() {
		$(this).waypoint( function( direction ) {
			if( direction === 'down' ) {
				var containerID = $(this).attr('id');
				/* update navigation */
				$('.navigate-section > li > a').removeClass('active');
				$('.navigate-section > li > a[href*=#'+containerID+']').addClass('active');
			}
		} , { offset: '78px' } );
		
		$(this).waypoint( function( direction ) {
			if( direction === 'up' ) {
				var containerID = $(this).attr('id');
				/* update navigation */
				$('.navigate-section > li > a').removeClass('active');
				$('.navigate-section > li > a[href*=#'+containerID+']').addClass('active');
			}
		} , { offset: function() { return -$(this).height() - 78; } });
	});

	/*-------------------------------------------------*/
	/* =  Menu - active
	/*-------------------------------------------------*/

	// Do our DOM lookups beforehand
	var nav_container = $("header");
	var nav = $(".navbar");
	
	var top_spacing = 0;
	var waypoint_offset = -78;

	nav_container.waypoint({
		handler: function(direction) {
			if (direction == 'down') {

				nav_container.css({ 'height':nav.outerHeight() });		
				nav.stop().addClass("active").css("top",-nav.outerHeight()).animate({"top":top_spacing});
				//nav_container.stop().addClass("active").css("top",-nav.outerHeight()).animate({"top":top_spacing});
				
			} else {
				
				nav_container.css({ 'height':'78px' });
				nav.stop().removeClass("active").css("top",nav.outerHeight()+waypoint_offset).animate({"top":""});
				//nav_container.stop().removeClass("active").css("top",nav.outerHeight()+waypoint_offset).animate({"top":""});
				
			}
			
		},
		offset: function() {
			return -nav.outerHeight()-waypoint_offset;
		}
	});

});

function Resize() {
	$(window).trigger('resize');
}