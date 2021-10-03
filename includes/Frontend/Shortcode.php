<?php

namespace WPSFB\Includes\Frontend;

class Shortcode
{
  function __construct()
  {
    // add_shortcode('wpsfb-shortcode', [$this, 'render_shortcode']);
    add_shortcode('wpsfb-feature-board', [$this, 'feature_board']);
  }

  public function render_shortcode($atts, $content = '')
  {
    wp_enqueue_script('wpsfb-script');
    wp_enqueue_style('wpsfb-style');
    $content .= '<div id="wpsfb-frontend-app">hello from shortcode</div>';
    return $content;
  }

  public function feature_board($atts = [], $content = '')
  {
    global $wpdb;
    $atts = shortcode_atts(array(
      'id' => ''
    ), $atts);

    $table_name = $wpdb->prefix . 'sfb_features_board';
    if (!empty($atts['id'])) {
      $item = $wpdb->get_row(
        $wpdb->prepare(
          "SELECT * FROM $table_name WHERE id=%d",
          $atts['id']
        )
      );

      $content .= "<div class='wpsfb-shortcode-wrapper'>";

      if ($item) {
        // add_filter('wp_title', function ($item) {
        //   return $item->title;
        // });
        $content .= '<h3>' . esc_html($item->title) . '</h3>';
        $content .= '<p>' . esc_html($item->details) . '</p>';
        $content .= "</div>";
        return $content;
      } else {
        $content .= "<h3><?php echo 'No data found!' ?></h3>";
        $content .= "</div>";
        return $content;
      }
    }
  }
}
