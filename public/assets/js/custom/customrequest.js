$(document).ready(function(){


    $.ajax({

        url:serviceUrl+'/balanza/editables/indice',
        method:'POST',
        data:'',
        success:function (response) {

            const data=JSON.parse(response);
            const table = new CustomTable();
            table.readData(data);
            table.writeTable("#datatable");

            $("#btnUpdate").click(function(){

                const postData =JSON.stringify(table.getData());

                $.ajax({

                    url:serviceUrl+'/balanza/editables/actualizar',
                    method:'POST',
                    data:{"req":postData},
                    success:function (response) {
                        
                        window.location.replace(selfUrl+"/editable");

                    }

                });

            });
            
        }

    });


});