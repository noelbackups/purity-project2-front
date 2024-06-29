<?php

namespace API\Factory\Service;

use API\Factory\FactoryInterface;
use API\Service\ServiceManager;
use \API\Factory\Exception\ClassNotFoundException;
use API\Repository\TokenRepository;
use API\Service\Log;
use API\Service\RequestService;

/**
 * Factory para serviço de token
 */
class TokenServiceFactory implements FactoryInterface
{
    public function createInstance(ServiceManager $container, string $requestClass)
    {
        if(class_exists($requestClass)) {
            $repository = $container->get(TokenRepository::class);
            $request = $container->get(RequestService::class);

            return new $requestClass($request, $repository);
        }
        throw new ClassNotFoundException("A classe " . $requestClass . " não existe ", 10404);
    }
}