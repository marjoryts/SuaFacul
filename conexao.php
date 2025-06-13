<?php

define('DB_SERVER', 'localhost'); 
define('DB_USERNAME', 'root');   
define('DB_PASSWORD', '');       
define('DB_NAME', 'suafacul_crud');

$conexao = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if($conexao === false){
    die("ERRO: Não foi possível conectar ao banco de dados. " . mysqli_connect_error());
}
?>