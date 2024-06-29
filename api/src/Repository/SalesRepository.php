<?php

namespace API\Repository;

use \API\Repository\Exception\PrepareException;

/**
 * Reposit�rio de acesso a dados das categorias
 */
class SalesRepository implements RepositoryInterface
{

    /**
     * Conex�o com banco de dados
     *
     * @var Connection
     */
    private $conn;

    public function __construct(\API\Repository\Connection $conn)
    {
        $this->conn = $conn;
    }

    public function getProduct(int $id)
    {
        $sql = 'SELECT p.*, (SELECT name FROM categories WHERE id = p.category_id) as category_name, (SELECT `link` FROM categories WHERE id = p.category_id) as link, (SELECT `tutorial` FROM categories WHERE id = p.category_id) as tutorial FROM products p WHERE id = :id';
        try {
            $stmt = $this
                ->conn
                ->getHandler()
                ->prepare($sql);
            if ($stmt) {
                $stmt->bindParam('id', $id, \PDO::PARAM_INT);
                $stmt->execute();
                $resultset = $stmt->fetch(\PDO::FETCH_ASSOC);
                return $resultset;
            }
        } catch (\PDOException $e) {
            return $e->getMessage();
        }
    }

    public function getSaleByPayment(int $id)
    {
        $sql = 'SELECT * FROM sales WHERE payment_id = :id';
        try {
            $stmt = $this
                ->conn
                ->getHandler()
                ->prepare($sql);
            if ($stmt) {
                $stmt->bindParam('id', $id, \PDO::PARAM_INT);
                $stmt->execute();
                $resultset = $stmt->fetch(\PDO::FETCH_ASSOC);
                return $resultset;
            }
        } catch (\PDOException $e) {
            return $e->getMessage();
        }
    }

    public function getSaleByHash(string $hash)
    {
        $sql = 'SELECT * FROM sales WHERE `hash` = :hash';
        try {
            $stmt = $this
                ->conn
                ->getHandler()
                ->prepare($sql);
            if ($stmt) {
                $stmt->bindParam('hash', $hash, \PDO::PARAM_STR);
                $stmt->execute();
                $resultset = $stmt->fetch(\PDO::FETCH_ASSOC);
                return $resultset;
            }
        } catch (\PDOException $e) {
            return false;
        }
    }

    public function getSaleById(int $id)
    {
        $sql = 'SELECT * FROM sales WHERE id = :id';
        try {
            $stmt = $this
                ->conn
                ->getHandler()
                ->prepare($sql);
            if ($stmt) {
                $stmt->bindParam('id', $id, \PDO::PARAM_INT);
                $stmt->execute();
                $resultset = $stmt->fetch(\PDO::FETCH_ASSOC);
                return $resultset;
            }
        } catch (\PDOException $e) {
            return $e->getMessage();
        }
    }

    public function update(int $id, array $data)
    {
        $campos = array_keys($data);
        $set = array_map(function ($item) {
            return '`'.$item . '` = :' . $item;
        }, $campos);

        $sql = "UPDATE sales SET " . implode(', ', $set) . " WHERE id = :id";
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
            throw new PrepareException("Erro ao atualiza sales");
        }
    }

    public function updateSale(array $array)
    {
        $sql = "UPDATE `sales` SET `status` = :status, `keys` = :keys, `hash` = :hash WHERE `payment_id` = :id";
        try {
            $stmt = $this
                ->conn
                ->getHandler()
                ->prepare($sql);
            if ($stmt) {
                $stmt->bindParam('id', $array["id"], \PDO::PARAM_INT);
                $stmt->bindParam('keys', $array["keys"]);
                $stmt->bindParam('hash', $array["hash"]);
                $stmt->bindParam('status', $array["status"], \PDO::PARAM_STR);
                $stmt->execute();
            }
        } catch (\PDOException $e) {
            return $e->getMessage();
        }
        return $this->conn->getHandler()->lastInsertId();
    }

    public function updateProductKey(array $array)
    {
        $sql = "UPDATE `products` SET `keys` = :keys WHERE `id` = :id";
        try {
            $stmt = $this
                ->conn
                ->getHandler()
                ->prepare($sql);
            if ($stmt) {
                $stmt->bindParam('id', $array["id"], \PDO::PARAM_INT);
                $stmt->bindParam('keys', $array["keys"]);
                $stmt->execute();
            }
        } catch (\PDOException $e) {
            return $e->getMessage();
        }
        return $this->conn->getHandler()->lastInsertId();
    }

    public function register(array $array)
    {
        $sql = 'INSERT INTO sales
                    (`product_id`,`email`,`amount`,`payment_id`,`price`)
                VALUES
                    (:product_id,:email,:amount,:payment_id,:price)
                ';
        try {
            $stmt = $this
                ->conn
                ->getHandler()
                ->prepare($sql);
            if ($stmt) {
                $stmt->bindParam('product_id', $array["product_id"], \PDO::PARAM_INT);
                $stmt->bindParam('email', $array["email"], \PDO::PARAM_STR);
                $stmt->bindParam('amount', $array["amount"], \PDO::PARAM_STR);
                $stmt->bindParam('price', $array["price"], \PDO::PARAM_STR);
                $stmt->bindParam('payment_id', $array["payment_id"], \PDO::PARAM_STR);
                $stmt->execute();
            }
        } catch (\PDOException $e) {
            return $e->getMessage();
        }
        return $this->conn->getHandler()->lastInsertId();
    }


    public function listHome($page = 1, $paginationLimit = 30, $filterQuery)
    {
        $pagination = $paginationLimit * ($page - 1);

        $sql = "SELECT 
        (SELECT `name` FROM categories WHERE `id` = p.`category_id`) category_name, 
        p.`name` as product_name, s.`amount`, s.`email`, s.`id`
        FROM sales s RIGHT JOIN products p ON s.`product_id` = p.`id`
            " . $filterQuery . "
            Limit " . $pagination . ", " . $paginationLimit . "";

        $count = "Select count(id) as total From sales s " . $filterQuery . "";
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
            throw new PrepareException("Erro ao list pagamentos");
        }
    }

    public function list($page = 1, $paginationLimit = 30, $filterQuery)
    {
        $pagination = $paginationLimit * ($page - 1);

        $sql = "SELECT 
        (SELECT `name` FROM categories WHERE id = p.category_id) category_name, 
        p.name as product_name, s.amount, s.email, s.id, s.status, s.hash, s.payment_id, s.keys, s.price
        FROM sales s RIGHT JOIN products p ON s.product_id = p.id
        WHERE s.`deleted` = '0'
            " . $filterQuery . "
            Limit " . $pagination . ", " . $paginationLimit . "";

        $count = "Select count(id) as total From sales s WHERE s.`deleted` = '0' " . $filterQuery . "";
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
            throw new PrepareException("Erro ao list usuarios");
        }
    }
}
