$(document).ready(function(){

    const storeForm = new StoreFormBis();
    const modularTable = new StoreTableBis();
    const storeChart = new StoreChart();

    $.ajax({

        url:serviceUrl+'/balanza/ciclos/actual',
        method:'GET',
        data:'',
        success:function (response) {

            const cicleData = JSON.parse(response);
            storeForm.readData(cicleData);
            storeForm.writeForm("#selectModule");

            $("#btnReport").click(function(){

                const params = storeForm.readForm();

                $.ajax({

                    url:serviceUrl+'/balanza/reporte/'+params.type+'/'+params.year+'/'+params.module,
                    method:'GET',
                    data:'',
                    success:function(response){

                        console.log(response);

                        let tableData = JSON.parse(response);
                        modularTable.readData(tableData);
                        modularTable.writeTable("#datatable");

                        $(".chart-action").click(function (){

                            $(".chart-card").show();
                            $(".report-card").hide();

                            let chartId=$(this).attr('id');
                            let rowData = modularTable.getData(chartId);

                            console.log(rowData);
                            storeChart.readData(rowData);
                            storeChart.printChart(new SingleChart('bar',1));

                        });

                        $(".chart-close").click(function (){

                            $(".report-card").show();
                            $(".chart-card").hide();

                            storeChart.deleteChart();

                        });

                    }

                });

            });





        }

    });

});