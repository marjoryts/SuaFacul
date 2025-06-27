<?php
require_once 'conexao.php';

$database = new Database();
$conn = $database->getConnection();

if ($conn) {
    echo "Conexão com o banco de dados estabelecida com sucesso!";
    try {
        $stmt = $conn->query("SELECT 1");
        if ($stmt) {
            echo "<br>Consulta de teste bem-sucedida.";
        } else {
            echo "<br>Consulta de teste falhou.";
        }
    } catch (PDOException $e) {
        echo "<br>Erro na consulta de teste: " . $e->getMessage();
    }
    $conn = null;
} else {
    echo "Falha ao conectar ao banco de dados. Verifique as credenciais e se o MariaDB está rodando.";
}
?>