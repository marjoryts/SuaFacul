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
        try {
            // Verifica se o nome de usuário ou e-mail já existem para OUTRO usuário
            $sql_check = "SELECT id FROM usuarios WHERE (nome_usuario = ? OR email = ?) AND id != ?";
            if ($stmt_check = mysqli_prepare($conexao, $sql_check)) {
                mysqli_stmt_bind_param($stmt_check, "ssi", $username, $email, $id);
                mysqli_stmt_execute($stmt_check);
                mysqli_stmt_store_result($stmt_check);

                if (mysqli_stmt_num_rows($stmt_check) > 0) {
                    $response['message'] = "Nome de usuário ou e-mail já está sendo usado por outro usuário.";
                    mysqli_stmt_close($stmt_check);
                    echo json_encode($response);
                    exit;
                }
                mysqli_stmt_close($stmt_check);
            } else {
                throw new Exception("Erro ao preparar consulta de verificação: " . mysqli_error($conexao));
            }

           
            if (!empty($password)) {
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                $sql_update = "UPDATE usuarios SET nome_usuario = ?, email = ?, senha = ? WHERE id = ?";
                $stmt_update = mysqli_prepare($conexao, $sql_update);
                mysqli_stmt_bind_param($stmt_update, "sssi", $username, $email, $hashed_password, $id);
            } else {
                $sql_update = "UPDATE usuarios SET nome_usuario = ?, email = ? WHERE id = ?";
                $stmt_update = mysqli_prepare($conexao, $sql_update);
                mysqli_stmt_bind_param($stmt_update, "ssi", $username, $email, $id);
            }

            if ($stmt_update) {
                if (mysqli_stmt_execute($stmt_update)) {
                    $response['success'] = true;
                    $response['message'] = "Usuário atualizado com sucesso!";
                } else {
                    $response['message'] = "Erro ao atualizar usuário: " . mysqli_error($conexao);
                }
                mysqli_stmt_close($stmt_update);
            } else {
                throw new Exception("Erro ao preparar consulta de atualização: " . mysqli_error($conexao));
            }

        } catch (Exception $e) {
            $response['message'] = $e->getMessage();
        }
    }
} else {
    $response['message'] = "Requisição inválida.";
}

mysqli_close($conexao);
echo json_encode($response);
?>