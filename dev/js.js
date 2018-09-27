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
      $( "body" ).addClass( "stoc__body" );


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
      "<nav role='navigation' class='stoc__toc'>" +
      "<ul>";
      var heading, title, link;

      $('div[ng-controller="generalChampion"] h2').each(function(i) {

        $(this).attr('id', 'stoc__section-heading-' + (i+1));

        title = $(this).text();
        link = '#' + $(this).attr('id');

        heading =
          "<li>" +
            "<a href='" + link + "'>" +
              title +
            "</a>" +
          "</li>";

        ToC += heading;

      });

      ToC +=
      "</ul>" +
      "</nav>";

      $(".stoc__container").prepend(ToC);

  });
})();
