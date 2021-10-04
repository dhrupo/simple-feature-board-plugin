<?php

namespace WPSFB\Includes\Frontend;

class Shortcode
{
  function __construct()
  {
    // add_shortcode('wpsfb-shortcode', [$this, 'render_shortcode']);
    add_action('wp_ajax_wpsfb_get_features_board_list', [$this, 'wpsfb_get_features_board_list']);
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

    if (!empty($atts['id'])) {
      $board = $wpdb->get_row(
        $wpdb->prepare(
          "SELECT * FROM wp_sfb_features_board WHERE id=%d",
          $atts['id']
        )
      );

      $requests = $wpdb->get_results(
        $wpdb->prepare(
          "SELECT * FROM wp_sfb_features_request WHERE feature_board_id=%d",
          $atts['id']
        )
      );

      $content .= "<div class='wpsfb-shortcode-wrapper'>";

      if ($board) {
        $content .= '<h3>' . esc_html($board->title) . '</h3>';
        $content .= '<p>' . esc_html($board->details) . '</p>';
        $content .= "</div>";

        $content .= "<div>";

        $content .= "<ul>";
        foreach ($requests as $req) {
          $content .= '<li>' . esc_html($req->title) . '</li>';
        }
        $content .= "</ul>";

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
