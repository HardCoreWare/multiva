<?php

namespace App\Controllers;

class ViewController extends Controller{

    public function login($request, $response, $arg){

        $view=$this->container['view'];
        return $view->render($response, 'login.html',[]);

    }

    //inicio de sesion
    public function door($request, $response, $arg){

        if(isset($_POST['user'])&&isset($_POST['password'])){

            $request=[];

            $request['user']=$_POST['user'];
            $request['password']=$_POST['password'];

            //mandamos llamar dependencia de base de datos y la inyectamos en el contructor de usuario
            $config=$this->container['config'];
            $database=$this->container['database']($config->database());
            $user = $this->container['user']($database);
                
            //validamos con metodo login
            $validation=$user->login($request);
            if($validation){



            }
            //en caso de no validar
            else{


            }

        }

        else{



        }

    }

    //validacion
    public function home($request, $response, $arg){

        //mandamos llamar dependencia de base de datos y la inyectamos en el contructor de usuario
        $config=$this->container['config'];
        $database=$this->container['database']($config->database());
        $user = $this->container['user']($database);

        //si existe el cookie
        if(isset($_COOKIE['user'])){

            $cookie=$_COOKIE['user'];
            $validation = $user->validate($cookie);

            if($validation){
                $view=$this->container['view'];
                return $view->render($response, 'home.html',[$config->app()]);
            }
            else{
                $view=$this->container['view'];
                return $view->render($response, 'login.html',[$config->app()]);
            }

        }
        else{
            $view=$this->container['view'];
            return $view->render($response, 'login.html',[$config->app()]);
        }
        
    }

    //logout
    public function logout($request, $response, $arg){

        //
        $config=$this->container['config'];
        $database=$this->container['database']($config->database());
        $user = $this->container['user']($database);

        if(isset($_COOKIE['user'])){

            $cookie=$_COOKIE['user'];
            $user->logout($cookie);

            $response='success';
            
        }
        else{

            $response='fail';

        }

        return $response;

    }

    public function test($request, $response, $arg){

        $config=$this->container['config'];
        $database=$this->container['database']($config->database());
        $user = $this->container['user']($database);

    }

}

?>

