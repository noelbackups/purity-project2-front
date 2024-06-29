<?php

namespace API;

use API\Service\RequestService;
use API\Service\Log;
use API\Service\ResponseService;
use API\Service\ServiceManager;
use API\Service\TokenValidatorService;
use API\Service\Util;


class API
{

	/**
	 * Servico de tratamento de log
	 *
	 * @var Log
	 */
	private $logService;

	/**
	 * Utilit�rio com funcoes gerais
	 *
	 * @var Util
	 */
	private $utilService;

	/**
	 * Servi�o para tratar a resposta
	 *
	 * @var ResponseService
	 */
	private $responseService;

	/**
	 * Gerenciador de servi�os
	 *
	 * @var ServiceManager
	 */
	private $serviceManager;

	private $protocolo;


	public function __construct(
		ServiceManager $serviceManager,
		$rotas

	) {
		$this->utilService = $serviceManager->get(Util::class);
		$this->responseService = $serviceManager->get(ResponseService::class);
		$this->serviceManager = $serviceManager;

		$this->rotas = $rotas;
	}

	/**
	 * Roda a aplica��o
	 *
	 * @return void
	 */
	public function run()
	{
		// Gera um Protocolo Temporario
		$this->protocolo				= $this->utilService->gerarCodigoAleatorio(30);

		$path = str_replace($_SERVER["SCRIPT_NAME"], "", $_SERVER["REQUEST_URI"]);

		$url = explode('?', $path); // take the query away
		$path = rtrim($url[0], '/'); // get only the route
		$pathExploded = explode("/", $path);
		if ($url[1]) {
			$getPath = $url[1];
			$getsExploded = explode("&", $getPath);
			foreach ($getsExploded as $row) {
				$get = explode('=', $row);
				$_GET[$get[0]] = $get[1];
			}
		}
		$modulo = strtolower($pathExploded[2]);
		$acao = strtolower($pathExploded[3]);
		try {
			$route = $this->getRoute($modulo, $acao);

			$controller = $this->serviceManager->get($route['controller']);
			$action = $route['action'];
			$tokenValidator = $this->serviceManager->get(TokenValidatorService::class);
			//Auth pro ADMIN
			if ($modulo == 'admin' && $action != 'login') {
				header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
				$method = $_SERVER['REQUEST_METHOD'];
				if ($method == "OPTIONS") {
					header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
					header("Access-Control-Allow-Headers: apikey, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
					header("HTTP/1.1 200 OK");
					die();
				}
				if ($tokenValidator->validateAccessAdmin($modulo, $acao)) {
					header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
					header('Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS');
					header('Access-Control-Allow-Headers: apikey, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization');
				} else {
					$errorMessage = $tokenValidator->getMessage();
					$this->sendApiError($modulo, $acao, $errorMessage, 401);
				}
			} else {
				//Sites autorizados a usar a API (CORS) SITE
				$valid_cors = array('http://localhost:3000', 'http://localhost:8080');
				if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], array_map(function ($domain) {
					return $domain;
				}, $valid_cors), true) || $tokenValidator->validateAccess($modulo, $acao) || $acao == 'checkout' || $acao == 'download') {
					if (isset($_SERVER['HTTP_ORIGIN']))
						header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
					header('Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS');
					header('Access-Control-Allow-Headers: apikey, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization');
					$method = $_SERVER['REQUEST_METHOD'];
					if ($method == "OPTIONS") {
						header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
						header("Access-Control-Allow-Headers: apikey, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
						header("HTTP/1.1 200 OK");
						die();
					}
				} else {
					$errorMessage = $tokenValidator->getMessage();
					$this->sendApiError($modulo, $acao, $errorMessage);
				}
			}
			$response = $controller->$action();

			// Log de Envio
			//$this->logService->registraLog($this->protocolo, "Envio", "1", $modulo, $acao, $response);
		} catch (\Exception $ex) {
			echo $ex->getMessage();
		}
	}

	private function getRoute($modulo, $acao)
	{
		if (isset($this->rotas[$modulo][$acao])) {

			return $this->rotas[$modulo][$acao];
		}

		if (!isset($this->rotas[$modulo])) {
			$errorMessage = 'Module error';
		} else {
			$errorMessage = 'Action error';
		}


		$this->sendApiError($modulo, $acao, $errorMessage);
	}

	/**
	 * Tratamento de erro geral
	 *
	 * @param string $modulo
	 * @param string $acao
	 * @param string $errorMessage
	 * @return void
	 */
	public function sendApiError($modulo, $acao, $errorMessage = "", $status = 404)
	{
		$this->responseService->jsonResponse(array(
			'message'	=>	$errorMessage
		), $status);
		$response['mensagem'] = 'Erro';
		//$this->logService->registraLog($this->protocolo, "Retorno", "0",  $modulo, $acao, json_encode($response));
		exit;
	}
}
