<?php

namespace WPSFB\Includes;

class FrontendModels
{
  function __construct()
  {
    add_action('wp_enqueue_scripts', [$this, 'wpsfb_frontend_scripts']);

    add_action('wp_ajax_wpsfb_frontend_get_features_request_list', [$this, 'wpsfb_frontend_get_features_request_list']);
    add_action('wp_ajax_nopriv_wpsfb_frontend_get_features_request_list', [$this, 'wpsfb_frontend_get_features_request_list']);
    add_action('wp_ajax_wpsfb_frontend_get_features_request_count', [$this, 'wpsfb_frontend_get_features_request_count']);
    add_action('wp_ajax_nopriv_wpsfb_frontend_get_features_request_count', [$this, 'wpsfb_frontend_get_features_request_count']);
    add_action('wp_ajax_wpsfb_frontend_get_feature_by_status', [$this, 'wpsfb_frontend_get_feature_by_status']);
    add_action('wp_ajax_nopriv_wpsfb_frontend_get_feature_by_status', [$this, 'wpsfb_frontend_get_feature_by_status']);
    add_action('wp_ajax_wpsfb_frontend_get_searched_feature', [$this, 'wpsfb_frontend_get_searched_feature']);
    add_action('wp_ajax_nopriv_wpsfb_frontend_get_searched_feature', [$this, 'wpsfb_frontend_get_searched_feature']);
    add_action('wp_ajax_wpsfb_frontend_insert_feature_request', [$this, 'wpsfb_frontend_insert_feature_request']);
    add_action('wp_ajax_nopriv_wpsfb_frontend_insert_feature_request', [$this, 'wpsfb_frontend_insert_feature_request']);
    add_action('wp_ajax_wpsfb_frontend_get_single_feature_request', [$this, 'wpsfb_frontend_get_single_feature_request']);
    add_action('wp_ajax_nopriv_wpsfb_frontend_get_single_feature_request', [$this, 'wpsfb_frontend_get_single_feature_request']);
    add_action('wp_ajax_wpsfb_frontend_get_single_feature_to_edit', [$this, 'wpsfb_frontend_get_single_feature_to_edit']);
    add_action('wp_ajax_wpsfb_frontend_edit_feature_request', [$this, 'wpsfb_frontend_edit_feature_request']);
    add_action('wp_ajax_wpsfb_frontend_delete_feature_request', [$this, 'wpsfb_frontend_delete_feature_request']);
    add_action('wp_ajax_wpsfb_frontend_get_feature_request_comments', [$this, 'wpsfb_frontend_get_feature_request_comments']);
    add_action('wp_ajax_nopriv_wpsfb_frontend_get_feature_request_comments', [$this, 'wpsfb_frontend_get_feature_request_comments']);
    add_action('wp_ajax_wpsfb_frontend_get_single_feature_request_comment', [$this, 'wpsfb_frontend_get_single_feature_request_comment']);
    add_action('wp_ajax_wpsfb_frontend_is_logged_in', [$this, 'wpsfb_frontend_is_logged_in']);
    add_action('wp_ajax_nopriv_wpsfb_frontend_is_logged_in', [$this, 'wpsfb_frontend_is_logged_in']);
    add_action('wp_ajax_wpsfb_frontend_add_feature_request_comment', [$this, 'wpsfb_frontend_add_feature_request_comment']);
    add_action('wp_ajax_wpsfb_frontend_edit_feature_request_comment', [$this, 'wpsfb_frontend_edit_feature_request_comment']);
    add_action('wp_ajax_wpsfb_frontend_remove_feature_request_comment', [$this, 'wpsfb_frontend_remove_feature_request_comment']);
    add_action('wp_ajax_wpsfb_frontend_get_voted_user', [$this, 'wpsfb_frontend_get_voted_user']);
    add_action('wp_ajax_wpsfb_frontend_add_vote', [$this, 'wpsfb_frontend_add_vote']);
    add_action('wp_ajax_wpsfb_frontend_remove_vote', [$this, 'wpsfb_frontend_remove_vote']);
  }

  public function wpsfb_frontend_scripts()
  {
    wp_register_style('wpsfb-frontend-style', WPSFB_ASSETS . '/css/frontend.css', filemtime(WPSFB_PLUGIN_PATH . '/assets/css/frontend.css'));
    wp_register_script('wpsfb-frontend-script', WPSFB_ASSETS . '/js/wpsfb-frontend.js', ['jquery'], filemtime(WPSFB_PLUGIN_PATH . '/assets/js/wpsfb-frontend.js'), true);
    wp_enqueue_style('wpsfb-frontend-style');
    wp_enqueue_script('wpsfb-frontend-script');
    wp_localize_script('wpsfb-frontend-script', 'ajax_url', array(
      'ajaxurl' => admin_url('admin-ajax.php'),
      'wpsfb_frontend_nonce' => wp_create_nonce('wpsfb_ajax_frontend_nonce')
    ));
  }

  public function wpsfb_frontend_insert_feature_request()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;

    if (!empty($_POST['title'])) {
      $title = sanitize_text_field($_POST['title']);
    } else {
      return wp_send_json_error("please enter title", 400);
    }

    if (!empty($_POST['details'])) {
      $details = sanitize_textarea_field($_POST['details']);
    } else {
      return wp_send_json_error("please enter details", 400);
    }

    if (!empty($_POST['id'])) {
      $id = $_POST['id'];
    } else {
      return wp_send_json_error("Could not find any board id!", 400);
    }

    $user_id = get_current_user_id();
    $defaults = [
      'title' => $title,
      'details' => $details,
      'status' => 'under review',
      'feature_board_id' => $id,
      'user_id' => $user_id
    ];

    $table_name = $wpdb->prefix . 'sfb_features_request';
    $inserted = $wpdb->insert(
      $table_name,
      $defaults
    );

    if (!$inserted) {
      return wp_send_json_error("Error while adding feature request", 500);
    }

    return wp_send_json_success("Successfully added feature request", 200);
  }

  public function wpsfb_frontend_get_features_request_count()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;

    if (!empty($_POST['id'])) {
      $id = $_POST['id'];
    } else {
      return wp_send_json_error("Could not find any board id!", 400);
    }
    $count = $wpdb->get_row(
      $wpdb->prepare("SELECT COUNT(*) as count FROM wp_sfb_features_request AS fr WHERE fr.feature_board_id = %d", $id)
    );

    if (is_wp_error($count)) {
      wp_send_json_error('Bad SQL request', 500);
    }

    wp_send_json_success($count, 200);
  }

  public function wpsfb_frontend_get_features_request_list($args = [])
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;

    if (!empty($_POST['id'])) {
      $id = $_POST['id'];
    } else {
      return wp_send_json_error("Could not find any feature request id!", 400);
    }
    $pageno = isset($_POST['pageno']) ? $_POST['pageno'] : 1;
    $number = isset($_POST['reqPerPage']) ? isset($_POST['reqPerPage']) : 5;
    $offset = ($pageno - 1) * $number;
    // $totalPages = ceil($number / $offset);

    $defaults = [
      'offset' => $offset,
      'number' => $number,
      'orderby' => 'id',
      'order' => 'ASC'
    ];

    $args = wp_parse_args($args, $defaults);

    $items = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT fr.id, fr.title, fr.details, fr.status, u.user_login as username, u.ID as user_id, COUNT(DISTINCT c.id) as comment_count, COUNT(DISTINCT v.id) as vote_count, fr.feature_board_id FROM `wp_sfb_features_request` as fr LEFT JOIN wp_users as u ON u.ID = fr.user_id LEFT JOIN wp_sfb_comments AS c ON c.feature_request_id = fr.id LEFT JOIN wp_sfb_votes AS v ON v.feature_request_id = fr.id WHERE fr.feature_board_id = %d GROUP BY fr.id ORDER BY %s %s LIMIT %d, %d",
        $id,
        $args['orderby'],
        $args['order'],
        $args['offset'],
        $args['number']
      )
    );

    if (is_wp_error($items)) {
      wp_send_json_error('Bad SQL request', 400);
    }

    wp_send_json_success($items, 200);
  }

  public function wpsfb_frontend_get_single_feature_request()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;
    if (!empty($_POST['id'])) {
      $id = $_POST['id'];
    } else {
      return wp_send_json_error("Could not find any feature request id!", 400);
    }

    $selected = $wpdb->get_row(
      $wpdb->prepare(
        "SELECT fr.id, fr.title, fr.details, fr.status, u.ID as user_id, u.user_login as username, GROUP_CONCAT(DISTINCT tg.tagname SEPARATOR ',') AS tags, COUNT(DISTINCT c.id) as comment_count, COUNT(DISTINCT v.id) as vote_count FROM wp_sfb_features_request as fr LEFT JOIN wp_sfb_tags AS tg ON fr.id = tg.feature_request_id JOIN wp_users as u ON u.ID = fr.user_id LEFT JOIN wp_sfb_comments AS c ON c.feature_request_id = fr.id LEFT JOIN wp_sfb_votes AS v ON v.feature_request_id = fr.id WHERE fr.id = %d",
        $id
      )
    );
    if (!$selected) {
      return wp_send_json_error("Error while deleting data", 500);
    }

    return wp_send_json_success($selected, 200);
  }

  public function wpsfb_frontend_get_single_feature_to_edit()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_features_request';
    $id = $_POST['id'];
    $user_id = get_current_user_id();
    $selected = $wpdb->get_row(
      $wpdb->prepare(
        "SELECT fr.id, fr.title, fr.status, fr.details, fr.feature_board_id, fr.user_id FROM $table_name as fr WHERE fr.id = %d AND fr.user_id = %d",
        $id,
        $user_id
      )
    );
    if (!$selected) {
      return wp_send_json_error("Error while deleting data", 500);
    }

    return wp_send_json_success($selected, 200);
  }

  public function wpsfb_frontend_edit_feature_request()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;

    if (!empty($_POST['title'])) {
      $title = sanitize_text_field($_POST['title']);
    } else {
      return wp_send_json_error("please enter title", 400);
    }

    if (!empty($_POST['details'])) {
      $details = sanitize_text_field($_POST['details']);
    } else {
      return wp_send_json_error("please enter details", 400);
    }

    $board_id = $_POST['board_id'];
    $status = sanitize_text_field($_POST['status']);
    $user_id = get_current_user_id();

    if (!empty($_POST['id'])) {
      $id = $_POST['id'];
    } else {
      return wp_send_json_error("Could not find any id!", 400);
    }

    $defaults = [
      'title' => $title,
      'details' => $details,
      'status' => $status,
      'feature_board_id' => $board_id,
      'user_id' => $user_id
    ];
    $where = ['id' => $id, 'user_id' => $user_id];

    $table_name = $wpdb->prefix . 'sfb_features_request';
    $updated = $wpdb->update($table_name, $defaults, $where);

    if (!$updated) {
      return wp_send_json_error("Error while updating feature request data", 500);
    }

    return wp_send_json_success("Successfully update feature request", 200);
  }

  public function wpsfb_frontend_delete_feature_request()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_features_request';

    $defaults = [
      'id' => $_POST['id'],
      'user_id' => get_current_user_id()
    ];

    $deleted = $wpdb->delete($table_name, $defaults);

    if (!$deleted) {
      return wp_send_json_error("Error while deleting data", 500);
    }

    return wp_send_json_success("Successfully deleted data", 200);
  }

  public function wpsfb_frontend_get_feature_request_comments()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_comments';
    if (!empty($_POST['id'])) {
      $id = $_POST['id'];
    } else {
      return wp_send_json_error("Could not find any feature request id!", 400);
    }
    $selected = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT c.id, c.comment, u.user_login, u.ID as user_id FROM $table_name as c JOIN wp_users AS u ON u.ID = c.user_id WHERE c.feature_request_id = %d ORDER BY c.id DESC",
        $id
      )
    );

    return wp_send_json_success($selected, 200);
  }

  public function wpsfb_frontend_get_single_feature_request_comment()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_comments';
    if (!empty($_POST['comment_id'])) {
      $comment_id = $_POST['comment_id'];
    } else {
      return wp_send_json_error("Could not find any comment id!", 400);
    }

    $selected = $wpdb->get_row(
      $wpdb->prepare(
        "SELECT c.id, c.comment, c.feature_request_id, c.user_id from $table_name as c WHERE c.id = %d",
        $comment_id
      )
    );

    if (!$selected) {
      return wp_send_json_error("No such comment found", 200);
    }

    return wp_send_json_success($selected, 200);
  }

  public function wpsfb_frontend_add_feature_request_comment()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;
    if (!empty($_POST['id'])) {
      $id = $_POST['id'];
    } else {
      return wp_send_json_error("Could not find any feature request id!", 400);
    }
    if (!empty($_POST['comment'])) {
      $comment = sanitize_textarea_field($_POST['comment']);
    } else {
      return wp_send_json_error("please enter comment", 400);
    }
    $user_id = get_current_user_id();

    $defaults = [
      'comment' => $comment,
      'feature_request_id' => $id,
      'user_id' => $user_id
    ];

    $table_name = $wpdb->prefix . 'sfb_comments';
    $inserted = $wpdb->insert(
      $table_name,
      $defaults
    );

    if (!$inserted) {
      return wp_send_json_error("Error while adding comments", 400);
    }

    return wp_send_json_success("Successfully added comments", 200);
  }

  public function wpsfb_frontend_edit_feature_request_comment()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;

    if (!empty($_POST['comment_id'])) {
      $comment_id = $_POST['comment_id'];
    } else {
      return wp_send_json_error("Could not find any feature request id!", 400);
    }

    if (!empty($_POST['req_id'])) {
      $req_id = $_POST['req_id'];
    } else {
      return wp_send_json_error("Could not find any feature request id!", 400);
    }

    if (!empty($_POST['comment'])) {
      $comment = sanitize_textarea_field($_POST['comment']);
    } else {
      return wp_send_json_error("please enter comment", 400);
    }

    $user_id = get_current_user_id();

    $defaults = [
      'comment' => $comment,
      'feature_request_id' => $req_id,
      'user_id' => $user_id
    ];

    $where = ['id' => $comment_id];

    $table_name = $wpdb->prefix . 'sfb_comments';
    $updated = $wpdb->update(
      $table_name,
      $defaults,
      $where
    );

    return wp_send_json_success("Successfully edited comments", 200);
  }

  public function wpsfb_frontend_remove_feature_request_comment()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_comments';

    if (!empty($_POST['comment_id'])) {
      $comment_id = $_POST['comment_id'];
    } else {
      return wp_send_json_error("Could not find any comment id!", 400);
    }

    $where = [
      'id' => $comment_id
    ];

    $deleted = $wpdb->delete(
      $table_name,
      $where
    );

    if (!$deleted) {
      return wp_send_json_error("Unsuccessfull attempt to delete", 500);
    }

    return wp_send_json_success($deleted, 200);
  }

  public function wpsfb_frontend_get_voted_user()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    if (is_user_logged_in()) {
      global $wpdb;
      $table_name = $wpdb->prefix . 'sfb_votes';
      $id = $_POST['id'];
      $current_user_id = get_current_user_id();
      $selected = $wpdb->get_row(
        $wpdb->prepare(
          "SELECT * FROM $table_name as v WHERE v.feature_request_id = %d AND v.user_id = %d",
          $id,
          $current_user_id
        )
      );
      return wp_send_json_success($selected, 200);
    } else {
      return wp_send_json_error("user is not logged in", 500);
    }
  }

  public function wpsfb_frontend_add_vote()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_votes';
    $id = $_POST['id'];
    $current_user_id = get_current_user_id();

    $defaults = [
      'feature_request_id' => $id,
      'user_id' => $current_user_id
    ];

    $inserted = $wpdb->insert(
      $table_name,
      $defaults
    );

    if ($inserted) {
      $selected = $wpdb->get_row(
        $wpdb->prepare(
          "SELECT * FROM $table_name as v WHERE v.feature_request_id = %d AND v.user_id = %d",
          $id,
          $current_user_id
        )
      );
      return wp_send_json_success($selected, 200);
    }

    return wp_send_json_error("Unsuccessfull attempt to vote", 200);
  }

  public function wpsfb_frontend_remove_vote()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_votes';
    $id = $_POST['id'];
    $current_user_id = get_current_user_id();

    $defaults = [
      'feature_request_id' => $id,
      'user_id' => $current_user_id
    ];

    $deleted = $wpdb->delete(
      $table_name,
      $defaults
    );

    if ($deleted) {
      $selected = $wpdb->get_row(
        $wpdb->prepare(
          "SELECT * FROM $table_name as v WHERE v.feature_request_id = %d AND v.user_id = %d",
          $id,
          $current_user_id
        )
      );

      return wp_send_json_success($selected, 200);
    }

    return wp_send_json_success("Successfully unvoted", 200);
  }

  public function wpsfb_frontend_get_searched_feature($args)
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;

    $id = isset($_POST['id']) ? $_POST['id'] : '';
    $search = sanitize_text_field(isset($_POST['search']) ? $_POST['search'] : '');
    $defaults = [
      'number' => 5,
      'offset' => 0,
      'orderby' => 'id',
      'order' => 'ASC'
    ];

    $args = wp_parse_args($args, $defaults);

    $items = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT fr.id, fr.title, fr.details, fr.status, u.user_login as username, u.ID as user_id, GROUP_CONCAT(DISTINCT tg.tagname SEPARATOR ',') AS tags, COUNT(DISTINCT c.id) as comment_count, COUNT(DISTINCT v.id) as vote_count, fr.feature_board_id FROM `wp_sfb_features_request` as fr LEFT JOIN wp_sfb_tags AS tg ON fr.id = tg.feature_request_id JOIN wp_users as u ON u.ID = fr.user_id LEFT JOIN wp_sfb_comments AS c ON c.feature_request_id = fr.id LEFT JOIN wp_sfb_votes as v ON v.feature_request_id = fr.id WHERE fr.feature_board_id = %d AND fr.title LIKE '%$search%' OR tg.tagname LIKE '%$search%' GROUP BY fr.id ORDER BY %s %s LIMIT %d, %d",
        $id,
        $$args['orderby'],
        $args['order'],
        $args['offset'],
        $args['number']
      )
    );

    if (count($items) == 0) {
      return wp_send_json(['data' => 'No such request found'], 200);
    }

    wp_send_json_success($items, 200);
  }

  public function wpsfb_frontend_get_feature_by_status()
  {
    if (!wp_verify_nonce($_POST['wpsfb_frontend_nonce'], 'wpsfb_ajax_frontend_nonce')) {
      return wp_send_json_error('Busted! Please login!', 400);
    }

    global $wpdb;

    if (!empty($_POST['id'])) {
      $id = $_POST['id'];
    } else {
      return wp_send_json_error("Could not find any request id!", 400);
    }

    if (!empty($_POST['status'])) {
      $valid_values = ['all', 'published', 'unpublished', 'pending', 'planned', 'under review'];
      $get_status = sanitize_text_field($_POST['status']);
    } else {
      return wp_send_json_error('Please provide valid status to search', 400);
    }

    if (in_array($get_status, $valid_values)) {
      $status = $get_status;
      if ($get_status == 'all') {
        $items = $wpdb->get_results(
          $wpdb->prepare(
            "SELECT fr.id, fr.title, fr.details, fr.status, u.user_login as username, u.ID as user_id, COUNT(DISTINCT c.id) as comment_count, COUNT(DISTINCT v.id) as vote_count, fr.feature_board_id FROM `wp_sfb_features_request` as fr LEFT JOIN wp_users as u ON u.ID = fr.user_id LEFT JOIN wp_sfb_comments AS c ON c.feature_request_id = fr.id LEFT JOIN wp_sfb_votes AS v ON v.feature_request_id = fr.id WHERE fr.feature_board_id = %d GROUP BY fr.id ORDER BY id ASC",
            $id
          )
        );
      } else {
        $items = $wpdb->get_results(
          $wpdb->prepare(
            "SELECT fr.id, fr.title, fr.details, fr.status, u.user_login as username, u.ID as user_id, COUNT(DISTINCT c.id) as comment_count, COUNT(DISTINCT v.id) as vote_count from wp_sfb_features_request as fr left join wp_users as u on fr.user_id = u.ID LEFT JOIN wp_sfb_comments AS c ON c.feature_request_id = fr.id LEFT JOIN wp_sfb_votes AS v ON v.feature_request_id = fr.id where fr.status=%s GROUP BY fr.id",
            $status
          )
        );
        if (count($items) == 0) {
          return wp_send_json(['data' => "No request available for this status"], 200);
        }
      }
    } else {
      return wp_send_json_error('Bad SQL request', 400);
    }

    return wp_send_json_success($items, 200);
  }

  public function wpsfb_frontend_is_logged_in()
  {
    if (is_user_logged_in()) {
      wp_send_json(['user' => true, 'user_id' => get_current_user_id()]);
    } else {
      wp_send_json(['user' => false]);
    }
  }
}
