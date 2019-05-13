class CecosForm{

    readSearchForm(moduleId,cecoId){

        const moduleVal=$(moduleId).val();
        const cecoVal=$(cecoId).val();

        let search={

            module:moduleVal,
            ceco:cecoVal

        }

        if(cecoVal===""){

            search.ceco="all";
            
        }

        else{



        }

        return search.module+"-"+search.ceco;

    }

    readAddForm(moduleId,cecoId){

        let add = {

            Modulo: $(moduleId).val(),
            Kostl: $(cecoId).val(),
            Incluido:'1'

        }

        if(add.Modulo!==""&&add.Kostl!==""){

            return add;

        }

        else{

            return null;

        }

    }


}