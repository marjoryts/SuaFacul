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
        $database = new Database();
        $conn = $database->getConnection();

        if ($conn) {
            try {
            
                $sql = "SELECT id, nome_usuario, email, senha FROM usuarios WHERE nome_usuario = :user_email OR email = :user_email";
                $stmt = $conn->prepare($sql);


                $stmt->bindParam(':user_email', $username_or_email, PDO::PARAM_STR);

                
                if ($stmt->execute()) {
                    
                    if ($stmt->rowCount() == 1) {
                        $user = $stmt->fetch(PDO::FETCH_ASSOC);

                        if ($user && password_verify($password, $user['senha'])) {
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $user['id'];
                            $_SESSION["username"] = $user['nome_usuario'];
                            $_SESSION["email"] = $user['email'];

                            $response['success'] = true;
                            $response['message'] = "Login efetuado com sucesso!";
                            $response['username'] = $user['nome_usuario'];
                        } else {
                            $response['message'] = "Credenciais inválidas.";
                        }
                    } else {
                        $response['message'] = "Credenciais inválidas.";
                    }
                } else {
                    $response['message'] = "Erro na consulta de login: " . implode(" - ", $stmt->errorInfo());
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