<?php

namespace WPSFB\Includes;

use WP_Error;

class Models
{
  function __construct()
  {
    // add_action('plugins_loaded', [$this, 'wpsfb_insert_feature_table']);
    add_action('admin_enqueue_scripts', [$this, 'wpsfb_admin_scripts']);
    add_action('wp_ajax_wpsfb_get_features_list', [$this, 'wpsfb_get_features_list']);
    add_action('wp_ajax_wpsfb_insert_feature', [$this, 'wpsfb_insert_feature']);
    add_action('wp_ajax_wpsfb_delete_feature', [$this, 'wpsfb_delete_feature']);
    add_action('wp_ajax_wpsfb_edit_feature', [$this, 'wpsfb_edit_feature']);
    add_action('wp_ajax_wpsfb_get_single_feature', [$this, 'wpsfb_get_single_feature']);
    add_action('wp_ajax_wpsfb_create_tags_by_feature', [$this, 'wpsfb_create_tags_by_feature']);

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

  public function wpsfb_insert_feature()
  {
    global $wpdb;

    $defaults = [
      'details' => sanitize_text_field((isset($_POST['details']) ? $_POST['details'] : '')),
      'title' => sanitize_textarea_field((isset($_POST['title']) ? $_POST['title'] : '')),
    ];

    $table_name = $wpdb->prefix . 'features';
    $inserted = $wpdb->insert(
      $table_name,
      $defaults
    );

    if (!$inserted) {
      return wp_send_json_error("Error while posting data", 500);
    }

    $last_inserted_id = $wpdb->insert_id;
    $table_name2 = $wpdb->prefix . 'tags';
    $tagString = [
      'tagname' => sanitize_text_field((isset($_POST['tags']) ? $_POST['tags'] : ''))
    ];

    $tagArray = explode(',', $tagString['tagname']);

    foreach ($tagArray as $tag) {
      $inserted2 = $wpdb->insert(
        $table_name2,
        [
          'tagname' => $tag,
          'feature_board_id' => $last_inserted_id
        ]
      );
    }

    if (!$inserted2) {
      return wp_send_json_error("Error while posting data", 500);
    }

    return wp_send_json_success("Successfully posted data", 200);
  }

  public function wpsfb_get_features_list($args = [])
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
        "SELECT ft.id, ft.title, ft.details, GROUP_CONCAT(tg.tagname SEPARATOR ',') AS tags FROM {$wpdb->prefix}features as ft LEFT JOIN wp_tags AS tg ON ft.id = tg.feature_board_id
        GROUP BY ft.id
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

  public function wpsfb_get_single_feature()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'features';
    $id = $_POST['id'];
    $selected = $wpdb->get_row(
      $wpdb->prepare(
        "SELECT ft.id, ft.title, ft.details, GROUP_CONCAT(tg.tagname SEPARATOR ',') AS tags FROM {$table_name} as ft LEFT JOIN wp_tags AS tg ON ft.id = tg.feature_board_id WHERE ft.id = %d GROUP BY ft.id",
        $id
      )
    );
    if (!$selected) {
      return wp_send_json_error("Error while deleting data", 500);
    }

    return wp_send_json_success($selected, 200);
  }

  public function wpsfb_delete_feature()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'features';
    $defaults = [
      'id' => $_POST['id']
    ];

    $deleted = $wpdb->delete($table_name, $defaults);

    if (!$deleted) {
      return wp_send_json_error("Error while deleting data", 500);
    }
    return wp_send_json_success("Successfully deleted data", 200);
  }

  public function wpsfb_edit_feature()
  {
    global $wpdb;
    $table_name = $wpdb->prefix . 'features';
    $id = isset($_POST['id']) ? $_POST['id'] : '';
    $defaults = [
      'details' => sanitize_textarea_field(isset($_POST['details']) ? $_POST['details'] : ''),
      'title' => sanitize_text_field(isset($_POST['title']) ? $_POST['title'] : ''),
    ];
    $where = ['id' => $id];

    $updated = $wpdb->update($table_name, $defaults, $where);

    // if (!$updated) {
    //   return wp_send_json_error("Error while updating feature table data", 500);
    // }

    $table_name2 = $wpdb->prefix . 'tags';
    $tagString = [
      'tagname' => sanitize_text_field((isset($_POST['tags']) ? $_POST['tags'] : ''))
    ];

    $tagArray = explode(',', $tagString['tagname']);

    foreach ($tagArray as $tag) {
      $exists = $wpdb->get_results(
        $wpdb->prepare(
          "SELECT * from {$table_name2} WHERE feature_board_id = %d",
          $id
        )
      );
      if ($exists['tagname'] === $tag) {
        $updated2 = $wpdb->update(
          $table_name2,
          ['tagname' => $tag],
          ['feature_board_id' => $id]
        );
      } else {
        
        // $inserted2 = $wpdb->insert(
        //   $table_name2,
        //   [
        //     'tagname' => $tag,
        //     'feature_board_id' => $id
        //   ]
        // );
      }
    }

    if (!$updated2) {
      return wp_send_json_error("Error while posting data", 500);
    }

    return wp_send_json_success("Successfully updated data", 200);
  }
}
