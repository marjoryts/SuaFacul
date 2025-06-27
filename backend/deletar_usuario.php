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

    if (empty($id)) {
        $response['message'] = "ID do usuário é obrigatório.";
    } else {
        $database = new Database();
        $conn = $database->getConnection();

        if ($conn) { 
            try {
                
                $sql = "DELETE FROM usuarios WHERE id = :id";
                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':id', $id, PDO::PARAM_INT);

                
                if ($stmt->execute()) {
                    
                    if ($stmt->rowCount() > 0) {
                        $response['success'] = true;
                        $response['message'] = "Usuário excluído com sucesso!";
                    } else {
                        $response['message'] = "Usuário não encontrado ou já excluído.";
                    }
                } else {
                    
                    $response['message'] = "Erro ao excluir usuário: " . implode(" - ", $stmt->errorInfo());
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