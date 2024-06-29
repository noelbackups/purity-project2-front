<?php

namespace API\Factory\Service;

use API\Factory\FactoryInterface;
use API\Repository\Connection;
use API\Service\ServiceManager;
use \API\Factory\Exception\ClassNotFoundException;

/**
 * Factory para serviço de logs
 */
class LogFactory implements FactoryInterface
{
    public function createInstance(ServiceManager $container, string $requestClass)
    {
        if(class_exists($requestClass)) {
            $conn = Connection::getInstance();
            return new $requestClass($conn);
        }
        throw new ClassNotFoundException("A classe " . $requestClass . " não existe ", 10404);
    }
}