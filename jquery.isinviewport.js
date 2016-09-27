/*!
 * jQuery isInViewport
 * @author: me@habibhadi.com
 * @version v1.0.3
 */
;(function ( $, window, document, undefined ) {
    'use strict';

    var pluginName = 'isInViewport',
        win = $(window),
        defaults = {
            version: "1.0.0",
            inset: 1,
            timeout: 250
        };

    function Plugin( element, options, callback ) {
        this.element = element;

        this._defaults = defaults;
        this._name = pluginName;

        if(typeof options === 'object') {
            this.options = $.extend( {}, defaults, options);

            if(typeof callback === 'function') {
                this.callback = callback;
            }
        }
        else if(typeof options === 'function') {
            this.options = defaults;
            this.callback = options;
        }

        this.init();
    }

    Plugin.prototype.init = function () {
        var _this = this;

        var scrolling;
        win.scroll(function() {
            clearTimeout(scrolling);
            scrolling = setTimeout(function(){
                _this.callback.call(this, _this.inViewport(), _this.element);
            }, _this.options.timeout);
        });

        // fire callback on load
        _this.callback.call(this, _this.inViewport(), _this.element);
    };

    Plugin.prototype.inViewport = function(){
        var _this = this;

        var targetElem = $(_this.element);
        var inset = _this.options.inset < 1 ? _this.options.inset * targetElem.height() : 0;

        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };

        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height() - inset;

        var bounds = targetElem.offset();
        bounds.right = bounds.left + targetElem.outerWidth();
        bounds.bottom = bounds.top + targetElem.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    $.fn[pluginName] = function ( options, callback ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options, callback ));
            }
        });
    };

})( jQuery, window, document );
