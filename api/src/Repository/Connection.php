<?php

namespace API\Repository;

use PDO;

class Connection
{

    private $conn = null;

    private static $instance;

    private function __construct()
    {
        $hostname = 'localhost';
        $dbname = 'purity';
        $dbuser = 'purity-admin';
        $dbpasswd = '$1d7j;35bPm}';

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


    /**
     * Retorna manipulador do PDO para uso no c�digo
     *
     * @param boolean $transaction
     * @return \PDO
     */
    public function getHandler($transaction = false): \PDO
    {
        if($transaction) {
            $this->conn->beginTransaction();
        }

        return $this->conn;
    }

    /**
     * Caso esteja em uma transaction, faz o commit (Efetiva) das mudan�as
     *
     * @return void
     */
    public function doCommit()
    {
        if($this->conn->inTransaction()) {
            $this->conn->commit();
        }
    }

    
    /**
     * Caso esteja em uma transaction faz o rollback (descarta) das altera��es 
     *
     * @return void
     */
    public function doRollback()
    {
        if($this->conn->inTransaction()) {
            $this->conn->rollBack();
        }
    }
}
