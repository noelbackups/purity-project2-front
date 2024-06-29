<?php

namespace API\Repository;

use \API\Repository\Exception\PrepareException;
use DateTime;
use Exception;
use PDOException;

/**
 * Repositório de acesso a dados dos equipamentos
 */
class AdminRepository implements RepositoryInterface
{

    /**
     * Conexão com banco de dados
     *
     * @var Connection
     */
    private $conn;

    public function __construct(\API\Repository\Connection $conn)
    {
        $this->conn = $conn;
    }


    public function login($email, $password)
    {
        $sql = "Select * From admins Where email = :email Limit 1";
        $stmt = $this
            ->conn
            ->getHandler()
            ->prepare($sql);

        if ($stmt) {
            $stmt->bindParam('email', $email, \PDO::PARAM_STR);
            $stmt->execute();
            if ($resultset = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                if (password_verify($password, $resultset['password'])) {
                    unset($resultset['password']);
                    $token = bin2hex(random_bytes(5)) . md5($resultset["id"]);
                    $update = $this->updateToken($resultset['id'], $token);
                    if ($update !== null) {
                        if ($resultset['deleted'] == 0) {
                            $resultset['token'] = $token;
                            $return['login'] = true;
                            $return['type'] = 'success';
                            $return['message'] = "Login realizado com sucesso!";
                            $return['user_data'] = $resultset;
                        } else {
                            $return['type'] = 'error';
                            $return['message'] = "Sua conta foi desativada";
                        }
                    } else {
                        $return['type'] = 'error';
                        $return['message'] = "Erro ao autenticar usuário!";
                    }
                } else {
                    $return['type'] = 'error';
                    $return['message'] = "Senha incorreta";
                }
            } else {
                $return['type'] = 'error';
                $return['message'] = "E-mail não encontrado";
            }
            return $return;
        } else {
            throw new PrepareException("Erro ao autenticar usuario");
        }
    }

    public function register($email, $password, $phone, $name)
    {
        $sql = "INSERT INTO admins (name, email, password, phone) VALUES (:name, :email, :password, :phone)";
        $stmt = $this
            ->conn
            ->getHandler()
            ->prepare($sql);

        if ($stmt) {
            $password = password_hash($password, PASSWORD_ARGON2I);
            $stmt->bindParam('name', $name, \PDO::PARAM_STR);
            $stmt->bindParam('email', $email, \PDO::PARAM_STR);
            $stmt->bindParam('password', $password, \PDO::PARAM_STR);
            $stmt->bindParam('phone', $phone, \PDO::PARAM_STR);
            try {
                $stmt->execute();
                $insertid = $this->conn->getHandler()->lastInsertId();
                $return['type'] = 'success';
                $return['message'] = "Registro feito com sucesso!";
                $return['user_id'] = $insertid;
            } catch (PDOException $e) {
                if ($e->errorInfo[1] == 1062) {
                    if (strpos($e->errorInfo[2], 'email')) {
                        $return = ["type" => 'error', "message" => ' Este e-mail ja foi cadastrado!'];
                    }
                } elseif ($e->errorInfo[1] == 1364) {
                    $return = ["type" => 'error', "message" => 'Preencha todos os campos obrigatórios!'];
                } else {
                    $return = ["type" => 'error', "message" => 'Erro: ' . $e->errorInfo[1] . ', contate um desenvolvedor!'];
                }
            }

            return $return;
        } else {
            throw new PrepareException("Erro ao autenticar usuario");
        }
    }

    private function updateToken($id_admin, $token)
    {
        $now = new DateTime('+12 hours'); // + 12 horas
        $validate = $now->format('Y-m-d H:i:s');
        $sql = "INSERT INTO `admin_tokens` (`id`, `id_admin`, `token`, `validate`) VALUES (NULL, :id_admin, :token, :validate);";
        $stmt = $this
            ->conn
            ->getHandler()
            ->prepare($sql);

        if ($stmt) {
            $stmt->bindParam('id_admin', $id_admin, \PDO::PARAM_STR);
            $stmt->bindParam('token', $token, \PDO::PARAM_STR);
            $stmt->bindParam('validate', $validate, \PDO::PARAM_STR);
            if ($stmt->execute()) {
                return true;
            } else {
                return null;
            }
        } else {
            throw new PrepareException("Erro ao atualiza token user");
        }
    }

    public function update(int $id, array $data)
    {
        $campos = array_keys($data);
        $set = array_map(function ($item) {
            return $item . ' = :' . $item;
        }, $campos);

        $sql = "UPDATE admins SET " . implode(', ', $set) . " WHERE id = :id";
        $stmt = $this
            ->conn
            ->getHandler()
            ->prepare($sql);

        if ($stmt) {
            $stmt->bindParam('id', $id, \PDO::PARAM_INT);
            foreach ($data as $key => $row) {
                $stmt->bindParam($key, $row['value'], $row['param']);
            }
            if ($stmt->execute()) {
                return true;
            } else {
                return null;
            }
        } else {
            throw new PrepareException("Erro ao atualiza admin");
        }
    }

    public function list($page = 1, $paginationLimit = 30)
    {
        $pagination = $paginationLimit * ($page - 1);

        $sql = "Select
                id, name, email, phone
            From
                admins
            WHERE
                deleted = '0'
            ORDER by id DESC
            Limit " . $pagination . ", " . $paginationLimit . "";

        $count = "Select count(id) as total From admins WHERE deleted = '0'";
        $stmtCount = $this
            ->conn
            ->getHandler()
            ->prepare($count);

        $stmtCount->execute();
        $returnCount = $stmtCount->fetch(\PDO::FETCH_ASSOC);

        $stmt = $this
            ->conn
            ->getHandler()
            ->prepare($sql);

        if ($stmt) {
            if ($stmt->execute()) {
                $resultset = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                $return = ['data' => $resultset, 'total' => $returnCount['total']];
                return $return;
            } else {
                return null;
            }
        } else {
            throw new PrepareException("Erro ao list admins");
        }
    }
}
