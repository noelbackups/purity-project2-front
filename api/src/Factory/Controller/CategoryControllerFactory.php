<?php

namespace API\Factory\Controller;

use API\Factory\FactoryInterface;
use API\Repository\EquipmentRepository;
use API\Service\ResponseService;
use API\Service\ServiceManager;
use \API\Factory\Exception\ClassNotFoundException;
use API\Repository\CategoryRepository;
use API\Service\RequestService;

/**
 * Factory para o controller de equipamentos
 */
class CategoryControllerFactory implements FactoryInterface
{

    public function createInstance(ServiceManager $container, string $requestClass)
    {
        if(class_exists($requestClass)) {
            $responseService = new ResponseService();
            $request = $container->get(RequestService::class);
            $repository = $container->get(CategoryRepository::class);
            return new $requestClass($repository, $request, $responseService);
        }
        throw new ClassNotFoundException("A classe " . $requestClass . " n�o existe ", 10404);
    }
}