<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App(
    [
        'settings' => [
            'displayErrorDetails' => true,
            'responseChunkSize' => 8096
        ]
    ]
);

require_once '../app/core/container.php';

//balanza
$app->get('/balanza', '\App\Controllers\ViewController:home');
$app->get('/balanza/login', '\App\Controllers\ViewController:login');
$app->post('/balanza/door', '\App\Controllers\ViewController:door');
$app->get('/balanza/logout', '\App\Controllers\ViewController:logout');
$app->get('/test', '\App\Controllers\ViewController:test');

/***********************************************************************/
/***********************************************************************/

//rutas get con cuerpo
$app->get('/proxy/{base}[/{body:.*}]', '\App\Controllers\ProxyController:get');
//rutas con payload
$app->post('/proxy/{base}[/{body:.*}]', '\App\Controllers\ProxyController:post');
//ejecutamos slim
$app->run();

