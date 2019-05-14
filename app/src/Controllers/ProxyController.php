<?php

namespace App\Controllers;

class ProxyController extends Controller{

    public function get($request,$response,$args){

        if($request->isGet()){

        $base = $args['base'];
        $body = $args['body'];

        $finder=$this->container['finder'];
        $settings=$finder->getSettings($base);

        $proxy=$this->container['proxy']($settings);

        $content=$proxy->getRequest($body);
        $response->getBody()->write($content);

        return $response->withHeader('Content-type', 'application/json');

        }


    }

    public function post($request,$response,$args){

        if($request->isPost()){

            $payload=$_POST;
            $base = $args['base'];
            $body = $args['body'];
            $finder=$this->container['finder'];
            $settings=$finder->getSettings($base);
            $proxy=$this->container['proxy']($settings);

        }

        else{

            $response->getBody()->write(null);
            return $response->withHeader('Content-type', 'application/json');

        }

    }

}

?>

