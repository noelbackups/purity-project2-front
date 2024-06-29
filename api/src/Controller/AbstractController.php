<?php

namespace API\Controller;

use API\Service\RequestService;
use API\Repository\RepositoryInterface;
use API\Service\ResponseService;

abstract class AbstractController
{
    private $tokenMercadoPago = "APP_USR-6266009004446738-020918-de72ea179b7d82dc64337f879154cd71-679035999";
    /**
     * Reposit�rio
     *
     * @var RepositoryInterface
     */
    private $repository;

    /**
     * Servi�o de resposta
     *
     * @var ResponseService
     */
    private $responseService;

    /**
     * Servico que trata o request
     *
     * @var RequestService
     */
    private $request;

    public function __construct(RepositoryInterface $repository, RequestService $request, ResponseService $responseService)
    {
        $this->repository = $repository;
        $this->responseService = $responseService;
        $this->request = $request;
    }

    /**
     * Retorna o reposit�rio para as classes filhas
     *
     * @return RepositoryInterface
     */
    public function getRepository(): RepositoryInterface
    {
        return $this->repository;
    }

    public function getTokenMercadoPago()
    {
        return $this->tokenMercadoPago;
    }
    /**
     * Retorna o servi�o de tratamento do response
     *
     * @return ResponseService
     */
    public function getResponseService(): ResponseService
    {
        return $this->responseService;
    }

    /**
     * Retorna o servi�o de request
     *
     * @return RequestService
     */
    public function getRequest(): RequestService
    {
        return $this->request;
    }

    public function cUrlMercadoPago($url)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                'Authorization: Bearer ' . $this->tokenMercadoPago . ''
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return "cURL Error #:" . $err;
        } else {
            return $response;
        }
    }

    protected function renderHtml(string $templatePath, array $data): string
    {
        extract($data);
        ob_start();
        require __DIR__ . '/../../view/' . $templatePath;
        $html = ob_get_clean();

        return $html;
    }

    public function transformPrice($value)
    {
        //$newValue = ($value / 1000) * 1.1;
        //$value = ceil($newValue) * 1000;

        return number_format($value, 2);
    }
}
