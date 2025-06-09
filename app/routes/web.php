<?php

use App\Controllers\HomeController;
use App\Controllers\LoginController;

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {
    case '/SuaFacul/public/':
    case '/':
        (new HomeController)->index();
        break;

    case '/SuaFacul/public/login':
        (new LoginController)->viewLogin();
        break;

    case '/SuaFacul/public/registrar':
        (new LoginController)->registrar();
        break;

    case '/SuaFacul/public/logout':
        (new LoginController)->logout();
        break;

    case '/SuaFacul/public/home':
        (new HomeController)->index(); // opcional, redireciona logado pra home
        break;

    default:
        echo "404 - Página não encontrada";
        break;
}
