<?php

namespace API\Factory;

use API\Service\ServiceManager;

interface FactoryInterface {
    public function createInstance(ServiceManager $container, string $requestClass);
}