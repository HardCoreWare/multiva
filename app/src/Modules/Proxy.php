<?php

namespace App\Modules;

class Proxy{

    protected $client;

    public function __construct($client){

        $this->client = $client;

    }

    public function getRequest($url){

        $request=$this->client->request('GET', '/'.$url);
        return $request->getBody()->getContents();
        
    }

    public function postRequest($url,$payload){

        $request=$this->client->request('POST', '/'.$url,$payload);
        return $request->getBody()->getContents();
        
    }
    
}

?>