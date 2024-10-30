<?php


use Automattic\WooCommerce\Blocks\Utils\CartCheckoutUtils;

class HelcimJSRequestPayload
{
    private $response;
    private $responseMessage;
    private $noticeMessage;
    private $date;
    private $time;
    private $type;
    private $amount;
    private $currency;
    private $cardHolderName;
    private $cardNumber;
    private $cardExpiry;
    private $cardToken;
    private $cardType;
    private $transactionId;
    private $avsResponse;
    private $cvvResponse;
    private $approvalCode;
    private $orderNumber;
    private $customerCode;
    private $includeXML;

    public function getResponse(): ?int
    {
        return $this->response;
    }

    public function setResponse(int $response): HelcimJSRequestPayload
    {
        $this->response = $response;
        return $this;
    }

    public function getResponseMessage(): ?string
    {
        return $this->responseMessage;
    }

    public function setResponseMessage(string $responseMessage): HelcimJSRequestPayload
    {
        $this->responseMessage = $responseMessage;
        return $this;
    }

    public function getNoticeMessage(): ?string
    {
        return $this->noticeMessage;
    }

    public function setNoticeMessage(string $noticeMessage): HelcimJSRequestPayload
    {
        $this->noticeMessage = $noticeMessage;
        return $this;
    }

    public function getDate(): ?string
    {
        return $this->date;
    }

    public function setDate(string $date): HelcimJSRequestPayload
    {
        $this->date = $date;
        return $this;
    }

    public function getTime(): ?string
    {
        return $this->time;
    }

    public function setTime(string $time): HelcimJSRequestPayload
    {
        $this->time = $time;
        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): HelcimJSRequestPayload
    {
        $this->type = $type;
        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): HelcimJSRequestPayload
    {
        $this->amount = $amount;
        return $this;
    }

    public function getCurrency(): ?string
    {
        return $this->currency;
    }

    public function setCurrency(string $currency): HelcimJSRequestPayload
    {
        $this->currency = $currency;
        return $this;
    }

    public function getCardHolderName(): ?string
    {
        return $this->cardHolderName;
    }

    public function setCardHolderName(string $cardHolderName): HelcimJSRequestPayload
    {
        $this->cardHolderName = $cardHolderName;
        return $this;
    }

    public function getCardNumber(): ?string
    {
        return $this->cardNumber;
    }

    public function setCardNumber(string $cardNumber): HelcimJSRequestPayload
    {
        $this->cardNumber = $cardNumber;
        return $this;
    }

    public function getCardExpiry(): ?string
    {
        return $this->cardExpiry;
    }

    public function setCardExpiry(string $cardExpiry): HelcimJSRequestPayload
    {
        $this->cardExpiry = $cardExpiry;
        return $this;
    }

    public function getCardToken(): ?string
    {
        return $this->cardToken;
    }

    public function setCardToken(string $cardToken): HelcimJSRequestPayload
    {
        $this->cardToken = $cardToken;
        return $this;
    }

    public function getCardType(): ?string
    {
        return $this->cardType;
    }

    public function setCardType(string $cardType): HelcimJSRequestPayload
    {
        $this->cardType = $cardType;
        return $this;
    }

    public function getTransactionId(): ?int
    {
        return $this->transactionId;
    }

    public function setTransactionId(int $transactionId): HelcimJSRequestPayload
    {
        $this->transactionId = $transactionId;
        return $this;
    }

    public function getAvsResponse(): ?string
    {
        return $this->avsResponse;
    }

    public function setAvsResponse(string $avsResponse): HelcimJSRequestPayload
    {
        $this->avsResponse = $avsResponse;
        return $this;
    }

    public function getCvvResponse(): ?string
    {
        return $this->cvvResponse;
    }

    public function setCvvResponse(string $cvvResponse): HelcimJSRequestPayload
    {
        $this->cvvResponse = $cvvResponse;
        return $this;
    }

    public function getApprovalCode(): ?string
    {
        return $this->approvalCode;
    }

    public function setApprovalCode(string $approvalCode): HelcimJSRequestPayload
    {
        $this->approvalCode = $approvalCode;
        return $this;
    }

    public function getOrderNumber(): ?string
    {
        return $this->orderNumber;
    }

    public function setOrderNumber(string $orderNumber): HelcimJSRequestPayload
    {
        $this->orderNumber = $orderNumber;
        return $this;
    }

    public function getCustomerCode(): ?string
    {
        return $this->customerCode;
    }

    public function setCustomerCode(string $customerCode): HelcimJSRequestPayload
    {
        $this->customerCode = $customerCode;
        return $this;
    }

    /**
     * @return int
     */
    public function getIncludeXML(): int
    {
        return $this->includeXML;
    }

    public function setIncludeXML(int $includeXML): HelcimJSRequestPayload
    {
        $this->includeXML = $includeXML;
        return $this;
    }


}