/**
 * @file
 * Attach behaviors for the menu js.
 */

/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/

(function ($, Drupal) {
  'use strict';

  // Move Secondary menu items to Main menu and set visible-mobile class.
  Drupal.behaviors.secondaryMenu = {
    attach: function (context, settings) {
      $('.js-site-secondary-menu', context).once('secondaryMenu').each(function () {
        $(this).find('li').each(function () {
          var copyItem = $(this).clone().addClass('visible-mobile');
          $('.js-menu-main').append(copyItem);
        });
      });
    }
  };

  // Expanded menu
  Drupal.behaviors.expandedMenu = {
    attach: function (context, settings) {
      $('.js-menu', context).once('expandedMenu').each(function () {
        var $el = $(this).find('.is-expanded');

        $el.hover(function () {
          var $closest = $(this).closest('.menu');

          // If both conditions are false.
          if (!$closest.hasClass('is-open') && !$closest.parent().hasClass('is-open')) {
            $(this).find('.js-dropdown-button').trigger('click');
          }
        }, function () {
          if (!$('.js-site-main-menu').hasClass('is-open')) {
            Drupal.behaviors.dropdown.reset();
          }
        });
      });
    }
  };
})(jQuery, Drupal);
