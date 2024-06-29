<?php

namespace API\Repository;

use \API\Repository\Exception\PrepareException;
use PDOException;

class CategoryRepository implements RepositoryInterface
{

    private $conn;

    public function __construct(\API\Repository\Connection $conn)
    {
        $this->conn = $conn;
    }

    public function list($page = 1, $paginationLimit = 30)
    {
        $pagination = $paginationLimit * ($page - 1);
        $filterQuery = '';

        $sql = "Select
        (SELECT count(*) FROM products WHERE category_id = c.id AND deleted = '0') as total_products,
               c.*
            FROM 
                categories c
            WHERE
                c.deleted = '0' 
            AND
                c.status = '1'
            " . $filterQuery . "
            Limit " . $pagination . ", " . $paginationLimit . "";

        $count = "Select count(id) as total From categories WHERE deleted = '0'" . $filterQuery . "";
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
            throw new PrepareException("Erro ao list categorias");
        }
    }

    public function listAdmin($page = 1, $paginationLimit = 30)
    {
        $pagination = $paginationLimit * ($page - 1);
        $filterQuery = '';

        $sql = "Select
        (SELECT count(*) FROM products WHERE category_id = c.id AND deleted = '0') as total_products,
               c.*
            FROM 
                categories c
            WHERE
                c.deleted = '0' 
            " . $filterQuery . "
            Limit " . $pagination . ", " . $paginationLimit . "";

        $count = "Select count(id) as total From categories WHERE deleted = '0'" . $filterQuery . "";
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
            throw new PrepareException("Erro ao list categorias");
        }
    }

    public function update(int $id, array $data)
    {
        $campos = array_keys($data);
        $set = array_map(function ($item) {
            return '`'.$item . '` = :' . $item;
        }, $campos);

        $sql = "UPDATE categories SET " . implode(', ', $set) . " WHERE id = :id";
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
            throw new PrepareException("Erro ao atualiza categoria");
        }
    }

    public function register($name, $status, $color, $icon, $image, $link)
    {
        $sql = "INSERT INTO categories (`name`, `status`, `color`, `icon`, `image`, `link`) VALUES (:name, :status, :color, :icon, :image, :link)";
        $stmt = $this
            ->conn
            ->getHandler()
            ->prepare($sql);

        if ($stmt) {
            $stmt->bindParam('name', $name, \PDO::PARAM_STR);
            $stmt->bindParam('status', $status, \PDO::PARAM_STR);
            $stmt->bindParam('color', $color, \PDO::PARAM_STR);
            $stmt->bindParam('icon', $icon, \PDO::PARAM_STR);
            $stmt->bindParam('image', $image, \PDO::PARAM_STR);
            $stmt->bindParam('link', $link, \PDO::PARAM_STR);
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
}
