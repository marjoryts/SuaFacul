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
        
        $sql = "DELETE FROM usuarios WHERE id = ?";
        if ($stmt = mysqli_prepare($conexao, $sql)) {
            mysqli_stmt_bind_param($stmt, "i", $param_id);
            $param_id = $id;

            if (mysqli_stmt_execute($stmt)) {
                if (mysqli_stmt_affected_rows($stmt) > 0) {
                    $response['success'] = true;
                    $response['message'] = "Usuário excluído com sucesso!";
                } else {
                    $response['message'] = "Usuário não encontrado ou já excluído.";
                }
            } else {
                $response['message'] = "Erro ao excluir usuário: " . mysqli_error($conexao);
            }
            mysqli_stmt_close($stmt);
        } else {
            $response['message'] = "Erro ao preparar consulta de exclusão: " . mysqli_error($conexao);
        }
    }
} else {
    $response['message'] = "Requisição inválida.";
}

mysqli_close($conexao);
echo json_encode($response);
?>