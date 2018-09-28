// ==UserScript==
// @name         Sticky Table of Contents - Champion.gg
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Cee
// @match        https://champion.gg/champion/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';

  $(document).ready(function() {

      // Resources
      var fontAwesome = '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">';
      var stocCSS = '<link rel="stylesheet" href="http://localhost:8080/stoc/dev/css.css">';
      //var stocCSS = '<style type="text/css">.stoc__container{width:300px; height:100%; position:fixed; top:0; background: red;}</style>';

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
      '<div class="general"><h3>Analytics</h3><ul class="analytics"></ul></div>' +
      '</nav>';

      $('.stoc__container').prepend(ToC);

      // Manual sort
      $('.stoc__topic-20, .stoc__topic-21').appendTo('.stoc__toc .matchups');
      $('.stoc__topic-19, .stoc__topic-14').appendTo('.stoc__toc .runes');
      $('.stoc__topic-10, .stoc__topic-11').appendTo('.stoc__toc .summoners');
      $('.stoc__topic-12, .stoc__topic-13').appendTo('.stoc__toc .skills');
      $('.stoc__topic-15, .stoc__topic-16').appendTo('.stoc__toc .builds');
      $('.stoc__topic-17, .stoc__topic-18, .stoc__topic-6').appendTo('.stoc__toc .starters');
      $('.stoc__topic-1, .stoc__topic-2, .stoc__topic-5, .stoc__topic-4, .stoc__topic-3, .stoc__topic-7, .stoc__topic-8, .stoc__topic-9, .stoc__topic-22').appendTo('.general .analytics');


      $('.stoc__toc a').click(function(){
          $('html, body').animate({
              scrollTop: $( $.attr(this, 'href') ).offset().top
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

  });
})();
