class StoreChart{

    constructor(){

        this.chart=null;

    }

    readData(chartData){


        let ammounts=[];

        for (let i = 3; i <chartData.length; i++) {

            ammounts.push(chartData[i].value);
            
        }

        this.data=[];
        this.labels=[chartData[2].value+", CUENTA MAYOR: " + chartData[1].value];

        for (let i = 0; i < ammounts.length; i++) {

            let  node ={

                label:stdToMonth(i+1),

                values:[ammounts[i]]

            };

            this.data.push(node);
            
        }

        console.log(this.data);

    }

    printChart(chart){

        this.chart=chart;
        this.chart.setData(this.data,this.labels);
        this.chart.begin("myChart");

    }

    deleteChart(){

        this.chart.end();
        this.chart=null;

    }

}