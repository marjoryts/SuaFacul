<?php
require_once '../conexao.php';

header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    
    if (empty($username) || empty($email) || empty($password)) {
        $response['message'] = "Por favor, preencha todos os campos.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = "Formato de e-mail inválido.";
    } else {
        
        $sql = "SELECT id FROM usuarios WHERE nome_usuario = ? OR email = ?";
        if ($stmt = mysqli_prepare($conexao, $sql)) {
            mysqli_stmt_bind_param($stmt, "ss", $param_username, $param_email);
            $param_username = $username;
            $param_email = $email;

            if (mysqli_stmt_execute($stmt)) {
                mysqli_stmt_store_result($stmt);

                if (mysqli_stmt_num_rows($stmt) > 0) {
                    $response['message'] = "Nome de usuário ou e-mail já cadastrado.";
                } else {
                    // Hash da senha antes de salvar
                    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

                    
                    $sql_insert = "INSERT INTO usuarios (nome_usuario, email, senha) VALUES (?, ?, ?)";
                    if ($stmt_insert = mysqli_prepare($conexao, $sql_insert)) {
                        mysqli_stmt_bind_param($stmt_insert, "sss", $param_username_insert, $param_email_insert, $param_password_insert);
                        $param_username_insert = $username;
                        $param_email_insert = $email;
                        $param_password_insert = $hashed_password;

                        if (mysqli_stmt_execute($stmt_insert)) {
                            $response['success'] = true;
                            $response['message'] = "Usuário registrado com sucesso!";
                        } else {
                            $response['message'] = "Erro ao registrar usuário. Tente novamente mais tarde. " . mysqli_error($conexao);
                        }
                        mysqli_stmt_close($stmt_insert);
                    }
                }
            } else {
                $response['message'] = "Erro na consulta de verificação. " . mysqli_error($conexao);
            }
            mysqli_stmt_close($stmt);
        } else {
            $response['message'] = "Erro ao preparar consulta. " . mysqli_error($conexao);
        }
    }
} else {
    $response['message'] = "Requisição inválida.";
}

mysqli_close($conexao); 
echo json_encode($response); 
?>