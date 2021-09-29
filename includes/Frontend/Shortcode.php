<?php

namespace WPSFB\Includes\Frontend;

class Shortcode
{
  function __construct()
  {
    // add_shortcode('wpsfb-shortcode', [$this, 'render_shortcode']);
    add_shortcode('wpsfb-feature-shortcode', [$this, 'feature_shortcode']);
  }

  public function render_shortcode($atts, $content = '')
  {
    wp_enqueue_script('wpsfb-script');
    wp_enqueue_style('wpsfb-style');
    $content .= '<div id="wpsfb-frontend-app">hello from shortcode</div>';
    return $content;
  }

  public function feature_shortcode($atts = [])
  {
    global $wpdb;
    $atts = shortcode_atts(array(
      'id' => ''
    ), $atts);

    $table_name = $wpdb->prefix . 'feature';
    if (!empty($atts['id'])) {
      $item = $wpdb->get_row(
        $wpdb->prepare(
          "SELECT * FROM $table_name WHERE id=%d",
          $atts['id']
        )
      );
?>
      <div class="wpsfb-shortcode-wrapper">
        <h1><?php echo esc_html($item->title); ?></h1>
        <p><?php echo esc_html($item->details) ?></p>
      </div>
<?php
    }
  }
}
