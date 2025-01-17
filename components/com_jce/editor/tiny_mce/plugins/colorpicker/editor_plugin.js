/**
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2022 Ryan Demmer. All rights reserved.
 * @license   	GNU/GPL 2 or later - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * JCE is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */

/*global tinymce:true */

(function () {
  tinymce.create('tinymce.plugins.ColorPicker', {
    init : function (ed, url) {
      this.editor = ed;

      // Register commands
      ed.addCommand('mceColorPicker', function (ui, v) {
        ed.windowManager.open({
          url     : ed.getParam('site_url') + 'index.php?option=com_jce&task=plugin.display&plugin=colorpicker',
          width   : 365,
          height  : 320,
          close_previous : false
        }, {
          input_color : v.color,
          func        : v.func
        });
      });
    }
  });
  // Register plugin
  tinymce.PluginManager.add('colorpicker', tinymce.plugins.ColorPicker);
})();
