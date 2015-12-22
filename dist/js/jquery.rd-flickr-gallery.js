/**
 * @module       RD Flickr Gallery
 * @author       Rafael Shayvolodyan
 * @version      1.0.0
 */

(function() {
  (function($, document, window) {

    /**
     * Creates a RDFlickr.
     * @class RDFlickr.
     * @public
     * @param {HTMLElement} element - The element to create the RDFlickr for.
     * @param {Object} [options] - The options
     */
    var RDFlickr;
    RDFlickr = (function() {

      /**
       * Default options for RDFlickr.
       * @public
       */
      RDFlickr.prototype.Defaults = {
        flickrbase: 'http://api.flickr.com/services/feeds/',
        feedapi: 'photos_public.gne',
        qstrings: {
          ids: '',
          tags: '',
          tagmode: '',
          lang: 'en-us',
          format: 'json',
          jsoncallback: '?'
        },
        dateFormat: '%b/%d/%Y',
        cleanDescription: true,
        callback: false
      };

      function RDFlickr(element, options) {
        this.options = $.extend(true, {}, this.Defaults, options);
        this.$element = $(element);
        this.initialize();
      }


      /**
       * Initializes the FLickr Gallery.
       * @protected
       */

      RDFlickr.prototype.initialize = function() {
        var ctx;
        ctx = this;
        ctx.fetchData(ctx.makeUrl());
      };


      /**
      * Makes url for get data through flickr api
      * @protected
       */

      RDFlickr.prototype.makeUrl = function() {
        var ctx, first, key, qstrings, url;
        ctx = this;
        url = ctx.options.flickrbase + ctx.options.feedapi + '?';
        first = true;
        qstrings = {
          ids: this.$element.attr('data-flickr-id') ? this.$element.attr('data-flickr-id') : this.options.qstrings.ids,
          tags: this.$element.attr('data-flickr-tags') ? this.$element.attr('data-flickr-tags') : this.options.qstrings.tags,
          tagmode: this.$element.attr('data-flickr-tagmode') ? this.$element.attr('data-flickr-tagmode') : this.options.qstrings.tagmode,
          lang: this.$element.attr('data-flickr-lang') ? this.$element.attr('data-flickr-lang') : this.options.qstrings.lang,
          format: 'json',
          jsoncallback: '?'
        };
        for (key in qstrings) {
          if (qstrings[key]) {
            if (!first) {
              url += '&';
            }
            url += key + '=' + qstrings[key];
            first = false;
          }
        }
        return url;
      };


      /**
      * Gets data from flickr
      * @protected
      * @param {String} url - url for getting data
       */

      RDFlickr.prototype.fetchData = function(url) {
        var ctx;
        ctx = this;
        return $.getJSON(url, function(data) {
          $.each(data.items, function(i, item) {
            if (i < ctx.$element.find('[data-type="flickr-item"]').length) {
              if (ctx.options.cleanDescription) {
                ctx.cleanDescription(item);
              }
              ctx.setImageSizes(item);
              item['author_name'] = ctx.getAuthor(item.author);
              item['dating'] = ctx.dating(item.date_taken, false);
              item['datetime'] = ctx.dating(item.date_taken, true);
              ctx.setHTML(item, i);
            }
          });
          if (typeof ctx.options.callback === 'function') {
            ctx.options.callback();
          }
        });
      };


      /**
      * Cleans description
      * @protected
      * @param {Object} item - Flickr Item
       */

      RDFlickr.prototype.cleanDescription = function(item) {
        var input, regex;
        regex = /<p>(.*?)<\/p>/g;
        input = item.description;
        if (regex.test(input)) {
          item.description = input.match(regex)[2];
          if (item.description != null) {
            item.description = item.description.replace('<p>', '').replace('</p>', '');
          }
        }
        return item;
      };


      /**
      * Sets needed image suffix
      * @protected
      * @param {Object} item - Flickr Item
       */

      RDFlickr.prototype.setImageSizes = function(item) {
        var j, len, suffix, suffixes;
        suffixes = ['_s', '_q', '_t', '_m', '_n', '_-', '_z', '_c', '_b', '_h', '_k', '_o', ''];
        for (j = 0, len = suffixes.length; j < len; j++) {
          suffix = suffixes[j];
          item['image' + suffix] = item.media.m.replace('_m', suffix);
        }
        delete item.media;
        return item;
      };


      /**
      * Gets author name without email
      * @protected
      * @param {string} author - Flickr author
       */

      RDFlickr.prototype.getAuthor = function(author) {
        var matches, regExp;
        regExp = /\(([^]+)\)/;
        matches = regExp.exec(author);
        if (matches[1] != null) {
          return matches[1];
        }
        return false;
      };


      /**
      * Formating a date
      * @protected
      * @param {Object} date - Flickr date.
      * @param {Boolean} datetime - if true value will be converted to datetime attribute format (for tag time).
       */

      RDFlickr.prototype.dating = function(date, datetime) {
        var _date, flick_date, format, formats, j, len, months;
        flick_date = new Date(Date.parse(date));
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        _date = {
          '%d': flick_date.getDate(),
          '%m': flick_date.getMonth() + 1,
          '%b': months[flick_date.getMonth()].substr(0, 3),
          '%B': months[flick_date.getMonth()],
          '%y': String(flick_date.getFullYear()).slice(-2),
          '%Y': flick_date.getFullYear()
        };
        if (datetime) {
          date = '%Y-%m-%d';
        } else {
          date = this.$element.attr('data-flickr-date-format') ? this.$element.attr('data-flickr-date-format') : this.options.dateFormat;
        }
        formats = date.match(/%[dmbByY]/g);
        for (j = 0, len = formats.length; j < len; j++) {
          format = formats[j];
          date = date.replace(format, _date[format]);
        }
        return date;
      };


      /**
      * Sets needed HTML attributes and text
      * @protected
      * @param {Object} item - Flickr Item
      * @param {Integer} index - Item Number
       */

      RDFlickr.prototype.setHTML = function(item, index) {
        var $item, ctx;
        ctx = this;
        $item = this.$element.find('[data-type="flickr-item"]');
        ctx.parseAttributes($item.eq(index), item);
        $item.eq(index).find('*').each(function() {
          ctx.parseAttributes($(this), item);
        });
      };

      RDFlickr.prototype.parseAttributes = function(el, item) {
        var attr, attributes, dataArr, dataEl, j, len;
        dataArr = el.data();
        for (dataEl in dataArr) {
          if (dataArr.hasOwnProperty(dataEl) && typeof dataArr[dataEl] === 'string') {
            attributes = dataArr[dataEl].split(/\s?,\s?/i);
            for (j = 0, len = attributes.length; j < len; j++) {
              attr = attributes[j];
              if (attr.toLowerCase() === 'text') {
                el.html(item[dataEl]);
              } else {
                el.attr(attr, item[dataEl]);
              }
            }
          }
        }
      };

      return RDFlickr;

    })();

    /**
     * The jQuery Plugin for the RD Flickr
     * @public
     */
    $.fn.extend({
      RDFlickr: function(options) {
        return this.each(function() {
          var $this;
          $this = $(this);
          if (!$this.data('RDFlickr')) {
            return $this.data('RDFlickr', new RDFlickr(this, options));
          }
        });
      }
    });
    return window.RDFlickr = RDFlickr;
  })(window.jQuery, document, window);


  /**
   * The Plugin AMD export
   * @public
   */

  if (typeof module !== "undefined" && module !== null) {
    module.exports = window.RDFlickr;
  } else if (typeof define === 'function' && define.amd) {
    define(["jquery"], function() {
      'use strict';
      return window.RDFlickr;
    });
  }

}).call(this);
