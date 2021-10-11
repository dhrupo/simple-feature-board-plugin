<?php

namespace WPSFB\Includes;

class Models
{
  function __construct()
  {
    // add_action('plugins_loaded', [$this, 'wpsfb_insert_feature_table']);
    add_action('admin_enqueue_scripts', [$this, 'wpsfb_admin_scripts']);

    //feature board tags
    add_action('wp_ajax_wpsfb_get_features_board_list', [$this, 'wpsfb_get_features_board_list']);
    add_action('wp_ajax_wpsfb_insert_feature_board', [$this, 'wpsfb_insert_feature_board']);
    add_action('wp_ajax_wpsfb_get_single_feature_board', [$this, 'wpsfb_get_single_feature_board']);
    add_action('wp_ajax_wpsfb_edit_feature_board', [$this, 'wpsfb_edit_feature_board']);
    add_action('wp_ajax_wpsfb_delete_feature_board', [$this, 'wpsfb_delete_feature_board']);

    //feature request
    add_action('wp_ajax_wpsfb_get_features_request_count', [$this, 'wpsfb_get_features_request_count']);
    add_action('wp_ajax_wpsfb_get_features_request_list', [$this, 'wpsfb_get_features_request_list']);
    add_action('wp_ajax_wpsfb_insert_feature_request', [$this, 'wpsfb_insert_feature_request']);
    add_action('wp_ajax_wpsfb_delete_feature_request', [$this, 'wpsfb_delete_feature_request']);
    add_action('wp_ajax_wpsfb_get_single_feature_request', [$this, 'wpsfb_get_single_feature_request']);
    add_action('wp_ajax_wpsfb_get_single_feature_to_edit', [$this, 'wpsfb_get_single_feature_to_edit']);
    add_action('wp_ajax_wpsfb_edit_feature_request', [$this, 'wpsfb_edit_feature_request']);

    //comments
    add_action('wp_ajax_wpsfb_get_feature_request_comments', [$this, 'wpsfb_get_feature_request_comments']);
    add_action('wp_ajax_wpsfb_add_feature_request_comment', [$this, 'wpsfb_add_feature_request_comment']);

    //votes
    add_action('wp_ajax_wpsfb_get_feature_requests_votes_count', [$this, 'wpsfb_get_feature_requests_votes_count']);
    add_action('wp_ajax_wpsfb_get_voted_user', [$this, 'wpsfb_get_voted_user']);
    add_action('wp_ajax_wpsfb_add_vote', [$this, 'wpsfb_add_vote']);
    add_action('wp_ajax_wpsfb_remove_vote', [$this, 'wpsfb_remove_vote']);

    // add_action('rest_api_init', function () {
    //   register_rest_route('markers/v1', '/feature/', array(
    //     'methods' => 'GET',
    //     'callback' => [$this, 'wpsfb_get_feature_table_list']
    //   ));
    // });
  }

  public function wpsfb_admin_scripts()
  {
    wp_enqueue_script('wpsfb', WPSFB_ASSETS . '/js/simple-feature-board.js', null, WPSFB_VERSION, true);
    wp_localize_script('wpsfb', 'ajax_url', array(
      'ajaxurl' => admin_url('admin-ajax.php')
    ));
  }

  public function wpsfb_get_features_board_list($args = [])
  {
    global $wpdb;

    $defaults = [
      'number' => 10,
      'offset' => 0,
      'orderby' => 'id',
      'order' => 'ASC'
    ];

    $args = wp_parse_args($args, $defaults);

    $items = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}sfb_features_board
        ORDER BY %s %s
        LIMIT %d, %d",
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

  public function wpsfb_insert_feature_board()
  {
    global $wpdb;

    $defaults = [
      'details' => sanitize_text_field((isset($_POST['details']) ? $_POST['details'] : '')),
      'title' => sanitize_textarea_field((isset($_POST['title']) ? $_POST['title'] : '')),
    ];

    $table_name = $wpdb->prefix . 'sfb_features_board';
    $inserted = $wpdb->insert(
      $table_name,
      $defaults
    );

    if (!$inserted) {
      return wp_send_json_error("Error while posting data", 500);
    }

    return wp_send_json_success("Successfully posted data", 200);
  }

  public function wpsfb_get_single_feature_board()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_features_board';
    $id = $_POST['id'];
    $selected = $wpdb->get_row(
      $wpdb->prepare(
        "SELECT * FROM $table_name WHERE id = %d",
        $id
      )
    );
    if (!$selected) {
      return wp_send_json_error("Error while deleting data", 500);
    }

    return wp_send_json_success($selected, 200);
  }

  public function wpsfb_edit_feature_board()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_features_board';
    $id = isset($_POST['id']) ? $_POST['id'] : '';
    $defaults = [
      'details' => sanitize_textarea_field(isset($_POST['details']) ? $_POST['details'] : ''),
      'title' => sanitize_text_field(isset($_POST['title']) ? $_POST['title'] : ''),
    ];
    $where = ['id' => $id];

    $updated = $wpdb->update($table_name, $defaults, $where);

    if (!$updated) {
      return wp_send_json_error("Error while updating feature table data", 500);
    }

    return wp_send_json_success("Successfully updated data", 200);
  }

  public function wpsfb_delete_feature_board()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_features_board';
    $defaults = [
      'id' => $_POST['id']
    ];

    $deleted = $wpdb->delete($table_name, $defaults);

    if (!$deleted) {
      return wp_send_json_error("Error while deleting data", 500);
    }

    return wp_send_json_success("Successfully deleted data", 200);
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

  public function wpsfb_insert_feature_request()
  {
    global $wpdb;
    $id = $_POST['id'];
    $user_id = get_current_user_id();
    $status = $_POST['status'];
    $defaults = [
      'title' => sanitize_text_field((isset($_POST['title']) ? $_POST['title'] : '')),
      'details' => sanitize_textarea_field((isset($_POST['details']) ? $_POST['details'] : '')),
      'status' => $status,
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

  public function wpsfb_get_features_request_list($args = [])
  {
    global $wpdb;

    $id = isset($_POST['id']) ? $_POST['id'] : '';
    $pageno = isset($_POST['pageno']) ? $_POST['pageno'] : 1;
    $number = isset($_POST['reqPerPage']) ? isset($_POST['reqPerPage']) : 5;
    $offset = ($pageno - 1) * $number;

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
        "SELECT c.id, c.comment, u.user_login FROM $table_name as c JOIN wp_users AS u ON u.ID = c.user_id WHERE c.feature_request_id = %d",
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
    global $wpdb;
    $table_name = $wpdb->prefix . 'sfb_votes';
    $id = $_POST['id'];
    $current_user_id = get_current_user_id();
    // $current_user_id = 5;
    $selected = $wpdb->get_results(
      $wpdb->prepare(
        "SELECT * FROM $table_name as v WHERE v.feature_request_id = %d AND v.user_id = %d",
        $id,
        $current_user_id
      )
    );

    return wp_send_json_success($selected, 200);
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
    $inserted = $wpdb->delete(
      $table_name,
      $defaults
    );

    if (!$inserted) {
      wp_send_json_error("Unsuccessful attempt to vote", 500);
    }

    return wp_send_json_success("Successfully unvoted", 200);
  }
}
