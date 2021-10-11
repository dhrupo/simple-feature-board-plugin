<?php

namespace WPSFB\Includes;

use WP_User;

class FrontendModels
{
  function __construct()
  {
    //feature board tags
    add_action('wp_ajax_wpsfb_get_features_request_list', [$this, 'wpsfb_get_features_request_list']);
    add_action('wp_ajax_nopriv_wpsfb_get_features_request_list', [$this, 'wpsfb_get_features_request_list']);
    add_action('wp_ajax_wpsfb_get_features_request_count', [$this, 'wpsfb_get_features_request_count']);
    add_action('wp_ajax_nopriv_wpsfb_get_features_request_count', [$this, 'wpsfb_get_features_request_count']);
    add_action('wp_ajax_wpsfb_get_feature_by_status', [$this, 'wpsfb_get_feature_by_status']);
    add_action('wp_ajax_nopriv_wpsfb_get_feature_by_status', [$this, 'wpsfb_get_feature_by_status']);
    add_action('wp_ajax_wpsfb_get_searched_feature', [$this, 'wpsfb_get_searched_feature']);
    add_action('wp_ajax_nopriv_wpsfb_get_searched_feature', [$this, 'wpsfb_get_searched_feature']);
    add_action('wp_ajax_wpsfb_insert_feature_request', [$this, 'wpsfb_insert_feature_request']);
    add_action('wp_ajax_nopriv_wpsfb_insert_feature_request', [$this, 'wpsfb_insert_feature_request']);
    add_action('wp_ajax_wpsfb_get_single_feature_request', [$this, 'wpsfb_get_single_feature_request']);
    add_action('wp_ajax_nopriv_wpsfb_get_single_feature_request', [$this, 'wpsfb_get_single_feature_request']);
    add_action('wp_ajax_nopriv_wpsfb_get_feature_requests_votes_count', [$this, 'wpsfb_get_feature_requests_votes_count']);
    add_action('wp_ajax_wpsfb_get_feature_requests_votes_count', [$this, 'wpsfb_get_feature_requests_votes_count']);
    add_action('wp_ajax_wpsfb_get_feature_request_comments', [$this, 'wpsfb_get_feature_request_comments']);
    add_action('wp_ajax_nopriv_wpsfb_get_feature_request_comments', [$this, 'wpsfb_get_feature_request_comments']);
    add_action('wp_ajax_nopriv_wpsfb_is_logged_in', [$this, 'wpsfb_is_logged_in']);
    add_action('wp_ajax_wpsfb_is_logged_in', [$this, 'wpsfb_is_logged_in']);
    add_action('wp_ajax_wpsfb_sign_in', [$this, 'wpsfb_sign_in']);
    add_action('wp_ajax_nopriv_wpsfb_sign_in', [$this, 'wpsfb_sign_in']);
    add_action('wp_ajax_wpsfb_sign_out', [$this, 'wpsfb_sign_out']);
    add_action('wp_ajax_nopriv_wpsfb_sign_out', [$this, 'wpsfb_sign_out']);

    //feature request
    add_action('wp_ajax_wpsfb_get_single_feature_to_edit', [$this, 'wpsfb_get_single_feature_to_edit']);
    add_action('wp_ajax_wpsfb_delete_feature_request', [$this, 'wpsfb_delete_feature_request']);
    add_action('wp_ajax_wpsfb_edit_feature_request', [$this, 'wpsfb_edit_feature_request']);

    //comments
    add_action('wp_ajax_wpsfb_add_feature_request_comment', [$this, 'wpsfb_add_feature_request_comment']);
    add_action('wp_ajax_wpsfb_get_voted_user', [$this, 'wpsfb_get_voted_user']);
    add_action('wp_ajax_wpsfb_add_vote', [$this, 'wpsfb_add_vote']);
    add_action('wp_ajax_wpsfb_remove_vote', [$this, 'wpsfb_remove_vote']);
  }

  public function wpsfb_admin_scripts()
  {
    wp_enqueue_script('wpsfb', WPSFB_ASSETS . '/js/simple-feature-board.js', null, WPSFB_VERSION, true);
    wp_localize_script('wpsfb', 'ajax_url', array(
      'ajaxurl' => admin_url('admin-ajax.php')
    ));
  }

  public function wpsfb_insert_feature_request()
  {
    global $wpdb;
    $id = $_POST['id'];
    $user_id = get_current_user_id();
    $defaults = [
      'title' => sanitize_text_field((isset($_POST['title']) ? $_POST['title'] : '')),
      'details' => sanitize_textarea_field((isset($_POST['details']) ? $_POST['details'] : '')),
      'status' => (isset($_POST['status']) ? $_POST['status'] : ''),
      'feature_board_id' => $id,
      'user_id' => $user_id
    ];

    $table_name = $wpdb->prefix . 'sfb_features_request';
    $inserted = $wpdb->insert(
      $table_name,
      $defaults
    );

    if (!$inserted) {
      return wp_send_json_error("Error while adding feature request data", 500);
    }

    $last_inserted_id = $wpdb->insert_id;
    $table_name2 = $wpdb->prefix . 'sfb_tags';
    $tagString = [
      'tagname' => sanitize_text_field((isset($_POST['tags']) ? $_POST['tags'] : ''))
    ];

    $tagArray = explode(',', $tagString['tagname']);
    foreach ($tagArray as $tag) {
      $inserted2 = $wpdb->insert(
        $table_name2,
        [
          'tagname' => $tag,
          'feature_request_id' => $last_inserted_id
        ]
      );
    }

    if (!$inserted2) {
      return wp_send_json_error("Error while posting data", 500);
    }

    return wp_send_json_success("Successfully posted data", 200);
  }

  public function wpsfb_get_features_request_count()
  {
    global $wpdb;

    $id = isset($_POST['id']) ? $_POST['id'] : '';
    $count = $wpdb->get_results(
      $wpdb->prepare("SELECT COUNT(*) as count FROM wp_sfb_features_request AS fr WHERE fr.feature_board_id = %d", $id)
    );

    if (is_wp_error($count)) {
      wp_send_json_error('Bad SQL request', 400);
    }

    wp_send_json_success($count, 200);
  }

  public function wpsfb_get_features_request_list($args = [])
  {
    global $wpdb;

    $id = isset($_POST['id']) ? $_POST['id'] : '';
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
        "SELECT fr.id, fr.title, fr.details, fr.status, u.user_login as username, GROUP_CONCAT(DISTINCT tg.tagname SEPARATOR ',') AS tags, fr.feature_board_id FROM `wp_sfb_features_request` as fr LEFT JOIN wp_sfb_tags AS tg ON fr.id = tg.feature_request_id JOIN wp_users as u ON u.ID = fr.user_id LEFT JOIN wp_sfb_votes as vt ON vt.feature_request_id = fr.id WHERE fr.feature_board_id = %d GROUP BY fr.id
        ORDER BY %s %s
        LIMIT %d, %d",
        $id,
        $$args['orderby'],
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

  public function wpsfb_get_single_feature_request()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_features_request';
    $id = $_POST['id'];
    $selected = $wpdb->get_row(
      $wpdb->prepare(
        "SELECT fr.id, fr.title, fr.details, fr.status, u.user_login as username, GROUP_CONCAT(DISTINCT tg.tagname SEPARATOR ',') AS tags FROM $table_name as fr LEFT JOIN wp_sfb_tags AS tg ON fr.id = tg.feature_request_id JOIN wp_users as u ON u.ID = fr.user_id LEFT JOIN wp_sfb_votes as vt ON vt.feature_request_id = fr.id WHERE fr.id = %d",
        $id
      )
    );
    if (!$selected) {
      return wp_send_json_error("Error while deleting data", 500);
    }

    return wp_send_json_success($selected, 200);
  }

  public function wpsfb_get_single_feature_to_edit()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_features_request';
    $id = $_POST['id'];
    $selected = $wpdb->get_row(
      $wpdb->prepare(
        "SELECT fr.id, fr.title, fr.details, GROUP_CONCAT(DISTINCT tg.tagname SEPARATOR ',') AS tags, fr.user_id, fr.feature_board_id, fr.user_id FROM $table_name as fr LEFT JOIN wp_sfb_tags AS tg ON fr.id = tg.feature_request_id WHERE fr.id = %d",
        $id
      )
    );
    if (!$selected) {
      return wp_send_json_error("Error while deleting data", 500);
    }

    return wp_send_json_success($selected, 200);
  }

  public function wpsfb_edit_feature_request()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_features_request';
    $id = $_POST['id'];
    $feature_board_id =  $_POST['feature_board_id'];
    $user_id =  $_POST['user_id'];

    $defaults = [
      'details' => sanitize_textarea_field(isset($_POST['details']) ? $_POST['details'] : ''),
      'title' => sanitize_text_field(isset($_POST['title']) ? $_POST['title'] : ''),
      'feature_board_id' => $feature_board_id,
      'user_id' => $user_id
    ];
    $where = ['id' => $id];

    $updated = $wpdb->update($table_name, $defaults, $where);

    // if (!$updated) {
    //   return wp_send_json_error("Error while updating feature table data", 500);
    // }

    $table_name2 = $wpdb->prefix . 'sfb_tags';
    $tagString = [
      'tagname' => sanitize_text_field((isset($_POST['tags']) ? $_POST['tags'] : ''))
    ];

    $tagArray = explode(',', $tagString['tagname']);

    $exists = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT tagname from $table_name2 WHERE feature_request_id = %d",
        $id
      )
    );

    foreach ($tagArray as $tag) {
      if (!in_array($tag, $exists)) {
        $deleted = $wpdb->delete($table_name2, ['feature_request_id' => $id]);
        break;
      }
    }

    foreach ($tagArray as $tag) {
      $replaced = $wpdb->insert(
        $table_name2,
        [
          'tagname' => $tag,
          'feature_request_id' => $id
        ]
      );
    }

    if (!$replaced) {
      return wp_send_json_error("Error while updating feature requests", 500);
    }

    return wp_send_json_success("Successfully updated feature requests", 200);
  }

  public function wpsfb_delete_feature_request()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_features_request';
    $defaults = [
      'id' => $_POST['id']
    ];

    $deleted = $wpdb->delete($table_name, $defaults);

    if (!$deleted) {
      return wp_send_json_error("Error while deleting data", 500);
    }

    return wp_send_json_success("Successfully deleted data", 200);
  }

  public function wpsfb_get_feature_request_comments()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_comments';
    $id = $_POST['id'];
    $selected = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT c.id, c.comment, u.user_login FROM $table_name as c JOIN wp_users AS u ON u.ID = c.user_id WHERE c.feature_request_id = %d ORDER BY c.id DESC",
        $id
      )
    );
    // if (!$selected) {
    //   return wp_send_json_error("Error while getting comments", 500);
    // }
    return wp_send_json_success($selected, 200);
  }

  public function wpsfb_add_feature_request_comment()
  {
    global $wpdb;
    $id = $_POST['id'];
    $user_id = get_current_user_id();

    $defaults = [
      'comment' => sanitize_textarea_field((isset($_POST['comment']) ? $_POST['comment'] : '')),
      'feature_request_id' => $id,
      'user_id' => $user_id
    ];

    $table_name = $wpdb->prefix . 'sfb_comments';
    $inserted = $wpdb->insert(
      $table_name,
      $defaults
    );

    if (!$inserted) {
      return wp_send_json_error("Error while adding comments", 500);
    }

    return wp_send_json_success("Successfully added comments", 200);
  }

  public function wpsfb_get_feature_requests_votes_count()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_votes';
    $id = $_POST['id'];
    $selected = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT COUNT(v.feature_request_id) as vote_count FROM $table_name as v WHERE v.feature_request_id = %d",
        $id
      )
    );

    if (!$selected) {
      return wp_send_json_error("Error while getting votes count", 500);
    }
    return wp_send_json_success($selected, 200);
  }

  public function wpsfb_get_voted_user()
  {
    if (is_user_logged_in()) {
      global $wpdb;
      $table_name = $wpdb->prefix . 'sfb_votes';
      $id = $_POST['id'];
      $current_user_id = get_current_user_id();
      $selected = $wpdb->get_results(
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

  public function wpsfb_add_vote()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_votes';
    $id = $_POST['id'];
    $current_user_id = get_current_user_id();

    $defaults = [
      'feature_request_id' => $id,
      'user_id' => $current_user_id
    ];

    // $current_user_id = 5;
    $inserted = $wpdb->insert(
      $table_name,
      $defaults
    );

    if (!$inserted) {
      wp_send_json_error("Unsuccessful attempt to vote", 500);
    }

    return wp_send_json_success("Successfully voted", 200);
  }

  public function wpsfb_remove_vote()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_votes';
    $id = $_POST['id'];
    $current_user_id = get_current_user_id();

    $defaults = [
      'feature_request_id' => $id,
      'user_id' => $current_user_id
    ];

    // $current_user_id = 5;
    $deleted = $wpdb->delete(
      $table_name,
      $defaults
    );

    if (!$deleted) {
      wp_send_json_error("Unsuccessful attempt to unvote", 500);
    }

    return wp_send_json_success("Successfully unvoted", 200);
  }

  public function wpsfb_get_searched_feature($args)
  {
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
        "SELECT fr.id, fr.title, fr.details, fr.status, u.user_login as username, GROUP_CONCAT(DISTINCT tg.tagname SEPARATOR ',') AS tags, fr.feature_board_id FROM `wp_sfb_features_request` as fr LEFT JOIN wp_sfb_tags AS tg ON fr.id = tg.feature_request_id JOIN wp_users as u ON u.ID = fr.user_id LEFT JOIN wp_sfb_votes as vt ON vt.feature_request_id = fr.id WHERE fr.feature_board_id = %d AND fr.title LIKE '%$search%' OR tg.tagname LIKE '%$search%' GROUP BY fr.id
        ORDER BY %s %s
        LIMIT %d, %d",
        $id,
        $$args['orderby'],
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

  public function wpsfb_get_feature_by_status()
  {
    global $wpdb;
    $status = isset($_POST['status']) ? $_POST['status'] : '';

    $items = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT * from wp_sfb_features_request as fr where fr.status=%s",
        $status
      )
    );

    if (is_wp_error($items)) {
      wp_send_json_error('Bad SQL request', 400);
    }

    wp_send_json_success($items, 200);
  }

  public function wpsfb_is_logged_in()
  {
    if (is_user_logged_in()) {
      wp_send_json(['user' => true]);
    } else {
      wp_send_json(['user' => false]);
    }
  }

  public function wpsfb_sign_in()
  {
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    $cred = [
      'user_login' => $username,
      'user_password' => $password
    ];

    $success = wp_signon($cred, false);

    if (is_wp_error($success)) {
      wp_send_json_error("Unsuccessful attempt to login", 500);
    }

    return wp_send_json_success("Successfully logged in", 200);
  }

  public function wpsfb_sign_out()
  {
    wp_logout();
  }
}
