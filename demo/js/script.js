/**
 * @function      Include
 * @description   Includes an external scripts to the page
 * @param         {string} scriptUrl
 */
function include(scriptUrl) {
    document.write('<script src="' + scriptUrl + '"></script>');
}


/**
 * @function      isIE
 * @description   checks if browser is an IE
 * @returns       {number} IE Version
 */
function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    if (myNav.indexOf('msie') != -1)
        return parseInt(myNav.split('msie')[1]);
    else if (myNav.indexOf('trident') != -1) {
        return 11;
    }
    else {
        return false;
    }
};


/**
 * @module       Copyright
 * @description  Evaluates the copyright year
 */
;
(function ($) {
    var currentYear = (new Date).getFullYear();
    $(document).ready(function () {
        $("#copyright-year").text((new Date).getFullYear());
    });
})(jQuery);


/**
 * @module       IE Fall&Polyfill
 * @description  Adds some loosing functionality to old IE browsers
 */
;
(function ($) {
    if (isIE() && isIE() < 11) {
        include('js/pointer-events.min.js');
        $('html').addClass('lt-ie11');
        $(document).ready(function () {
            PointerEventsPolyfill.initialize({});
        });
    }

    if (isIE() && isIE() < 10) {
        $('html').addClass('lt-ie10');
    }
})(jQuery);


/**
 * @module       WOW Animation
 * @description  Enables scroll animation on the page
 */
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop') && o.hasClass("wow-animation") && $(".wow").length) {
        include('js/wow.min.js');

        $(document).ready(function () {
            new WOW().init();
        });
    }
})(jQuery);


/**
 * @module       Smoothscroll
 * @description  Enables smooth scrolling on the page
 */
;
(function ($) {
    if ($("html").hasClass("smoothscroll")) {
        include('js/smoothscroll.min.js');
    }
})(jQuery);

/**
 * @module       Magnific Popup
 * @description  Enables Magnific Popup Plugin
 */
;
(function ($) {
    var o = $('[data-lightbox]').not('[data-lightbox="gallery"] [data-lightbox]'),
        g = $('[data-lightbox^="gallery"]');
    if (o.length > 0 || g.length > 0) {
        include('js/jquery.magnific-popup.min.js');

        $(document).ready(function () {
            if (o.length) {
                o.each(function () {
                    var $this = $(this);
                    $this.magnificPopup({
                        type: $this.attr("data-lightbox"),
                    });
                })
            }

            if (g.length) {
                g.each(function () {
                    var $gallery = $(this);
                    $gallery
                        .find('[data-lightbox]').each(function () {
                            var $item = $(this);
                            $item.addClass("mfp-" + $item.attr("data-lightbox"));
                        })
                        .end()
                        .magnificPopup({
                            delegate: '[data-lightbox]',
                            type: "image",
                            gallery: {
                                enabled: true
                            }
                        });
                })
            }
        });
    }
})(jQuery);

/**
 * @module       jQuery Flickr Gallery Plugin
 * @description  Enables jQuery Flickr Gallery Plugin
 */
;
(function ($) {
    var o = $('.flickr');
    var o2 = $('.responsive-tabs');
    if (o.length > 0) {
        include('../dist/js/jquery.rd-flickr-gallery.js');
        include('js/jquery.easy-responsive-tabs.min.js');


        $(document).ready(function () {
            o.each(function (i) {
                var $this = $(this);


                $this.RDFlickr({
                    callback: function () {
                        $this.find('img').load(function () {
                            $(this).parents('.thumb').addClass('loaded');
                        });
                        if (!isIE()) {
                            setBackground($this);
                        }
                        imageResize();
                        setFilters(getTags($this), $this);
                    }
                });
            });

            o2.easyResponsiveTabs({
                activate: function () {
                    var flickr = $('[aria-labelledby="' + this.getAttribute('aria-controls') + '"] .flickr');
                    flickr.isotope({filter: '*'});
                    var filters = $('#filters');
                    filters.find('.show').removeClass('show');
                    filters.find('#' + flickr.attr('data-isotope-group')).addClass('show');
                }
            });
        });
    }

    function setBackground(el) {
        el.parent().find('.blur').css('background-image', 'url(' + el.find('[data-type="flickr-item"]:first-child img').attr('src') + ')');
    }

    // Get common tag array
    function getTags(el) {
        var tags = [];
        el.find('[data-filter]').each(function () {
            var $this = $(this);
            tags.push($this.attr('data-filter').split(' '));
        });
        return intersection(tags);
    }

    // Add HTML Markup for filters
    function setFilters(tags, el) {
        var filters = $('#filters'),
            group = el.attr('data-isotope-group');
        filters.append('<div id="' + el.attr('data-isotope-group') + '"></div>');
        var list = $('#filters > #' + el.attr('data-isotope-group')),
            buttons = $('.isotope-buttons');
        list.html('').append('<button data-isotope-filter="*" data-isotope-group="' + group + '">All</button>');
        var temp = [];
        for (var j = 0; j < tags.length; j++) {
            if (el.find('[data-filter*="' + tags[j] + '"]').length != el.find('[data-filter]').length) {
                temp.push(tags[j]);
            }
        }
        var length = temp.length > 8 ? 8 : temp.length;
        for (var i = 0; i < length; i++) {
            list.append('<button data-isotope-filter="' + temp[i] + '" data-isotope-group="' + group + '">' + temp[i] + '</button>')
        }
        $('#' + $('.resp-tab-content-active .flickr').attr('data-isotope-group')).addClass('show');

        if (length > 0) {
            buttons.addClass('ready');
        }
    }

    // Object fit IE FIX
    function imageResize() {
        $('.thumb img').load(function () {
            var img = $(this),
                height = this.naturalHeight,
                width = this.naturalWidth,
                ratio = 4 / 3,
                newWidth,
                newHeight,
                percentage;

            if (width > height && (width / height) > ratio) {
                img.removeClass('tall-img');
                img.addClass('wide-img');
                newWidth = Math.ceil(img.parent().outerHeight() * (width / height));
                if (img.parent().outerWidth() - newWidth > 0) {
                    img.removeClass('wide-img');
                    img.addClass('tall-img');
                    newHeight = Math.ceil(img.parent().outerWidth() / (width / height));
                    percentage = ((img.parent().outerHeight() - newHeight) / (2 * img.parent().outerHeight())) * 100;
                    img.css('margin-top', percentage.toFixed(2) + '%');
                } else {
                    percentage = ((img.parent().outerWidth() - newWidth) / (2 * newWidth)) * 100;
                    img.css('margin-left', percentage.toFixed(2) + '%');
                }
            } else {
                img.removeClass('wide-img');
                img.addClass('tall-img');
                newHeight = Math.ceil(img.parent().outerWidth() / (width / height));
                percentage = ((img.parent().outerHeight() - newHeight) / (2 * img.parent().outerHeight())) * 100;
                img.css('margin-top', percentage.toFixed(2) + '%');
            }
        });
    }


    // Tags Arrays comparison
    function intersection(arrays) {
        var temp = [];
        for (var j = 0; j < arrays.length; j++) {
            for (var i in arrays[j]) {
                var element = arrays[j][i];
                for (var k = 0; k < arrays.length; k++) {
                    if (k != j) {
                        if (arrays[k].indexOf(element) > -1 && temp.indexOf(element) == -1) {
                            temp.push(element);
                        }
                    }

                }

            }
        }
        return temp;
    }


    /**
     * @module       Isotope
     * @description  Enables Isotope Plugin
     */
    var o = $(".isotope");
    if (o.length) {
        include('js/isotope.pkgd.min.js');
        $(document).ready(function () {
            o.each(function () {
                var _this = this
                    , iso = new Isotope(_this, {
                        itemSelector: '[class*="col-"]',
                        layoutMode: _this.getAttribute('data-layout') ? _this.getAttribute('data-layout') : 'masonry'
                    });

                $(window).load(function () {
                    iso.layout();
                    setTimeout(function () {
                        _this.className += " isotope--loaded";
                        iso.layout();
                    }, 600);
                });
            });

            $("body").delegate("[data-isotope-filter]", "click", function () {
                var el = this,
                    isotope = $('.isotope[data-isotope-group="' + this.getAttribute("data-isotope-group") + '"]');

                isotope
                    .isotope({
                        filter: function () {
                            if (el.getAttribute("data-isotope-filter") == '*') {
                                return '*';
                            } else if (this.getAttribute('data-filter').indexOf(el.getAttribute('data-isotope-filter')) > -1) {
                                return '[data-filter="' + this.getAttribute("data-filter") + '"]'
                            } else {
                                return '';
                            }
                        }
                    });
            })
        });
    }


})(jQuery);


/**
 * @module       Owl Carousel
 * @description  Enables Owl Carousel Plugin
 */
;
(function ($) {
    var o = $('.owl-carousel');
    if (o.length) {
        include('js/jquery.owl-carousel.js');

        $(document).ready(function () {
            o.each(function () {
                var c = $(this),
                    responsive = {};

                responsive[0] = {
                    items: c.attr("data-items") ? parseInt(c.attr("data-items")) : 1
                };

                if (c.attr("data-xs-items")) {
                    responsive[480] = {
                        items: parseInt(c.attr("data-xs-items"))
                    };
                }

                if (c.attr("data-sm-items")) {
                    responsive[768] = {
                        items: parseInt(c.attr("data-sm-items"))
                    };
                }

                if (c.attr("data-md-items")) {
                    responsive[992] = {
                        items: parseInt(c.attr("data-md-items"))
                    };
                }

                if (c.attr("data-lg-items")) {
                    responsive[1200] = {
                        items: parseInt(c.attr("data-lg-items"))
                    };
                }

                var options = {
                    autoplay: o.attr("data-autoplay") === "true",
                    loop: o.attr("data-loop") !== "false",
                    margin: o.attr("data-margin") ? parseInt(o.attr("data-margin")) : 30,
                    nav: o.attr("data-nav") === "true",
                    stagePadding: o.attr("data-stage-padding") ? parseInt(o.attr("data-stage-padding")) : 0,
                    dots: o.attr("data-dots") === "true",
                    dotsEach: o.attr("data-dots-each") ? parseInt(o.attr("data-dots-each")) : false,
                    responsive: responsive
                }

                $(window).on('load resize', function () {
                    if ($(this).width() > 1199) {
                        c.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
                        c.find('.owl-stage-outer').children().unwrap();
                    } else {
                        c.owlCarousel(options)
                    }
                })


            });
        });
    }
})(jQuery);

/**
 * @module       RD Navbar
 * @description  Enables RD Navbar Plugin
 */
;
(function ($) {
    var o = $('.rd-navbar');
    if (o.length > 0) {
        include('js/jquery.rd-navbar.min.js');

        $(document).ready(function () {
            o.rdnavbar({
                stuckWidth: 100000,
                stuckMorph: false,
                stuckLayout: "rd-navbar-static",
                responsive: {
                    0: ["rd-navbar-fixed"],
                    767: o.attr("data-rd-navbar-lg").split(" ")
                },
                onepage: {
                    enable: false,
                    offset: 0,
                    speed: 400
                }
            });
        });
    }
})(jQuery)
;
/**
 * @description  Floating Button Action
 */
;
(function ($) {
    var o = $('#floating-btn');
    if (o.length > 0) {
        $(document).ready(function () {
            o.click(function (e) {
                e.preventDefault();
                o.parent().removeClass('visible-out').addClass('visible');
            })

            $(document).on('click touchstart', function (e) {
                var container = $("#filters");
                if (!container.is(e.target)
                    && container.has(e.target).length === 0 && container.hasClass('visible')) {
                    container.removeClass('visible').addClass('visible-out');
                }
            })
        });
    }
})(jQuery);