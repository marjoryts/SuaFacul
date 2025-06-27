<?php
session_start();
require_once '../conexao.php';

header('Content-Type: application/json');

$response = ['success' => false, 'message' => '', 'data' => []];

if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    $response['message'] = "Acesso não autorizado.";
    echo json_encode($response);
    exit;
}

$database = new Database();
$conn = $database->getConnection();

if ($conn) {
    try {
        $id = $_GET['id'] ?? null;

        if ($id) {
            $sql = "SELECT id, nome_usuario, email FROM usuarios WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                $response['success'] = true;
                $response['message'] = "Usuário encontrado com sucesso!";
                $response['data'] = $user;
            } else {
                $response['message'] = "Usuário não encontrado.";
            }
        } else {
            $sql = "SELECT id, nome_usuario, email FROM usuarios ORDER BY nome_usuario ASC";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($users) {
                $response['success'] = true;
                $response['message'] = "Usuários listados com sucesso!";
                $response['data'] = $users;
            } else {
                $response['message'] = "Nenhum usuário encontrado.";
            }
        }

    } catch (PDOException $e) {
        $response['message'] = "Erro no banco de dados: " . $e->getMessage();
    } finally {
        $conn = null;
    }
} else {
    $response['message'] = "Erro: Não foi possível obter a conexão com o banco de dados.";
}

echo json_encode($response);
?>