<?php
session_start();
require_once '../conexao.php';

header('Content-Type: application/json');

$response = ['success' => false, 'message' => '', 'username' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username_or_email = trim($_POST['username'] ?? ''); 
    $password = trim($_POST['password'] ?? '');

    if (empty($username_or_email) || empty($password)) {
        $response['message'] = "Por favor, preencha todos os campos.";
    } else {
        
        $sql = "SELECT id, nome_usuario, email, senha FROM usuarios WHERE nome_usuario = ? OR email = ?";
        if ($stmt = mysqli_prepare($conexao, $sql)) {
            mysqli_stmt_bind_param($stmt, "ss", $param_user_email, $param_user_email);
            $param_user_email = $username_or_email;

            if (mysqli_stmt_execute($stmt)) {
                mysqli_stmt_store_result($stmt);

                if (mysqli_stmt_num_rows($stmt) == 1) {
                    mysqli_stmt_bind_result($stmt, $id, $nome_usuario, $email, $hashed_password);
                    if (mysqli_stmt_fetch($stmt)) {
                        
                        if (password_verify($password, $hashed_password)) {
                           
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $nome_usuario;
                            $_SESSION["email"] = $email;

                            $response['success'] = true;
                            $response['message'] = "Login efetuado com sucesso!";
                            $response['username'] = $nome_usuario;
                        } else {
                            $response['message'] = "Credenciais inválidas.";
                        }
                    }
                } else {
                    $response['message'] = "Credenciais inválidas.";
                }
            } else {
                $response['message'] = "Erro na consulta de login. " . mysqli_error($conexao);
            }
            mysqli_stmt_close($stmt);
        } else {
            $response['message'] = "Erro ao preparar consulta de login. " . mysqli_error($conexao);
        }
    }
} else {
    $response['message'] = "Requisição inválida.";
}

mysqli_close($conexao);
echo json_encode($response);
?>