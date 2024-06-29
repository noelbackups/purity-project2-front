<?php

namespace API\Factory\Controller;

use API\Factory\FactoryInterface;
use API\Service\RequestService;
use API\Repository\ProductRepository;
use API\Service\ResponseService;
use API\Service\ServiceManager;
use \API\Factory\Exception\ClassNotFoundException;

/**
 * Factory para o controller de categorias
 */
class ProductControllerFactory implements FactoryInterface
{

    public function createInstance(ServiceManager $container, string $requestClass)
    {
        if(class_exists($requestClass)) {
            $responseService = new ResponseService();
            $request = $container->get(RequestService::class);
            $repository = $container->get(ProductRepository::class);
            return new $requestClass($repository, $request, $responseService);
        }
        throw new ClassNotFoundException("A classe " . $requestClass . " não existe ", 10404);
    }
}