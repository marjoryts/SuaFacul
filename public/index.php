<?php

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../app/Routes/web.php';


use App\Controllers\HomeController;

$uri = $_GET['url'] ?? '/';

switch ($uri) {
    case '/':
        (new HomeController)->index();
        break;
    default:
        echo "Página não encontrada!";
}

