<?php

namespace App\Modules;

class User extends Connection{

    public function login($request){

        //tomamos usuario y password del request
        $user=$request['user'];
        $password=$request['password'];

        //obntenemos el registro del usuario
        $register=$this->database->get(
            'Users',
            ['Id','Nickname','Password','Logged','Hashcode','IP'],
            ['Nickname'=>$user]
        );

        //checamos si el nickname
        if(isset($register['Nickname'])){

            //checamos si el password existe
            if($register['Password']===$password){

                //opbtenemos codigo random y la ip del cliente
                $hashcode=uniqid();
                $ip=$_SERVER['REMOTE_ADDR'];

                //creamos y guardamos sesion
                $this->database->update(
                    'Users',
                    [
                        'Logged'=>1,'Hashcode'=>$hashcode,'IP'=>$ip,
                    ],
                    [
                        'Nickname[=]'=>$user
                    ]
                );

                //creamos cookies
                $cookieVal=['user'=>$user,'hashcode'=>$hashcode];
                $cookieJson=json_encode($cookieVal);
                setcookie('user',$cookieJson);

                return 1;

            }
            //de ser incorrecto
            else{
                return 0;

            }

        }
        //de no existir el registro
        else{

            //regresamos negativo
            return -1;

        }
        
    }

    public function logout($cookie){

        $cookieVal=json_decode($cookie,true);

        $user=$cookieVal['user'];

        //actualizamos sesion llevandola a 0 y null
        $this->database->update(
            'Users',
            [
                'Logged'=>0,'Hashcode'=>null,'IP'=>null,
            ],
            [
                'Nickname[=]'=>$user
            ]

        );

        //
        unset($_COOKIE['user']);
        
    }

    public function validate($cookie){

        $cookieVal=json_decode($cookie,true);

        //obtenemos valores de cookie
        $user=$cookieVal['user'];
        $hashcode=$cookieVal['hashcode'];
        $ip=$_SERVER['REMOTE_ADDR'];

        //tomamos registro
        $register=$this->database->get('Users',['Hashcode','IP'],['Nickname[=]'=>$user]);
        
        //comparamos
        if($register['Hashcode']===$hashcode&&$ip===$register['IP']){

            return true;

        }
        else{

            return false;

        }

    }
    
}


?>