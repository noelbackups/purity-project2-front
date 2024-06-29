<?php

namespace API\Factory\Repository;

use API\Factory\FactoryInterface;
use API\Repository\Connection;
use API\Service\ServiceManager;
use \API\Factory\Exception\ClassNotFoundException;

/**
 * Factory padr�o para os reposit�rios
 */
class DefaultRepositoryFactory implements FactoryInterface
{
    public function createInstance(ServiceManager $container, string $requestClass)
    {
        if(class_exists($requestClass)) {
            $conn = Connection::getInstance();
            return new $requestClass($conn);
        }
        throw new ClassNotFoundException("A classe " . $requestClass . " n�o existe ", 10404);
    }
}