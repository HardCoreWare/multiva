$(document).ready(function(){


    $.ajax({

        url:serviceUrl+'/balanza/informe/indice',
        method:"GET",
        data:"",
        success:function(response){

            const importTable = new ImportTable();

            data = JSON.parse(response);
            importTable.readData(data);
            importTable.writeTable("#datatable");
                
            /************************************************************************************************************/

            $("#btnImport").click(function(){

                $("#btnImport").val("IMPORTANDO INFORME");

                $.ajax({

                    url:serviceUrl+'/balanza/informe/importar',
                    mehtod:'GET',
                    data:'',
                    success:function(response){

                        while (!response){  }
                        $("#btnImport").val("IMPORTANDO DESGLOSE");


                        $.ajax({

                            url:serviceUrl+'/balanza/desglose/importar',
                            method:'GET',
                            data:'',
                            success:function (response) {
                                
                                while (!response){  }
                                window.location.replace(selfUrl+"/importar");

                            }

                        });

                    }

                });

            });

        }



    });

});