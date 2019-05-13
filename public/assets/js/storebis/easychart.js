class SingleChart{

    constructor(type,size){

        //set de colores por defecto
        this.colors = [
            {backgroundColor:'rgba(245, 99, 99, 0.9)',borderColor:'rgba(255, 99, 99, 1)'},
            {backgroundColor:'rgba(245, 99, 255, 0.2)',borderColor:'rgba(132, 99, 255, 0.2)'},
            {backgroundColor:'rgba(245, 99, 132, 0.2)',borderColor:'rgba(255, 99, 132, 0.2)'},
            {backgroundColor:'rgba(245, 99, 132, 0.2)',borderColor:'rgba(255, 99, 132, 0.2)'},
            {backgroundColor:'rgba(245, 99, 132, 0.2)',borderColor:'rgba(255, 99, 132, 0.2)'},
            {backgroundColor:'rgba(255, 99, 132, 0.2)',borderColor:'rgba(255, 99, 132, 0.2)'}
        ];

        //variables para generar el chart
        this.type = type;
        this.size = size;
        this.chart = null;
        this.ctx = null;
        this.data = {

            labels: [],
            datasets: []
        }

    }

    //
    begin(divId){

        //
        this.ctx = document.getElementById(divId).getContext('2d');
        this.chart = new Chart(this.ctx, {
            type: this.type,
            data: this.data,
            options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 18
                },
            },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            fontColor: "white",
                            fontSize: 14
                        }
                    }]
                }
            }
        });

    }

    //
    end(){

        //
        this.chart.destroy();
        this.ctx=null;
        this.chart=null;

    }

    //
    setData(data,labels){

        //iteramos etiquetas en X
        data.forEach(node => {

            this.data.labels.push(node.label);
            
        });

        //iteramos los datasets
        for (let i = 0; i < this.size; i++) {

            //
            let dataset = {

                label: labels[i],
                data:[],
                backgroundColor:this.colors[i].backgroundColor,
                borderColor:this.colors[i].borderColor,
                borderWidth: 1


            };

            //
            data.forEach(node=>{

                let value=node.values[i];
                dataset.data.push(value);

            });

            this.data.datasets.push(dataset);
    
        }

    }

    //
    push(node){

        //
        this.data.labels.push(node.label);

        //
        for (let i = 0; i < this.size; i++) {

            this.data.datasets[i].data.push(node.values[i]);
            
        }

        this.chart.update();

    }

    unshift(node){

        //
        this.data.labels.unshift(node.label);

        //
        for (let i = 0; i < this.size; i++) {

            this.data.datasets[i].data.unshift(node.values[i]);
            
        }

        this.chart.update();

    }

    //
    pop(){

        let node={

            label:this.data.labels.pop(),
            values:[]

        }

        //
        for (let i = 0; i < this.size; i++) {

            node.values[i]=this.data.datasets[i].data.pop();
            
        }

        this.chart.update();

        return(node);

    }

    //
    shift(){

        let node={

            label:this.data.labels.shift(),

            values:[]

        }

        //
        for (let i = 0; i < this.size; i++) {

            node.values[i]=this.data.datasets[i].data.shift();
            
        }

        this.chart.update();

        return(node);

    }

}
