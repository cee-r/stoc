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
          '<li class="sotc__topic-' + (i+1) + '">' +
            '<a href="' + link + '">' +
              title +
            '</a>' +
          '</li>';

        ToC += heading;

      });


      ToC +=
      "</ul>" +
      '<a class="go-search" href="#top">Search</a>' +
      '<div class="draft"><h3>Match Ups</h3><ul class="matchups"></ul></div>' +
      '<div class="loadout"><h3>Runes</h3><ul class="runes"></ul> <h3>Summoners</h3><ul class="summoners"></ul></div>' +
      '<div class="ingame"><h3>Skills</h3><ul class="skills"></ul> <h3>Builds</h3><ul class="builds"></ul> <h3>Starters</h3><ul class="starters"></ul> <h3>Trinket</h3><ul class="trinket"></ul></div>' +
      '<div class="general"><h3>Analytics</h3><ul class="analytics"></ul><h3>Misc</h3><ul class="misc"></ul></div>' +
      '</nav>';

      $('.stoc__container').prepend(ToC);

      // Manual sort
      $('.sotc__topic-20, .sotc__topic-21').appendTo('.matchups');
      $('.sotc__topic-19, .sotc__topic-14').appendTo('.runes');
      $('.sotc__topic-10, .sotc__topic-11').appendTo('.summoners');
      $('.sotc__topic-12, .sotc__topic-13').appendTo('.skills');
      $('.sotc__topic-15, .sotc__topic-16').appendTo('.builds');
      $('.sotc__topic-17, .sotc__topic-18').appendTo('.starters');
      $('.sotc__topic-6').appendTo('.trinket');
      $('.sotc__topic-1, .sotc__topic-2, .sotc__topic-5, .sotc__topic-4, .sotc__topic-3, .sotc__topic-7, .sotc__topic-8, .sotc__topic-9').appendTo('.analytics');
      $('.sotc__topic-22').appendTo('.misc');
  });
})();
