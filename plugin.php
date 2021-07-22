<?php
/**
 * Plugin Name: Gutenberg Block Spacings
 * Author: Frontkom
 * Author URI: https://frontkom.com/
 * Description: Wordpress Gutenberg add-on that adds spacings options to each block. Built on CGB package.
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
