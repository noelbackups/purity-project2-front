<?php

namespace API\Service;

use API\Controller\SalesController;
use API\Controller\AdminController;
use API\Controller\CategoryController;
use API\Controller\ProductController;
use API\Factory\Controller\SalesControllerFactory;
use API\Factory\Controller\AdminControllerFactory;
use API\Factory\Controller\CategoryControllerFactory;
use API\Factory\Controller\ProductControllerFactory;
use API\Factory\Repository\DefaultRepositoryFactory;
use API\Factory\Service\LogFactory;
use API\Factory\Service\NoDepFactory;
use API\Factory\Service\TokenServiceFactory;
use API\Repository\AdminRepository;
use API\Repository\CategoryRepository;
use API\Service\RequestService;
use API\Repository\SalesRepository;
use API\Repository\ProductRepository;
use API\Service\Exception\ServiceNotFoundException;
use API\Repository\TokenRepository;

class ServiceManager
{
    private $services = array();


    public function __construct()
    {
        // Reposit�rios
        $this->services[SalesRepository::class]   =  DefaultRepositoryFactory::class;
        $this->services[AdminRepository::class]   =  DefaultRepositoryFactory::class;
        $this->services[TokenRepository::class]   =  DefaultRepositoryFactory::class;
        $this->services[ProductRepository::class]   =  DefaultRepositoryFactory::class;
        $this->services[CategoryRepository::class]   =  DefaultRepositoryFactory::class;

        // Controllers
        $this->services[CategoryController::class]   =  CategoryControllerFactory::class;
        $this->services[SalesController::class]   =  SalesControllerFactory::class;
        $this->services[AdminController::class]   =  AdminControllerFactory::class;
        $this->services[ProductController::class]   =  ProductControllerFactory::class;

        // Services
        $this->services[Log::class]   =  LogFactory::class;
        $this->services[Util::class]  = NoDepFactory::class;
        $this->services[ResponseService::class]  = NoDepFactory::class;
        $this->services[RequestService::class]  =  NoDepFactory::class;
        $this->services[TokenValidatorService::class]  =  TokenServiceFactory::class;

    }
    
    public function get(string $serviceName)
    {
        
        if(isset($this->services[$serviceName])) {
            $factory = new $this->services[$serviceName];
            return $factory->createInstance($this, $serviceName);
        }

        throw new ServiceNotFoundException("O serviço " . $serviceName . " requisitado ", 10405);
        
    }
}