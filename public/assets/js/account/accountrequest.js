
$(document).ready(function(){

    $.ajax({

        url:serviceUrl + '/balanza/cuentas/indice',
        method:'GET',
        data:'',
        success:function (response) {

            console.log(response);
            
            const responseData = JSON.parse(response);
            const table = new AccountTable();
            table.readData(responseData);
            table.writeTable("#datatable");

            $("#btnUpdate").click(function(){

                let postData = JSON.stringify(table.getData());
                console.log(postData);

                $.ajax({
        
                    url:serviceUrl+'/balanza/cuentas/actualizar',
                    method:'POST',
                    data:{"req":postData},
                    success:function (response) {

                        while(!response){}
                        window.location.replace(selfUrl+"/cuentas");

                    }
                });
            });
        }
    });
});