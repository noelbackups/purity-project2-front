<?php

namespace API\Service;

use API\Repository\TokenRepository;
use DateTime;

class TokenValidatorService
{
    /**
     * Dados do request atual
     *
     * @var RequestService
     */
    private $request;

    /**
     * Reposit�rio respons�vel pelo token no banco de dados
     *
     * @var TokenRepository
     */
    private $repository;

    /**
     * Mensagem de erro encontrada
     *
     * @var string
     */
    private $message = '';

    public function __construct(
        RequestService $request,
        TokenRepository $repository
    ) {
        $this->request = $request;
        $this->repository = $repository;
    }

    public function validateAccess(string $modulo, string $acao): bool
    {
        
        $apiToken = $this->request->getHeader('APIKEY');
        if ($apiToken == 'On10WDc5qc9a1jLYj6m0BNvXGiy0S5beon4RZpERNJXj') {
            return true;
        } else {
            $this->message = "Auth Key error";
            return false;
        }
       
    }

    public function validateAccessAdmin(string $modulo, string $acao): bool
    {
        
        $apiToken = $this->request->getHeader('APIKEY');

        $dbToken = $this->repository->obterToken($apiToken);
        if(!$dbToken) {
            $this->message = "Token Auth error";
            return false;
        }
        $hoje = new DateTime();
        $validade = DateTime::createFromFormat('Y-m-d H:i:s', $dbToken['validate']);

        if($dbToken['validate'] && $hoje > $validade) {
            $this->message = "Token Auth expired";
            return false;
        }
        return true;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }
}
