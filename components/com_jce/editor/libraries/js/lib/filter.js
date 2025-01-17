/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2022 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */

(function($) {

    $.widget("ui.listFilter", {
        options: {
            list: null,
            items: null,
            clear: null,
            sort: null,
            hide: false,
            filter: null,
            onFilter: null,
            onFind: null
        },
        working: false,
        _init: function() {
            var self = this, el = this.element, x = [];

            $(this.options.clear).on('click', function(e) {
                $(this).removeClass('clear');

                self.reset();

                $(el).val('');
                x = [];

                self._trigger('onFind', e, [x]);

                return;
            });

            $(el).keyup(function(e) {
                var v = this.value;

                if (v ) {
                    if (v !== ".") {
                        if (!$(this).hasClass('working')) {
                            // set working state
                            $(this).addClass('working');
                            // wait to collect input...
                            window.setTimeout(function() {
                                self._find(v, e);
                            }, 500);
                        }
                    }
                } else {
                    $(self.options.clear).trigger('click');
                    $(this).removeClass('working');
                }
            });
        },
        filter: function(s, cb) {
            var x = [], f, v, o = this.options;

            if (/[a-z0-9_\.-]/i.test(s)) {
                $(this.options.items).each(function() {
                    var n = Wf.String.basename($(this).attr('title'));

                    if (s.charAt(0) == '.') {
                        v = s.substr(1);
                        f = n.substr(n.lastIndexOf('.') + 1);
                    } else {
                        f = n.substring(0, s.length);
                        v = s;
                    }

                    if (f.toLowerCase() == v.toLowerCase()) {
                        if ($.inArray(this, x) == -1) {
                            x.push(this);
                        }
                    } else {
                        var i = $.inArray(this, x);
                        if (i != -1) {
                            x.splice(i, 1);
                        }
                    }
                });
            } else {
                x = [];
            }

            if (x && x.length) {
                x = this._sort(x);
                this._scroll(x[0]);

                if (o.filter) {
                    $(o.filter).not(x).hide();
                }

            } else {
                this.reset();
            }

            this._found(x);
        },
        _found: function(x) {
            $(this.element).removeClass('working');

            x = x || [];

            this._trigger('onFind', null, [x]);
        },
        _find: function(s, e) {
            var self = this, o = this.options, x = [], filter;

            $(o.clear).toggleClass('clear', !!s);

            if (o.onFilter) {
                return self._trigger('onFilter', e, [s, this._found, this]);
            }

            return this.filter(s);
        },
        _scroll: function(el) {
            var self = this, $list = $(this.options.list);

            var pos = $(el).position();
            var top = $list.scrollTop();

            $list.css('overflow', 'hidden').animate({
                scrollTop: pos.top + top
            }, 1000, function() {
                $list.css('overflow', 'auto');
            });
        },
        _sort: function(x) {
            var a = [];

            $(this.options.items).each(function() {
                if ($.inArray(this, x) != -1) {
                    a.push(this);
                }
            });
            return a;
        },
        reset: function() {
            $(this.options.filter).show();

            this._scroll($('li:first', this.options.list));
        },
        destroy: function() {
            $.Widget.prototype.destroy.apply(this, arguments);
        }
    });
})(jQuery);
