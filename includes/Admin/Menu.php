<?php

namespace WPSFB\Includes\Admin;

class Menu
{
  function __construct()
  {
    add_action('admin_menu', [$this, 'wpsfb_admin_menu']);
  }

  public function wpsfb_admin_menu()
  {
    $hook = add_menu_page(
      __('Simple Feature Board', 'simple-feature-board'),
      __('Simple Feature Board', 'simple-feature-board'),
      'manage_options',
      'simple_feature_board',
      [$this, 'admin_menu_page'],
      'dashicons-text',
      10
    );

    add_action('load-' . $hook, [$this, 'init_hooks']);
  }

  public function init_hooks()
  {
    add_action('admin_enqueue_scripts', [$this, 'enqueue_scripts']);
  }

  public function admin_menu_page()
  {
    echo '<div id="wpsfb-admin-app"></div>';
  }

  public function enqueue_scripts()
  {
    wp_enqueue_style('wpsfb-admin-style');
    wp_enqueue_script('wpsfb-admin-script');
    // wp_localize_script('wpsfb', 'ajax_url', array(
    //   'ajaxurl' => admin_url('admin-ajax.php')
    // ));
  }
}
