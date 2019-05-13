<?php

namespace App\Config;

class Config{

    private $config;

    public function __construct(){

        $jsonConfig=file_get_contents('../app/src/Config/Config.json');
        $this->config=json_decode($jsonConfig,true);

    }

    public function database(){

        return $this->config['database'];

    }

    public function app(){

        return $this->config['app'];

    }
    
}

?>