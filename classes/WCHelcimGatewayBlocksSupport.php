<?php

if (!defined('ABSPATH')) {
    exit;
}

use Automattic\WooCommerce\Blocks\Payments\Integrations\AbstractPaymentMethodType;
class WCHelcimGatewayBlocksSupport extends AbstractPaymentMethodType
{
    private ?WCHelcimGateway $gateway;

    public function __construct() {
        $this->name = 'helcimjs'; // payment gateway id
    }

    public function initialize(): void
    {
        // get payment gateway settings
        $this->settings = get_option( "woocommerce_{$this->name}_settings", [] );
        $gateways = WC()->payment_gateways->payment_gateways();
        $this->gateway  = $gateways[ $this->name ];
    }

    public function is_active(): bool
    {
        return ! empty( $this->settings[ 'enabled' ] ) && 'yes' === $this->settings[ 'enabled' ];
    }

    public function get_payment_method_script_handles(): array
    {
        $handle  = 'wc-payment-method-helcimjs';
        wp_register_script(
            $handle,
            plugin_dir_url( __DIR__ ) . 'build/index.js',
            array(
                'wc-blocks-registry',
                'wc-settings',
                'wp-element',
                'wp-html-entities',
            ),
            null, // or time() or filemtime( ... ) to skip caching
            true
        );
        return [$handle];
    }

    /**
     * @return string[]
     */
    public function get_payment_method_data(): array
    {
        return [
             'title'     => $this->settings['title'] ?? 'Credit Card',
                        'fields'  => $this->getInputFields(),
            'icon'  => plugins_url('../assets/images/helcim_checkout_logo.png', __FILE__),
        ];
    }

    private function getInputFields(): array
    {
        $inputFields = [];
        $inputFields['pluginName'] = $this->gateway::PLUGIN_NAME;
        $inputFields['pluginVersion'] = $this->gateway::VERSION;
        $inputFields['woocommerce'] = 1;
        $inputFields['recaptchaSiteKey'] = $this->gateway::GOOGLE_RECAPTCHA_TEST_SITE_KEY;
        $inputFields['jsToken'] = $this->settings['jsToken'];
        $inputFields['isJs'] = $this->settings['method'] === 'js' ? 1 : 0;
        $inputFields['customerCode'] = get_current_user_id();
        return $inputFields;
    }
}