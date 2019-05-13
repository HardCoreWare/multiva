$(document).ready(function () {

    const cicleTable = new CicleTable();

    $.ajax({

        url:serviceUrl+'/balanza/ciclos/indice',
        method:'GET',
        data:'',
        success:function(response){

            const data = JSON.parse(response);
            console.log(data);
            cicleTable.readData(data);
            cicleTable.writeTable("#datatable");

        }

    });


    $("#btnForward").click(function(){

        $.ajax({

            url:serviceUrl+'/balanza/ciclos/nuevo',
            method:'GET',
            data:'',
            success:function(response){

                window.location.replace(selfUrl+'/ciclo');

            }
    
        });

    });


    $("#btnRewind").click(function(){

        $.ajax({

            url:serviceUrl+'/balanza/ciclos/regresar',
            method:'GET',
            data:'',
            success:function(response){
    
                window.location.replace(selfUrl+'/ciclo');
    
            }
    
        });

    });

    
});