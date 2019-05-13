class StoreTable{

    //leemos datos previamente parseados
    readData(data){

        //datos internos divididos
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
                    ],
                    totals:[0,0,0]

                },
                {
                    tables:[    
                        {
                            matrix:[],
                            subtotals:[0,0,0]
                        }
                    ],
                    totals:[0,0,0]

                }
            ],
            supertotals:[0,0,0]

        };

        let set = true;

        //iteramos por fila
        data.forEach(row => {

            //aplanamos linea en tabla
            let line=[];
            line.push({value:row.Id.toString(),key:"none"});
            line.push({value:row.Cuenta,key:"none"});
            line.push({value:row.Concepto,key:"none"});

            //
            row.Montos.forEach(ammount=>{

                if(row.Editable=="0"){

                    line.push({value:parseFloat(ammount.Monto),key:row.Id.toString()+"-"+row.Anualidad+"-"+row.Mes+"-"+ammount.Modulo});

                }

                else{

                    line.push({value:parseFloat(ammount.Monto),key:"none"});

                }

                if(set){

                    this.data.headers.push(ammount.Modulo);

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

        //iteramos tabla obteniendo subtotales
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

        //iteramos subtotales obteniendo totales en 0
        for(let i = 0; i < this.data.datasets.length; i++){

            const dataset=this.data.datasets[i];

            for (let j = 0; j < dataset.tables.length; j++) {

                const subtotal = dataset.tables[j].subtotals;

                for (let k = 0; k < subtotal.length; k++) {

                    this.data.datasets[i].totals[k]=0;

                }

            }

        }

        //iteramos subtotales obteniendo totales
        for(let i = 0; i < this.data.datasets.length; i++){

            const dataset=this.data.datasets[i];

            for (let j = 0; j < dataset.tables.length; j++) {

                const subtotal = dataset.tables[j].subtotals;

                for (let k = 0; k < subtotal.length; k++) {

                    const cell = subtotal[k];

                    this.data.datasets[i].totals[k]+=cell;

                }

            }

        }

        //iteramos totales llevados a 0
        for (let i = 0; i < this.data.datasets.length; i++) {

            const total = this.data.datasets[i];

            for (let j = 0; j < total.length; j++) {

                this.data.supertotals[j]=0;
                
            }
            
        }

        //iteramos totales y obtenemos supertotales
        for (let i = 0; i < this.data.datasets.length; i++) {

            const total = this.data.datasets[i];

            for (let j = 0; j < total.length; j++) {

                const cell=total[j];

                this.data.supertotals[j]+=cell;
                
            }
            
        }


    }

    //
    writeTable(divId){

        let table='';
        let head='';
        let body='';
        let footer='';

        head+='<thead>';
        head+='<tr>';
        this.data.headers.forEach(header=>{
            head+='<th>'+header+'</th>';
        });
        head+='</tr>';
        head+='</thead>';

        //cuerpo y comienza tabla
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

        this.data.datasets[0].tables[0].matrix.forEach(row=>{

            body+='<tr>';         

            for (let i = 0; i < row.length; i++) {

                const cell = row[i];

                if(i>=3&&i<row.length-1){

                    if(cell.key!=="none"){

                        body+='<td><a class="breakdown-action" id="'+cell.key+'" >'+stdToEng(cell.value.toString())+'</a></td>';

                    }

                    else{

                        body+='<td>'+stdToEng(cell.value.toString())+'</td>';
    
                    }


                }

                else if(i===row.length-1){

                    body+='<td>'+stdToEng(cell.value.toString())+'</td>';

                }

                else{

                    body+='<td>'+cell.value.toString()+'</td>';

                }


            }

            body+='</tr>';

        });

        body+='<tr>';
        for (let i = 0; i < this.data.datasets[0].tables[0].subtotals.length; i++) {
            const cell = this.data.datasets[0].tables[0].subtotals[i];
            if(i==0){
                body+='<th>SUBTOTAL</th>';
            }
            else if(i==1){
                body+='<th>FACTOR</th>';
            }
            else if(i==2){
                body+='<th>HUMANO</th>';
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

        //serie de primeros subtotales factor humano
        for (let i = 0; i < this.data.datasets[0].tables[0].subtotals.length; i++) {

            if(i==1){

                body+='<th>GASTOS GENERALES</th>';

            }

            else{

                body+='<td></td>';

            }
        

        }

        //comienza tabla gastos generales
        this.data.datasets[0].tables[1].matrix.forEach(row=>{

            body+='<tr>';         
            for (let i = 0; i < row.length; i++) {
                const cell = row[i];

                if(i>=3&&i<row.length-1){

                    if(cell.key!=="none"){

                        body+='<td><a class="breakdown-action" id="'+cell.key+'" >'+stdToEng(cell.value.toString())+'</a></td>';

                    }

                    else{

                        body+='<td>'+stdToEng(cell.value.toString())+'</td>';
    
                    }


                }

                else if(i===row.length-1){

                    body+='<td>'+stdToEng(cell.value.toString())+'</td>';

                }

                else{

                    body+='<td>'+cell.value.toString()+'</td>';

                }

            }

            body+='</tr>';

        });

        body+='<tr>';

        //iteramos en subtotales
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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


        //serie de separadores
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        body+='<tr>';
        for (let i = 0; i < this.data.datasets[0].tables[1].subtotals.length; i++) {body+='<td>_______</td>'}
        body+='</tr>';
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //iteramos en totales
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        for (let i = 0; i < this.data.datasets[0].totals.length; i++) {
            const cell = this.data.datasets[0].totals[i];
            if(i==0){
                body+='<th>TOTAL</th>';
            }
            else if(i==1){
                body+='<th>GASTOS</th>';
            }
            else if(i==2){
                body+='<th>PAGADOS</th>';
            }
            else{
                body+='<th>'+stdToEng(cell.toString())+'</th>';
            }
        }

        body+='</tr>';


        //serie de separadores
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        body+='<tr>';
        for (let i = 0; i < this.data.datasets[0].tables[1].subtotals.length; i++) {body+='<td>_______</td>'}
        body+='</tr>';
        body+='<tr>';
        for (let i = 0; i < this.data.datasets[0].tables[1].subtotals.length; i++) {body+='<td>_______</td>'}
        body+='</tr>';
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //gastos no pagados
        for (let i = 0; i < this.data.datasets[1].tables[0].subtotals.length; i++) {

            if(i==1){

                body+='<th>GASTOS NO PAGADOS</th>';

            }
            else{

                body+='<td></td>';

            }
        

        }

        this.data.datasets[1].tables[0].matrix.forEach(row=>{

            body+='<tr>';         

            for (let i = 0; i < row.length; i++) {

                const cell = row[i];

                if(i>=3&&i<row.length-1){

                    if(cell.key!=="none"){

                        body+='<td><a class="breakdown-action" id="'+cell.key+'" >'+stdToEng(cell.value.toString())+'</a></td>';

                    }

                    else{

                        body+='<td>'+stdToEng(cell.value.toString())+'</td>';
    
                    }


                }

                else if(i===row.length-1){

                    body+='<td>'+stdToEng(cell.value.toString())+'</td>';

                }

                else{

                    body+='<td>'+cell.value.toString()+'</td>';

                }

            }

            body+='</tr>';

        });

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        for (let i = 0; i < this.data.datasets[1].tables[0].subtotals.length; i++) {
            const cell = this.data.datasets[1].tables[0].subtotals[i];
            if(i==0){
                body+='<th>TOTAL</th>';
            }
            else if(i==1){
                body+='<th>GASTOS</th>';
            }
            else if(i==2){
                body+='<th>NO PAGADOS</th>';
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
        body+='</tbody>';

        //
        table+=head;
        table+=body;

        //
        this.data=null;
        //console.log(table);
        $(divId).html(table);


    }

}