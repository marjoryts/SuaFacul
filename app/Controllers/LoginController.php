<?php

namespace App\Controllers;

use App\Models\Connection;
use PDO;
use PDOException;

class LoginController
{
    public function viewLogin()
    {
        require_once __DIR__ . '/../Views/Auth/login.php';
    }

    public function login()
    {
        session_start();

        $email = $_POST['email'] ?? '';
        $senha = $_POST['senha'] ?? '';

        if (empty($email) || empty($senha)) {
            $_SESSION['erro'] = "Preencha todos os campos.";
            header("Location: /SuaFacul/public/");
            exit;
        }

        $conn = (new Connection())->getConnection();
        $query = "SELECT * FROM usuarios WHERE email = :email LIMIT 1";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($senha, $usuario['senha'])) {
            $_SESSION['usuario'] = $usuario['email'];
            $_SESSION['sucesso'] = "Login realizado com sucesso!";
            header("Location: /SuaFacul/public/home"); // ou /dashboard se criar
        } else {
            $_SESSION['erro'] = "Email ou senha incorretos.";
            header("Location: /SuaFacul/public/");
        }

        exit;
    }

    public function registrar()
    {
        session_start();

        $email = $_POST['email'] ?? '';
        $senha = $_POST['senha'] ?? '';

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $_SESSION['erro'] = "Email inválido.";
            header("Location: /SuaFacul/public/");
            exit;
        }

        if (strlen($senha) < 6) {
            $_SESSION['erro'] = "A senha deve ter pelo menos 6 caracteres.";
            header("Location: /SuaFacul/public/");
            exit;
        }

        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

        $conn = (new Connection())->getConnection();

        try {
            $query = "INSERT INTO usuarios (email, senha) VALUES (:email, :senha)";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':senha', $senhaHash);
            $stmt->execute();

            $_SESSION['sucesso'] = "Cadastro realizado com sucesso!";
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) { // Violação de UNIQUE
                $_SESSION['erro'] = "Este email já está cadastrado.";
            } else {
                $_SESSION['erro'] = "Erro ao cadastrar: " . $e->getMessage();
            }
        }

        header("Location: /SuaFacul/public/");
        exit;
    }
}
