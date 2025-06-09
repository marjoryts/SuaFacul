<?php

namespace App\Repository;

use App\Models\Usuario;
use App\Models\Connection;
use PDO;

class UsuarioRepository {
    private $conn;

    public function __construct() {
        $db = new Connection();
        $this->conn = $db->getConnection();
    }

    public function autenticar($email, $senha) {
        $query = "SELECT * FROM usuarios WHERE email = :email AND senha = :senha";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senha);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            return new Usuario($result['email'], $result['senha']);
        }

        return null;
    }
}
