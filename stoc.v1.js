// ==UserScript==
// @name         Sticky Table of Contents - Champion.gg
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Sticky Table of Contents for Champion.gg
// @author       Cee - https://github.com/cee-r
// @match        https://champion.gg/champion/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';

  $(document).ready(function() {

      // Resources
      var fontAwesome = '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">';
      var stocCSS = '<link rel="stylesheet" href="https://cee-r.github.io/stoc/css.css">';

      // Style
      $('html > head').append(fontAwesome + stocCSS);
      $( 'body' ).addClass('stoc__body').attr('id', 'top');


      // Build Side Panel
      $( 'body' ).append('<div class="stoc__container"> <a role="button" class="stoc__toggle"><i class="fas fa-chevron-right"></i></a></div>');

      $('.stoc__toggle').click(function() {
        $('body, .stoc__container').toggleClass('active');

        if ($('.stoc__container').hasClass('active')) {
          $(this).html('<i class="fas fa-times"></i>');
        } else {
          $(this).html('<i class="fas fa-chevron-right"></i>');
        }
      });

      // Generate ToC

      var ToC =
      '<nav role="navigation" class="stoc__toc">' +
      '<ul class="unsorted">';



      var heading, title, link;

      $('div[ng-controller="generalChampion"] h2').each(function(i) {

        $(this).attr('id', 'stoc__section-heading-' + (i+1));

        title = $(this).text();
        link = '#' + $(this).attr('id');

        heading =
          '<li class="stoc__topic-' + (i+1) + '">' +
            '<a href="' + link + '">' +
              title +
            '</a>' +
          '</li>';

        ToC += heading;

      });


      ToC +=
      "</ul>" +
      //'<a class="go-search" href="#top">Search</a>' +
      '<div class="draft"><h3>Match Ups</h3><ul class="matchups"></ul></div>' +
      '<div class="loadout"><h3>Runes</h3><ul class="runes"></ul> <h3>Summoners</h3><ul class="summoners"></ul></div>' +
      '<div class="ingame"><h3>Skills</h3><ul class="skills"></ul> <h3>Builds</h3><ul class="builds"></ul> <h3>Trinket & Starters</h3><ul class="starters"></ul></div>' +
      //'<div class="general"><h3>Analytics</h3><ul class="analytics"></ul></div>' +
      '</nav>';

      $('.stoc__container').prepend(ToC);

      // Manual sort

      if($('.stoc__topic-22 a:contains("Reddit")').length > 0) {
        $('.stoc__topic-20, .stoc__topic-21').appendTo('.stoc__toc .matchups');
        //$('.stoc__topic-1, .stoc__topic-2, .stoc__topic-5, .stoc__topic-4, .stoc__topic-3, .stoc__topic-7, .stoc__topic-8, .stoc__topic-9, .stoc__topic-22').appendTo('.general .analytics');
      } else {
        $('.stoc__topic-20, .stoc__topic-21, .stoc__topic-22, .stoc__topic-23, .stoc__topic-24, .stoc__topic-25').appendTo('.stoc__toc .matchups');
        //$('.stoc__topic-1, .stoc__topic-2, .stoc__topic-5, .stoc__topic-4, .stoc__topic-3, .stoc__topic-7, .stoc__topic-8, .stoc__topic-9, .stoc__topic-26').appendTo('.general .analytics');
      }

      $('.stoc__topic-14').appendTo('.stoc__toc .runes');
      $('.stoc__topic-19').prependTo('.stoc__toc .runes'); // switch order
      $('.stoc__topic-10, .stoc__topic-11').appendTo('.stoc__toc .summoners');
      $('.stoc__topic-12, .stoc__topic-13').appendTo('.stoc__toc .skills');
      $('.stoc__topic-15, .stoc__topic-16').appendTo('.stoc__toc .builds');
      $('.stoc__topic-17, .stoc__topic-18, .stoc__topic-6').appendTo('.stoc__toc .starters');

      var stickyOffset = $('.navbar').height();
      //console.log(stickyOffset);

      $('.stoc__toc a').click(function(){
          $('html, body').animate({
              scrollTop: $( $.attr(this, 'href') ).offset().top-stickyOffset
          }, 500);
          return false;
      });

      // Back To Top

      $( 'body' ).append('<div id="back-to-top"><a role="button"><i class="fa fa-angle-up" aria-hidden="true"></i></a></div>');

    	$(window).scroll(function() {

    		if($(this).scrollTop() != 0) {
    			$('#back-to-top').fadeIn();
    		} else {
    			$('#back-to-top').fadeOut();
    		}

    	});

    	$('#back-to-top').click(function() {
    		$('body,html').animate({scrollTop:0},800);
    	});


      // Sticky Header

      $('.navbar').addClass('sticky');

      var sticky = $(".sticky");
      var headerOffset = $('header').height();

    	$(window).scroll(function() {
    	  if( $(this).scrollTop() > headerOffset ) {
    	    sticky.addClass("sticky-on");
          $('.navigation-rank-wrapper').appendTo('.analysis-holder');
    	  } else {
    	    sticky.removeClass("sticky-on");
          $('.navigation-rank-wrapper').appendTo('.analysis-holder small');
    	  }
    	});



      // Revamp - Champ Profile

      $('.champion-profile > h1').prependTo('.champion-profile');
      $('.champion-profile > ul').addClass('champ-role');
      $('.champion-profile > ul li:first-child a').addClass('champ-pb');
      $('.champion-profile .champ-img').wrap( "<div class='champ-img-pb'></div>" );
      $('.champ-pb').html('Pro Builds').appendTo('.champ-img-pb');

      $('.champ-role li').each(function(i) {
        $(this).find('small').appendTo($(this).find('a'));
      });

      var roleCount = $('.champ-role li').length;

      console.log(roleCount);

      if( roleCount < 4) {
        $('.champ-role').addClass('two-roles');
      } else if( roleCount < 5) {
        $('.champ-role').addClass('three-roles');
      } else if( roleCount < 6) {
        $('.champ-role').addClass('four-roles');
      } else if( roleCount < 7) {
        $('.champ-role').addClass('five-roles');
      }

      // Revamp analytics

      $('<a role="button" class="show-champ-stats">Show Analytics <i class="fas fa-chevron-down"></i></a>').insertBefore('.champion-statistics');

      $('.col-xxs-12.col-xs-6.col-sm-6.col-md-3').appendTo('.champion-statistics');

      $('.champion-statistics').hide();

      $('.show-champ-stats').click(function(){
          $('.champion-statistics').slideToggle( "500" );
      });

      // Move trinket and summoners

      $('.trinket-stats').prependTo('.champion-area:nth-child(2)');
      $('.champion-area:nth-child(2)').prepend('<div class="summoner-container"></div>');
      $('#stoc__section-heading-10, #stoc__section-heading-10 + div, #stoc__section-heading-11, #stoc__section-heading-11 + div').appendTo('.summoner-container');

      // move Runes

      $('#stoc__section-heading-19').parent('div').addClass('mf-runes');
      $('#stoc__section-heading-14').parent('div').addClass('hw-runes');

      $('.mf-runes').insertBefore('.hw-runes');

  });
})();
