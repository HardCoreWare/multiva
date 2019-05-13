<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App();

$container=$app->getContainer();

$container['config']=function($container){

    return new App\Config\Config();

};

$container['database']=function($container){

    return function($c){

        return  new Medoo\Medoo($c);

    };

};

$container['view'] = function ($container) {

    return new \Slim\Views\PhpRenderer('../app/views');

};

$container['user']=function($container){

    return function($database){

        return new App\Modules\User($database);

    };

};

?>