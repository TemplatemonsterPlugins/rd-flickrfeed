###*
 * @module       RD Flickr Gallery
 * @author       Rafael Shayvolodyan
 * @version      1.0.0
###
(($, document, window) ->

  ###*
   * Creates a RDFlickr.
   * @class RDFlickr.
   * @public
   * @param {HTMLElement} element - The element to create the RDFlickr for.
   * @param {Object} [options] - The options
  ###
  class RDFlickr

    ###*
     * Default options for RDFlickr.
     * @public
    ###
    Defaults:
      flickrbase: 'http://api.flickr.com/services/feeds/',
      feedapi: 'photos_public.gne',
      qstrings:
        ids: '',
        tags: '',
        tagmode: '',
        lang: 'en-us',
        format: 'json',
        jsoncallback: '?',
      dateFormat: '%b/%d/%Y',
      cleanDescription: true,
      callback: false

    constructor: (element, options) ->
      @options = $.extend(true, {}, @Defaults, options)
      @$element = $(element)
      @initialize()

    ###*
     * Initializes the FLickr Gallery.
     * @protected
    ###
    initialize: () ->
      ctx = @
      ctx.fetchData(ctx.makeUrl());
      return

    ###*
    * Makes url for get data through flickr api
    * @protected
    ###
    makeUrl: ->
      ctx = @;
      url = ctx.options.flickrbase + ctx.options.feedapi + '?'
      first = true

      qstrings =
        ids: if @.$element.attr('data-flickr-id') then @.$element.attr('data-flickr-id') else @options.qstrings.ids,
        tags: if @.$element.attr('data-flickr-tags') then @.$element.attr('data-flickr-tags') else @options.qstrings.tags,
        tagmode: if @.$element.attr('data-flickr-tagmode') then @.$element.attr('data-flickr-tagmode') else @options.qstrings.tagmode,
        lang: if @.$element.attr('data-flickr-lang') then @.$element.attr('data-flickr-lang') else @options.qstrings.lang,
        format: 'json',
        jsoncallback: '?'

      for key of qstrings
        if qstrings[key]
          if not first
            url += '&'
          url += key + '=' + qstrings[key]
          first = false
      url

    ###*
    * Gets data from flickr
    * @protected
    * @param {String} url - url for getting data
    ###
    fetchData: (url) ->
      ctx = @

      $.getJSON(url, (data) ->
        $.each(data.items, (i, item)->
          if i < ctx.$element.find('[data-type="flickr-item"]').length

            if ctx.options.cleanDescription
              ctx.cleanDescription(item)

            ctx.setImageSizes(item)
            item['author_name'] = ctx.getAuthor(item.author);
            item['dating'] = ctx.dating(item.date_taken,false);
            item['datetime'] = ctx.dating(item.date_taken,true);
            ctx.setHTML(item, i)
          return
        )
        if typeof ctx.options.callback is 'function'
          ctx.options.callback()
        return
      )



    ###*
    * Cleans description
    * @protected
    * @param {Object} item - Flickr Item
    ###
    cleanDescription: (item) ->
      regex = /<p>(.*?)<\/p>/g;
      input = item.description;

      if(regex.test(input))
        item.description = input.match(regex)[2]
        if item.description?
          item.description = item.description.replace('<p>','').replace('</p>','');
      return item

    ###*
    * Sets needed image suffix
    * @protected
    * @param {Object} item - Flickr Item
    ###
    setImageSizes: (item) ->
      suffixes = ['_s', '_q', '_t', '_m', '_n', '_-', '_z', '_c', '_b', '_h', '_k', '_o', '']

      for suffix in suffixes
        item['image' + suffix] = item.media.m.replace('_m', suffix)
      delete item.media;
      item

    ###*
    * Gets author name without email
    * @protected
    * @param {string} author - Flickr author
    ###
    getAuthor: (author) ->
      regExp = /\(([^]+)\)/
      matches = regExp.exec(author)
      if matches[1]?
        return matches[1]
      return false

    ###*
    * Formating a date
    * @protected
    * @param {Object} date - Flickr date.
    * @param {Boolean} datetime - if true value will be converted to datetime attribute format (for tag time).
    ###
    dating: (date, datetime) ->
      flick_date = new Date(Date.parse(date))
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      _date =
        '%d': flick_date.getDate(),
        '%m': flick_date.getMonth() + 1
        '%b': months[flick_date.getMonth()].substr 0, 3
        '%B': months[flick_date.getMonth()]
        '%y': String(flick_date.getFullYear()).slice -2
        '%Y': flick_date.getFullYear()

      if datetime
        date = '%Y-%m-%d'
      else
        date = if @.$element.attr('data-flickr-date-format') then @.$element.attr('data-flickr-date-format') else @options.dateFormat

      formats = date.match /%[dmbByY]/g
      date = date.replace format, _date[format] for format in formats

      date


    ###*
    * Sets needed HTML attributes and text
    * @protected
    * @param {Object} item - Flickr Item
    * @param {Integer} index - Item Number
    ###
    setHTML: (item, index) ->
      ctx = @
      $item = @.$element.find('[data-type="flickr-item"]')
      ctx.parseAttributes($item.eq(index), item)
      $item.eq(index).find('*').each( ->
        ctx.parseAttributes($(@), item)
        return
      )
      return

    parseAttributes: (el, item) ->
      dataArr = el.data();
      for dataEl of dataArr
        if dataArr.hasOwnProperty(dataEl) and typeof dataArr[dataEl] is 'string'
          attributes = dataArr[dataEl].split(/\s?,\s?/i);
          for attr in attributes
            if attr.toLowerCase() is 'text'
              el.html(item[dataEl])
            else
              el.attr(attr, item[dataEl])
      return

  ###*
   * The jQuery Plugin for the RD Flickr
   * @public
  ###
  $.fn.extend RDFlickr: (options) ->
    @each ->
      $this = $(this)
      if !$this.data('RDFlickr')
        $this.data 'RDFlickr', new RDFlickr(this, options)

  window.RDFlickr = RDFlickr
) window.jQuery, document, window


###*
 * The Plugin AMD export
 * @public
###
if module?
  module.exports = window.RDFlickr
else if typeof define is 'function' && define.amd
  define(["jquery"], () ->
    'use strict'
    return window.RDFlickr
  )