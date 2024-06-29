<?php


namespace API\Service;

/**
 * Classe responsável por tratar os requests
 */
class RequestService
{

    /**
     * Array com o body do request
     *
     * @name$name array
     */
    private $body = [];

    /**
     * Array com os Headers do Request
     *
     * @name$name array
     */
    private $headers = [];

    public function __construct()
    {
        $body = json_decode(file_get_contents("php://input"), true);
        $this->body = $body ?? [];

        $this->normalizeBody();
        $this->populateHeaders();
    }

    /**
     * Normaliza os dado do body para o banco de dados no charset
     * atual (ISO 8859-1)
     *
     * @return void
     */
    private function normalizeBody()
    {
        /*$this->body = array_map(function ($value) {
            if (is_array($value)) {
                $valueArray = json_encode($value);
                return $this->normalizeBody($valueArray);
            } else {
                return utf8_decode($value);
            }
        }, $this->body);*/

        return $this->body;
    }

    /**
     * Popula os headers do request
     *
     * @return void
     */
    private function populateHeaders()
    {
        $headers = getallheaders();
        $this->headers = array_change_key_case($headers, CASE_UPPER);
    }

    /**
     * Retorna o body completo do request tratado
     *
     * @return array
     */
    public function getParsedBody()
    {
        return $this->body;
    }

    /**
     * Obtém valor da variável informado
     *
     * @param string $name
     * @return mixed
     */
    public function getBodyData(string $name)
    {
        if (isset($this->body[$name])) {
            return $this->body[$name];
        }

        return null;
    }

    /**
     * Retorna parâmetro do header 
     *
     * @param string $name
     * @return mixed
     */
    public function getHeader(string $name)
    {
        $name = strtoupper($name);

        if (isset($this->headers[$name])) {
            return $this->headers[$name];
        }
        return null;
    }
}
