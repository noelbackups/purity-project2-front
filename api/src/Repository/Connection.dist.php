<?php

namespace API\Repository;

use PDO;

/**
 * Classe respons�vel por realizar a conex�o ao banco de dados
 */
class Connection
{
    /**
     * Manipulador do PDO
     *
     * @var \PDO
     */
    private $conn = null;

    private static $instance;

    private function __construct()
    {
        $hostname = 'localhost';
        $dbname = 'purity';
        $dbuser = 'root';
        $dbpasswd = '';

        try {
            $this->conn = new PDO('mysql:host=' . $hostname . ';dbname=' . $dbname . ';charset=latin1', $dbuser, $dbpasswd);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES,TRUE);

        } catch (\Exception $ex) {
            echo 'Erro ao conectar ao banco de dados';
        }
    }
    
    public static function getInstance()
    {
        if(!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function getHandler($transaction = false): \PDO
    {
        if($transaction) {
            $this->conn->beginTransaction();
        }

        return $this->conn;
    }

    public function doCommit()
    {
        if($this->conn->inTransaction()) {
            $this->conn->commit();
        }
    }

 
    public function doRollback()
    {
        if($this->conn->inTransaction()) {
            $this->conn->rollBack();
        }
    }
}
