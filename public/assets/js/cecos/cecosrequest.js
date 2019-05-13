
    function deleteCeco(){

        $(".delete-action").click(function(){

            const request = {
                id: $(this).attr('id').split("-")[1],
            }

            const req = JSON.stringify(request);

            $.ajax({

                url:serviceUrl+'/balanza/cecos/eliminar',
                method:'POST',
                data:{"req":req},
                success:function(response){

                    console.log(response);

                }

            });
            
        });

    }

    //
    function updateCeco(){

        $(".include-action").click(function(){
    
            const request ={
                id: ($(this).attr('id')).split("-")[1],
                value: ($(this).attr('id')).split("-")[2]
            }
            
            const req = JSON.stringify(request);
            
            $.ajax({
            
                url:serviceUrl+'/balanza/cecos/actualizar',
                method:'POST',
                data:{"req":req},
                success:function(response){

                    while(!response){}
                    window.location.replace(selfUrl+'/cecos');
                    
                }
            
            });
    
        });
    
    }


$(document).ready(function(){

    //dejamos iniciados forma y tabla
    const cecosTable = new CecosTable();
    const cecosForm = new CecosForm();
    let switched=false;

    //primera solicitud
    $.ajax({

        url:serviceUrl+'/balanza/cecos/indice',
        method:'GET',
        success:function(response){

            while(!response){}

            const data = JSON.parse(response);
            cecosTable.readData(data);
            cecosTable.writeTable("#datatable");
            updateCeco();
            deleteCeco();

        }

    });

    //cambiamos a agregar o a busqueda
    $("#btnSwitch").click(function(){

        if(switched){
            $(this).val("AGREGAR NUEVO");
            $("#formRead").show();
            $("#datatable").show();
            $("#formAdd").hide();
            switched=false;
        }

        else{
            $(this).val("VOLVER A BUSCADOR");
            $("#formRead").hide();
            $("#datatable").hide();
            $("#formAdd").show();
            switched=true;
        }

    });

    //
    $("#txtCeco").keyup(function(){

        let params = cecosForm.readSearchForm("#selectModule","#txtCeco");

        $.ajax({

            url:serviceUrl+'/balanza/cecos/buscar/'+params,
            method:'GET',
            data:'',
            success:function(response){
    
                while(!response){}

                const data = JSON.parse(response);
                cecosTable.readData(data);
                cecosTable.writeTable("#datatable");
                updateCeco();
                deleteCeco();

    
            }
    
        });

    });

    // actualizamos busqueda por cambio
    $("#selectModule").change(function(){

        let params = cecosForm.readSearchForm("#selectModule","#txtCeco");

        $.ajax({

            url:serviceUrl+'/balanza/cecos/buscar/'+params,
            method:'GET',
            data:'',
            success:function(response){
    
                while(!response){}

                console.log(response);

                const data = JSON.parse(response);
                cecosTable.readData(data);
                cecosTable.writeTable("#datatable");
                updateCeco();
                deleteCeco();

    
            }
    
        });

    });

    //agregar ceco
    $("#btnAdd").click(function(){

        let data = cecosForm.readAddForm("#txtAddModule","#txtAddCeco");
        let jsonData=JSON.stringify(data);
        alert(jsonData);

        $.ajax({

            url:serviceUrl+'/balanza/cecos/agregar',
            method:'POST',
            data:{'req':jsonData},
            success:function(response){

                console.log(response);

            }

        });

    });


});