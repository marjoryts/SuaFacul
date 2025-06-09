<?php

namespace App\Models;

use PDO;
use PDOException;

class Connection {
    private $host = "localhost";
    private $db_name = "suafacul";
    private $username = "root";
    private $password = "";
    private $conn;

    public function getConnection() {
        try {
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->db_name}",
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
        } catch (PDOException $e) {
            die("Erro: " . $e->getMessage());
        }

        return $this->conn;
    }
}
