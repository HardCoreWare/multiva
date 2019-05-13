class StoreFormBis{

    //
    readData(data){

        this.data=data;

    }

    //
    writeForm(divId){

        const modules = this.data.Modules;

        let selectModule='';

        for(let i=1; i<modules.length; i++){
            
            selectModule += '<option value="';
            selectModule += modules[i];
            selectModule += '">';
            selectModule += modules[i];
            selectModule += '</option>';

        }

        $(divId).html(selectModule);


    }

    readForm(){

        const params={

            year : $("#selectYear").val(),
            module : $("#selectModule").val(),
            type : $("#selectType").val()

        };
        
        return params;

    }

}