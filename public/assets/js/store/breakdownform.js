class BreakdownForm{

    constructor(){

        this.params={

            id:'',
            year:'',
            month:'',
            day:'all',
            module:'',
            ceco:'all'

        }

    }

    readId(cellId){

        const idData=cellId.split("-");
        this.params.id=idData[0];
        this.params.year=idData[1];
        this.params.month=idData[2];
        this.params.module=idData[3];

    }

    readForm(dayId,cecoId){

        let day = $(dayId).val();
        if(day===''){
            this.params.day='all';
        }
        else{
            this.params.day=day;
        }

        let ceco = $(cecoId).val();
        if(ceco===''){
            this.params.ceco='all';
        }
        else{
            this.params.ceco=ceco;
        }


    }

    getParams(){

        return this.params;

    }

}