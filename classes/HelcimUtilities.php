<?php

class HelcimUtilities
{
    public static function buildObjectFromEncodedXMLString(string $xml, string $className): object
    {
        $simpleXMLElement = simplexml_load_string(base64_decode($xml));
        if (!$simpleXMLElement instanceof SimpleXMLElement) {
            throw new RuntimeException('Failed to create simpleXMLElement');
        }
        $object = new $className();
        foreach ($simpleXMLElement as $key => $value) {
            if (!is_string($key)) {
                continue;
            }
            $methodName = 'set' . ucfirst($key);
            if (!method_exists($object, $methodName)) {
                continue;
            }
            if ($value instanceof SimpleXMLElement) {
                $value = (string)$value;
            }
            $object->$methodName($value);
        }
        return $object;
    }

    public static function buildObjectFromArray(array $array, string $className): object
    {
        $object = new $className();
        foreach ($array as $key => $value) {
            if (!is_string($key)) {
                continue;
            }
            $methodName = 'set' . ucfirst($key);
            if (!method_exists($object, $methodName)) {
                continue;
            }
            $object->$methodName($value);
        }
        return $object;
    }

    public static function generateOrderNumber(string $orderId): string
    {
        return $orderId . '-WC' . rand(0, 99) . substr(time(), -2);
    }
}