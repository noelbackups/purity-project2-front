<?php

namespace API\Service;

use \API\Repository\Connection;
use \PDO;

/**
 * Classe responsável por tratar os logs do sistema
 */
class Log
{
    /**
     * Conexão com o banco de dados
     *
     * @var Connection
     */
    private $conn;

    public function __construct(Connection $conn)
    {
        $this->conn = $conn;
    }

    /**
     * Registra o log de atividades
     *
     * @param string $protocolo
     * @param string $tipo
     * @param string $isSucesso
     * @param string $modulo
     * @param string $acao
     * @param string $dados
     * @return boolean
     */
    public function registraLog(string $protocolo, string $tipo, string $isSucesso, string $modulo, string $acao, string $dados)
    {
        $sql = 'INSERT INTO
            log (`create_time`, ip, device, type, success, module, action, data)
        VALUES 
            (CURRENT_TIMESTAMP, :ip, :protocolo, :tipo, :isSucesso, :modulo, :acao, :dados)';

        $stmt = $this->conn->getHandler()->prepare($sql);

        if($stmt) {
            $userIp = $this->obterIPUsuario();
            $stmt->bindParam('ip', $userIp, PDO::PARAM_STR);
            $stmt->bindParam('protocolo', $protocolo, PDO::PARAM_STR);
            $stmt->bindParam('tipo', $tipo, PDO::PARAM_STR);
            $stmt->bindParam('isSucesso', $isSucesso, PDO::PARAM_STR);
            $stmt->bindParam('modulo', $modulo, PDO::PARAM_STR);
            $stmt->bindParam('acao', $acao, PDO::PARAM_STR);
            $stmt->bindParam('dados', $dados, PDO::PARAM_STR);

            try {
                return $stmt->execute();
            } catch(\Exception $ex) {
                var_dump($ex->getMessage());
            }
            
        }
        return false;
    }

    /**
     * Obtém o IP da requisição
     *
     * @return string
     */
    private function obterIPUsuario(): string
    {
        if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
            $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
        }

        $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';

        return $ip;
    }
}
