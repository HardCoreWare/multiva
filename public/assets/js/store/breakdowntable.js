class BreakdownTable{

    readData(data){

        this.data = data;
        this.headers =['CECO','IMPORTE','DESCRIPCION','FECHA'];

    }

    writeTable(divId){

        let table='';
        let body='';
        let head='';

        head+='<thead>';

        this.headers.forEach(header=>{

            head+='<th>'+header+'</th>';

        });

        head+='</thead>';
        body+='<tbody>'

        this.data.forEach(row => {

            body+='<tr>';
            body+='<td>'+row.Ceco+'</td>';
            body+='<td>'+stdToEng(row.Monto)+'</td>';
            body+='<td>'+row.Descripcion+'</td>';
            body+='<td>'+row.Anualidad+'-'+row.Mes+'-'+row.Dia+'</td>';
            body+='</tr>';
            
        });

        body+='</tbody>';
        
        table+=head;
        table+=body;

        $(divId).html(table);

        this.data=null;

    }

}