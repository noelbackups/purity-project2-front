<?php

namespace API\Factory\Controller;

use API\Factory\FactoryInterface;
use API\Repository\AdminRepository;
use API\Service\ResponseService;
use API\Service\ServiceManager;
use \API\Factory\Exception\ClassNotFoundException;
use API\Service\RequestService;

/**
 * Factory para o controller de equipamentos
 */
class AdminControllerFactory implements FactoryInterface
{

    public function createInstance(ServiceManager $container, string $requestClass)
    {
        if(class_exists($requestClass)) {
            $responseService = new ResponseService();
            $request = $container->get(RequestService::class);
            $repository = $container->get(AdminRepository::class);
            return new $requestClass($repository, $request, $responseService);
        }
        throw new ClassNotFoundException("A classe " . $requestClass . " não existe ", 10404);
    }
}