<?php

use API\API;
use API\Service\ServiceManager;

require_once __DIR__ . "/vendor/autoload.php";

$rotas = include 'rotas.php';

$serviceManager = new ServiceManager();

$API                    = new API($serviceManager, $rotas);
$API->run();
