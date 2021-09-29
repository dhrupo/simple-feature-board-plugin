<?php

namespace WPSFB\Includes;

class Assets
{
  function __construct()
  {
    if (is_admin()) {
      add_action('admin_enqueue_scripts', [$this, 'register']);
    } else {
      add_action('wp_enqueue_scripts', [$this, 'register']);
    }
  }

  public function register()
  {
    $this->register_scripts($this->get_scripts());
    $this->register_styles($this->get_styles());
  }

  private function register_scripts($scripts)
  {
    foreach ($scripts as $handle => $script) {
      $deps      = isset($script['deps']) ? $script['deps'] : false;
      $in_footer = isset($script['in_footer']) ? $script['in_footer'] : false;
      $version   = isset($script['version']) ? $script['version'] : WPSFB_VERSION;

      wp_register_script($handle, $script['src'], $deps, $version, $in_footer);
    }
  }

  public function register_styles($styles)
  {
    foreach ($styles as $handle => $style) {
      $deps = isset($style['deps']) ? $style['deps'] : false;

      wp_register_style($handle, $style['src'], $deps, WPSFB_VERSION);
    }
  }

  public function get_scripts()
  {
    return [
      'wpsfb-runtime' => [
        'src' => WPSFB_ASSETS . '/js/runtime.js',
        'version' => filemtime(WPSFB_PLUGIN_PATH . '/assets/js/runtime.js'),
        'in_footer' => true
      ],
      'wpsfb-vendor' => [
        'src' => WPSFB_ASSETS . '/js/vendors.js',
        'version' => filemtime(WPSFB_PLUGIN_PATH . '/assets/js/vendors.js'),
        'in_footer' => true
      ],
      'wpsfb-script' => [
        'src' => WPSFB_ASSETS . '/js/frontend.js',
        'deps'      => ['jquery', 'wpsfb-vendor', 'wpsfb-runtime'],
        'version' => filemtime(WPSFB_PLUGIN_PATH . '/assets/js/frontend.js'),
        'in_footer' => true
      ],
      'wpsfb-admin-script' => [
        'src' => WPSFB_ASSETS . '/js/admin.js',
        'deps'      => ['jquery', 'wpsfb-vendor', 'wpsfb-runtime'],
        'version' => filemtime(WPSFB_PLUGIN_PATH . '/assets/js/admin.js'),
        'in_footer' => true
      ],
    ];
  }

  public function get_styles()
  {
    return [
      'wpsfb-style' => [
        'src' => WPSFB_ASSETS . '/frontend/css/frontend.css',
        'version' => filemtime(WPSFB_PLUGIN_PATH . '/assets/frontend/css/frontend.css')
      ],
      'wpsfb-admin-style' => [
        'src' => WPSFB_ASSETS . '/css/admin.css',
        'version' => filemtime(WPSFB_PLUGIN_PATH . '/assets/css/admin.css')
      ]
    ];
  }
}
