/**
 * @file
 */

/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/

(function ($, window) {
  'use strict';

  $(document).ready(function () {
    $('a[href="#nolink"], a[href="#"]').on('click', function (e) {
      e.preventDefault();
    });

    // Fix header on document ready.
    var $header = $('.js-header');
    var user_logged_in = $('body').hasClass('user-logged-in');

    function fixedHeader() {
      var height = $header.outerHeight();

      $header.addClass('is-fixed');
      $('body').css({paddingTop: height});
    }

    if ($header.length && !user_logged_in) {
      fixedHeader();

      $(window).on('resize', function () {
        fixedHeader();
      });
    }

    // Animate section.
    var $animated = $('[data-animated]');

    if($animated.length) {
      $animated.each(function(){
        var $el = $(this);

        $el.waypoint(function () {
          $el.addClass($el.data('animated'));
        }, {
          offset:'100%'
        });
      });
    };
  });

})(jQuery, window, Drupal, drupalSettings);
