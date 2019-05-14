<?php

namespace App\Modules;

class Connection{

    protected $database;

    public function __construct($database){

        $this->database=$database;

    }
    
}


