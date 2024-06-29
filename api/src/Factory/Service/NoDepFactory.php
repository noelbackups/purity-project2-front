<?php

namespace API\Factory\Service;

use API\Factory\Exception\ClassNotFoundException;
use API\Factory\FactoryInterface;
use API\Service\ServiceManager;

/**
 * Factory genérico para serviço que não tem dependência
 */
class NoDepFactory implements FactoryInterface
{
    public function createInstance(ServiceManager $container, string $requestClass)
    {
        if(class_exists($requestClass)) {
            return new $requestClass();
        }
        throw new ClassNotFoundException("A classe " . $requestClass . " não existe ", 10404);
    }
}