/**
 * @file
 * Attach behaviors for the dropdown js.
 */

/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/

(function ($, Drupal) {
  'use strict';

  // Drupal Behaviors.
  Drupal.behaviors.leadershipPopup = {
    attach: function (context, settings) {
      $('.js-leadership-popup', context).once('leadershipPopup').each(function () {
        var $popup = $(this).closest('.js-leadership').clone().addClass('leadership--large');

        $(this).magnificPopup({
          items: {
            src: $popup,
            type: 'inline',
            fixedContentPos: 'true',
            midClick: true  // Allow opening popup on middle mouse click.
          }
        });
      });
    }
  };

})(jQuery, Drupal);
