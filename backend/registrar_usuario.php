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
        $database = new Database();
        $conn = $database->getConnection();

        if ($conn) {
            try {
                $sql_check = "SELECT id FROM usuarios WHERE nome_usuario = :username OR email = :email";
                $stmt_check = $conn->prepare($sql_check);
                $stmt_check->bindParam(':username', $username, PDO::PARAM_STR);
                $stmt_check->bindParam(':email', $email, PDO::PARAM_STR);
                $stmt_check->execute();

                if ($stmt_check->rowCount() > 0) {
                    $response['message'] = "Nome de usuário ou e-mail já cadastrado.";
                } else {
                    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

                    $sql_insert = "INSERT INTO usuarios (nome_usuario, email, senha) VALUES (:username, :email, :password)";
                    $stmt_insert = $conn->prepare($sql_insert);
                    $stmt_insert->bindParam(':username', $username, PDO::PARAM_STR);
                    $stmt_insert->bindParam(':email', $email, PDO::PARAM_STR);
                    $stmt_insert->bindParam(':password', $hashed_password, PDO::PARAM_STR);

                    if ($stmt_insert->execute()) {
                        $response['success'] = true;
                        $response['message'] = "Usuário registrado com sucesso!";
                    } else {
                        $response['message'] = "Erro ao registrar usuário. Tente novamente mais tarde: " . implode(" - ", $stmt_insert->errorInfo());
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
    }
} else {
    $response['message'] = "Requisição inválida.";
}

echo json_encode($response);
?>