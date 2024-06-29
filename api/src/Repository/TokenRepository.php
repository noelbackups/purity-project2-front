<?php

namespace API\Repository;

use \API\Repository\Connection;
use API\Repository\Exception\PrepareException;
use API\Repository\RepositoryInterface;
use DateTime;
use PDO;

class TokenRepository implements RepositoryInterface
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
     * Obtem os dados do token no banco de dados
     *
     * @param string $token
     * @return array|null|boolean
     */
    public function obterToken(string $token)
    {
        $sql = 'SELECT 
            id,
            id_admin, 
            token, 
            validate
        FROM 
            `admin_tokens` 
        WHERE 
            token = :token';

        $stmt = $this
            ->conn
            ->getHandler()
            ->prepare($sql);

        if ($stmt) {
            $stmt->bindParam('token', $token, PDO::PARAM_STR);

            if ($stmt->execute()) {
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result;
            }
        } else {
            throw new PrepareException('Houve um erro ao consultar o token', 10500);
        }

        return null;
    }

    /**
     * Undocumented function
     *
     * @param int $idToken
     * @param string $modulo
     * @param string $acao
     * @return int|void
     */
    public function obterLimite(int $idToken, string $modulo, string $acao)
    {
        $sql = 'SELECT 
                    qtd_acessos 
                FROM 
                    `api_tokens_limits` 
                WHERE 
                    id_token = :token AND 
                    modulo=:modulo AND 
                    acao=:acao';

        $stmt = $this
            ->conn
            ->getHandler()
            ->prepare($sql);

        if ($stmt) {
            $stmt->bindParam('token', $idToken, PDO::PARAM_INT);
            $stmt->bindParam('modulo', $modulo, PDO::PARAM_STR);
            $stmt->bindParam('acao', $acao, PDO::PARAM_STR);

            if ($stmt->execute()) {
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if (is_array($result)) {
                    return $result['qtd_acessos'];
                } else {
                    return null;
                }
            }
        } else {
            throw new PrepareException('Houve um erro ao consultar o token', 10500);
        }

        return null;
    }

    public function obterAcessosPorPeriodo(int $idToken, string $modulo = '', string $acao = '', DateTime $dtInicio, DateTime $dtFim)
    {
        $sql = 'SELECT COALESCE(COUNT(1), 0) AS total_acessos
                    FROM 
                        `api_tokens_accesses`
                    WHERE 
                        id_token = :token AND
                        request_em BETWEEN(:inicio AND :fim)';

        if ($modulo) {
            $sql .= ' AND modulo=:modulo';
        }

        if ($acao) {
            $sql .= ' AND acao=:acao';
        }

        $stmt = $this
            ->conn
            ->getHandler()
            ->prepare($sql);

        if ($stmt) {
            $strDtInicio = $dtInicio->format('Y-m-d H:i:s');
            $strDtFim = $dtFim->format('Y-m-d H:i:s');
            $stmt->bindParam('token', $idToken, PDO::PARAM_INT);
            $stmt->bindParam('inicio', $strDtInicio, PDO::PARAM_STR);
            $stmt->bindParam('fim', $strDtFim, PDO::PARAM_STR);

            if ($modulo) {
                $stmt->bindParam('modulo', $modulo, PDO::PARAM_STR);
            }
            if ($acao) {
                $stmt->bindParam('acao', $acao, PDO::PARAM_STR);
            }

            if ($stmt->execute()) {
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if (is_array($result)) {
                    return $result['total_acessos'];
                } else {
                    return null;
                }
            }
        } else {
            throw new PrepareException('Houve um erro ao consultar o token', 10500);
        }

        return null;
    }

    /**
     * Registra a requisição do token no banco de dados
     *
     * @param integer $idToken
     * @param string $modulo
     * @param string $acao
     * @return bool
     */
    public function registrarAcesso(int $idToken, string $modulo, string $acao)
    {
        $sql = 'INSERT INTO 
                `api_tokens_accesses`(
                    id_token, 
                    modulo, 
                    acao
                ) 
            values (
                :token,
                :modulo,
                :acao
            )';
        $stmt = $this
            ->conn
            ->getHandler()
            ->prepare($sql);

        if ($stmt) {
            $stmt->bindParam('token', $idToken, PDO::PARAM_INT);
            $stmt->bindParam('modulo', $modulo, PDO::PARAM_STR);
            $stmt->bindParam('acao', $acao, PDO::PARAM_STR);

            return $stmt->execute();
        } else {
            throw new PrepareException('Houve um erro ao registrar o acesso', 10505);
        }

        return false;
    }
}
