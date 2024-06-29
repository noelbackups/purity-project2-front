<?php

namespace API\Factory\Service;

use API\Factory\Exception\ClassNotFoundException;
use API\Factory\FactoryInterface;
use API\Service\ServiceManager;

/**
 * Factory gen�rico para servi�o que n�o tem depend�ncia
 */
class NoDepFactory implements FactoryInterface
{
    public function createInstance(ServiceManager $container, string $requestClass)
    {
        if(class_exists($requestClass)) {
            return new $requestClass();
        }
        throw new ClassNotFoundException("A classe " . $requestClass . " n�o existe ", 10404);
    }
}