<?php

/**
 * Plugin Name: Simple Feature Board
 * Plugin URI: https://developer.wordpress.org/plugins/plugin-basics/header-requirements/
 * Description: This awesome plugin can helps you to manage multiple feature board with votes and comments.
 * Version: 1.0.0
 * Requires at least: 5.2
 * Requires PHP: 7.2
 * Author: Dhrupo
 * Author URI: https://niluthpalpurkayastha.netlify.app/
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI: https://developer.wordpress.org/plugins/plugin-basics/header-requirements/
 * Text Domain: simple-feature-board
 * Domain Path: /languages
 */

/*
Simple Feature Board is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.
 
Simple Feature Board is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
 
You should have received a copy of the GNU General Public License
along with Simple Feature Board. If not, see https://www.gnu.org/licenses/gpl-2.0.html.
*/

if (!defined('ABSPATH')) {
  exit;
}

require_once __DIR__ . '/vendor/autoload.php';

final class WP_Feature_Board
{

  /**
   * Define Plugin Version
   */
  const VERSION = '1.0.0';

  /**
   * Construct Function
   */
  public function __construct()
  {
    $this->plugin_constants();
    register_activation_hook(__FILE__, [$this, 'activate']);
    register_deactivation_hook(__FILE__, [$this, 'deactivate']);
    add_action('plugins_loaded', [$this, 'init_plugin']);
  }

  /**
   * Plugin Constants
   * @since 1.0.0
   */
  public function plugin_constants()
  {
    define('WPSFB_VERSION', self::VERSION);
    define('WPSFB_PLUGIN_PATH', trailingslashit(plugin_dir_path(__FILE__)));
    define('WPSFB_PLUGIN_URL', trailingslashit(plugins_url('', __FILE__)));
    define('WPSFB_ASSETS', WPSFB_PLUGIN_URL . '/assets');
    // define('WPSFB_NONCE', 'b?le*;K7.T2jk_*(+3&[G[xAc8O~Fv)2T/Zk9N:GKBkn$piN0.N%N~X91VbCn@.4');
  }

  /**
   * Singletone Instance
   * @since 1.0.0
   */
  public static function init()
  {
    static $instance = false;

    if (!$instance) {
      $instance = new self();
    }

    return $instance;
  }

  /**
   * On Plugin Activation
   * @since 1.0.0
   */
  public function activate()
  {
    $installer = new \WPSFB\Includes\Installer();
    $installer->run();
  }

  /**
   * On Plugin De-actiavtion
   * @since 1.0.0
   */
  public function deactivate()
  {
    // On plugin deactivation
  }

  /**
   * Init Plugin
   * @since 1.0.0
   */
  public function init_plugin()
  {
    new \WPSFB\Includes\Assets();
    if (is_admin()) {
      new \WPSFB\Includes\Admin();
      new \WPSFB\Includes\Models();
    }
    new \WPSFB\Includes\Frontend();
    new \WPSFB\Includes\FrontendModels();
  }
}

/**
 * Initialize Main Plugin
 * @since 1.0.0
 */
function wp_feature_board()
{
  return WP_Feature_Board::init();
}

// Run the Plugin
wp_feature_board();
