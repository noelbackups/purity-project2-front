<?php

namespace API\Service;

/**
 * Utilitários diversos
 */
class Util {

    /**
     * Gera um código aleatório
     *
     * @param [type] $tamanho
     * @return string
     */
    public function gerarCodigoAleatorio($tamanho): string
    {
        $randCode = bin2hex(random_bytes($tamanho));
        $generatedCode = sha1(uniqid($randCode . time(), true));

        return substr($generatedCode, 0 , $tamanho);
    }
}