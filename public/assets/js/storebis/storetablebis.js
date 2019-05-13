class StoreTableBis{

    readData(data){

        this.data={

            headers:["#","CUENTA","CONCEPTO"],

            datasets:[

                {
                    tables:[    
                        {
                            matrix:[],
                            subtotals:[0,0,0]

                        },
                        {
                            matrix:[],
                            subtotals:[0,0,0]
                        }
                    ]

                },
                {
                    tables:[    
                        {
                            matrix:[],
                            subtotals:[0,0,0]
                        }
                    ]

                }
            ]

        };

        let set = true;

        data.forEach(row => {

            let line=[];
            line.push({value:row.Id.toString(),key:"none"});
            line.push({value:row.Cuenta,key:"none"});
            line.push({value:row.Concepto,key:"none"});

            row.Montos.forEach(ammount=>{

                line.push({value:parseFloat(ammount.Monto),key:"none"});

                if(set){

                    this.data.headers.push(stdToMonth(ammount.Mes));

                    this.data.datasets.forEach(dataset=>{

                        dataset.tables.forEach(table=>{

                            table.subtotals.push(0);

                        });

                    });

                }

            });

            set=false;

            if((row.Pagado=="1")&&(row.Super_Concepto=="FACTOR HUMANO"||row.Super_Concepto=="FACTOR HUMANO PASIVOS")){

                this.data.datasets[0].tables[0].matrix.push(line);

            }
            else if((row.Pagado=="1")&&(row.Super_Concepto=="GASTOS GENERALES")){

                this.data.datasets[0].tables[1].matrix.push(line);

            }
            else{

                this.data.datasets[1].tables[0].matrix.push(line);

            }

        });

        //
        for (let i = 0; i < this.data.datasets.length; i++) {

            const dataset = this.data.datasets[i];

            for (let j = 0; j < dataset.tables.length; j++) {

                const table = dataset.tables[j];

                table.matrix.forEach(line=>{

                    for (let k = 0; k < line.length; k++) {

                        const cell = line[k];

                        if(k>2){

                            this.data.datasets[i].tables[j].subtotals[k]+=cell.value;

                        }
                        
                    }

                });

            }
            
        }


    }

    //
    writeTable(divId){

        let table='';
        let head='';
        let body='';

        head+='<thead>';
        head+='<tr>';
        this.data.headers.forEach(header=>{
            head+='<th>'+header+'</th>';
        });
        head+='</tr>';
        head+='</thead>';

        //cuerpo
        body +='<tbody>';
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        for (let i = 0; i < this.data.datasets[0].tables[0].subtotals.length; i++) {

            if(i==1){

                body+='<th>FACTOR HUMANO</th>';

            }
            else{

                body+='<td></td>';

            }

        }



        let index00=0;

        this.data.datasets[0].tables[0].matrix.forEach(row=>{

            body+='<tr>';         

            for (let i = 0; i < row.length; i++) {

                const cell = row[i];

                if(i===2){

                    body+='<td><a class="chart-action" id="table-0-0-'+index00.toString()+'" >'+cell.value.toString()+'</a></td>';

                }

                else if(i>2){

                    body+='<td>'+stdToEng(cell.value.toString())+'</td>';

                }

                else{

                    body+='<td>'+cell.value.toString()+'</td>';

                }


            }

            body+='</tr>';

            index00++;

        });

        body+='<tr>';
        for (let i = 0; i < this.data.datasets[0].tables[0].subtotals.length; i++) {
            const cell = this.data.datasets[0].tables[0].subtotals[i];
            if(i==0){
                body+='<th>______</th>';
            }
            else if(i==1){
                body+='<th>______</th>';
            }
            else if(i==2){
                body+='<th>SUBTOTAL FACTOR HUMANO</th>';
            }
            else{
                body+='<th>'+stdToEng(cell.toString())+'</th>';
            }
        }

        body+='</tr>';

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        body+='<tr>';
        for (let i = 0; i < this.data.datasets[0].tables[0].subtotals.length; i++) {body+='<td>______</td>'}
        body+='</tr>';

        body+='<tr>';
        for (let i = 0; i < this.data.datasets[0].tables[0].subtotals.length; i++) {body+='<td>______</td>'}
        body+='</tr>';

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        for (let i = 0; i < this.data.datasets[0].tables[0].subtotals.length; i++) {

            if(i==1){

                body+='<th>GASTOS GENERALES</th>';

            }

            else{

                body+='<td></td>';

            }
        

        }


        let index01=0;

        this.data.datasets[0].tables[1].matrix.forEach(row=>{

            body+='<tr>';   

            for (let i = 0; i < row.length; i++) {
                const cell = row[i];

                if(i===2){

                    body+='<td><a class="chart-action" id="table-0-1-'+index01.toString()+'" >'+cell.value.toString()+'</a></td>';


                }

                else if(i>2){

                    body+='<td>'+stdToEng(cell.value.toString())+'</td>';

                }

                else{

                    body+='<td>'+cell.value.toString()+'</td>';

                }

            }

            body+='</tr>';

            index01++;


        });

        body+='<tr>';

        for (let i = 0; i < this.data.datasets[0].tables[1].subtotals.length; i++) {
            const cell = this.data.datasets[0].tables[1].subtotals[i];
            if(i==0){
                body+='<th>_______</th>';
            }
            else if(i==1){
                body+='<th>_______</th>';
            }
            else if(i==2){
                body+='<th>SUBTOTAL GASTOS GENERALES</th>';
            }
            else{
                body+='<th>'+stdToEng(cell.toString())+'</th>';
            }
        }

        body+='</tr>';

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body+='<tr>';
        for (let i = 0; i < this.data.datasets[0].tables[0].subtotals.length; i++) {body+='<td>_______</td>'}
        body+='</tr>';

        body+='<tr>';
        for (let i = 0; i < this.data.datasets[0].tables[0].subtotals.length; i++) {body+='<td>_______</td>'}
        body+='</tr>';
        
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        for (let i = 0; i < this.data.datasets[0].tables[0].subtotals.length; i++) {

            if(i==1){

                body+='<th>GASTOS NO PAGADOS</th>';

            }
            else{

                body+='<td></td>';

            }
        

        }

        let index10=0;
        this.data.datasets[1].tables[0].matrix.forEach(row=>{

            body+='<tr>';         

            for (let i = 0; i < row.length; i++) {

                const cell = row[i];

                if(i===2){

                    body+='<td><a class="chart-action" id="table-1-0-'+index10.toString()+'" >'+cell.value.toString()+'</a></td>';


                }

                else if(i>2){

                    body+='<td>'+stdToEng(cell.value.toString())+'</td>';

                }

                else{

                    body+='<td>'+cell.value.toString()+'</td>';

                }

            }

            body+='</tr>';
            index10++;


        });

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        for (let i = 0; i < this.data.datasets[1].tables[0].subtotals.length; i++) {
            const cell = this.data.datasets[1].tables[0].subtotals[i];
            if(i==0){
                body+='<th>_______</th>';
            }
            else if(i==1){
                body+='<th>_______</th>';
            }
            else if(i==2){
                body+='<th>SUBTOTAL GASTOS NO PAGADOS</th>';
            }
            else{
                body+='<th>'+stdToEng(cell.toString())+'</th>';
            }
        }

        body+='</tr>';

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body+='<tr>';
        for (let i = 0; i < this.data.datasets[0].tables[0].subtotals.length; i++) {body+='<td>_______</td>'}
        body+='</tr>';
        body+='<tr>';
        for (let i = 0; i < this.data.datasets[0].tables[0].subtotals.length; i++) {body+='<td>_______</td>'}
        body+='</tr>';
        body+='</tbody>';

        //
        table+=head;
        table+=body;

        //console.log(table);
        $(divId).html(table);


    }

    getData(cellId){

        let idArray=cellId.split("-");

        console.log(idArray);

        if(idArray[0]==="table"){

            let datasetIndex = parseInt(idArray[1]);
            let tableIndex = parseInt(idArray[2]);
            let rowIndex = parseInt(idArray[3]);    

            let chartArray=this.data.datasets[datasetIndex].tables[tableIndex].matrix[rowIndex];

            return chartArray;
            
        }


    }

}