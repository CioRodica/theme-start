/**
 * @file
 * Attach behaviors for the dropdown js.
 */

/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/

(function ($, Drupal) {
  'use strict';

  var target_elem_wrapper = '.js-dropdown';
  var target_elem = '.js-dropdown-button';
  var open_class = 'is-open';
  var active_class = 'is-hover';

  Drupal.behaviors.dropdown = {
    attach: function (context) {
      var $self = this;

      $(target_elem, context).once('dropdown').each(function () {
        var $btn = $(this);

        $btn.on('click', function (e) {
          e.preventDefault();
          $(this).toggleClass(active_class);

          if ($(this).hasClass(active_class)) {
            // reset dropdown, exclude this element
            $self.reset(this);

            $(this)
                .next()
                .addClass(open_class)
                .find('input:first')
                .focus();
          }
          else {
            $self.reset();
          }
        });
      });
    },

    reset: function (notTarget) {
      $(document)
          .find(target_elem)
          .not(notTarget)
          .removeClass(active_class)
          .next()
          .removeClass(open_class);
    }
  };

  // Close dropdown if click outside.
  $(document).on('click touchstart', function(e) {
    if ($(e.target).closest(target_elem_wrapper).length === 0) {
      Drupal.behaviors.dropdown.reset();
    }
  });
})(jQuery, Drupal);
