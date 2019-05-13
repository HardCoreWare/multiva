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

//ok
$app->get('/balanza', '\App\Controllers\ViewController:home');
$app->get('/balanza/login', '\App\Controllers\ViewController:login');
$app->post('/balanza/door', '\App\Controllers\ViewController:door');
$app->get('/balanza/logout', '\App\Controllers\ViewController:logout');
$app->get('/test', '\App\Controllers\ViewController:test');


//
$app->run();