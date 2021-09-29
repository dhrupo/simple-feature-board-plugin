<?php

namespace WPSFB\Includes;

class Installer
{
  function __construct()
  {
  }

  public function run()
  {
    $this->add_version();
    $this->create_features_table();
    $this->create_tags_table();
  }

  public function add_version()
  {
    $is_installed = get_option('wpsfb_is_installed');
    if (!$is_installed) {
      update_option('wpsfb_is_installed', time());
    }
    update_option('wpsfb_is_installed', WPSFB_VERSION);
  }

  public function create_features_table()
  {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . 'features';
    $sql = "CREATE TABLE IF NOT EXISTS `$table_name` (
      `id` int(10) NOT NULL AUTO_INCREMENT,
      `title` varchar(200) DEFAULT NULL,
      `details` varchar(500) DEFAULT NULL,
      PRIMARY KEY(`id`)
      ) $charset_collate;";

    if (!function_exists('dbDelta')) {
      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    }

    dbDelta($sql);
  }

  public function create_tags_table()
  {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . 'tags';

    $sql = "CREATE TABLE IF NOT EXISTS `$table_name` (
      `id` int(10) NOT NULL AUTO_INCREMENT,
      `tagname` varchar(200) DEFAULT NULL,
      `feature_board_id` int(10) NOT NULL,
      PRIMARY KEY(`id`),
      CONSTRAINT FK_TagsFeature FOREIGN KEY(`feature_board_id`) REFERENCES wp_features(`id`) ON DELETE CASCADE,
      UNIQUE KEY UNIQUE_tags_features (`tagname`,`feature_board_id`)
      ) $charset_collate;";

    if (!function_exists('dbDelta')) {
      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    }

    dbDelta($sql);
  }
}
