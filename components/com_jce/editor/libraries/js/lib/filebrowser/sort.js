/* eslint-disable consistent-this */
/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2022 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */

/* global jQuery */

(function ($) {

    $.fn.listsort = function (options) {
        options = $.extend({
            fields: {}
        }, options);

        var el = this;

        $.each(options.fields, function (element, props) {
            $(element).addClass('asc').on('click', function () {
                var direction = 'asc';

                $(this).toggleClass(function () {
                    if ($(this).is('.asc')) {
                        $(this).removeClass('asc');
                        direction = 'desc';
                    } else {
                        $(this).removeClass('desc');
                        direction = 'asc';
                    }

                    return direction;
                });

                var selector = props.selector;

                if ($.type(selector) == 'string') {
                    selector = [selector];
                }

                $.each(selector, function (i, s) {
                    sortList(s, $(element).data('sort-type'), props.attribute, direction);
                });
            });
        });

        function sortList(selector, type, attribute, direction) {
            var fn;

            switch (type) {
                case 'date':
                    fn = sortDate;
                    break;
                default:
                    fn = sortCompare;
                    break;
            }

            // create the list to sort
            var list = $(selector, el).map(function () {
                var v = $(this).attr(attribute) || $(this).text();

                if (type == 'number') {
                    v = parseFloat(v);
                }

                if (type == 'extension') {
                    v = v.substring(v.length, v.lastIndexOf('.') + 1).toLowerCase();
                }

                if (type == 'string') {
                    v = v.toLowerCase();
                }

                return {
                    value: v,
                    element: this
                };
            }).get();

            // sort list
            list.sort(fn);

            if (direction == 'desc' || type == 'extension') {
                list.reverse();
            }

            $.each(list, function (i, item) {
                $(el).append(item.element);
            });

            // destroy list
            list = null;

            $(el).trigger('listsort:sort', { 'type': type, 'direction': direction });
        }
        function sortDate(a, b) {
            var x = a.value, y = b.value, r = 0, d1 = 0, d2 = 0, t1 = 0, t2 = 0;
            var re = /(\d{2})[\/](\d{2})[\/](\d{4}), (\d{2})[:](\d{2})/g;

            d1 = x.replace(re, '$3$2$1');
            d2 = y.replace(re, '$3$2$1');

            t1 = x.replace(re, '$4$5');
            t2 = y.replace(re, '$4$5');

            // sort date
            if (d1 > d2) {
                r = 1;
            }

            if (d1 < d2) {
                r = -1;
            }

            // sort time
            if (t1 > t2) {
                r = 1;
            }

            if (t1 < t2) {
                r = -1;
            }

            return r;
        }
        function sortCompare(a, b) {
            if (a.value < b.value) {
                return -1;
            }

            if (b.value < a.value) {
                return 1;
            }

            return 0;
        }

        return this;
    };
})(jQuery);
