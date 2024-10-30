<?php


use Automattic\WooCommerce\Blocks\Utils\CartCheckoutUtils;

class HelcimJSService
{

    private $error;
    private $helcimCurl;

    public function __construct()
    {
        $this->error = '';
    }

    public function getError(): string
    {
        return $this->error;
    }

    public function setError(string $error): HelcimJSService
    {
        $this->error = $error;
        return $this;
    }

    public function getHelcimCurl(): ?HelcimCurl
    {
        return $this->helcimCurl;
    }

    public function setHelcimCurl(HelcimCurl $helcimCurl): HelcimJSService
    {
        $this->helcimCurl = $helcimCurl;
        return $this;
    }

    public function updateOrderNumber(string $orderNumber, WCHelcimGateway $helcimGateway, $order): bool
    {
        if (!$this->getHelcimCURL() instanceof HelcimCurl) {
            $this->setHelcimCURL(new HelcimCurl());
        }
        if (!$this->getHelcimCURL() instanceof HelcimCurl) {
            $this->setHelcimCURL(new HelcimCurl());
        }
        $post = $this->getHelcimCURL()->buildGenericPostData($helcimGateway);
        $post["action"] = "orderEdit";
        $post["orderNumber"] = $orderNumber;
        $post["newOrderNumber"] = HelcimUtilities::generateOrderNumber((string)$order->get_order_number());
        $response = $this->getHelcimCURL()->curl($post, WCHelcimGateway::API_ENDPOINT);
        if (!is_string($response)) {
            $this->setError($this->getHelcimCURL()->getError());
            return false;
        }
        $objectXML = $this->getHelcimCURL()->convertToXML($response);
        if (!$objectXML instanceof SimpleXMLElement) {
            $this->setError($this->getHelcimCURL()->getError());
            return false;
        }
        if (!$this->getHelcimCURL()->validateXML($objectXML)) {
            $this->setError($this->getHelcimCURL()->getError());
            return false;
        }
        return true;
    }

    public function htmlLineItems(array $helcimLineItems): string
    {
        $html = '';
        $orderItemCounter = 0;
        foreach ($helcimLineItems as $helcimLineItem) {
            if (!$helcimLineItem instanceof HelcimLineItem) {
                continue;
            }
            $orderItemCounter++;
            $html .= '<input type="hidden" id="itemSKU' . $orderItemCounter . '" value="' . $helcimLineItem->getSku(
                ) . '">';
            $html .= '<input type="hidden" id="itemDescription' . $orderItemCounter . '" value="' . $helcimLineItem->getDescription(
                ) . '">';
            $html .= '<input type="hidden" id="itemQuantity' . $orderItemCounter . '" value="' . $helcimLineItem->getQuantity(
                ) . '">';
            $html .= '<input type="hidden" id="itemPrice' . $orderItemCounter . '" value="' . $helcimLineItem->getPrice(
                ) . '">';
            $html .= '<input type="hidden" id="itemTotal' . $orderItemCounter . '" value="' . $helcimLineItem->getTotal(
                ) . '">';
        }
        return $html;
    }

    public function hash(string $data, string $secret): string
    {
        if ($data === '') {
            return '';
        }
        return hash('sha256', $secret . $data);
    }

    public function processPayment($order, SimpleXMLElement $xmlObject, WCHelcimGateway $helcimGateway): bool
    {
        if (!isset($xmlObject->response) || (int)$xmlObject->response !== 1) {
            $errorMessage = isset($xmlObject->responseMessage) ? (string)$xmlObject->responseMessage : 'Something went wrong please contact the Merchant';
            wc_add_notice("DECLINED - $errorMessage", 'error');
            WCHelcimGateway::log('Helcim JS - DECLINED - ' . print_r($xmlObject, true));
            $order->add_order_note("DECLINED - $errorMessage");
            return false;
        }
        if (!isset($xmlObject->cardToken)) {
            wc_add_notice('<b>Payment error:</b> Something went wrong please contact the Merchant', 'error');
            WCHelcimGateway::log('Helcim JS - Missing Card Token ' . print_r($xmlObject, true));
            $order->add_order_note("ERROR - Missing Card Token");
            return false;
        }
        if (!isset($xmlObject->cardNumber)) {
            wc_add_notice('<b>Payment error:</b> Something went wrong please contact the Merchant', 'error');
            WCHelcimGateway::log('Helcim JS - Missing Card First-4 Last-4 ' . print_r($xmlObject, true));
            $order->add_order_note("ERROR - Missing Card First-4 Last-4");
            return false;
        }
        if (!isset($xmlObject->approvalCode)) {
            wc_add_notice('<b>Payment error:</b> Something went wrong please contact the Merchant', 'error');
            WCHelcimGateway::log('Helcim JS - Missing Approval Code ' . print_r($xmlObject, true));
            $order->add_order_note("ERROR - Missing Approval Code");
            return false;
        }
        if (!isset($xmlObject->currency)) {
            wc_add_notice('<b>Payment error:</b> Something went wrong please contact the Merchant', 'error');
            WCHelcimGateway::log('Helcim JS - Missing Currency: ' . print_r($xmlObject, true));
            $order->add_order_note("ERROR - Missing Currency");
            return false;
        }

        if ((string)$xmlObject->currency !== $helcimGateway->woocommerceCurrencyAbbreviation()) {
            wc_add_notice('<b>Payment error:</b> Something went wrong please contact the Merchant', 'error');
            WCHelcimGateway::log(
                'Helcim JS - Order Currency(' . $helcimGateway->woocommerceCurrencyAbbreviation(
                ) . ') Does not match Transaction Currency(' . (string)$xmlObject->currency . ')'
            );
            $order->add_order_note(
                'ERROR - Order Currency(' . $helcimGateway->woocommerceCurrencyAbbreviation(
                ) . ') Does not match Transaction Currency(' . (string)$xmlObject->currency . ')'
            );
            return false;
        }
        $orderNumber = isset($xmlObject->orderNumber) ? (string)$xmlObject->orderNumber : '';
        if (!$this->updateOrderNumber($orderNumber, $helcimGateway, $order)) {
            WCHelcimGateway::log(
                "ORDER {$order->get_id()} Failed to Update Helcim Order Number - {$this->getError()}"
            );
            $order->add_order_note("Failed to update Helcim Order Number");
        }
        return true;
    }
}