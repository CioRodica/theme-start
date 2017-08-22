/**
 * @file
 * Attach behaviors for the dropdown js.
 */

/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/

(function ($, Drupal) {
  'use strict';

  objectFitImages(null, {watchMQ: true});
  
  function lazyLoad(elem) {
    elem.load(function () {
      elem.addClass('is-loaded');
    }).each(function () {
      if (this.complete) $(this).load();
    });
  }

  Drupal.lazyLoad = lazyLoad;

  Drupal.behaviors.imgLazyload = {
    attach: function (context, settings) {
      $('.js-media-placeholder', context).once('imgLazyload').each(function () {
        var img = $(this).siblings('img');

        Drupal.lazyLoad(img);
      });
    }
  };

})(jQuery, Drupal);
