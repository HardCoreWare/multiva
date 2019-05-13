$(document).ready(function(){

    const storeForm = new StoreForm();
    const modularTable = new StoreTable();
    const breakdownForm = new BreakdownForm();
    const breakdownTable = new BreakdownTable();

    $.ajax({

        url:serviceUrl+'/balanza/ciclos/actual',
        method:'GET',
        data:'',
        success:function (response) {

            const cicleData = JSON.parse(response);
            storeForm.readData(cicleData);
            storeForm.writeForm("#selectMonth");

            //mandamos pedir informe
            $("#btnReport").click(function(){

                const params = storeForm.readForm();

                $.ajax({

                    url:serviceUrl+'/balanza/reporte/'+params.type+'/'+params.year+'/'+params.month,
                    method:'GET',
                    data:'',
                    success:function(response){

                        console.log(response);
                        let tableData = JSON.parse(response);
                        modularTable.readData(tableData);
                        modularTable.writeTable("#datatable");
                
                        if(params.type==="mensual"){

                            //teniendo el informe mandamos llamar desglose
                            $(".breakdown-action").click(function(){

                                $('.report-card').hide();
                                $('.breakdown-card').show();

                                let cellId = $(this).attr('id');
                                breakdownForm.readId(cellId);
                                breakdownForm.readForm("#txtDay","#txtCeco");
                                breakdownParams=breakdownForm.getParams();

                                $(".date-label").html("Fecha: "+breakdownParams.year+"-"+breakdownParams.month+"-");

                                $.ajax({

                                    url:serviceUrl+'/balanza/desglose/buscar/'+breakdownParams.id+'/'+breakdownParams.year+'/'+breakdownParams.month+'/'+breakdownParams.day+'/'+breakdownParams.module+'/'+breakdownParams.ceco,
                                    method:'GET',
                                    data:'',
                                    success:function(response){

                                        let breakdownData = JSON.parse(response);
                                        breakdownTable.readData(breakdownData);
                                        breakdownTable.writeTable('#breakdowntable');

                                    }

                                });

                            });

                            $("#txtDay").keyup(function(){

                                breakdownForm.readForm("#txtDay","#txtCeco");
                                breakdownParams=breakdownForm.getParams();
                                console.log(breakdownParams);


                                $.ajax({

                                    url:serviceUrl+'/balanza/desglose/buscar/'+breakdownParams.id+'/'+breakdownParams.year+'/'+breakdownParams.month+'/'+breakdownParams.day+'/'+breakdownParams.module+'/'+breakdownParams.ceco,
                                    method:'GET',
                                    data:'',
                                    success:function(response){

                                        let breakdownData = JSON.parse(response);
                                        breakdownTable.readData(breakdownData);
                                        breakdownTable.writeTable('#breakdowntable');
                                        
                                    }

                                })

                            });


                            //teniendo el informe mandamos llamar desglose
                            $("#txtCeco").keyup(function(){

                                breakdownForm.readForm("#txtDay","#txtCeco");
                                breakdownParams=breakdownForm.getParams();
                                console.log(breakdownParams);

                                $.ajax({

                                    url:serviceUrl+'/balanza/desglose/buscar/'+breakdownParams.id+'/'+breakdownParams.year+'/'+breakdownParams.month+'/'+breakdownParams.day+'/'+breakdownParams.module+'/'+breakdownParams.ceco,
                                    method:'GET',
                                    data:'',
                                    success:function(response){

                                        let breakdownData = JSON.parse(response);
                                        breakdownTable.readData(breakdownData);
                                        breakdownTable.writeTable('#breakdowntable');
                                        
                                    }

                                })

                            });
 
                        }

                        //teniendo el informe mandamos llamar desglose
                        $(".breakdown-close").click(function(){

                            $('.report-card').show();
                            $('.breakdown-card').hide();
                            
                        });

                    }

                });

            });





        }

    });

});