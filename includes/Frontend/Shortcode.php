<?php

namespace WPSFB\Includes\Frontend;

class Shortcode
{
  protected $id;
  function __construct()
  {
    add_shortcode('wpsfb-feature-board', [$this, 'feature_board']);
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
      $content .= "<h2 class='error'></h2>";

      if ($board) {
        $content .= "<div class='feature-board-content'>";
        //board
        $content .= "<div class='feature-board-all'>";
        $content .= "<div id='feature-id' data-board-id ='" . $id . "'>";
        $content .= "<h4 class='title'>" . esc_html($board->title) . "</h4>";
        $content .= "<p>" . esc_html($board->details) . "</p>";
        $content .= "</div>";
        $content .= "<div class='input-group'>";
        $content .= "<form onsubmit='return false;'>";
        $content .= "<input type='text' id='request-search' placeholder='Search using title or tags'>";
        $content .= "<input type='hidden' id='search-nonce' value=" . htmlentities(wp_create_nonce('search-nonce')) . ">";
        $content .= "</form>";
        $content .= "<div class='input-group'>";
        $content .= "<label for='status'>Status</label>";
        $content .= "<select required id='feature-request-select'>";
        $content .= "<option disabled selected='true'>Please select one</option>";
        $content .= "<option value='all'>All</option>";
        $content .= "<option value='published'>Published</option>";
        $content .= "<option value='unpublished'>Unpublished</option>";
        $content .= "<option value='pending'>Pending</option>";
        $content .= "<option value='planned'>Planned</option>";
        $content .= "<option value='under review'>Under Review</option>";
        $content .= "</select>";
        $content .= "</div>";
        $content .= "</div>";
        $content .= "</div>";

        //add form button
        if (is_user_logged_in()) {
          $content .= "<button class='btn add-feature'>Add a feature request</button>";
        }
        //request
        $content .= "<div class='feature-request-content'></div>";
        $content .= "</div>";

        //request add form
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
        $content .= "<div class='btn-group'>";
        $content .= "<button type='submit' class='btn'>Add Feature Request</button>";
        $content .= "<button class='btn back-to-req'>Back To List</button>";
        $content .= "</div>";
        $content .= "</form>";
        $content .= "</div>";

        $content .= "<div class='request-details'>";
        $content .= "<button class='btn back-to-req'>Back</button>";
        $content .= "<div class='feature-vote-wrapper'>";
        $content .= "<div class='single-feature'>";
        $content .= "<h4 class='single-feature-title'></h4>";
        $content .= "<p class='single-feature-details'></p>";
        $content .= "<p class='single-feature-status'></p>";
        $content .= "<p class='tags-wrapper'></p>";
        $content .= "<p class='user'>Requested by <b></b></p>";
        $content .= "</div>";

        $content .= "<div class='vote'>";
        $content .= "<p class='vote-count'>Total votes: <b></b></p>";
        if (is_user_logged_in()) {
          $content .= "<div class='btn-check-vote'></div>";
        }
        $content .= "</div>";
        $content .= "</div>";

        $content .= "<div class='request-comments-wrapper'>";
        $content .= "<h6>Comments</h6>";
        if (is_user_logged_in()) {
          $content .= "<form>";
          $content .= "<textarea required placeholder='Type a comment...' rows='2' class='input-comment'></textarea>";
          $content .= "<button class='btn add-comment' type='submit'>Comment</button>";
          $content .= "<button class='btn btn-edit-comment' type='submit'>Edit</button>";
          $content .= "</form>";
        }
        $content .= "<div class='request-comment'></div>";
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
