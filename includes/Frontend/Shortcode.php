<?php

namespace WPSFB\Includes\Frontend;

class Shortcode
{
  protected $id;
  function __construct()
  {
    add_action('wp_enqueue_scripts', [$this, 'add_scripts']);
    add_shortcode('wpsfb-feature-board', [$this, 'feature_board']);
  }

  public function add_scripts()
  {
    wp_register_style('wpsfb-frontend-style', WPSFB_ASSETS . '/css/frontend.css', filemtime(WPSFB_PLUGIN_PATH . '/assets/css/frontend.css'));
    wp_register_script('wpsfb-frontend-script', WPSFB_ASSETS . '/js/wpsfb-frontend.js', ['jquery'], filemtime(WPSFB_PLUGIN_PATH . '/assets/js/wpsfb-frontend.js'), true);
    wp_enqueue_style('wpsfb-frontend-style');
    wp_enqueue_script('wpsfb-frontend-script');
    wp_localize_script('wpsfb-frontend-script', 'ajax_url', array(
      'ajaxurl' => admin_url('admin-ajax.php')
    ));
  }


  public function feature_board($atts = [], $content = '')
  {
    global $wpdb;
    $atts = shortcode_atts(array(
      'id' => ''
    ), $atts);
    $id = $atts['id'];

    if (!empty($atts['id'])) {
      $board = $wpdb->get_row(
        $wpdb->prepare(
          "SELECT * FROM wp_sfb_features_board WHERE id=%d",
          $atts['id']
        )
      );

      $content .= "<div class='wpsfb-shortcode-wrapper'>";

      if ($board) {
        $content .= "<div class='feature-board-content'>";
        $content .= "<div class='feature-board-all'>";
        $content .= "<div id='feature-id' data-board-id ='" . $id . "'>";
        $content .= "<h4 class='title'>" . esc_html($board->title) . "</h4>";
        $content .= "<p>" . esc_html($board->details) . "</p>";
        $content .= "</div>";
        $content .= "<div>";
        $content .= "<form>";
        $content .= "<input type='text' id='request-search' placeholder='Search'>";
        $content .= "</form>";
        $content .= "</div>";
        $content .= "</div>";
        $content .= "<button class='btn add-feature'>Add a feature request</button>";
        $content .= "</div>";

        $content .= "<div class='feature-request-content'></div>";

        $content .= "<div class='feature-add-content'>";
        $content .= "<form id='add-feature-request'>";
        $content .= "<div class='input-group'>";
        $content .= "<label for='feature-request-title'>Feature Request Title</label>";
        $content .= "<input required id='feature-request-title' type='text' placeholder='Feature Request Title'/>";
        $content .= "</div>";
        $content .= "<div class='input-group'>";
        $content .= "<label for='feature-request-details'>Feature Request Details</label>";
        $content .= "<textarea required id='feature-request-details' placeholder='Feature Request Details' cols='50' rows='5'></textarea>";
        $content .= "</div>";
        $content .= "<div class='input-group'>";
        $content .= "<label for='status'>Status</label>";
        $content .= "<select required id='feature-request-status'>";
        $content .= "<option disabled selected='true'>Please select one</option>";
        $content .= "<option value='published'>Published</option>";
        $content .= "<option value='unpublished'>Unpublished</option>";
        $content .= "<option value='pending'>Pending</option>";
        $content .= "</select>";
        $content .= "</div>";
        $content .= "<div class='input-group'>";
        $content .= "<label for='feature-request-tags'>Feature Request Tags</label>";
        $content .= "<input id='feature-request-tags' class='req-tags' type='text' placeholder='Add tags by space'/>";
        $content .= "<div class='tags-error'>Tags can not be empty!</div>";
        $content .= "</div>";
        $content .= "<div class='show-tags'></div>";
        $content .= "<div class='btn-group'>";
        $content .= "<button type='submit' class='btn'>Add Feature Request</button>";
        $content .= "<button class='btn back-to-req'>Back To List</button>";
        $content .= "</div>";
        $content .= "</form>";
        $content .= "</div>";

        $content .= "<div class='test-details'>";

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
