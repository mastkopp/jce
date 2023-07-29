<?php
/**
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 *
 */
defined('JPATH_PLATFORM') or die;

use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;

$this->name = Text::_('WF_PROFILES_DETAILS');
$this->fieldsname = 'setup';
echo LayoutHelper::render('joomla.content.options_default', $this);

$this->name = Text::_('WF_PROFILES_ASSIGNMENT');
$this->fieldsname = 'assignment';
echo LayoutHelper::render('joomla.content.options_default', $this);