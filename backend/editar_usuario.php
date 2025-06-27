<?php
session_start();
require_once '../conexao.php';

header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    $response['message'] = "Acesso não autorizado.";
    echo json_encode($response);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'] ?? null;
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($id) || empty($username) || empty($email)) {
        $response['message'] = "ID do usuário, nome de usuário e e-mail são obrigatórios.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = "Formato de e-mail inválido.";
    } else {
        $database = new Database();
        $conn = $database->getConnection();

        if ($conn) {
            try {
                $sql_check = "SELECT id FROM usuarios WHERE (nome_usuario = :username OR email = :email) AND id != :id";
                $stmt_check = $conn->prepare($sql_check);
                $stmt_check->bindParam(':username', $username, PDO::PARAM_STR);
                $stmt_check->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt_check->bindParam(':id', $id, PDO::PARAM_INT);
                $stmt_check->execute();

                if ($stmt_check->rowCount() > 0) {
                    $response['message'] = "Nome de usuário ou e-mail já está sendo usado por outro usuário.";
                    echo json_encode($response);
                    exit;
                }

                if (!empty($password)) {
                    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                    $sql_update = "UPDATE usuarios SET nome_usuario = :username, email = :email, senha = :password WHERE id = :id";
                    $stmt_update = $conn->prepare($sql_update);
                    $stmt_update->bindParam(':username', $username, PDO::PARAM_STR);
                    $stmt_update->bindParam(':email', $email, PDO::PARAM_STR);
                    $stmt_update->bindParam(':password', $hashed_password, PDO::PARAM_STR);
                    $stmt_update->bindParam(':id', $id, PDO::PARAM_INT);
                } else {
                    $sql_update = "UPDATE usuarios SET nome_usuario = :username, email = :email WHERE id = :id";
                    $stmt_update = $conn->prepare($sql_update);
                    $stmt_update->bindParam(':username', $username, PDO::PARAM_STR);
                    $stmt_update->bindParam(':email', $email, PDO::PARAM_STR);
                    $stmt_update->bindParam(':id', $id, PDO::PARAM_INT);
                }

                if ($stmt_update->execute()) {
                    $response['success'] = true;
                    $response['message'] = "Usuário atualizado com sucesso!";
                } else {
                    $response['message'] = "Erro ao atualizar usuário: " . implode(" - ", $stmt_update->errorInfo());
                }

            } catch (PDOException $e) {
                $response['message'] = "Erro no banco de dados: " . $e->getMessage();
            } finally {
                $conn = null;
            }
        } else {
            $response['message'] = "Erro: Não foi possível obter a conexão com o banco de dados.";
        }
    }
} else {
    $response['message'] = "Requisição inválida.";
}

echo json_encode($response);
?>