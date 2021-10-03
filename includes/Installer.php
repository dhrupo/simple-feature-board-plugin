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
    $this->create_features_board_table();
    $this->create_features_request_table();
    $this->create_votes_table();
    $this->create_comments_table();
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

  public function create_features_board_table()
  {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . 'sfb_features_board';
    $sql = "CREATE TABLE IF NOT EXISTS `$table_name` (
      `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
      `title` varchar(200) DEFAULT NULL,
      `details` varchar(500) DEFAULT NULL,
      PRIMARY KEY(`id`)
      ) $charset_collate;";

    if (!function_exists('dbDelta')) {
      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    }

    dbDelta($sql);
  }

  public function create_features_request_table()
  {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . 'sfb_features_request';
    $sql = "CREATE TABLE IF NOT EXISTS `$table_name` (
      `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
      `title` varchar(100) DEFAULT NULL,
      `details` varchar(500) DEFAULT NULL,
      `status` varchar(20) DEFAULT NULL,
      `feature_board_id` bigint(20) unsigned NOT NULL,
      `user_id` bigint(20) unsigned NOT NULL,
      PRIMARY KEY(`id`),
      CONSTRAINT FK_FeatureRequestFeatureBoard FOREIGN KEY(`feature_board_id`) REFERENCES wp_sfb_features_board(`id`) ON DELETE CASCADE,
      CONSTRAINT FK_FeatureRequestUser FOREIGN KEY(`user_id`) REFERENCES wp_users(`ID`) ON DELETE CASCADE
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
    $table_name = $wpdb->prefix . 'sfb_tags';

    $sql = "CREATE TABLE IF NOT EXISTS `$table_name` (
      `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
      `tagname` varchar(100) DEFAULT NULL,
      `feature_request_id` bigint(20) unsigned NOT NULL,
      PRIMARY KEY(`id`),
      CONSTRAINT FK_TagsFeatureRequest FOREIGN KEY(`feature_request_id`) REFERENCES wp_sfb_features_request(`id`) ON DELETE CASCADE,
      UNIQUE KEY UNIQUE_TagNameFeatureRequest (`tagname`,`feature_request_id`)
      ) $charset_collate;";

    if (!function_exists('dbDelta')) {
      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    }

    dbDelta($sql);
  }

  public function create_comments_table()
  {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . 'sfb_comments';

    $sql = "CREATE TABLE IF NOT EXISTS `$table_name` (
      `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
      `comment` varchar(200) DEFAULT NULL,
      `feature_request_id` bigint(20) unsigned NOT NULL,
      `user_id` bigint(20) unsigned NOT NULL,
      PRIMARY KEY(`id`),
      CONSTRAINT FK_CommentFeatureRequest FOREIGN KEY(`feature_request_id`) REFERENCES wp_sfb_features_request(`id`) ON DELETE CASCADE,
      CONSTRAINT FK_CommentUser FOREIGN KEY(`user_id`) REFERENCES wp_users(`ID`) ON DELETE CASCADE
      ) $charset_collate;";

    if (!function_exists('dbDelta')) {
      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    }
    dbDelta($sql);
  }

  public function create_votes_table()
  {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . 'sfb_votes';

    $sql = "CREATE TABLE IF NOT EXISTS `$table_name` (
      `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
      `feature_request_id` bigint(20) unsigned NOT NULL,
      `user_id` bigint(20) unsigned NOT NULL,
      PRIMARY KEY(`id`),
      CONSTRAINT FK_VoteFeatureRequest FOREIGN KEY(`feature_request_id`) REFERENCES wp_sfb_features_request(`id`) ON DELETE CASCADE,
      CONSTRAINT FK_VoteUser FOREIGN KEY(`user_id`) REFERENCES wp_users(`ID`) ON DELETE CASCADE,
      UNIQUE KEY UNIQUE_VoteFeatureRequest (`feature_request_id`, `user_id`)
      ) $charset_collate;";

    if (!function_exists('dbDelta')) {
      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    }
    dbDelta($sql);
  }
}
