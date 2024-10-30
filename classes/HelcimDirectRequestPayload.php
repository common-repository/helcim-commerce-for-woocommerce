<?php


class HelcimDirectRequestPayload
{
    private $cardNumber;
    private $cardExpiryMonth;
    private $cardExpiryYear;
    private $cardCVV;

    public function getCardNumber(): ?string
    {
        return $this->cardNumber;
    }

    public function setCardNumber(string $cardNumber): HelcimDirectRequestPayload
    {
        $this->cardNumber = $cardNumber;
        return $this;
    }

    public function getCardExpiryMonth(): ?string
    {
        return $this->cardExpiryMonth;
    }

    public function setCardExpiryMonth(string $cardExpiryMonth): HelcimDirectRequestPayload
    {
        $this->cardExpiryMonth = $cardExpiryMonth;
        return $this;
    }

    public function getCardExpiryYear(): ?string
    {
        return $this->cardExpiryYear;
    }

    public function setCardExpiryYear(string $cardExpiryYear): HelcimDirectRequestPayload
    {
        $this->cardExpiryYear = $cardExpiryYear;
        return $this;
    }

    public function getCardCVV(): ?string
    {
        return $this->cardCVV;
    }

    public function setCardCVV(string $cardCVV): HelcimDirectRequestPayload
    {
        $this->cardCVV = $cardCVV;
        return $this;
    }


}