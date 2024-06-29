<?php

namespace API\Service;

/**
 * Classe respons�vel por tratar o conte�do e gerar o JSON
 */
class ResponseService
{

    /**
     * Converte o array informado em JSON e envia de volta ao cliente
     *
     * @param array $content
     * @param int $statusCode
     * @return string
     */
    public function jsonResponse(array $content, int $statusCode = 200, $prepareJson = true)
    {
        if ($prepareJson)
            $content = $this->prepareToJson($content);

        header("HTTP/1.1 " . $statusCode);
        header('Access-Control-Allow-Origin: *'); // Evita problemas com CORS
        header('Content-type: application/json; charset=utf-8"');
        $response = json_encode($content);
        echo $response;
        return $response;
    }


    /**
     * Prepara o conte�do vindo do banco de dados para o json em utf-8
     *
     * @param array $content
     * @return void
     */
    private function prepareToJson(array $content)
    {
        foreach ($content as $k => &$value) {
            if (is_array($value)) {
                $value = $this->prepareToJson($value);
            } elseif (!is_object($value)) {
                $value = utf8_encode($value);
            }
        }

        return $content;
    }
}
