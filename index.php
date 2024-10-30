<?php
/*
Plugin Name: Helcim Commerce for WooCommerce
Plugin URI: https://www.helcim.com/
Description: Helcim Commerce for WooCommerce
Version: 4.0.4
Author: Helcim Inc.
Author URI: https://www.helcim.com/
*/

add_action('plugins_loaded', 'woocommerce_helcim_init', 0);

function woocommerce_helcim_init() {
    if (!class_exists('WC_Payment_Gateway')) {
        return;
    }

    require_once plugin_dir_path(__FILE__) . 'WCHelcimGateway.php';

    function add_helcim_commerce($methods)
    {
        $methods[] = 'WCHelcimGateway';
        return $methods;
    }

    add_filter('woocommerce_payment_gateways', 'add_helcim_commerce');
}

function helcim_gateway_block_support() {

    require_once plugin_dir_path(__FILE__) . 'classes/WCHelcimGatewayBlocksSupport.php';

    add_action(
        'woocommerce_blocks_payment_method_type_registration',
        function( Automattic\WooCommerce\Blocks\Payments\PaymentMethodRegistry $payment_method_registry ) {
            $payment_method_registry->register( new WCHelcimGatewayBlocksSupport() );
        }
    );

    function enqueue_helcim_js_external_scripts() {
        wp_enqueue_script( 'hcm-helcim-js-script', 'https://secure.myhelcim.com/js/version2.js', [], null, true );
        wp_enqueue_script( 'hcm-recaptcha-script', 'https://www.google.com/recaptcha/api.js?render=6LcgxK0UAAAAAH9gzsILRr82KZSLrBcry9RynMn4', [], null, true );
    }
    add_action( 'wp_enqueue_scripts', 'enqueue_helcim_js_external_scripts' );
}
add_action( 'woocommerce_blocks_loaded', 'helcim_gateway_block_support' );