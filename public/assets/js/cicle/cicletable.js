class CicleTable{

    readData(data){

        this.data=data;
        this.headers=["#","ANUALIDAD","MES"];
        this.matrix=[]

        this.data.forEach(row => {
            
            let line =[];

            line.push(row.Id);
            line.push(row.Anualidad);
            line.push(row.Mes);

            this.matrix.push(line);

        });

        console.log(this.matrix);

    }

    //
    writeTable(divId){

        let table = '';
        let body = '';
        let head = '';

        head+='<thead><tr>';

        this.headers.forEach(header=>{

            head+='<th>'+header+'</th>';

        });
        head+='</tr></thead>';


        body+='<tbody>';
        this.matrix.forEach(row => {

            body+='<tr>';
            body+='<td>'+row[0]+'</td>';
            body+='<td>'+row[1]+'</td>';
            body+='<td>'+stdToMonth(row[2])+'</td>';
            body+='</tr>';
            
        });
        body+='</tbody>';

        table+=head;
        table+=body;

        $(divId).html(table);

    }

}
